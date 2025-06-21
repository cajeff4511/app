import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../components/api'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const navigate = useNavigate()

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await api.post('/auth/login', form)
      localStorage.setItem('token', res.data.token)
      navigate('/profile')
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed')
    }
  }

  return (
      <div className="min-h-screen flex items-center justify-center bg-[#202020] px-4 text-white">
      <div className="max-w-md w-full bg-[#655F43] p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-semibold mb-6 text-center">Welcome Back</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-[#FFD300] rounded-md bg-[#202020] text-white focus:ring-2 focus:ring-[#FFD300]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-[#FFD300] rounded-md bg-[#202020] text-white focus:ring-2 focus:ring-[#FFD300]"
            />
          </div>
          <button type="submit" className="cursor-pointer w-full bg-[#FFD300] text-[#202020] py-2 rounded-md hover:bg-[#e6c000]">
            Log In
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          New here?{' '}
          <Link to="/register" className="text-[#FFD300] hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>

  )
}
