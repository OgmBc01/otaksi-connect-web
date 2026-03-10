'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { formatDistanceToNow } from 'date-fns'

// Define the type for items returned from Supabase storage
type StorageItem = {
  name: string
  id: string
  updated_at: string
  created_at: string
  last_accessed_at: string
  metadata: {
    size: number
    mimetype: string
  }
}

type MediaItem = StorageItem & {
  publicUrl: string
}

export default function MediaPage() {
  const [media, setMedia] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    fetchMedia()
  }, [])

  const fetchMedia = async () => {
    setLoading(true)
    
    const { data, error } = await supabase.storage
      .from('blog-images')
      .list('blog-images', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'created_at', order: 'desc' },
      })

    if (error) {
      console.error('Error fetching media:', error)
    } else {
      // Type assertion here since we know the shape of data from Supabase
      const storageItems = (data || []) as StorageItem[]
      
      const itemsWithUrls: MediaItem[] = storageItems.map(item => ({
        ...item,
        publicUrl: supabase.storage
          .from('blog-images')
          .getPublicUrl(`blog-images/${item.name}`).data.publicUrl,
      }))
      
      setMedia(itemsWithUrls)
    }
    setLoading(false)
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)

    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
    const filePath = `blog-images/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('blog-images')
      .upload(filePath, file)

    if (uploadError) {
      console.error('Error uploading file:', uploadError)
      alert('Failed to upload file')
    } else {
      await fetchMedia()
    }
    
    setUploading(false)
    // Clear the input
    event.target.value = ''
  }

  const handleDelete = async (fileName: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return

    const { error } = await supabase.storage
      .from('blog-images')
      .remove([`blog-images/${fileName}`])

    if (error) {
      console.error('Error deleting file:', error)
      alert('Failed to delete file')
    } else {
      setMedia(media.filter(item => item.name !== fileName))
      if (selectedImage === fileName) {
        setSelectedImage(null)
      }
    }
  }

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url)
      alert('URL copied to clipboard!')
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: 'var(--font-clash)' }}>
            Media
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]"> Library</span>
          </h1>
          <p className="text-gray-400">Manage your images and media files</p>
        </div>
      </div>

      {/* Upload Area */}
      <div className="backdrop-blur-lg bg-white/5 rounded-3xl border border-white/10 p-8 mb-8">
        <div className="border-2 border-dashed border-white/10 rounded-2xl p-8 text-center">
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept="image/*"
            onChange={handleFileUpload}
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer inline-block"
          >
            <div className="space-y-4">
              <div className="text-5xl text-gray-500">📁</div>
              {uploading ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#5B6CFF]"></div>
                  <p className="text-gray-400">Uploading...</p>
                </div>
              ) : (
                <>
                  <p className="text-gray-400">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-600">
                    PNG, JPG, GIF up to 5MB
                  </p>
                </>
              )}
            </div>
          </label>
        </div>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5B6CFF]"></div>
        </div>
      ) : media.length === 0 ? (
        <div className="text-center py-16 backdrop-blur-lg bg-white/5 rounded-3xl border border-white/10">
          <p className="text-gray-500 mb-4">No media files yet</p>
          <label
            htmlFor="file-upload"
            className="cursor-pointer text-[#5B6CFF] hover:text-white transition-colors"
          >
            Upload your first image →
          </label>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {media.map((item) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="group relative aspect-square cursor-pointer"
              onClick={() => setSelectedImage(item.publicUrl)}
            >
              <div className="absolute -inset-0.5 rounded-xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]" />
              <div className="relative w-full h-full rounded-xl overflow-hidden border border-white/10 group-hover:border-white/20 transition-all">
                <img
                  src={item.publicUrl}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      copyToClipboard(item.publicUrl)
                    }}
                    className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                    title="Copy URL"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDelete(item.name)
                    }}
                    className="p-2 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition-colors"
                    title="Delete"
                  >
                    <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                {/* File Info */}
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-xs text-white truncate">{item.name}</p>
                  <p className="text-xs text-gray-400">
                    {item.metadata?.size ? formatFileSize(item.metadata.size) : 'Unknown size'}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Image Preview Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative max-w-4xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Preview"
              className="max-w-full max-h-[90vh] rounded-2xl"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-midnight border border-white/10 flex items-center justify-center hover:border-white/20 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        </div>
      )}
    </div>
  )
}