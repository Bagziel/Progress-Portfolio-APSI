import { useState } from "react";

export default function ProgressPage({
  tasks = [],
  onAddTask,
  onToggleTask,
  onDeleteTask,
}) {
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("SQL & Databases");
  const [filter, setFilter] = useState("all");

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const activeCount = total - completed;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  const filteredTasks = tasks.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  async function handleSubmit(e) {
    e.preventDefault();
    if (!newTitle.trim()) return;
    await onAddTask({ title: newTitle.trim(), category: newCategory });
    setNewTitle("");
  }

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Learning Progress & Skill Milestones</h1>
        <p className="lede">
          Proof of ongoing learning toward becoming a Data Analyst.
        </p>
      </div>

      {/* Progress Metric Bar */}
      <div className="card progress-tracker-card">
        <div className="progress-meta">
          <strong>Overall Milestone Completion</strong>
          <span>
            {completed} of {total} completed ({percentage}%)
          </span>
        </div>
        <div
          className="progress-bar-bg"
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <div
            className="progress-bar-fill"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Add New Task Milestone */}
      <form onSubmit={handleSubmit} className="card add-goal-form">
        <h2>Add Task Milestone</h2>
        <div className="form-fields">
          <div className="field-group">
            <label htmlFor="task-title">Milestone Title</label>
            <input
              id="task-title"
              type="text"
              placeholder="e.g. Learn A/B testing evaluation metrics"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              required
            />
          </div>
          <div className="field-group">
            <label htmlFor="task-category">Category</label>
            <select
              id="task-category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            >
              <option value="SQL & Databases">SQL & Databases</option>
              <option value="Python & Pandas">Python & Pandas</option>
              <option value="Data Visualization">Data Visualization</option>
              <option value="Statistics">Statistics</option>
              <option value="Web Development">Web Development</option>
              <option value="Business Intelligence">Business Intelligence</option>
            </select>
          </div>
        </div>
        <button type="submit">Add Milestone</button>
      </form>

      {/* Filter Tabs */}
      <div className="filters-bar">
        <button
          type="button"
          className={`filter-btn ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All ({total})
        </button>
        <button
          type="button"
          className={`filter-btn ${filter === "active" ? "active" : ""}`}
          onClick={() => setFilter("active")}
        >
          Active ({activeCount})
        </button>
        <button
          type="button"
          className={`filter-btn ${filter === "completed" ? "active" : ""}`}
          onClick={() => setFilter("completed")}
        >
          Completed ({completed})
        </button>
      </div>

      {/* Task List */}
      <ul className="list">
        {filteredTasks.length === 0 ? (
          <li className="card empty-state">No milestones found in this filter.</li>
        ) : (
          filteredTasks.map((task) => (
            <li key={task.id} className="card goal-item">
              <div className="goal-main">
                <input
                  type="checkbox"
                  id={`task-${task.id}`}
                  checked={Boolean(task.completed)}
                  onChange={() => onToggleTask && onToggleTask(task.id)}
                />
                <label
                  htmlFor={`task-${task.id}`}
                  className={task.completed ? "completed-text" : ""}
                >
                  {task.title}
                </label>
              </div>
              <div className="goal-actions">
                <span className="category-pill">{task.category || "General"}</span>
                <button
                  type="button"
                  className="delete-button"
                  onClick={() => onDeleteTask && onDeleteTask(task.id)}
                  aria-label={`Delete ${task.title}`}
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}