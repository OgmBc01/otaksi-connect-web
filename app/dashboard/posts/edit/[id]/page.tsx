'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import RichTextEditor from '@/components/dashboard/RichTextEditor'
import ImageUploader from '@/components/dashboard/ImageUploader'

type Category = {
  id: string
  name: string
  slug: string
}

type Tag = {
  id: string
  name: string
  slug: string
}

type Post = {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string | null
  featured_image: string | null
  category_id: string | null
  published: boolean
  published_at: string | null
  meta_title: string | null
  meta_description: string | null
  post_tags: { tag_id: string }[]
}

export default function EditPostPage() {
  const params = useParams()
  const postId = params.id as string

  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [content, setContent] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [featuredImage, setFeaturedImage] = useState<string | null>(null)
  const [categoryId, setCategoryId] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [published, setPublished] = useState(false)
  const [publishedAt, setPublishedAt] = useState<string | null>(null)
  const [metaTitle, setMetaTitle] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [categories, setCategories] = useState<Category[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    fetchPost()
    fetchCategoriesAndTags()
  }, [postId])

  const fetchPost = async () => {
    setLoading(true)
    
    const { data: post, error } = await supabase
      .from('posts')
      .select(`
        *,
        post_tags(tag_id)
      `)
      .eq('id', postId)
      .single()

    if (error || !post) {
      console.error('Error fetching post:', error)
      router.push('/dashboard/posts')
      return
    }

    setTitle(post.title)
    setSlug(post.slug)
    setContent(post.content)
    setExcerpt(post.excerpt || '')
    setFeaturedImage(post.featured_image)
    setCategoryId(post.category_id || '')
    setPublished(post.published)
    setPublishedAt(post.published_at)
    setMetaTitle(post.meta_title || '')
    setMetaDescription(post.meta_description || '')
    setSelectedTags(post.post_tags?.map((pt: any) => pt.tag_id) || [])
    setLoading(false)
  }

  const fetchCategoriesAndTags = async () => {
    const [categoriesRes, tagsRes] = await Promise.all([
      supabase.from('categories').select('*').order('name'),
      supabase.from('tags').select('*').order('name'),
    ])

    if (categoriesRes.data) setCategories(categoriesRes.data)
    if (tagsRes.data) setTags(tagsRes.data)
  }

  const handleSave = async (publish: boolean) => {
    if (!title || !content) {
      alert('Please add a title and content')
      return
    }

    setSaving(true)

    // Determine published_at value
    let newPublishedAt = publishedAt
    if (publish && !published) {
      // Publishing for the first time
      newPublishedAt = new Date().toISOString()
    } else if (!publish && published) {
      // Unpublishing
      newPublishedAt = null
    }

    const postData = {
      title,
      slug,
      content,
      excerpt: excerpt || content.substring(0, 150) + '...',
      featured_image: featuredImage,
      category_id: categoryId || null,
      published: publish,
      published_at: newPublishedAt,
      meta_title: metaTitle || title,
      meta_description: metaDescription || excerpt || content.substring(0, 160),
    }

    const { error } = await supabase
      .from('posts')
      .update(postData)
      .eq('id', postId)

    if (error) {
      console.error('Error updating post:', error)
      alert('Failed to update post')
      setSaving(false)
      return
    }

    // Update tags
    const { error: deleteError } = await supabase
      .from('post_tags')
      .delete()
      .eq('post_id', postId)

    if (deleteError) {
      console.error('Error deleting old tags:', deleteError)
    }

    if (selectedTags.length > 0) {
      const { error: insertError } = await supabase
        .from('post_tags')
        .insert(
          selectedTags.map(tagId => ({
            post_id: postId,
            tag_id: tagId,
          }))
        )

      if (insertError) {
        console.error('Error inserting new tags:', insertError)
      }
    }

    setSaving(false)
    router.push('/dashboard/posts')
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5B6CFF]"></div>
      </div>
    )
  }

  return (
    <div className="relative p-8 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-midnight" style={{ fontFamily: 'var(--font-clash)' }}>
            Edit
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]"> Post</span>
          </h1>
          <p className="text-midnight">Update your blog post</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/dashboard/posts"
            className="admin-button bg-midnight text-white font-semibold px-4 py-2"
          >
            Cancel
          </Link>
          <button
            onClick={() => handleSave(false)}
            disabled={saving}
            className="admin-button bg-white text-midnight border border-midnight font-semibold px-4 py-2"
          >
            Save Draft
          </button>
          <button
            onClick={() => handleSave(true)}
            disabled={saving}
            className="admin-button bg-white text-midnight border border-midnight font-semibold px-4 py-2"
          >
            {saving ? 'Updating...' : published ? 'Update' : 'Publish'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="bg-white rounded-2xl border p-6">
            <label className="block text-sm font-medium text-midnight mb-2">
              Post Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="admin-input text-xl"
              placeholder="Enter post title"
            />
          </div>

          {/* Rich Text Editor */}
          <div className="bg-white rounded-2xl border p-6">
            <label className="block text-sm font-medium text-midnight mb-2">
              Content *
            </label>
            <RichTextEditor content={content} onChange={setContent} />
          </div>

          {/* Excerpt */}
          <div className="bg-white rounded-2xl border p-6">
            <label className="block text-sm font-medium text-midnight mb-2">
              Excerpt
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
              className="admin-input resize-none"
              placeholder="Brief summary of your post (optional)"
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Featured Image */}
          <div className="bg-white rounded-2xl border p-6">
            <h3 className="font-medium text-midnight mb-4">Featured Image</h3>
            <ImageUploader
              onImageUploaded={(url) => setFeaturedImage(url)}
              currentImage={featuredImage}
            />
          </div>

          {/* Category */}
          <div className="bg-white rounded-2xl border p-6">
            <h3 className="font-medium text-midnight mb-4">Category</h3>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="admin-input"
            >
              <option value="" className="bg-white text-midnight">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id} className="bg-white text-midnight">
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-2xl border p-6">
            <h3 className="font-medium text-midnight mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  type="button"
                  aria-pressed={selectedTags.includes(tag.id)}
                  onClick={() => {
                    setSelectedTags(prev =>
                      prev.includes(tag.id)
                        ? prev.filter(id => id !== tag.id)
                        : [...prev, tag.id]
                    )
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                    selectedTags.includes(tag.id)
                      ? 'bg-[#5B6CFF] text-white font-semibold border-[#5B6CFF]'
                      : 'bg-white text-midnight border-gray-300 hover:bg-[#F3F4F6]'
                  }`}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>

          {/* SEO Settings */}
          <div className="bg-white rounded-2xl border p-6">
            <h3 className="font-medium text-midnight mb-4">SEO Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-midnight mb-2">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  className="admin-input text-sm"
                  placeholder="SEO title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-midnight mb-2">
                  Meta Description
                </label>
                <textarea
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  rows={3}
                  className="admin-input text-sm resize-none"
                  placeholder="SEO description"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}