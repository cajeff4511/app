import React, { useEffect, useState } from 'react'
import api from '../components/api'

export default function NewsFeed() {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    api.get('/api/news/cnn')
      .then(res => setArticles(res.data))
      .catch(err => console.error('Failed to load news:', err))
  }, [])

  return (
    <div className="min-h-screen bg-[#202020] p-4 pb-16 text-white">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold mb-2 border-b border-[#FFD300] pb-2">🗞️ Top News (NPR)</h1>
        
        {articles.map((item, i) => (
          <a
            key={i}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-[#655F43] rounded-lg shadow hover:shadow-lg transition overflow-hidden"
          >
            {/* Optional image if included */}
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-52 object-cover"
              />
            )}

            <div className="p-4">
              <h2 className="text-xl font-semibold hover:underline">{item.title}</h2>
              <p className="text-sm text-[#FFD300]/90 mt-1">
                {new Date(item.date).toLocaleString()}
              </p>
              <p className="mt-2 text-base">{item.summary}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
