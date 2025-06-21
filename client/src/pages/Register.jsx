import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../components/api';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', form);
      alert(res.data.message);
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#202020] px-4 text-white">
      <div className="max-w-md w-full bg-[#655F43] p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-semibold mb-6 text-center">Create Account</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium mb-1 text-[#FFD300]">
              Username
            </label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-[#FFD300] rounded-md bg-[#202020] text-white focus:ring-2 focus:ring-[#FFD300]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1 text-[#FFD300]">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-[#FFD300] rounded-md bg-[#202020] text-white focus:ring-2 focus:ring-[#FFD300]"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1 text-[#FFD300]">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-[#FFD300] rounded-md bg-[#202020] text-white focus:ring-2 focus:ring-[#FFD300]"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#FFD300] hover:bg-[#e6c000] text-[#202020] py-2 rounded-md transition"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-[#FFD300] hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
