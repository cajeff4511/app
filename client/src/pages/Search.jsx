import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../components/api'

export default function Search() {
  const [q, setQ]         = useState('')
  const [results, setResults] = useState([])

  useEffect(() => {
    const fetch = async () => {
      if (!q) return setResults([])
      try {
        const res = await api.get('/api/users/search', { params: { q } })
        setResults(res.data)
      } catch (err) {
        console.error(err)
      }
    }
    const id = setTimeout(fetch, 300)
    return () => clearTimeout(id)
  }, [q])

  return (
    <div className="min-h-screen bg-gray-100 p-4 pb-16">
      <div className="max-w-lg mx-auto">
        <input
          type="text"
          placeholder="Search users..."
          value={q}
          onChange={e => setQ(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
        />

        <ul className="space-y-4">
          {results.map(user => (
            <li key={user.id}>
              <Link
                to={`/users/${user.id}`}
                className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow hover:bg-gray-50"
              >
                <img
                  src={`http://localhost:3000${user.profile_image_url}` || '/default-avatar.png'}
                  alt={user.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="font-medium text-gray-800">{user.username}</span>
              </Link>
            </li>
          ))}

          {q && results.length === 0 && (
            <li className="text-gray-500 text-center">No users found.</li>
          )}
        </ul>
      </div>
    </div>
  )
}
