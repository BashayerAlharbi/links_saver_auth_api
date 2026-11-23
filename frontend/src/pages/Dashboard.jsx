
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiRequest } from '../services/api'
import './Dashboard.css'

function Dashboard() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const [user, setUser] = useState(null)
  const [links, setLinks] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showForm, setShowForm] = useState(false)
  const [editingLink, setEditingLink] = useState(null)
  const [deletingLink, setDeletingLink] = useState(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    url: '',
    category: '',
  })

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [userResult, linksResult] = await Promise.all([
          apiRequest('/user', 'GET', null, token),
          apiRequest('/links', 'GET', null, token),
        ])

        setUser(userResult.user)
        setLinks(linksResult.data || [])
      } catch (error) {
        if (error.status === 401) {
          localStorage.removeItem('token')
          navigate('/login')
        } else {
          setErrorMessage(
            error.message || 'Unable to load your dashboard.'
          )
        }
      } finally {
        setLoading(false)
      }
    }

    fetchDashboard()
  }, [navigate, token])

  const categories = [
    'All',
    ...new Set(links.map((link) => link.category)),
  ]

  const filteredLinks =
    selectedCategory === 'All'
      ? links
      : links.filter((link) => link.category === selectedCategory)

  const openAddForm = () => {
    setEditingLink(null)
    setFormData({ title: '', url: '', category: '' })
    setErrorMessage('')
    setShowForm(true)
  }

  const openEditForm = (link) => {
    setEditingLink(link)
    setFormData({
      title: link.title,
      url: link.url,
      category: link.category,
    })
    setErrorMessage('')
    setShowForm(true)
  }

  const closeForm = () => {
    setShowForm(false)
    setEditingLink(null)
    setFormData({ title: '', url: '', category: '' })
    setErrorMessage('')
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSaving(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      if (editingLink) {
        const result = await apiRequest(
          `/links/${editingLink.id}`,
          'PUT',
          formData,
          token
        )

        setLinks((previous) =>
          previous.map((link) =>
            link.id === editingLink.id ? result.data : link
          )
        )

        setSuccessMessage('Link updated successfully.')
      } else {
        const result = await apiRequest(
          '/links',
          'POST',
          formData,
          token
        )

        setLinks((previous) => [result.data, ...previous])
        setSuccessMessage('Link added successfully.')
        setSelectedCategory('All')
      }

      closeForm()
    } catch (error) {
      if (error.status === 401) {
        localStorage.removeItem('token')
        navigate('/login')
      } else if (error.errors) {
        const validationErrors = Object.values(error.errors).flat()
        setErrorMessage(validationErrors.join(' '))
      } else {
        setErrorMessage(error.message || 'Something went wrong.')
      }
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = (link) => {
    setDeletingLink(link)
    setErrorMessage('')
    setSuccessMessage('')
  }

  const confirmDelete = async () => {
    if (!deletingLink || deleting) return

    setDeleting(true)
    setErrorMessage('')

    try {
      await apiRequest(
        `/links/${deletingLink.id}`,
        'DELETE',
        null,
        token
      )

      setLinks((previous) =>
        previous.filter((item) => item.id !== deletingLink.id)
      )

      setSuccessMessage('Link deleted successfully.')
      setDeletingLink(null)
    } catch (error) {
      if (error.status === 401) {
        localStorage.removeItem('token')
        navigate('/login')
      } else {
        setErrorMessage(
          error.message || 'Unable to delete this link.'
        )
      }

      setDeletingLink(null)
    } finally {
      setDeleting(false)
    }
  }

  const handleLogout = async () => {
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
    return (
      <main className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading your links...</p>
      </main>
    )
  }

  return (
    <main className="dashboard-container">
      <header className="dashboard-header">
        <div className="dashboard-brand">
          <span className="brand-icon">L</span>
          <h1>Links Saver</h1>
        </div>

        <div className="dashboard-user">
          <span>{user?.name}</span>
          <button className="logout-button" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </header>

      <section className="dashboard-content">
        <div className="dashboard-welcome">
          <div>
            <h2>My Saved Links</h2>
            <p>Keep all your favorite links organized in one place.</p>
          </div>

          <button className="add-link-button" onClick={openAddForm}>
            + Add New Link
          </button>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <span className="stat-label">Total Saved Links</span>
            <strong>{links.length}</strong>
          </div>

          <div className="stat-card">
            <span className="stat-label">Categories</span>
            <strong>{categories.length - 1}</strong>
          </div>
        </div>

        {errorMessage && (
          <div className="dashboard-alert error-message">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="dashboard-alert success-message">
            {successMessage}
          </div>
        )}

        <section className="links-section">
          <div className="links-section-header">
            <div>
              <h3>Your Links</h3>
              <p>Browse and manage your saved links.</p>
            </div>

            <select
              className="category-filter"
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              aria-label="Filter links by category"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === 'All' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>

          {filteredLinks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🔖</div>

              <h3>
                {links.length === 0
                  ? 'No saved links yet'
                  : 'No links in this category'}
              </h3>

              <p>
                {links.length === 0
                  ? 'Start organizing your favorite links by adding your first one.'
                  : 'Try selecting another category to see your links.'}
              </p>

              {links.length === 0 && (
                <button className="add-link-button" onClick={openAddForm}>
                  Add Your First Link
                </button>
              )}
            </div>
          ) : (
            <div className="links-grid">
              {filteredLinks.map((link) => (
                <article className="link-card" key={link.id}>
                  <div className="link-card-top">
                    <span className="link-category">
                      {link.category}
                    </span>
                    <span className="link-card-icon">🔗</span>
                  </div>

                  <h3>{link.title}</h3>

                  <a
                    className="saved-link-url"
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.url}
                  </a>

                  <div className="link-card-actions">
                    <button
                      className="edit-link-button"
                      onClick={() => openEditForm(link)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-link-button"
                      onClick={() => handleDelete(link)}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </section>

      {showForm && (
        <div className="modal-overlay">
          <section className="link-modal">
            <div className="modal-header">
              <h2>{editingLink ? 'Edit Link' : 'Add New Link'}</h2>

              <button
                className="modal-close"
                onClick={closeForm}
                aria-label="Close form"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Link Title</label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="e.g. Google"
                  value={formData.title}
                  onChange={handleInputChange}
                  maxLength={255}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="url">URL</label>
                <input
                  id="url"
                  name="url"
                  type="url"
                  placeholder="https://example.com"
                  value={formData.url}
                  onChange={handleInputChange}
                  maxLength={2048}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category</label>
                <input
                  id="category"
                  name="category"
                  type="text"
                  placeholder="e.g. Work, Learning, Design"
                  value={formData.category}
                  onChange={handleInputChange}
                  maxLength={100}
                  required
                />
              </div>

              {errorMessage && (
                <div className="error-message">{errorMessage}</div>
              )}

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={closeForm}
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="add-link-button"
                  disabled={saving}
                >
                  {saving
                    ? 'Saving...'
                    : editingLink
                      ? 'Save Changes'
                      : 'Add Link'}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}

      {deletingLink && (
        <div className="modal-overlay">
          <section
            className="link-modal delete-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-modal-title"
          >
            <div className="modal-header">
              <h2 id="delete-modal-title">Delete Link</h2>
            </div>

            <p>
              Are you sure you want to delete
              <strong> "{deletingLink.title}"</strong>?
            </p>

            <p>This action cannot be undone.</p>

            <div className="modal-actions">
              <button
                type="button"
                className="cancel-button"
                onClick={() => setDeletingLink(null)}
                disabled={deleting}
              >
                Cancel
              </button>

              <button
                type="button"
                className="delete-link-button"
                onClick={confirmDelete}
                disabled={deleting}
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  )
}

export default Dashboard
