// src/components/Layout.jsx
import React from 'react'
import BottomNav from './BottomNav'
import { Link } from 'react-router-dom'


export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Sticky title bar */}
      <header className="sticky top-0 bg-white shadow p-2 z-10 flex justify-center">
        <Link to="/" className="text-2xl font-semibold text-gray-800 text-center">
          UnSaid
        </Link>
      </header>

      <main className="flex-1 pb-16">
        {children}
      </main>

      <BottomNav />
    </div>
  )
}
