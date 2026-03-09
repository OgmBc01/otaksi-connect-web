import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Get query parameters
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '9')
    const category = searchParams.get('category')
    const tag = searchParams.get('tag')
    const search = searchParams.get('search')
    
    // Calculate offset
    const offset = (page - 1) * limit
    
    // Start building query
    let query = supabase
      .from('posts')
      .select(`
        *,
        author:authors(
          id,
          display_name,
          avatar_url,
          role
        ),
        category:categories(
          id,
          name,
          slug
        ),
        post_tags(
          tag:tags(
            id,
            name,
            slug
          )
        )
      `, { count: 'exact' })
      .eq('published', true)
      .order('published_at', { ascending: false })
      .range(offset, offset + limit - 1)
    
    // Apply filters
    if (category) {
      query = query.eq('category.slug', category)
    }
    
    if (tag) {
      query = query.eq('post_tags.tag.slug', tag)
    }
    
    if (search) {
      query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%`)
    }
    
    const { data: posts, error, count } = await query
    
    if (error) {
      console.error('Error fetching posts:', error)
      return NextResponse.json(
        { error: 'Failed to fetch posts' },
        { status: 500 }
      )
    }
    
    // Transform posts to include tags array
    const transformedPosts = posts?.map(post => ({
      ...post,
      tags: post.post_tags?.map((pt: any) => pt.tag) || []
    })) || []
    
    return NextResponse.json({
      posts: transformedPosts,
      total: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit)
    })
    
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}