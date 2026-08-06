'use client';

import DocumentUploader from '@/components/documents/DocumentUploader';

export default function DocumentUploadPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Upload Document</h1>
        <p className="mt-1 text-gray-600">Add a new company document for your team library.</p>
      </div>

      <div className="max-w-3xl">
        <DocumentUploader onUploadSuccess={() => undefined} />
      </div>
    </div>
  );
}