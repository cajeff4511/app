import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../components/api'
import NewPost from '../components/NewPost'
import PostCard from '../components/PostCard'

export default function FollowingFeed() {
  const [posts, setPosts] = useState([])
  const [offset, setOffset] = useState(0)
  const limit = 5
  const navigate = useNavigate()

  const fetchPosts = off => {
    api.get('/api/posts/following', { params: { limit, offset: off } })
      .then(res => {
        if (off === 0) setPosts(res.data)
        else setPosts(prev => [...prev, ...res.data])
      })
      .catch(() => navigate('/login'))
  }

  useEffect(() => {
    fetchPosts(0)
  }, [])

  const loadMore = () => {
    const next = offset + limit
    fetchPosts(next)
    setOffset(next)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 pb-16">
      <div className="max-w-2xl mx-auto space-y-6">
        <NewPost onUpdate={setPosts} />

        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}

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
