// The real client. Every function here talks to YOUR Express API.
//
// This is the file that matters for your finals project. mockApi.js exists so
// you can build the interface before this has anywhere to point.

const API_BASE = `${import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api`
const TASKS_BASE = `${API_BASE}/tasks`
const PROJECTS_BASE = `${API_BASE}/projects`

let cachedAuthToken = null
try {
  cachedAuthToken = sessionStorage.getItem('portfolio_basic_auth')
} catch {}

function getHeaders(extraHeaders = {}) {
  const headers = { ...extraHeaders }
  if (cachedAuthToken) {
    headers['Authorization'] = `Basic ${cachedAuthToken}`
  }
  return headers
}

async function handleResponse(response, retryFn) {
  if (response.status === 401) {
    const creds = window.prompt(
      'Access Door (Option B): This portfolio API is protected.\nEnter credentials (username:password):'
    )
    if (creds && creds.includes(':')) {
      const token = btoa(creds.trim())
      cachedAuthToken = token
      try {
        sessionStorage.setItem('portfolio_basic_auth', token)
      } catch {}
      if (typeof retryFn === 'function') {
        return retryFn()
      }
    }
    throw new Error('Authentication required (Option B: HTTP Basic Auth)')
  }
  if (response.status === 404) throw new Error('Not found')
  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    throw new Error(body.error || `Request failed with status ${response.status}`)
  }
  if (response.status === 204) return undefined
  return response.json()
}

// Tasks

export async function listTasks() {
  const response = await fetch(TASKS_BASE, {
    headers: getHeaders()
  })
  return handleResponse(response, () => listTasks())
}

export async function createTask(input) {
  const payload = typeof input === 'string' ? { title: input } : input
  const response = await fetch(`${TASKS_BASE}`, {
    method: 'POST',
    headers: getHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(payload)
  })
  return handleResponse(response, () => createTask(input))
}

export async function updateTask(id, updates) {
  const response = await fetch(`${TASKS_BASE}/${id}`, {
    method: 'PATCH',
    headers: getHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(updates)
  })
  return handleResponse(response, () => updateTask(id, updates))
}

export async function deleteTask(id) {
  const response = await fetch(`${TASKS_BASE}/${id}`, {
    method: 'DELETE',
    headers: getHeaders()
  })
  return handleResponse(response, () => deleteTask(id))
}

// Projects

export async function listProjects() {
  const response = await fetch(PROJECTS_BASE, {
    headers: getHeaders()
  })
  return handleResponse(response, () => listProjects())
}

export async function getProject(id) {
  const response = await fetch(`${PROJECTS_BASE}/${id}`, {
    headers: getHeaders()
  })
  return handleResponse(response, () => getProject(id))
}
