import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from './api'
import CommentSection from './CommentSection'

export default function PostCard({ post }) {
  const [likes, setLikes] = useState(0)
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    // fetch like count & whether current user has liked
    api
      .get(`/api/likes/post/${post.id}`)
      .then(res => {
        setLikes(res.data.count)
        setLiked(res.data.liked)
      })
      .catch(() => {})
  }, [post.id])

  const toggleLike = () => {
    const request = liked
      ? api.delete(`/api/likes/post/${post.id}`)
      : api.post(  `/api/likes/post/${post.id}`)
    request
      .then(res => {
        setLikes(res.data.count)
        setLiked(res.data.liked)
      })
      .catch(() => {})
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      {/* header */}
      <div className="flex items-center mb-4 space-x-3">
        <Link to={`/users/${post.user_id}`}>
          <img
            src={`https://app-production-1f4c.up.railway.app${post.profile_image_url}` || '/default-avatar.png'}
            alt={post.username}
            className="w-10 h-10 rounded-full object-cover"
          />
        </Link>
        <div>
          <Link to={`/users/${post.user_id}`} className="font-semibold hover:underline">
            {post.username}
          </Link>
          <p className="text-xs text-gray-500">
            {new Date(post.created_at).toLocaleString()}
          </p>
        </div>
      </div>

      {/* content */}
      <p className="text-gray-800 mb-4">{post.content}</p>
      {post.image_url && (
        <img
          src={`https://app-production-1f4c.up.railway.app${post.image_url}`}
          alt=""
          className="w-full rounded-md object-cover mb-4"
        />
      )}

      {/* likes */}
      <div className="flex items-center mb-4 space-x-2">
        <button onClick={toggleLike} className="focus:outline-none">
          <span className={`text-xl ${liked ? 'text-red-500' : 'text-gray-500'}`}>
            {liked ? '♥' : '♡'}
          </span>
        </button>
        <span className="text-gray-700">{likes}</span>
      </div>

      {/* comments */}
      <CommentSection postId={post.id} />
    </div>
  )
}
