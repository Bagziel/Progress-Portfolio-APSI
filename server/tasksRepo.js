// The data-access layer for learning tasks / milestones.
// Parameterized queries protect against injection vulnerabilities.

export async function getAll(pool) {
  const result = await pool.query(
    'SELECT * FROM tasks ORDER BY created_at DESC'
  )
  return result.rows
}

export async function getById(pool, id) {
  const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id])
  return result.rows[0] ?? null
}

export async function create(pool, { title, description = '', category = 'General' }) {
  const result = await pool.query(
    `INSERT INTO tasks (title, description, category)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [title, description, category]
  )
  return result.rows[0]
}

export async function update(pool, id, updates) {
  const current = await getById(pool, id)
  if (!current) return null

  const title = updates.title !== undefined ? updates.title : current.title
  const description = updates.description !== undefined ? updates.description : current.description
  const category = updates.category !== undefined ? updates.category : current.category
  const completed = updates.completed !== undefined ? Boolean(updates.completed) : current.completed

  const result = await pool.query(
    `UPDATE tasks
     SET title = $1, description = $2, category = $3, completed = $4
     WHERE id = $5
     RETURNING *`,
    [title, description, category, completed, id]
  )
  return result.rows[0] ?? null
}

export async function remove(pool, id) {
  const result = await pool.query(
    'DELETE FROM tasks WHERE id = $1 RETURNING id',
    [id]
  )
  return result.rowCount > 0
}
