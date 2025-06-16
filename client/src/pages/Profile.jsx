import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../components/api'
import PostCard from '../components/PostCard'

export default function Profile() {
  const [user, setUser]       = useState(null)
  const [posts, setPosts]     = useState([])
  const [editing, setEditing] = useState(false)
  const [bio, setBio]         = useState('')
  const [file, setFile]       = useState(null)
  const [preview, setPreview] = useState('')
  const [offset, setOffset]   = useState(0)
  const limit                 = 5
  const navigate              = useNavigate()

  // load profile & posts
  useEffect(() => {
    api.get('/api/users/profile')
      .then(res => {
        setUser(res.data)
        setBio(res.data.bio || '')
        setPreview(res.data.profile_image_url)
      })
      .catch(() => {
        localStorage.removeItem('token')
        navigate('/login')
      })

    api.get('/api/posts/mine', { params: { limit, offset: 0 } })
      .then(res => setPosts(res.data))
      .catch(() => {})
  }, [navigate])

  const startEdit = () => setEditing(true)
  const cancelEdit = () => {
    setEditing(false)
    setFile(null)
    setBio(user.bio || '')
    setPreview(user.profile_image_url)
  }

  const handleFile = e => {
    const f = e.target.files[0]
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }

  const saveChanges = async e => {
    e.preventDefault()
    const form = new FormData()
    form.append('bio', bio)
    if (file) form.append('profile_image', file)

    try {
      const res = await api.put('/api/users/profile', form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setUser(res.data)
      setBio(res.data.bio || '')
      setPreview(res.data.profile_image_url)
      setFile(null)
      setEditing(false)
    } catch {
      alert('Failed to update profile')
    }
  }

  const loadMore = () => {
    const next = offset + limit
    api.get('/api/posts/mine', { params: { limit, offset: next } })
      .then(res => setPosts(prev => [...prev, ...res.data]))
      .catch(() => {})
    setOffset(next)
  }

  if (!user) {
    return <p className="text-center mt-20 text-gray-500">Loading…</p>
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 pb-16">
      {/* Profile header */}
      <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg mb-6">
        {editing ? (
          <form onSubmit={saveChanges} className="space-y-6">
            {/* picture preview */}
            <div className="flex justify-center">
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-24 h-24 rounded-full object-cover mb-4"
                />
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="block w-full text-sm text-gray-600 mb-4"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                value={bio}
                onChange={e => setBio(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md transition"
              >
                Save
              </button>
              <button
                type="button"
                onClick={cancelEdit}
                className="flex-1 border border-gray-300 hover:bg-gray-100 py-2 rounded-md transition"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <h1 className="text-2xl font-semibold text-center mb-2">
              {user.username}
            </h1>
            <div className="flex justify-center mb-4">
              {user.profile_image_url ? (
                <img
                  src={user.profile_image_url}
                  alt="Your avatar"
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No Pic</span>
                </div>
              )}
            </div>
            <p className="text-gray-700 text-center mb-6">
              {user.bio || 'No bio yet.'}
            </p>
            <button
              onClick={startEdit}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md transition"
            >
              Edit Profile
            </button>
          </>
        )}
      </div>

      {/* My posts */}
      <div className="max-w-md mx-auto space-y-6">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}

        {posts.length === 0 && (
          <p className="text-center text-gray-500">No posts yet.</p>
        )}

        {posts.length >= limit + offset && (
          <button
            onClick={loadMore}
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  )
}
