import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await request.json().catch(() => null);
    const documentId = params.id;

    // Fetch document from database
    // const document = await db.documents.findById(documentId);

    // For demo purposes - assume we have document
    const document = {
      id: documentId,
      filename: 'example.pdf',
      original_name: 'company-policy.pdf',
      file_path: '/path/to/file.pdf',
      download_password_hash: null,
    };

    // Log download
    // await logDownload(documentId, request);

    // Read and return file
    const fileBuffer = await readFile(document.file_path);

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${document.original_name}"`,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Download failed' }, { status: 500 });
  }
}