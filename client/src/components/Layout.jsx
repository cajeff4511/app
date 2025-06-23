import React from 'react';
import BottomNav from './BottomNav';
import { FiSearch } from 'react-icons/fi';
import { NavLink, Link } from 'react-router-dom';

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#202020] text-white">
      {/* Sticky title bar */}
      <header className="sticky top-0 bg-[#655F43] shadow py-2 z-10 flex justify-center items-center">
        <Link to="/" className="text-2xl font-semibold text-[#FFD300] z-3">
          BIG CHURCH
        </Link>

        {/* Search icon on the right */}
        <div className="h-[50%] w-full absolute flex justify-end items-center z-2 pr-2">
          <NavLink
            to="/search"
            className={({ isActive }) =>
              `p-2 rounded-md transition ${
                isActive
                  ? 'bg-[#FFD300] text-[#202020]'
                  : 'text-[#FFD300] hover:bg-[#FFD300]/20'
              }`
            }
          >
            <FiSearch size={24} />
          </NavLink>
        </div>
      </header>

      <main className="flex-1 pb-16">{children}</main>

      <BottomNav />
    </div>
  );
}
