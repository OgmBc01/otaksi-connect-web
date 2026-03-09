import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const supabase = await createClient()
    const { slug } = params
    
    const { data: post, error } = await supabase
      .from('posts')
      .select(`
        *,
        author:authors(
          id,
          display_name,
          bio,
          avatar_url,
          role
        ),
        category:categories(
          id,
          name,
          slug,
          description
        ),
        post_tags(
          tag:tags(
            id,
            name,
            slug
          )
        )
      `)
      .eq('slug', slug)
      .eq('published', true)
      .single()
    
    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Post not found' },
          { status: 404 }
        )
      }
      console.error('Error fetching post:', error)
      return NextResponse.json(
        { error: 'Failed to fetch post' },
        { status: 500 }
      )
    }
    
    // Transform to include tags array
    const transformedPost = {
      ...post,
      tags: post.post_tags?.map((pt: any) => pt.tag) || []
    }
    
    // Increment view count
    await supabase
      .from('posts')
      .update({ view_count: (post.view_count || 0) + 1 })
      .eq('id', post.id)
    
    return NextResponse.json({ post: transformedPost })
    
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}