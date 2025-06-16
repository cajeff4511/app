// src/pages/UserProfile.jsx
import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import api from '../components/api'
import PostCard from '../components/PostCard'

export default function UserProfile() {
  const { id }               = useParams()
  const [user, setUser]      = useState(null)
  const [posts, setPosts]    = useState([])
  const [followStatus, setFollowStatus] = useState({
    followersCount: 0,
    followingCount: 0,
    isFollowing: false
  })
  const [offset, setOffset]  = useState(0)
  const limit                = 5
  const navigate             = useNavigate()

  useEffect(() => {
    // fetch profile
    api.get(`/api/users/${id}`)
      .then(res => setUser(res.data))
      .catch(() => navigate('/'))

    // fetch posts
    api.get(`/api/posts/user/${id}`, { params: { limit, offset: 0 } })
      .then(res => setPosts(res.data))
      .catch(() => {})

    // fetch follow status
    api.get(`/api/follows/user/${id}/status`)
      .then(res => setFollowStatus(res.data))
      .catch(() => {})
  }, [id, navigate])

  const toggleFollow = () => {
    const call = followStatus.isFollowing
      ? api.delete(`/api/follows/user/${id}`)
      : api.post(  `/api/follows/user/${id}`)
    call.then(res => setFollowStatus(res.data))
        .catch(() => {})
  }

  const loadMore = () => {
    const next = offset + limit
    api.get(`/api/posts/user/${id}`, { params: { limit, offset: next } })
      .then(res => setPosts(prev => [...prev, ...res.data]))
      .catch(() => {})
    setOffset(next)
  }

  if (!user) {
    return <p className="text-center mt-20 text-gray-500">Loading…</p>
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 pb-16">
      <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg mb-6">
        <Link to="/" className="text-indigo-600 hover:underline mb-4 block">
          ← Back to feed
        </Link>
        <div className="flex flex-col items-center mb-4">
          {user.profile_image_url ? (
            <img
              src={user.profile_image_url}
              alt={user.username}
              className="w-24 h-24 rounded-full object-cover mb-2"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-2">
              <span className="text-gray-500">No Pic</span>
            </div>
          )}
          <h1 className="text-2xl font-semibold mb-1">{user.username}</h1>
          <p className="text-gray-700 text-center mb-2">{user.bio || 'No bio yet.'}</p>

          <div className="flex space-x-4 mb-4">
            <button
              onClick={toggleFollow}
              className={`px-4 py-1 rounded-md transition ${
                followStatus.isFollowing
                  ? 'bg-gray-300 text-gray-800'
                  : 'bg-indigo-600 text-white'
              }`}
            >
              {followStatus.isFollowing ? 'Unfollow' : 'Follow'}
            </button>
            <span className="text-sm text-gray-600">
              {followStatus.followersCount} follower
              {followStatus.followersCount === 1 ? '' : 's'}
            </span>
            <span className="text-sm text-gray-600">
              {followStatus.followingCount} following
            </span>
          </div>
        </div>

        <h2 className="text-xl font-medium mb-4">Posts by {user.username}</h2>
      </div>

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
