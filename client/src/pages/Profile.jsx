import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../components/api'
import PostCard from '../components/PostCard'

export default function Profile() {
  const [user, setUser]       = useState(null)
  const [posts, setPosts]     = useState([])
  const [offset, setOffset]   = useState(0)
  const limit                 = 5
  const navigate              = useNavigate()

  useEffect(() => {
    // 1) get my profile
    api.get('/api/users/profile')
      .then(res => setUser(res.data))
      .catch(() => {
        localStorage.removeItem('token')
        navigate('/login')
      })

    // 2) get my posts
    api.get('/api/posts/mine', { params: { limit, offset: 0 } })
      .then(res => setPosts(res.data))
      .catch(() => {})
  }, [navigate])

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
        <h1 className="text-2xl font-semibold text-center mb-2">{user.username}</h1>
        <div className="flex justify-center mb-4">
          {user.profile_image_url
            ? <img src={user.profile_image_url}
                   alt="Your avatar"
                   className="w-24 h-24 rounded-full object-cover" />
            : <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">No Pic</span>
              </div>
          }
        </div>
        <p className="text-gray-700 text-center mb-6">{user.bio || 'No bio yet.'}</p>
      </div>

      {/* My posts */}
      <div className="max-w-md mx-auto space-y-6">
        {posts.map(post => <PostCard key={post.id} post={post} />)}

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
