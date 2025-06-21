import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../components/api';
import PostCard from '../components/PostCard';

export default function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [followStatus, setFollowStatus] = useState({
    followersCount: 0,
    followingCount: 0,
    isFollowing: false,
  });
  const [offset, setOffset] = useState(0);
  const limit = 5;
  const navigate = useNavigate();

  // initial fetch
  useEffect(() => {
    api
      .get(`/api/users/${id}`)
      .then(res => setUser(res.data))
      .catch(() => navigate('/'));

    api
      .get(`/api/posts/user/${id}`, { params: { limit, offset: 0 } })
      .then(res => setPosts(res.data));

    api
      .get(`/api/follows/user/${id}/status`)
      .then(res => setFollowStatus(res.data));
  }, [id, navigate]);

  const toggleFollow = () => {
    const call = followStatus.isFollowing
      ? api.delete(`/api/follows/user/${id}`)
      : api.post(`/api/follows/user/${id}`);

    call
      .then(res => setFollowStatus(res.data))
      .catch(() => {});
  };

  const loadMore = () => {
    const next = offset + limit;
    api
      .get(`/api/posts/user/${id}`, { params: { limit, offset: next } })
      .then(res => setPosts(prev => [...prev, ...res.data]));
    setOffset(next);
  };

  if (!user) {
    return (
      <p className="text-center mt-20 text-[#FFD300]">Loading…</p>
    );
  }

  return (
    <div className="min-h-screen bg-[#202020] p-4 pb-16 text-white">
      {/* Profile card */}
      <div className="max-w-md mx-auto bg-[#655F43] p-8 rounded-xl shadow-lg mb-6">
        <Link to="/" className="text-[#FFD300] hover:underline mb-4 block">
          ← Back to feed
        </Link>

        {/* Avatar & bio */}
        <div className="flex flex-col items-center mb-4">
          {user.profile_image_url ? (
            <img
              src={user.profile_image_url}
              alt={user.username}
              className="w-24 h-24 rounded-full object-cover mb-2"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-[#202020]/60 flex items-center justify-center mb-2">
              <span className="text-[#FFD300]">No Pic</span>
            </div>
          )}

          <h1 className="text-2xl font-semibold mb-1">{user.username}</h1>
          <p className="text-center mb-2">
            {user.bio || 'No bio yet.'}
          </p>

          {/* Follow / stats */}
          <div className="flex space-x-4 mb-4">
            <button
              onClick={toggleFollow}
              className={`cursor-pointer px-4 py-1 rounded-md transition ${
                followStatus.isFollowing
                  ? 'bg-[#FFD300]/20 text-[#FFD300]'
                  : 'bg-[#FFD300] text-[#202020] hover:bg-[#e6c000]'
              }`}
            >
              {followStatus.isFollowing ? 'Unfollow' : 'Follow'}
            </button>

            <span className="text-sm text-[#FFD300]">
              {followStatus.followersCount} follower
              {followStatus.followersCount === 1 ? '' : 's'}
            </span>
            <span className="text-sm text-[#FFD300]">
              {followStatus.followingCount} following
            </span>
          </div>
        </div>

        <h2 className="text-xl font-medium mb-4">
          Posts by {user.username}
        </h2>
      </div>

      {/* Posts list */}
      <div className="max-w-md mx-auto space-y-6">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}

        {posts.length === 0 && (
          <p className="text-center text-[#FFD300]">No posts yet.</p>
        )}

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
  );
}
