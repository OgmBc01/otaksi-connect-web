import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const referrer = request.headers.get('referer') || 'direct';

    // Track click
    await supabase
      .from('link_clicks')
      .insert({
        link_id: id,
        ip_address: ip,
        user_agent: userAgent,
        referrer,
      });

    // Increment click count
    await supabase.rpc('increment_link_click', { link_id: id });

    // Get the link URL
    const { data: link } = await supabase
      .from('links')
      .select('url')
      .eq('id', id)
      .single();

    return NextResponse.json({ success: true, url: link?.url });
  } catch (error) {
    console.error('Error tracking click:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to track click' },
      { status: 500 }
    );
  }
}