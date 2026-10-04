// The data-access layer for portfolio projects.
// Parameterized queries protect against injection vulnerabilities.

export async function getAll(pool) {
  const result = await pool.query(
    'SELECT * FROM projects ORDER BY created_at DESC'
  )
  return result.rows
}

export async function getById(pool, id) {
  const result = await pool.query('SELECT * FROM projects WHERE id = $1', [id])
  return result.rows[0] ?? null
}

export async function create(pool, { name, description = '', tools = [], repository = '', live_demo = '', featured = false, completed = false }) {
  const result = await pool.query(
    `INSERT INTO projects (name, description, tools, repository, live_demo, featured, completed)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [name, description, tools, repository, live_demo, featured, completed]
  )
  return result.rows[0]
}

export async function update(pool, id, updates) {
  const current = await getById(pool, id)
  if (!current) return null

  const name = updates.name !== undefined ? updates.name : current.name
  const description = updates.description !== undefined ? updates.description : current.description
  const tools = updates.tools !== undefined ? updates.tools : current.tools
  const repository = updates.repository !== undefined ? updates.repository : current.repository
  const live_demo = updates.live_demo !== undefined ? updates.live_demo : current.live_demo
  const featured = updates.featured !== undefined ? Boolean(updates.featured) : current.featured
  const completed = updates.completed !== undefined ? Boolean(updates.completed) : current.completed

  const result = await pool.query(
    `UPDATE projects
     SET name = $1, description = $2, tools = $3, repository = $4, live_demo = $5, featured = $6, completed = $7
     WHERE id = $8
     RETURNING *`,
    [name, description, tools, repository, live_demo, featured, completed, id]
  )
  return result.rows[0] ?? null
}

export async function remove(pool, id) {
  const result = await pool.query(
    'DELETE FROM projects WHERE id = $1 RETURNING id',
    [id]
  )
  return result.rowCount > 0
}

