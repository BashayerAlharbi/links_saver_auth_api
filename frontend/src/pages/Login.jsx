
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { apiRequest } from '../services/api'
import './Login.css'

function Login() {
  const navigate = useNavigate()

  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    setErrors([])
    setLoading(true)

    const formData = new FormData(event.currentTarget)

    const loginData = {
      email: formData.get('email'),
      password: formData.get('password'),
    }

    try {
      const result = await apiRequest('/login', 'POST', loginData)

      if (!result?.token) {
         throw new Error('Login failed: Authentication token was not received.')
      }

      localStorage.setItem('token', result.token)

      navigate('/dashboard')
    } catch (error) {
      if (error.errors) {
        setErrors(Object.values(error.errors).flat())
      } else {
        setErrors([error.message || 'Invalid email or password.'])
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="auth-container">
      <section className="auth-card">
        <div className="auth-brand">
          <span className="brand-icon">L</span>
          <h1>Links Saver</h1>
        </div>

        <div className="auth-heading">
          <h2>Welcome Back!</h2>
          <p>Log in to access and manage your favorite links.</p>
        </div>

        <form onSubmit={handleSubmit}>
          {errors.length > 0 && (
            <div className="error-message">
              {errors.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading ? 'Logging In...' : 'Log In'}
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/register">Create an account</Link>
        </p>
      </section>
    </main>
  )
}

export default Login
