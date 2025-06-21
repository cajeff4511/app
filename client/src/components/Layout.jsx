import React from 'react';
import BottomNav from './BottomNav';
import { Link } from 'react-router-dom';

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#202020] text-white">
      {/* Sticky title bar */}
      <header className="sticky top-0 bg-[#655F43] shadow p-2 z-10 flex justify-center">
        <Link to="/" className="text-2xl font-semibold text-[#FFD300]">
          UnSaid
        </Link>
      </header>

      <main className="flex-1 pb-16 ">{children}</main>

      <BottomNav />
    </div>
  );
}
