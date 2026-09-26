import { useState } from 'react'

export default function ProgressPage({ tasks = [], onAddTask, onToggleTask, onDeleteTask}) {
    const [newTitle, setNewTitle] = useState('')
    const [newCategory, setNewCategory] = useState('SQL & Databases')
    const [filter, setFilter] = useState('all')

    const total = tasks.length
    const completed = goals.filter((g) => g.completed).length
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100)

    const filteredGoals = goals.filter((g) => {
        if (filter === 'active') return !t.completed
        if (filter === 'completed') return t.completed
        return true
    })

    async function handleSubmit(e) {
        e.preventDefault()
        if (!newTitle.trim()) return
        await onAddTask({ title: newTitle.trim(), category: newCategory })
        setNewTitle('')
    }

    return (
        <div className="page-content">
            <div className="page-header">
                <h1>Task Progress & Skill Milestones</h1>
                <p className = "page-description">
                    WIP
                </p>
            </div>

            {/* Progress Metric Bar */}
            <div className=" progress-tracker-card">
                <div className="progress-meta">
                    <strong>Overall Milestone Completion</strong>
                    <span>{completed} of {total} completed ({percentage}%)</span>
                </div>
                <div className="progress-bar-bg" role="progressbar" aria-valuenow={percentage} aria-valuein="0" aria-valuemax="100">
                    <div className="progress-bar-fill" style={{ width: `${percentage}`}} />
                </div>
            </div>

            { /* Add New Task */}
            <form onSubmit={handleSubmit} className="add-goal-form">
                <h2>Add Task Milestone</h2>
                <div className="form-fields">
                    <div className="field-group">
                        <label htmlFor='task-title'>Milestone Title</label>
                        <input id="task-title" type="text" placeholder="N/A"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        required
                        />
                    </div>
                    <div className="field-group">
                        <label htmlFor='task-category'>Category</label>
                        <select id="task-category" value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
                            <option value="SQL & Databases">SQL & Databases</option>
                            <option value="Python & Pandas">SQL & Databases</option>
                            <option value="SQL & Databases">SQL & Databases</option>
                            <option value="SQL & Databases">SQL & Databases</option>
                            <option value="SQL & Databases">SQL & Databases</option>
                        </select>
                    </div>
                </div>
                <button type="submit">Add Milestone</button>
            </form>

            <div className="filter-bar">
                <button type="button" className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}> All ({total})</button>
                <button type="button" className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('active')}> Active ({active})</button>
                <button type="button" className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('completed')}> Completed ({completed})</button>
            </div>

            { /* Task List */ }
            <ul className="list">
                {filteredTasks.length === 0 ? (
                    <li className="empty-state">No milestones found in this filter.</li>
                ) : (
                    filteredTasks.map((task) => (
                        <li key={task.id} className="task-item">
                            <div className="task-main">
                                <input type="checkbox" id={`task-${goal.id}`} onChange={() => onToggleTask(task.id)}/>
                                <label htmlFor={`task-${task.id}`} className={task.completed ? 'completed-text' : ''}>{task.title}</label>
                            </div>
                            <div className='task-actions'>
                                <span className='category-pill'>{task.category || 'General'}</span>
                                <button type="button" className="delete-button" onClick={() => onDeleteTask(task.id)} aria-label={`Delete ${task.title}`}>Delete</button>
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>
    )
}