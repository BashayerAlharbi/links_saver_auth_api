
import './Login.css'

function Login() {
  const handleSubmit = (event) => {
    event.preventDefault()
    // API connection will be added later.
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

          <button type="submit" className="auth-button">
            Log In
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account? <a href="/register">Create an account</a>
        </p>
      </section>
    </main>
  )
}

export default Login
