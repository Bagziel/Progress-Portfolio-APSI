import { useState } from "react";

export default function HomePage({
    projects = [],
    tasks = [],
    onAddTask,
    onToggleTask,
    onDeleteTask,
    onNavigate
}) {
    const [quickTitle, setQuickTitle] = useState('');

    const activateTask = tasks.filter((t) => !t.completed)
    const completedTaskCount = tasks.filter((t) => t.completed).length
    const featuredProjects = projects.filter((p) => p.featured).slice(0, 2)

    async function handleQuickAdd(e) {
        e.preventDefault();
        if (quickTitle.trim() === '') return;
        await onAddTask(quickTitle);
        setQuickTitle('');
    }

    return (
        <div className="page-content">
            {/* Hero Section */}
            <section className="hero-section">
                <h1>Baguio, Eriel Ben L.</h1>
                <p className="hero-subtitle">Computer Science Student.</p>
                <p className="hero-description">Tracking real-time learning progress, and managing tasks efficiently.</p>
                <div className="hero-actions">
                    <button type="button" onClick={() => onNavigate('projects')}>View Projects </button>
                    <button type="button" className="secondary-button" onClick={() => onNavigate('progress')}>Track Progress</button>
                </div>
            </section>

            { /* Snapshot Stats*/ }
            <div className="stats-row">
                <div className="stat-card">
                    <span className="stat-value">{projects.length}</span>
                    <p className="stat-label">Developed Projects</p>
                </div>
                <div className="stat-card">
                    <span className="stat-value">{tasks.length}</span>
                    <p className="stat-label">Active Tasks</p>
                </div>
                <div className="stat-card">
                    <span className="stat-value">{completedTaskCount}</span>
                    <p className="stat-label">Completed Milestones</p>
                </div>
            </div>

            { /* Featured Projects Preview */ }
            <section className="section-block">
                <div className="row-head">
                    <h2>Featured Projects</h2>
                    <button type="button" className="text-button" onClick={() => onNavigate('projects')}>View All ({projects.length})</button>
                </div>
                <div className="projects-grid">
                    {featuredProjects.map((project) => (
                        <article key={project.id} className="card project-card">
                            <h3>{project.title}</h3>
                            <p className="muted">{project.description}</p>
                            <div className="project-tags">
                                {project.tools?.map((tool) => (
                                    <span key={tool} className="tag">
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            { /* Active Tasks Preview */ }
            <section className="section-block">
                <div className="row-head">
                    <h2>Current Active Tasks</h2>
                    <button type="button" className="text-button" onClick={() => onNavigate('progress')}>Manage Tasks</button>
                </div>

                { /* Quick Task Add Form */}
                <form onSubmit={handleQuickAdd} className="quick-add-form">
                    <label htmlFor="quick-task">Quick Add Task:</label>
                    <div>
                    <input type="text" placeholder="Quick add task..." value={quickTitle} onChange={(e) => setQuickTitle(e.target.value)}
                    />
                    <button type="submit">Add Task</button>
                    </div>
                </form>


                <ul className="tasks-list">
                    {tasks.slice(0, 3).map((task) => (
                        <li key={task.id} className="task-item">
                            <label className="task-checkbox">
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => onToggleTaskCompletion(task.id)}
                            />
                            <span className={task.completed ? 'completed-text' : ''}>
                                {task.title}</span>
                            </label>
                            <span className="category-pill">{task.category || 'General'}</span>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    )
}