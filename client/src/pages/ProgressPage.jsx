import { useState } from 'react';

export default function ProgressPage({
  tasks = [],
  onAddTask,
  onToggleTask,
  onDeleteTask,
}) {
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('SQL & Databases');
  const [filter, setFilter] = useState('all');

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const activeCount = total - completed;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  async function handleSubmit(e) {
    e.preventDefault();
    if (!newTitle.trim()) return;
    await onAddTask({ title: newTitle.trim(), category: newCategory });
    setNewTitle('');
  }

  function handleToggle(taskId) {
    if (onToggleTask) onToggleTask(taskId);
  }

  function handleDelete(taskId) {
    if (onDeleteTask) onDeleteTask(taskId);
  }

  return (
    <div className="page-content progress-view">
      <div className="page-header-block">
        <div className="header-eyebrow">// COMPETENCY LOG [SECTOR 03]</div>
        <h1 className="page-main-title">Learning Velocity &amp; Milestones</h1>
        <p className="page-lead-desc">
          Continuous tracking of technical milestones toward becoming a Data Analyst and Full-Stack Software Engineer.
        </p>
      </div>

      {/* Progress Telemetry Dashboard Card */}
      <div className="progress-dashboard-bento">
        <div className="progress-top-info">
          <div>
            <div className="dashboard-metric-label">MILESTONE COMPLETION RATIO</div>
            <div className="dashboard-metric-val">
              <span className="big-percent">{percentage}%</span>
              <span className="ratio-sub">({completed} of {total} completed)</span>
            </div>
          </div>
          <div className="progress-status-pills">
            <span className="pill active-pill">{activeCount} In Flight</span>
            <span className="pill done-pill">{completed} Verified</span>
          </div>
        </div>

        {/* Progress Bar with glow */}
        <div
          className="telemetry-bar-container"
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <div className="telemetry-bar-fill" style={{ width: `${percentage}%` }}>
            <span className="bar-sparkle" />
          </div>
        </div>
      </div>

      {/* Add New Milestone Card */}
      <form onSubmit={handleSubmit} className="add-milestone-bento-card">
        <div className="form-legend">
          <span className="form-legend-icon">+</span>
          <h2>Register Learning Milestone</h2>
        </div>

        <div className="milestone-form-grid">
          <div className="field-group">
            <label htmlFor="task-title" className="field-label">
              Milestone Objective / Description
            </label>
            <input
              id="task-title"
              type="text"
              className="form-input"
              placeholder="e.g. Implement PostgreSQL indexing &amp; EXPLAIN ANALYZE queries"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              required
            />
          </div>

          <div className="field-group">
            <label htmlFor="task-category" className="field-label">
              Discipline / Category
            </label>
            <select
              id="task-category"
              className="form-select"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            >
              <option value="SQL & Databases">SQL &amp; Databases</option>
              <option value="Python & Pandas">Python &amp; Pandas</option>
              <option value="Data Analytics">Data Analytics</option>
              <option value="Data Visualization">Data Visualization</option>
              <option value="Web Development">Web Development</option>
              <option value="DevOps & Cloud">DevOps &amp; Cloud</option>
            </select>
          </div>
        </div>

        <div className="form-submit-row">
          <button type="submit" className="btn btn-primary">
            <span>Commit Milestone</span>
            <span className="btn-icon">✓</span>
          </button>
        </div>
      </form>

      {/* Milestone Filters & Task List */}
      <div className="milestones-board-section">
        <div className="filters-header-row">
          <div className="filter-pill-group">
            <button
              type="button"
              className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
              onClick={() => {
                setFilter('all');
              }}
            >
              All Milestones ({total})
            </button>
            <button
              type="button"
              className={`filter-tab ${filter === 'active' ? 'active' : ''}`}
              onClick={() => {
                setFilter('active');
              }}
            >
              Active ({activeCount})
            </button>
            <button
              type="button"
              className={`filter-tab ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => {
                setFilter('completed');
              }}
            >
              Completed ({completed})
            </button>
          </div>
        </div>

        {filteredTasks.length === 0 ? (
          <div className="empty-state-bento">
            <div className="empty-state-icon">📋</div>
            <h3>No Milestones Found</h3>
            <p>There are no milestones matching the &ldquo;{filter}&rdquo; filter.</p>
          </div>
        ) : (
          <div className="milestones-deck">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`milestone-full-card ${task.completed ? 'completed' : ''}`}
              >
                <div className="milestone-card-main">
                  <label className="milestone-checkbox-wrap">
                    <input
                      type="checkbox"
                      id={`task-${task.id}`}
                      checked={Boolean(task.completed)}
                      onChange={() => handleToggle(task.id)}
                    />
                    <span className="custom-check-box" />
                    <span className={`milestone-title-text ${task.completed ? 'strikethrough' : ''}`}>
                      {task.title}
                    </span>
                  </label>
                </div>

                <div className="milestone-card-actions">
                  <span className="milestone-category-pill">
                    {task.category || 'General'}
                  </span>
                  <button
                    type="button"
                    className="btn-delete-task"
                    onClick={() => handleDelete(task.id)}
                    title={`Delete milestone #${task.id}`}
                    aria-label={`Delete ${task.title}`}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
