import React, { useEffect, useState } from 'react';
import { FaRegComment, FaComment } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import api from './api';
import CommentSection from './CommentSection';

export default function PostCard({ post }) {
  const [likes, setLikes]         = useState(0);
  const [liked, setLiked]         = useState(false);
  const [showComments, setShowComments] = useState(false);

  /* ────────────────────────────
   *  Fetch like status
   * ───────────────────────────*/
  useEffect(() => {
    api
      .get(`/api/likes/post/${post.id}`)
      .then(res => {
        setLikes(res.data.count);
        setLiked(res.data.liked);
      })
      .catch(() => {});
  }, [post.id]);

  const toggleLike = () => {
    const req = liked
      ? api.delete(`/api/likes/post/${post.id}`)
      : api.post(`/api/likes/post/${post.id}`);

    req.then(res => {
      setLikes(res.data.count);
      setLiked(res.data.liked);
    });
  };

  const toggleComments = () => setShowComments(prev => !prev);

  /* ────────────────────────────
   *  JSX
   * ───────────────────────────*/
  return (
    <div className="bg-[#655F43] text-white p-6 rounded-lg shadow">
      {/* Header */}
      <div className="flex items-center mb-4 space-x-3">
        <Link to={`/users/${post.user_id}`}>
          <img
            src={post.profile_image_url || '/default-avatar.png'}
            alt={post.username}
            className="w-10 h-10 rounded-full object-cover"
          />
        </Link>
        <div>
          <Link
            to={`/users/${post.user_id}`}
            className="font-semibold hover:underline"
          >
            {post.username}
          </Link>
          <p className="text-xs text-[#FFD300]/90">
            {new Date(post.created_at).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Image (if any) */}
      {post.image_url && (
        <img
          src={post.image_url}
          alt=""
          className="w-full rounded-md object-cover mb-4"
        />
      )}

      {/* Like + Comment controls */}
      <div className="flex items-center mb-4 space-x-4">
        {/* Like */}
        <button onClick={toggleLike} className="focus:outline-none cursor-pointer">
          <span
            className={`text-4xl ${
              liked ? 'text-[#FFD300]' : 'text-[#FFD300]'
            }`}
          >
            {liked ? '♥' : '♡'}
          </span>
        </button>
        <span>{likes}</span>

        {/* Comment */}
       <button onClick={toggleComments} className="focus:outline-none text-2xl cursor-pointer">
          {showComments ? (
            <FaComment className="text-[#FFD300]" />     
          ) : (
            <FaRegComment className="text-[#FFD300]" />  
          )}
        </button>
      </div>

      {/* Post text */}
      <p className="mb-4 text-2xl">{post.content}</p>

      {/* Comment section (toggled) */}
      {showComments && <CommentSection postId={post.id} />}
    </div>
  );
}
