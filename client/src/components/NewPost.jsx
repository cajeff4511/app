import React, { useState } from 'react'
import api from './api'

export default function NewPost({ onUpdate }) {
  const [content, setContent] = useState('')
  const [file, setFile]       = useState(null)
  const [preview, setPreview] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const handleFile = e => {
    const f = e.target.files[0]
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }

  const submit = async e => {
    e.preventDefault()
    if (submitting) return
    setSubmitting(true)
    const form = new FormData()
    form.append('content', content)
    if (file) form.append('image', file)

    try {
      const res = await api.post('/api/posts', form, {
        headers: {'Content-Type':'multipart/form-data'}
      })
      onUpdate(res.data)    // new feed array
      setContent('')
      setFile(null)
      setPreview(null)
    } catch {
      alert('Post failed')
    }
    setSubmitting(false)
  }

  return (
    <form onSubmit={submit} className="bg-white p-6 rounded-lg shadow space-y-4">
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
        rows={3}
      />
      {preview && (
        <img src={`https://app-production-1f4c.up.railway.app${preview}`}
             className="w-full max-h-60 object-cover rounded-md"
             alt="preview" />
      )}
      <div className="flex items-center space-x-4">
        <label className="cursor-pointer text-sm text-indigo-600 hover:underline">
          Attach image
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
          />
        </label>
        <button
          type="submit"
          disabled={submitting}
          className="ml-auto bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition"
        >
          {submitting ? 'Posting…' : 'Post'}
        </button>
      </div>
    </form>
  )
}
