import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import SinglePostClient from '@/components/insights/SinglePostClient'
import { notFound } from 'next/navigation'

type Params = Promise<{ slug: string }>

// Define the type for the post data
type PostData = {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string | null
  featured_image: string | null
  published_at: string
  view_count: number
  category_id?: string
  author: {
    display_name: string
    bio: string | null
    avatar_url: string | null
  } | null
  category: {
    name: string
    slug: string
    description: string | null
  } | null
  post_tags: Array<{
    tag: {
      id: string
      name: string
      slug: string
    }
  }> | null
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()

  const { data: post } = await supabase
    .from('posts')
    .select(`
      title,
      excerpt,
      featured_image,
      category:categories(name)
    `)
    .eq('slug', slug)
    .eq('published', true)
    .single() as { data: { title: string; excerpt: string | null; featured_image: string | null; category: { name: string } | { name: string }[] | null } | null }

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  // Safely access category name with type guard
  let categoryName = 'technology';
  if (post.category) {
    if (!Array.isArray(post.category) && typeof post.category === 'object' && 'name' in post.category && post.category.name) {
      categoryName = post.category.name;
    } else if (Array.isArray(post.category) && post.category.length > 0 && post.category[0] && 'name' in post.category[0] && post.category[0].name) {
      categoryName = post.category[0].name;
    }
  }

  return {
    title: `${post.title} | Otaksi Connect Insights`,
    description: post.excerpt || `Read our latest insights about ${categoryName}`,
    openGraph: {
      title: post.title,
      description: post.excerpt || `Read our latest insights about ${categoryName}`,
      url: `https://otaksi.ae/insights/${slug}`,
      siteName: 'Otaksi Connect',
      locale: 'en_AE',
      type: 'article',
      images: post.featured_image ? [
        {
          url: post.featured_image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ] : [],
    },
  }
}

export default async function SinglePostPage({ params }: { params: Params }) {
  const { slug } = await params
  const supabase = await createClient()

  // Fetch the main post
  const { data: post, error: postError } = await supabase
    .from('posts')
    .select(`
      id,
      title,
      slug,
      content,
      excerpt,
      featured_image,
      published_at,
      view_count,
      category_id,
      author:authors(
        display_name,
        bio,
        avatar_url
      ),
      category:categories(
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

  if (postError || !post) {
    console.error('Error fetching post:', postError)
    notFound()
  }

  // Safely extract category (handle both array and object)
  let category = null;
  if (post.category && !Array.isArray(post.category)) {
    category = post.category;
  } else if (Array.isArray(post.category) && post.category.length > 0) {
    category = post.category[0];
  }

  // Safely extract author (handle both array and object)
  let author = null;
  if (post.author && !Array.isArray(post.author)) {
    author = post.author;
  } else if (Array.isArray(post.author) && post.author.length > 0) {
    author = post.author[0];
  }

  // Store category_id for related posts before removing it
  const category_id = post.category_id;

  // Transform the post data to match SinglePostClient's expected format (no category_id, tags is array of {id, name, slug})
  const transformedPost = {
    id: post.id,
    title: post.title,
    slug: post.slug,
    content: post.content,
    excerpt: post.excerpt,
    featured_image: post.featured_image,
    published_at: post.published_at,
    view_count: post.view_count,
    author: author,
    category: category,
    tags: Array.isArray(post.post_tags)
      ? post.post_tags.map((pt: any) => pt.tag && {
          id: pt.tag.id,
          name: pt.tag.name,
          slug: pt.tag.slug
        }).filter(Boolean)
      : [],
  }

  // Update view count (increment by 1) - run in background, don't await
  supabase
    .from('posts')
    .update({ view_count: (transformedPost.view_count || 0) + 1 })
    .eq('id', transformedPost.id)
    .then(({ error }) => {
      if (error) console.error('Error updating view count:', error)
    })

  // Fetch related posts (same category, excluding current post)
  let relatedPostsQuery = supabase
    .from('posts')
    .select(`
      id,
      title,
      slug,
      excerpt,
      featured_image,
      published_at
    `)
    .eq('published', true)
    .neq('id', transformedPost.id)
    .limit(3)

  // Use category_id from the original post data
  if (category_id) {
    relatedPostsQuery = relatedPostsQuery.eq('category_id', category_id)
  }

  const { data: relatedPosts } = await relatedPostsQuery

  // Pass transformedPost directly (category_id is not present)
  return (
    <SinglePostClient
      post={transformedPost}
      relatedPosts={relatedPosts || []}
    />
  )
}