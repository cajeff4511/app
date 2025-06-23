import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../components/api';
import PostCard from '../components/PostCard';

export default function Profile() {
  const [user, setUser]       = useState(null);
  const [posts, setPosts]     = useState([]);
  const [editing, setEditing] = useState(false);
  const [bio, setBio]         = useState('');
  const [file, setFile]       = useState(null);
  const [preview, setPreview] = useState('');
  const [homeChurch, setHomeChurch] = useState('');
const [denomination, setDenomination] = useState('');
  const [offset, setOffset]   = useState(0);
  const limit                 = 5;
  const navigate              = useNavigate();

  /* ─────────────────────────────────────
   *  Load profile & my posts
   * ────────────────────────────────────*/
  useEffect(() => {
    api.get('/api/users/profile')
      .then(res => {
        setUser(res.data);
        setBio(res.data.bio || '');
        setPreview(res.data.profile_image_url);
        setHomeChurch(res.data.home_church || '');
        setDenomination(res.data.denomination || '');
      })
      .catch(() => {
        localStorage.removeItem('token');
        navigate('/login');
      });

    api.get('/api/posts/mine', { params: { limit, offset: 0 } })
      .then(res => setPosts(res.data));
  }, [navigate]);

  /* ────────────────────────────
   *  Helpers
   * ───────────────────────────*/
  const startEdit   = () => setEditing(true);
  const cancelEdit  = () => {
    setEditing(false);
    setFile(null);
    setBio(user.bio || '');
    setPreview(user.profile_image_url);
    setHomeChurch(user.home_church || '');
    setDenomination(user.denomination || '');

  };

  const handleFile = e => {
    const f = e.target.files[0];
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const saveChanges = async e => {
    e.preventDefault();
    const form = new FormData();
    form.append('bio', bio);
    form.append('home_church', homeChurch);
    form.append('denomination', denomination);

    if (file) form.append('profile_image', file);

    try {
      const res = await api.put('/api/users/profile', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUser(res.data);
      setBio(res.data.bio || '');
      setPreview(res.data.profile_image_url);
      setHomeChurch(res.data.home_church || '');
      setDenomination(res.data.denomination || '');

      setFile(null);
      setEditing(false);
    } catch {
      alert('Failed to update profile');
    }
  };

  const loadMore = () => {
    const next = offset + limit;
    api
      .get('/api/posts/mine', { params: { limit, offset: next } })
      .then(res => setPosts(prev => [...prev, ...res.data]));
    setOffset(next);
  };

  if (!user) {
    return (
      <p className="text-center mt-20 text-[#FFD300]">Loading…</p>
    );
  }

  /* ────────────────────────────
   *  JSX
   * ───────────────────────────*/
  return (
    <div className="min-h-screen bg-[#202020] p-4 pb-16 text-white">
      {/* ─── Profile header ───────────────────────────────────────── */}
      <div className="max-w-md mx-auto bg-[#655F43] p-8 rounded-xl shadow-lg mb-6">
        {editing ? (
          /* ─── Edit Form ───────────────────────────────────────── */
          <form onSubmit={saveChanges} className="space-y-6">
            {/* avatar picker */}
            <div className="flex justify-center">
              <label htmlFor="profileImage" className="cursor-pointer">
                {preview ? (
                  <div className='flex justify-center flex-col items-center'>
                     <img
                    src={preview}
                    alt="Preview"
                    className="w-24 h-24 rounded-full object-cover mb-4"
                  />
                  <span className="text-white text-center">Edit Porfile Pic</span>
                  </div>
                 
                  
                ) : (
                  <div className="w-24 h-24 rounded-full bg-[#202020]/60 flex items-center justify-center mb-4">
                    <span className="text-white">Click to upload</span>
                  </div>
                )}
              </label>
              <input
                id="profileImage"
                type="file"
                accept="image/*"
                onChange={handleFile}
                className="hidden"
              />
            </div>

            {/* bio */}
            <div>
              <label className="block text-sm font-medium mb-1 text-[#FFD300]">
                Bio
              </label>
              <textarea
                value={bio}
                onChange={e => setBio(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-[#FFD300] rounded-md bg-[#202020] text-white focus:ring-2 focus:ring-[#FFD300]"
              />
            </div>
            {/* home_church */}
            <div>
              <label className="block text-sm font-medium mb-1 text-[#FFD300]">
                Home Church
              </label>
              <input
                type="text"
                value={homeChurch}
                onChange={e => setHomeChurch(e.target.value)}
                className="w-full px-3 py-2 border border-[#FFD300] rounded-md bg-[#202020] text-white focus:ring-2 focus:ring-[#FFD300]"
              />
            </div>

            {/* denomination */}
            <div>
              <label className="block text-sm font-medium mb-1 text-[#FFD300]">
                Denomination
              </label>
              <input
                type="text"
                value={denomination}
                onChange={e => setDenomination(e.target.value)}
                className="w-full px-3 py-2 border border-[#FFD300] rounded-md bg-[#202020] text-white focus:ring-2 focus:ring-[#FFD300]"
              />
            </div>

            {/* actions */}
            <div className="flex space-x-4">
              <button
                type="submit"
                className="cursor-pointer flex-1 bg-[#FFD300] text-[#202020] py-2 rounded-md hover:bg-[#e6c000] transition"
              >
                Save
              </button>
              <button
                type="button"
                onClick={cancelEdit}
                className="cursor-pointer flex-1 border border-[#FFD300]/40 py-2 rounded-md hover:bg-[#FFD300]/10 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          /* ─── View Mode ───────────────────────────────────────── */
          <>
            <h1 className="text-2xl font-semibold text-center mb-2">
              {user.username}
            </h1>

            {/* avatar */}
            <div className="flex justify-center mb-4">
              {user.profile_image_url ? (
                <img
                  src={user.profile_image_url}
                  alt="Your avatar"
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-[#202020]/60 flex items-center justify-center">
                  <span className="text-[#FFD300]">No Pic</span>
                </div>
              )}
            </div>

            {/* bio */}
            <p className="text-center mb-6">
              {user.bio || 'No bio yet.'}
            </p>
            <p className="text-center mb-2">
              <span className="font-semibold text-[#FFD300]">Home Church: </span>
              {user.home_church || 'Not specified'}
            </p>
            <p className="text-center mb-6">
              <span className="font-semibold text-[#FFD300]">Denomination: </span>
              {user.denomination || 'Not specified'}
            </p>


            {/* edit button */}
            <button
              onClick={startEdit}
              className="cursor-pointer w-full bg-[#FFD300] text-[#202020] py-2 rounded-md hover:bg-[#e6c000] transition"
            >
              Edit Profile
            </button>
          </>
        )}
      </div>

      {/* ─── My Posts ───────────────────────────────────────────── */}
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
            className="w-full py-2 bg-[#FFD300] text-[#202020] rounded-md hover:bg-[#e6c000] transition"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
}
