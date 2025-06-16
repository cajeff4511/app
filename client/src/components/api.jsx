import axios from 'axios'

const api = axios.create({
  baseURL: 'https://app-production-1f4c.up.railway.app',
})

// attach token if available
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api
