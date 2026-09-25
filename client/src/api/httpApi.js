// The real client. Every function here talks to YOUR Express API.
//
// This is the file that matters for your finals project. mockApi.js exists so
// you can build the interface before this has anywhere to point.

const API_BASE = `${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api`
const TASKS_BASE = `${API_BASE}/tasks`
const PROJECTS_BASE = `${API_BASE}/projects`

async function handleResponse(response) {
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
  const response = await fetch(TASKS_BASE)
  return handleResponse(response)
}

export async function createTask(title) {
  const response = await fetch(`${TASKS_BASE}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title })
  })
  return handleResponse(response)
  }

export async function updateTask(id, updates) {
  const response = await fetch(`${TASKS_BASE}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  })
  return handleResponse(response)
}

export async function deleteTask(id) {
  const response = await fetch(`${TASKS_BASE}/${id}`, {
    method: 'DELETE'
  })
  return handleResponse(response)
}

// Projects

export async function listProjects() {
  const response = await fetch(PROJECTS_BASE)
  return handleResponse(response)
}

export async function getProject(id) {
  const response = await fetch(`${PROJECTS_BASE}/${id}`)
  return handleResponse(response)
}