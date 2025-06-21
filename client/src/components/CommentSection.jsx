import React, { useEffect, useState } from 'react';
import api from './api';

export default function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [offset, setOffset]     = useState(0);
  const [content, setContent]   = useState('');
  const limit = 3;

  const fetchComments = off => {
    api.get(`/api/comments/post/${postId}`, { params: { limit, offset: off } })
      .then(res => {
        if (off === 0) setComments(res.data);
        else {
          const unique = res.data.filter(c => !comments.some(x => x.id === c.id));
          setComments(prev => [...prev, ...unique]);
        }
      });
  };

  useEffect(() => {
    fetchComments(0);
  }, [postId]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!content.trim()) return;
    api.post(`/api/comments/post/${postId}`, { content })
      .then(res => {
        setComments(res.data);
        setOffset(0);
        setContent('');
      });
  };

  const loadMore = () => {
    const next = offset + limit;
    fetchComments(next);
    setOffset(next);
  };

  return (
    <div className="mt-4 space-y-2">
      {comments.map(c => (
        <div key={c.id} className="flex items-start space-x-3">
          <img
            src={c.profile_image_url || '/default-avatar.png'}
            alt={c.username}
            className="w-6 h-6 rounded-full object-cover mt-1"
          />
          <div>
            <p className="text-sm font-medium">{c.username}</p>
            <p className="text-sm">{c.content}</p>
          </div>
        </div>
      ))}

      {comments.length >= limit + offset && (
        <button onClick={loadMore} className=" cursor-pointer text-sm text-[#FFD300] hover:underline">
          Load more comments
        </button>
      )}

      <form onSubmit={handleSubmit} className="mt-2 flex space-x-2">
        <input
          type="text"
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Add a comment…"
          className="flex-1 px-3 py-2 border border-[#FFD300] rounded-md bg-[#202020] text-white placeholder:text-[#FFD300]/60 focus:ring-2 focus:ring-[#FFD300]"
        />
        <button
          type="submit"
          className="cursor-pointer px-3 py-2 bg-[#FFD300] text-[#202020] rounded-md hover:bg-[#e6c000]"
        >
          Post
        </button>
      </form>
    </div>
  );
}
