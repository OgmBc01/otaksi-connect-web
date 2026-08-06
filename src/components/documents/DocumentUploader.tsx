// src/components/documents/DocumentUploader.tsx
'use client';

import { useState } from 'react';
import { Upload, X } from 'lucide-react';

export default function DocumentUploader({ onUploadSuccess }: { onUploadSuccess: () => void }) {
  const [isUploading, setIsUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'policies',
    tags: '',
    file: null as File | null
  });
  
  const categories = [
    { value: 'contracts', label: 'Contracts' },
    { value: 'policies', label: 'Company Policies' },
    { value: 'reports', label: 'Reports' },
    { value: 'certificates', label: 'Certificates' },
    { value: 'hr-docs', label: 'HR Documents' },
    { value: 'technical', label: 'Technical Documentation' }
  ];
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.file) return;
    
    setIsUploading(true);
    setErrorMessage('');
    setSuccessMessage('');
    const uploadFormData = new FormData();
    uploadFormData.append('file', formData.file);
    uploadFormData.append('title', formData.title);
    uploadFormData.append('description', formData.description);
    uploadFormData.append('category', formData.category);
    uploadFormData.append('tags', JSON.stringify(formData.tags.split(',').map(t => t.trim())));
    
    try {
      const response = await fetch('/api/documents', {
        method: 'POST',
        body: uploadFormData
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error || 'Upload failed');
      }
      
      setShowForm(false);
      setFormData({ title: '', description: '', category: 'policies', tags: '', file: null });
      setSuccessMessage('Document uploaded successfully.');
      onUploadSuccess();
    } catch (error) {
      console.error('Upload failed:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow">
      {successMessage ? (
        <div className="border-b border-green-100 bg-green-50 px-4 py-3 text-sm text-green-700">
          {successMessage}
        </div>
      ) : null}

      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="w-full p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors"
        >
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-800 font-medium">Click to upload a new document</p>
          <p className="text-sm text-gray-600 mt-1">PDF, DOCX, XLSX, PPTX, Images (max 50MB)</p>
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Upload Document</h3>
            <button type="button" onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          {errorMessage ? (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {errorMessage}
            </div>
          ) : null}
          
          <div className="space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-gray-800">Document Title</span>
              <input
                type="text"
                placeholder="Document Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                required
              />
            </label>
            
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-gray-800">Description</span>
              <textarea
                placeholder="Short description of the document"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                rows={3}
              />
            </label>
            
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-gray-800">Category</span>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </label>
            
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-gray-800">Tags</span>
              <input
                type="text"
                placeholder="Comma-separated tags"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </label>
            
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-gray-800">Document File</span>
              <input
                type="file"
                onChange={(e) => setFormData({ ...formData, file: e.target.files?.[0] || null })}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:text-sm file:font-medium file:text-blue-700 hover:file:bg-blue-100"
                accept=".pdf,.docx,.xlsx,.pptx,.jpg,.jpeg,.png"
                required
              />
            </label>
            
            <button
              type="submit"
              disabled={isUploading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isUploading ? 'Uploading...' : 'Upload Document'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}