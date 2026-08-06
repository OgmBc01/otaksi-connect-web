// src/components/documents/DocumentPreview.tsx
'use client';

import { useState } from 'react';
import { Eye, Download, FileText, Image, File } from 'lucide-react';

interface DocumentPreviewProps {
  document: {
    id: string;
    title: string;
    description: string;
    original_name: string;
    mime_type: string;
    file_size: number;
  };
}

export default function DocumentPreview({ document: fileDocument }: DocumentPreviewProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  
  const getFileIcon = () => {
    if (fileDocument.mime_type.includes('pdf')) return <FileText className="w-8 h-8 text-red-500" />;
    if (fileDocument.mime_type.includes('image')) return <Image className="w-8 h-8 text-blue-500" />;
    return <File className="w-8 h-8 text-gray-500" />;
  };
  
  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch(`/api/documents/${fileDocument.id}/download`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = window.document.createElement('a');
      a.href = url;
      a.download = fileDocument.original_name;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Download failed');
    } finally {
      setIsDownloading(false);
    }
  };
  
  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
        <div className="flex items-start space-x-4">
          <div className="shrink-0">{getFileIcon()}</div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{fileDocument.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{fileDocument.description}</p>
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-xs text-gray-500">{fileDocument.original_name}</span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-500">
                {(fileDocument.file_size / 1024).toFixed(1)} KB
              </span>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => window.open(`/documents/${fileDocument.id}/preview`, '_blank')}
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
              title="Preview"
            >
              <Eye className="w-5 h-5" />
            </button>
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="p-2 text-gray-600 hover:text-green-600 transition-colors"
              title="Download"
            >
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}