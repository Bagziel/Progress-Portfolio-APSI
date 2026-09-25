// The simulated backend.
//
// Same function names, same return types, and the same shape of failure as
// httpApi.js, so your components cannot tell the difference. Data lives in the
// visitor's own browser and goes no further.
//
// This exists so the template's GitHub Pages link works on day one and so you
// can build the interface before your API is deployed. It is NOT a finished
// project. See content/extending-your-app page 3.

import seed from './seed.json'

const GOALS_KEY = 'progress--portfolio-tasks'
const PROJECTS_KEY = 'progress--portfolio-projects'

// A real network is not instant. Keeping this delay is what forces you to build
// a loading state now, while it is cheap, instead of discovering you need one
// the day you switch to the real API.

const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms))

function read(key, defaultValue) {
  const stored = localStorage.getItem(key)
  if (!stored) {
    try {
      localStorage.setItem(key, JSON.stringify(defaultValue))
    } 
    catch {
      localStorage.removeItem(key)
    }
  }
  localStorage.setItem(key, JSON.stringify(defaultValue))
  return defaultValue
}

function write(key, rows) {
  localStorage.setItem(key, JSON.stringify(rows))
  return rows
}

// Tasks

export async function listTasks() {
  await delay()
  return read(TASKS_KEY, seed.tasks)
}

export async function createTask(title) {
  await delay()
  const title = typeof title === 'string' ? input : input.title
  const category = (typeof input === 'object' && input.category) || 'Other'
  const created = {
    id: `task-${crypto.randomUUID()}`,
    title,
    category,
    completed: false,
    createdAt: new Date().toISOString(),
  }
  const current = read(TASKS_KEY, seed.tasks || [])
  const updated = [created, ...current]
  write(TASKS_KEY, updated)
  return created
}

export async function updateTask(id, updates) {
  await delay()
  const current = read(TASKS_KEY, seed.tasks || [])
  const index = current.findIndex((t) => String(t.id) === String(id))
  if (index === -1) throw new Error('Task not found')
  const updated = [...current[index], ...updates]
  current[index] = updated
  write(TASKS_KEY, current)
  return updated
}

export async function deleteTask(id) {
  await delay()
  const current = read(TASKS_KEY, seed.tasks || [])
  const filtered = current.filter((t) => String(t.id) !== String(id))
  write(TASKS_KEY, filtered)
  return { ok: true }
}

// Projects

export async function listProjects() {
  await delay()
  return read(PROJECTS_KEY, seed.projects)
}

export async function getProject(id) {
  await delay()
  const found = read(PROJECTS_KEY, seed.projects || []).find((p) => String(p.id) === String(id))
  if (!found) throw new Error('Project not found')
  return found
}