// app/api/documents/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir, unlink } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'object' && error !== null && 'message' in error) {
    return String(error.message);
  }

  return 'Upload failed';
}

function getDocumentsErrorMessage(error: unknown) {
  const message = getErrorMessage(error);

  if (message.includes('row-level security policy')) {
    return 'Document uploads are blocked by Supabase RLS. Configure SUPABASE_SERVICE_ROLE_KEY for the server or apply the policies in scripts/create_documents_table.sql.';
  }

  return message;
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const adminSupabase = createAdminClient();
    const db = adminSupabase ?? supabase;
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const rawTags = formData.get('tags') as string;
    const tags = JSON.parse(rawTags || '[]').filter((tag: string) => Boolean(tag));
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!title?.trim()) {
      return NextResponse.json({ error: 'Document title is required' }, { status: 400 });
    }
    
    // Generate unique filename
    const fileExtension = path.extname(file.name);
    const uniqueFilename = `${uuidv4()}${fileExtension}`;
    const uploadDir = path.join(process.cwd(), 'uploads', 'company-documents');
    const filePath = path.join(uploadDir, uniqueFilename);
    
    // Ensure upload directory exists
    await mkdir(uploadDir, { recursive: true });
    
    // Save file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      await unlink(filePath).catch(() => undefined);
      return NextResponse.json({ error: 'You must be logged in to upload documents.' }, { status: 401 });
    }

    const documentPayload = {
      title: title.trim(),
      description: description?.trim() || null,
      filename: uniqueFilename,
      original_name: file.name,
      file_path: filePath,
      file_size: file.size,
      mime_type: file.type || 'application/octet-stream',
      category,
      tags,
      download_password_hash: null,
      requires_auth: false,
      uploaded_by: user.id,
    };

    const { data: document, error } = await db
      .from('company_documents')
      .insert([documentPayload])
      .select()
      .single();

    if (error) {
      await unlink(filePath).catch(() => undefined);
      throw error;
    }

    return NextResponse.json({ success: true, document });
    
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      {
        error: getDocumentsErrorMessage(error),
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const adminSupabase = createAdminClient();
    const db = adminSupabase ?? supabase;
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    let query = db
      .from('company_documents')
      .select('id, title, description, original_name, mime_type, file_size, category, created_at')
      .order('created_at', { ascending: false });

    if (category) {
      query = query.eq('category', category);
    }

    if (search) {
      const escapedSearch = search.replace(/,/g, '\\,');
      query = query.or(
        `title.ilike.%${escapedSearch}%,description.ilike.%${escapedSearch}%,original_name.ilike.%${escapedSearch}%`
      );
    }

    const { data: documents, error } = await query;

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true, documents: documents ?? [] });
  } catch (error) {
    console.error('Error fetching documents:', error);
    return NextResponse.json(
      {
        success: false,
        error: getDocumentsErrorMessage(error),
      },
      { status: 500 }
    );
  }
}