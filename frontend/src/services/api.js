const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'

export async function apiRequest(endpoint, method = 'GET', data = null, token = null) {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  let response

  try {
    response = await fetch(`${API_URL}${endpoint}`, {
      method,
      headers,
      body: data ? JSON.stringify(data) : null,
    })
  } catch {
    throw {
      message: 'Unable to connect to the server. Please try again.',
    }
  }

  const responseText = await response.text()
  let result = null

  if (responseText) {
    try {
      result = JSON.parse(responseText)
    } catch {
      result = { message: responseText }
    }
  }

  if (!response.ok) {
    if (response.status === 401 && token) {
      localStorage.removeItem('token')
    }

    throw {
      ...(result || {}),
      status: response.status,
      message: result?.message || 'Something went wrong. Please try again.',
    }
  }

  return result
}
