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
      <div className="min-h-screen bg-[#202020] p-4 pb-16 text-white">
      <div className="max-w-2xl mx-auto space-y-6">
        <NewPost onUpdate={setPosts} />

        {posts.map(p => <PostCard key={p.id} post={p} />)}

        {posts.length >= limit + offset && (
          <button
            onClick={loadMore}
            className="cursor-pointer w-full py-2 bg-[#FFD300] text-[#202020] rounded-md hover:bg-[#e6c000]"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  )
}
