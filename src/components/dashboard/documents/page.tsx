// app/dashboard/documents/page.tsx
'use client';

import { useState, useEffect } from 'react';
import DocumentUploader from '../../documents/DocumentUploader';
import DocumentPreview from '../../documents/DocumentPreview';
import DocumentFilters from '../../documents/DocumentFilters';

interface DocumentItem {
  id: string;
  title: string;
  description: string;
  original_name: string;
  mime_type: string;
  file_size: number;
}

interface DocumentFiltersState {
  category: string;
  search: string;
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<DocumentFiltersState>({ category: '', search: '' });
  
  useEffect(() => {
    fetchDocuments();
  }, [filters]);
  
  const fetchDocuments = async () => {
    setLoading(true);
    const params = new URLSearchParams({
      category: filters.category,
      search: filters.search,
    });
    const response = await fetch(`/api/documents?${params}`);
    const data = (await response.json()) as { documents?: DocumentItem[] };
    setDocuments(data.documents ?? []);
    setLoading(false);
  };
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Company Documents</h1>
        <p className="text-gray-600 mt-1">Manage and share company policies, contracts, and reports</p>
      </div>
      
      <DocumentUploader onUploadSuccess={fetchDocuments} />
      
      <div className="mt-8">
        <DocumentFilters filters={filters} onChange={setFilters} />
        
        {loading ? (
          <div className="text-center py-12">Loading documents...</div>
        ) : documents.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No documents found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {documents.map((doc) => (
              <DocumentPreview key={doc.id} document={doc} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}