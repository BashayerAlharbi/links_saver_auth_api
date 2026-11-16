
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiRequest } from '../services/api'
import '../pages/Register.css'

function Dashboard() {
  const navigate = useNavigate()

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token')

      try {
        const result = await apiRequest('/user', 'GET', null, token)
        setUser(result)
      } catch (error) {
        localStorage.removeItem('token')
        navigate('/login')
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [navigate])

  const handleLogout = async () => {
    const token = localStorage.getItem('token')

    try {
      await apiRequest('/logout', 'POST', null, token)
    } catch (error) {
      console.error('Logout request failed:', error)
    } finally {
      localStorage.removeItem('token')
      navigate('/login')
    }
  }

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <main className="auth-container">
      <section className="auth-card">
        <div className="auth-brand">
          <span className="brand-icon">L</span>
          <h1>Links Saver</h1>
        </div>

        <div className="auth-heading">
          <h2>Welcome, {user?.name}!</h2>
          <p>You are successfully logged in.</p>
          <p>{user?.email}</p>
        </div>

        <button
          onClick={handleLogout}
          className="auth-button"
        >
          Log Out
        </button>
      </section>
    </main>
  )
}

export default Dashboard
