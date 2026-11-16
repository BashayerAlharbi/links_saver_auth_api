
const API_URL = 'http://127.0.0.1:8000/api'

export async function apiRequest(endpoint, method = 'GET', data = null, token = null) {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    body: data ? JSON.stringify(data) : null,
  })

  const result = await response.json()

  if (!response.ok) {
    throw result
  }

  return result
}
