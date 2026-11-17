import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { pool } from './db/pool.js'
import * as tasks from './tasksRepo.js'
import * as projects from './projectsRepo.js'

const app = express()

// Security headers
app.use(helmet())

// CORS configuration
const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)
app.use(express.json({ limit: '100kb' }))

// Health check: Process alive (kept public for host monitoring)
app.get('/healthz', (request, response) => {
  response.json({ ok: true })
})

// Readiness check: Database reachable (kept public for host monitoring)
app.get('/readyz', async (request, response) => {
  try {
    await pool.query('SELECT 1')
    response.json({ ok: true, db: 'up' })
  } catch (error) {
    console.error('readyz failed:', error.message)
    response.status(503).json({ ok: false, db: 'down' })
  }
})

// -----------------------------------------------------------------------------
// Access Control: HTTP Basic Authentication (Option B)
// -----------------------------------------------------------------------------
function basicAuth(request, response, next) {
  // Allow preflight OPTIONS requests to pass for CORS
  if (request.method === 'OPTIONS') {
    return next()
  }

  const expectedUser = process.env.BASIC_AUTH_USER
  const expectedPass = process.env.BASIC_AUTH_PASS

  // If no auth credentials configured in environment, proceed (e.g. dev fallback)
  if (!expectedUser || !expectedPass) {
    return next()
  }

  const authHeader = request.headers.authorization
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    response.setHeader('WWW-Authenticate', 'Basic realm="Progress Portfolio Access"')
    return response.status(401).json({ error: 'Authentication required' })
  }

  try {
    const base64Credentials = authHeader.slice(6).trim()
    const decoded = Buffer.from(base64Credentials, 'base64').toString('utf8')
    const [username, password] = decoded.split(':')

    if (username === expectedUser && password === expectedPass) {
      return next()
    }
  } catch {
    // Malformed credentials
  }

  response.setHeader('WWW-Authenticate', 'Basic realm="Progress Portfolio Access"')
  return response.status(401).json({ error: 'Invalid credentials' })
}

// Register authentication gate across all /api routes
app.use('/api', basicAuth)

// -----------------------------------------------------------------------------
// Tasks API Endpoints
// -----------------------------------------------------------------------------

app.get('/api/tasks', async (request, response, next) => {
  try {
    response.json(await tasks.getAll(pool))
  } catch (error) {
    next(error)
  }
})

app.get('/api/tasks/:id', async (request, response, next) => {
  try {
    const row = await tasks.getById(pool, request.params.id)
    if (!row) return response.status(404).json({ error: 'Task not found' })
    response.json(row)
  } catch (error) {
    next(error)
  }
})

app.post('/api/tasks', async (request, response, next) => {
  const title = typeof request.body?.title === 'string' ? request.body.title.trim() : ''
  if (!title) {
    return response.status(400).json({ error: 'Title is required' })
  }

  try {
    const created = await tasks.create(pool, {
      title,
      description: request.body.description ?? '',
      category: request.body.category ?? 'General',
    })
    response.status(201).json(created)
  } catch (error) {
    next(error)
  }
})

app.patch('/api/tasks/:id', async (request, response, next) => {
  try {
    const row = await tasks.update(pool, request.params.id, request.body ?? {})
    if (!row) return response.status(404).json({ error: 'Task not found' })
    response.json(row)
  } catch (error) {
    next(error)
  }
})

app.delete('/api/tasks/:id', async (request, response, next) => {
  try {
    const success = await tasks.remove(pool, request.params.id)
    if (!success) return response.status(404).json({ error: 'Task not found' })
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

// -----------------------------------------------------------------------------
// Projects API Endpoints
// -----------------------------------------------------------------------------

app.get('/api/projects', async (request, response, next) => {
  try {
    response.json(await projects.getAll(pool))
  } catch (error) {
    next(error)
  }
})

app.get('/api/projects/:id', async (request, response, next) => {
  try {
    const row = await projects.getById(pool, request.params.id)
    if (!row) return response.status(404).json({ error: 'Project not found' })
    response.json(row)
  } catch (error) {
    next(error)
  }
})

// Central error handler
app.use((error, request, response, next) => {
  console.error('Unhandled server error:', error)
  response.status(500).json({ error: 'Internal server error' })
})

const PORT = Number(process.env.PORT) || 3000
app.listen(PORT, () => {
  console.log(`Progress Portfolio API listening on port ${PORT}`)
})

