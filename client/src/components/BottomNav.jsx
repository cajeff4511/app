import React from 'react'
import { NavLink } from 'react-router-dom'

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t shadow-inner">
      <ul className="h-full flex items-center justify-around">
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `block text-center text-sm ${isActive ? 'text-indigo-600' : 'text-gray-500'}`
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/search"
            className={({ isActive }) =>
              `block text-center text-sm ${isActive ? 'text-indigo-600' : 'text-gray-500'}`
            }
          >
            Search
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/following"
            className={({ isActive }) =>
              `block text-center text-sm ${isActive ? 'text-indigo-600' : 'text-gray-500'}`
            }
          >
            Following
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `block text-center text-sm ${isActive ? 'text-indigo-600' : 'text-gray-500'}`
            }
          >
            Profile
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}
