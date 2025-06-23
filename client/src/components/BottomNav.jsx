import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiCamera } from 'react-icons/fi';

export default function BottomNav() {
  const base =
    'inline-block px-4 py-2 text-sm font-medium rounded-md transition text-center';

  return (
    <nav className="fixed bottom-0 inset-x-0 h-16 bg-[#655F43] border-t border-[#FFD300] shadow-inner z-50">
      <ul className="h-full flex items-center text-white">
        {[
          { to: '/news', label: 'News' },
          { to: '/public', label: 'Public', end: true },
          { to: '/new-post', label: <FiCamera size={20} />, isIcon: true },
          { to: '/', label: 'Following' },
          { to: '/profile', label: 'Profile' },
        ].map(({ to, label, end, isIcon }) => (
          <li key={to} className="w-1/5 h-full flex items-center justify-center">
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                `${base} ${isIcon ? 'text-xl' : ''} ${
                  isActive
                    ? 'bg-[#FFD300] text-[#202020]'
                    : 'text-white hover:bg-[#FFD300]/20'
                }`
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
