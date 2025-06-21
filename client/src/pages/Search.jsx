import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../components/api';

export default function Search() {
  const [q, setQ] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      if (!q) return setResults([]);
      try {
        const res = await api.get('/api/users/search', { params: { q } });
        setResults(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    const id = setTimeout(fetch, 300);
    return () => clearTimeout(id);
  }, [q]);

  return (
    <div className="min-h-screen bg-[#202020] p-4 pb-16 text-white">
      <div className="max-w-lg mx-auto">
        <input
          type="text"
          placeholder="Search users..."
          value={q}
          onChange={e => setQ(e.target.value)}
          className="w-full px-4 py-2 border border-[#FFD300] rounded-md bg-[#202020] text-white placeholder:text-[#FFD300]/60 focus:ring-2 focus:ring-[#FFD300] mb-4"
        />

        <ul className="space-y-4">
          {results.map(user => (
            <li key={user.id}>
              <Link
                to={`/users/${user.id}`}
                className="flex items-center space-x-3 bg-[#655F43] p-4 rounded-lg shadow hover:bg-[#FFD300]/10"
              >
                <img
                  src={user.profile_image_url || '/default-avatar.png'}
                  alt={user.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="font-medium">{user.username}</span>
              </Link>
            </li>
          ))}

          {q && results.length === 0 && (
            <li className="text-center text-[#FFD300]">No users found.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
