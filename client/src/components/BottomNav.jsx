import React from 'react';
import { NavLink } from 'react-router-dom';

export default function BottomNav() {
  const base = 'block text-center text-sm font-medium px-4 py-2 rounded-md transition';
  return (
    <nav className="fixed bottom-0 inset-x-0 h-16 bg-[#655F43] border-t border-[#FFD300] shadow-inner">
      <ul className="h-full flex items-center justify-around text-white">
        {[
          { to: '/public',   label: 'Public',    end: true },
          { to: '/search',   label: 'Search' },
          { to: '/',         label: 'Following' },
          { to: '/profile',  label: 'Profile' },
        ].map(({ to, label, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                `${base} ${
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
