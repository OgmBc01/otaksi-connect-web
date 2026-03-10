import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import SinglePostClient from '@/components/insights/SinglePostClient'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const supabase = await createClient()
  
  const { data: post, error } = await supabase
    .from('posts')
    .select('title, excerpt, featured_image, meta_title, meta_description')
    .eq('slug', params.slug)
    .eq('published', true)
    .maybeSingle()

  if (error) {
    console.error('Metadata fetch error:', error)
  }

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested article could not be found.',
    }
  }

  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt || 'Read this insightful article',
    openGraph: {
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt || 'Read this insightful article',
      images: post.featured_image ? [{ url: post.featured_image }] : [],
    },
  }
}

export default async function SinglePostPage({ params }: PageProps) {
  const supabase = await createClient()
  
  console.log('=== DEBUG INFO ===')
  console.log('1. Looking for slug:', params.slug)
  
  // First, let's check if the posts table has any data at all
  const { data: allPosts, error: countError } = await supabase
    .from('posts')
    .select('id, title, slug, published')
    .limit(10)
  
  console.log('2. All posts in DB:', allPosts)
  console.log('3. Count error:', countError)

  // Try to find the post WITHOUT the published filter first
  console.log('4. Trying to find post without published filter...')
  const { data: postAny, error: postAnyError } = await supabase
    .from('posts')
    .select('id, title, slug, published')
    .eq('slug', params.slug)
    .maybeSingle()

  console.log('5. Post without published filter:', postAny)
  console.log('6. Error without published filter:', postAnyError)

  // Now try with published filter
  console.log('7. Trying to find post WITH published filter...')
  const { data: post, error: postError } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', params.slug)
    .eq('published', true)
    .maybeSingle()

  console.log('8. Post with published filter:', post)
  console.log('9. Error with published filter:', postError)

  if (postError) {
    console.error('10. Error fetching post:', postError)
    notFound()
  }

  if (!post) {
    console.log('11. No post found for slug:', params.slug)
    console.log('12. Post exists but might not be published?', postAny)
    notFound()
  }

  console.log('13. Post found successfully:', post.id)

  // Get author info (optional)
  let author = { display_name: 'Otaksi Connect', bio: null, avatar_url: null }
  
  if (post.author_id) {
    const { data: authorData, error: authorError } = await supabase
      .from('authors')
      .select('display_name, bio, avatar_url')
      .eq('id', post.author_id)
      .maybeSingle()
    
    if (authorError) {
      console.error('Error fetching author:', authorError)
    }
    
    if (authorData) {
      author = authorData
    }
  }

  // Get category (optional)
  let category = null
  if (post.category_id) {
    const { data: categoryData, error: categoryError } = await supabase
      .from('categories')
      .select('name, slug, description')
      .eq('id', post.category_id)
      .maybeSingle()
    
    if (categoryError) {
      console.error('Error fetching category:', categoryError)
    }
    
    category = categoryData
  }

  // Get tags (optional)
  let tags: any[] = []
  const { data: postTags, error: tagsError } = await supabase
    .from('post_tags')
    .select('tag:tags(id, name, slug)')
    .eq('post_id', post.id)

  if (tagsError) {
    console.error('Error fetching tags:', tagsError)
  } else {
    tags = postTags?.map((pt: any) => pt.tag).filter(Boolean) || []
  }

// Increment view count (await for error handling)
try {
  await supabase
    .from('posts')
    .update({ view_count: (post.view_count || 0) + 1 })
    .eq('id', post.id);
  console.log('View count updated successfully');
} catch (err) {
  console.error('Error updating view count:', err);
}

  // Get related posts
  let relatedPosts: any[] = []
  if (post.category_id) {
    const { data: related, error: relatedError } = await supabase
      .from('posts')
      .select('id, title, slug, excerpt, featured_image, published_at')
      .eq('category_id', post.category_id)
      .eq('published', true)
      .neq('id', post.id)
      .limit(3)
      .order('published_at', { ascending: false })

    if (relatedError) {
      console.error('Error fetching related posts:', relatedError)
    } else {
      relatedPosts = related || []
    }
  }

  const transformedPost = {
    ...post,
    author,
    category,
    tags,
  }

  return <SinglePostClient post={transformedPost} relatedPosts={relatedPosts} />
}