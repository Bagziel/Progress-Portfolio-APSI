import { useState } from "react";

export default function HomePage({
  projects = [],
  tasks = [],
  onAddTask,
  onToggleTask,
  onDeleteTask,
  onNavigate,
}) {
  const [quickTitle, setQuickTitle] = useState("");

  const activeTasks = tasks.filter((t) => !t.completed);
  const completedTaskCount = tasks.filter((t) => t.completed).length;
  const featured = projects.filter((p) => p.featured || p.completed);
  const featuredProjects = (featured.length > 0 ? featured : projects).slice(0, 2);

  async function handleQuickAdd(e) {
    e.preventDefault();
    if (!quickTitle.trim()) return;
    await onAddTask(quickTitle.trim());
    setQuickTitle("");
  }

  return (
    <div className="page-content">
      {/* Hero Section */}
      <section className="hero-section">
        <h1>Baguio, Eriel Ben L.</h1>
        <p className="hero-subtitle">
          Aspiring <strong>Data Analyst</strong> & Computer Science Student.
        </p>
        <p className="hero-description">
          Tracking real-time learning progress, technical competencies, and completed data analytics projects.
        </p>
        <div className="hero-actions">
          <button type="button" onClick={() => onNavigate && onNavigate("projects")}>
            View Projects →
          </button>
          <button
            type="button"
            className="secondary-button"
            onClick={() => onNavigate && onNavigate("progress")}
          >
            Track Progress
          </button>
        </div>
      </section>

      {/* Snapshot Stats */}
      <div className="stats-row">
        <div className="stat-card">
          <span className="stat-value">{projects.length}</span>
          <span className="stat-label">Projects Built</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{activeTasks.length}</span>
          <span className="stat-label">Active Tasks</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{completedTaskCount}</span>
          <span className="stat-label">Completed Milestones</span>
        </div>
      </div>

      {/* Featured Projects Preview */}
      <section className="section-block">
        <div className="row-head">
          <h2>Featured Projects</h2>
          <button
            type="button"
            className="text-button"
            onClick={() => onNavigate && onNavigate("projects")}
          >
            See all ({projects.length}) →
          </button>
        </div>
        <div className="projects-grid">
          {featuredProjects.map((project) => (
            <article key={project.id} className="card project-card">
              <h3>{project.name || project.title}</h3>
              <p className="muted">{project.description}</p>
              <div className="tag-list">
                {project.tools?.map((tool) => (
                  <span key={tool} className="tag-badge">
                    {tool}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Active Tasks Preview */}
      <section className="section-block">
        <div className="row-head">
          <h2>Current Active Tasks</h2>
          <button
            type="button"
            className="text-button"
            onClick={() => onNavigate && onNavigate("progress")}
          >
            Manage tasks →
          </button>
        </div>

        {/* Quick Task Add Form */}
        <form onSubmit={handleQuickAdd} className="card quick-add-form">
          <label htmlFor="quick-task">Quickly add a task milestone:</label>
          <div className="inline-form">
            <input
              id="quick-task"
              type="text"
              placeholder="e.g. Master PostgreSQL partitioning"
              value={quickTitle}
              onChange={(e) => setQuickTitle(e.target.value)}
            />
            <button type="submit">Add</button>
          </div>
        </form>

        <ul className="list">
          {tasks.slice(0, 3).map((task) => (
            <li key={task.id} className="card goal-item">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={Boolean(task.completed)}
                  onChange={() => onToggleTask && onToggleTask(task.id)}
                />
                <span className={task.completed ? "completed-text" : ""}>
                  {task.title}
                </span>
              </label>
              <span className="category-pill">{task.category || "General"}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}