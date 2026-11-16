
import './Register.css'

function Register() {
  const handleSubmit = (event) => {
    event.preventDefault()
    // API connection will be added in the next stage.
  }

  return (
    <main className="auth-container">
      <section className="auth-card">
        <div className="auth-brand">
          <span className="brand-icon">L</span>
          <h1>Links Saver</h1>
        </div>

        <div className="auth-heading">
          <h2>Create your account</h2>
          <p>Save and organize all your favorite links in one place.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              required
            />
          </div>

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
              placeholder="Create a password"
              required
            />
          </div>

          <button type="submit" className="auth-button">
            Create Account
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <a href="/login">Log in</a>
        </p>
      </section>
    </main>
  )
}

export default Register
