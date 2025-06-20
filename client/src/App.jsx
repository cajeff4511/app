import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'
import UserProfile from './pages/UserProfile'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'
import Feed    from './pages/Feed'
import Search       from './pages/Search'
import FollowingPage from './pages/FollowingPage'

export default function App() {
  return (
    <Routes>
      
      <Route
       path="/"
        element={
          <ProtectedRoute>
            <Layout>
              <Feed/>
            </Layout>
          </ProtectedRoute>
        }
     />
     <Route
        path="/search"
        element={
         <ProtectedRoute>
            <Layout><Search/></Layout>
         </ProtectedRoute>
        }
      />
      <Route
  path="/following"
  element={
    <ProtectedRoute>
      <Layout>
        <FollowingPage />
      </Layout>
    </ProtectedRoute>
  }
/>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/profile"
       element={
          <ProtectedRoute>
            <Layout>
              <Profile/>
           </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/users/:id"
        element={
          <ProtectedRoute>
            <Layout>
              <UserProfile/>
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
