import { notFound } from 'next/navigation';

export default async function DocumentPreviewPage({ params }: { params: { id: string } }) {
  // Fetch document metadata
  // Render PDF viewer or image preview

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Document Preview</h1>
        {/* Embed PDF viewer or image */}
      </div>
    </div>
  );
}