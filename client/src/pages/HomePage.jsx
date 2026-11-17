import { useState } from 'react';

export default function HomePage({
  projects = [],
  tasks = [],
  onAddTask,
  onToggleTask,
  onDeleteTask,
  onNavigate,
  onOpenTerminal,
}) {
  const [quickTitle, setQuickTitle] = useState('');
  const [quickCategory, setQuickCategory] = useState('Data Analytics');
  const [activeSkillCategory, setActiveSkillCategory] = useState('all');

  const activeTasks = tasks.filter((t) => !t.completed);
  const completedTaskCount = tasks.filter((t) => t.completed).length;
  const completionPercentage = tasks.length > 0 ? Math.round((completedTaskCount / tasks.length) * 100) : 0;
  
  const featured = projects.filter((p) => p.featured || p.completed);
  const featuredProjects = (featured.length > 0 ? featured : projects).slice(0, 3);

  const skillsData = [
    { name: 'PostgreSQL', category: 'database', level: 'Advanced', tag: 'Core RDBMS' },
    { name: 'SQL (CTEs & Window Functions)', category: 'database', level: 'Advanced', tag: 'Complex Queries' },
    { name: 'Database Architecture & Modeling', category: 'database', level: 'Proficient', tag: 'Schema Design' },
    { name: 'Python & Pandas', category: 'analytics', level: 'Proficient', tag: 'EDA & Preprocessing' },
    { name: 'Data Cleaning & ETL Pipelines', category: 'analytics', level: 'Advanced', tag: 'Data Engineering' },
    { name: 'Interactive KPI Dashboards', category: 'analytics', level: 'Proficient', tag: 'Visualization' },
    { name: 'React 18 & Vite', category: 'frontend', level: 'Advanced', tag: 'Modern UI' },
    { name: 'JavaScript (ES6+)', category: 'frontend', level: 'Proficient', tag: 'Frontend/Logic' },
    { name: 'Express.js & REST APIs', category: 'backend', level: 'Proficient', tag: 'Microservices' },
    { name: 'Docker & Compose', category: 'devops', level: 'Intermediate', tag: 'Containerization' },
    { name: 'Git & GitHub Actions', category: 'devops', level: 'Advanced', tag: 'CI/CD Pipelines' },
  ];

  const filteredSkills =
    activeSkillCategory === 'all'
      ? skillsData
      : skillsData.filter((s) => s.category === activeSkillCategory);

  async function handleQuickAdd(e) {
    e.preventDefault();
    if (!quickTitle.trim()) return;
    await onAddTask({ title: quickTitle.trim(), category: quickCategory });
    setQuickTitle('');
  }

  function handleTaskToggle(taskId) {
    if (onToggleTask) onToggleTask(taskId);
  }

  return (
    <div className="page-content home-view">
      {/* HUD Telemetry Bar */}
      <div className="hud-telemetry-banner">
        <div className="hud-metric-item">
          <span className="hud-metric-dot active" />
          <span className="hud-metric-label">STATUS:</span>
          <span className="hud-metric-val">ACTIVE RECON</span>
        </div>
        <div className="hud-metric-item">
          <span className="hud-metric-label">OPERATOR:</span>
          <span className="hud-metric-val">BAGUIO, ERIEL BEN L.</span>
        </div>
        <div className="hud-metric-item hide-on-mobile">
          <span className="hud-metric-label">SPECIALIZATION:</span>
          <span className="hud-metric-val">DATA &amp; WEB</span>
        </div>
        <div className="hud-metric-item hide-on-mobile">
          <span className="hud-metric-label">COMPLETION:</span>
          <span className="hud-metric-val emerald">{completionPercentage}%</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero-bento-card">
        <div className="hero-grid">
          <div className="hero-main-content">
            <div className="hero-badge-pill">
              <span className="badge-pulsing-dot" />
              <span>Data Analytics &amp; Full-Stack Software Engineering</span>
            </div>

            <h1 className="hero-title">
              Baguio, <span className="highlight-text">Eriel Ben</span>
            </h1>

            <p className="hero-tagline">
              Builds accurate data systems, reliable databases, and interactive web dashboards while tracking my own learning progress.
            </p>

            <div className="hero-action-buttons">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  if (onNavigate) onNavigate('projects');
                }}
              >
                <span>Explore Projects</span>
                <span className="btn-icon">→</span>
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  if (onNavigate) onNavigate('progress');
                }}
              >
                <span>Track Milestones</span>
                <span className="btn-icon">📈</span>
              </button>

              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  if (onOpenTerminal) onOpenTerminal();
                }}
              >
                <span>CLI Terminal</span>
                <span className="btn-icon">&gt;_</span>
              </button>
            </div>
          </div>

          <div className="hero-visual-card">
            <div className="cyber-avatar-frame">
              <div className="avatar-monogram">EB</div>
              <div className="avatar-hud-overlay">
                <span className="hud-corner top-left" />
                <span className="hud-corner top-right" />
                <span className="hud-corner bottom-left" />
                <span className="hud-corner bottom-right" />
              </div>
            </div>
            <div className="hero-quick-meta">
              <div className="meta-row">
                <span className="meta-key">DOMAIN:</span>
                <span className="meta-val">Data Analytics</span>
              </div>
              <div className="meta-row">
                <span className="meta-key">STACK:</span>
                <span className="meta-val">React, Node, PostgreSQL, Python</span>
              </div>
              <div className="meta-row">
                <span className="meta-key">STATUS:</span>
                <span className="meta-val emerald">Available for Opportunities</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Snapshot Stats Bento Grid */}
      <section className="stats-bento-grid" aria-label="Key Portfolio Metrics">
        <div className="bento-stat-card">
          <div className="stat-card-header">
            <span className="stat-icon-wrapper">📁</span>
            <span className="stat-indicator">CATALOG</span>
          </div>
          <div className="stat-value">{projects.length}</div>
          <div className="stat-label">Projects Documented</div>
          <p className="stat-subtext">Exploratory analysis, ETL, and full-stack builds</p>
        </div>

        <div className="bento-stat-card">
          <div className="stat-card-header">
            <span className="stat-icon-wrapper">⚡</span>
            <span className="stat-indicator pulse">IN_PROGRESS</span>
          </div>
          <div className="stat-value text-amber">{activeTasks.length}</div>
          <div className="stat-label">Active Milestones</div>
          <p className="stat-subtext">Currently tracking continuous skill progression</p>
        </div>

        <div className="bento-stat-card">
          <div className="stat-card-header">
            <span className="stat-icon-wrapper">🎯</span>
            <span className="stat-indicator">SUCCESS</span>
          </div>
          <div className="stat-value text-emerald">{completedTaskCount}</div>
          <div className="stat-label">Completed Milestones</div>
          <p className="stat-subtext">Validated competencies &amp; completed modules</p>
        </div>

        <div className="bento-stat-card">
          <div className="stat-card-header">
            <span className="stat-icon-wrapper">📊</span>
            <span className="stat-indicator">VELOCITY</span>
          </div>
          <div className="stat-value text-cyan">{completionPercentage}%</div>
          <div className="stat-label">Progress Velocity</div>
          <div className="mini-progress-track">
            <div className="mini-progress-fill" style={{ width: `${completionPercentage}%` }} />
          </div>
        </div>
      </section>

      {/* Technical Competency Matrix */}
      <section className="section-block bento-skills-section">
        <div className="section-header-row">
          <div>
            <div className="section-eyebrow">// COMPETENCY MATRIX</div>
            <h2 className="section-title">Technical Skills &amp; Stack</h2>
          </div>
          {/* Category Filter Pills */}
          <div className="skill-filter-tabs">
            {[
              { id: 'all', label: 'All Stack' },
              { id: 'database', label: 'Databases' },
              { id: 'analytics', label: 'Analytics' },
              { id: 'frontend', label: 'Frontend' },
              { id: 'backend', label: 'Backend' },
              { id: 'devops', label: 'DevOps' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`skill-tab-pill ${activeSkillCategory === tab.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveSkillCategory(tab.id);
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="skills-bento-grid">
          {filteredSkills.map((skill) => (
            <div key={skill.name} className="skill-card">
              <div className="skill-card-top">
                <span className="skill-category-badge">{skill.category.toUpperCase()}</span>
                <span className="skill-level-tag">{skill.level}</span>
              </div>
              <h3 className="skill-name">{skill.name}</h3>
              <p className="skill-detail">{skill.tag}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Projects Grid */}
      <section className="section-block">
        <div className="section-header-row">
          <div>
            <div className="section-eyebrow">// SHOWCASE</div>
            <h2 className="section-title">Featured Projects</h2>
          </div>
          <button
            type="button"
            className="link-arrow-btn"
            onClick={() => {
              if (onNavigate) onNavigate('projects');
            }}
          >
            <span>View All ({projects.length})</span>
            <span className="arrow-glyph">→</span>
          </button>
        </div>

        <div className="projects-bento-grid">
          {featuredProjects.map((project) => {
            const repo = project.repository || project.repoUrl;
            const live = project.liveDemo || project.liveUrl;
            const isFeatured = project.featured;
            const isCompleted = project.completed;

            return (
              <article
                key={project.id}
                className={`project-bento-card ${isFeatured ? 'featured' : ''}`}
              >
                <div className="project-top-row">
                  <span className="project-id-chip">#PRJ-0{project.id}</span>
                  <div className="project-badge-group">
                    {isFeatured && <span className="badge-featured">Featured</span>}
                    <span className={`badge-status ${isCompleted ? 'status-done' : 'status-wip'}`}>
                      {isCompleted ? 'Completed' : 'In Progress'}
                    </span>
                  </div>
                </div>

                <h3 className="project-title">{project.name || project.title}</h3>
                <p className="project-description">{project.description}</p>

                <div className="project-tools-wrap">
                  {project.tools?.map((tool) => (
                    <span key={tool} className="tool-chip">
                      {tool}
                    </span>
                  ))}
                </div>

                <div className="project-card-footer">
                  <div className="project-actions">
                    {repo && repo !== 'N/A' && (
                      <a
                        href={repo}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-action-link"
                      >
                        <span>Code</span>
                        <span className="icon">↗</span>
                      </a>
                    )}
                    {live && live !== 'N/A' && (
                      <a
                        href={live}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-action-link secondary"
                      >
                        <span>Demo</span>
                        <span className="icon">⚡</span>
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Active Tasks & Quick Add */}
      <section className="section-block">
        <div className="section-header-row">
          <div>
            <div className="section-eyebrow">// REAL-TIME MILESTONES</div>
            <h2 className="section-title">Active Progress Tracker</h2>
          </div>
          <button
            type="button"
            className="link-arrow-btn"
            onClick={() => {
              if (onNavigate) onNavigate('progress');
            }}
          >
            <span>Manage All Milestones ({tasks.length})</span>
            <span className="arrow-glyph">→</span>
          </button>
        </div>

        {/* Quick Add Form */}
        <form onSubmit={handleQuickAdd} className="quick-add-bento-card">
          <div className="quick-add-header">
            <span className="quick-add-glyph">+</span>
            <strong>Quick-Log Learning Milestone</strong>
          </div>
          <div className="quick-add-inputs">
            <input
              type="text"
              className="quick-input"
              placeholder="e.g. Master PostgreSQL Partitioning &amp; Query Plans..."
              value={quickTitle}
              onChange={(e) => setQuickTitle(e.target.value)}
            />
            <select
              className="quick-select"
              value={quickCategory}
              onChange={(e) => setQuickCategory(e.target.value)}
            >
              <option value="SQL & Databases">SQL &amp; Databases</option>
              <option value="Python & Pandas">Python &amp; Pandas</option>
              <option value="Data Analytics">Data Analytics</option>
              <option value="Data Visualization">Data Visualization</option>
              <option value="Web Development">Web Development</option>
            </select>
            <button type="submit" className="btn btn-primary quick-submit-btn">
              <span>Add</span>
              <span>+</span>
            </button>
          </div>
        </form>

        {/* Milestone Items Preview */}
        <div className="milestones-preview-list">
          {tasks.slice(0, 4).map((task) => (
            <div key={task.id} className={`milestone-bento-item ${task.completed ? 'completed' : ''}`}>
              <label className="milestone-checkbox-wrap">
                <input
                  type="checkbox"
                  checked={Boolean(task.completed)}
                  onChange={() => handleTaskToggle(task.id)}
                />
                <span className="custom-check-box" />
                <span className={`milestone-title-text ${task.completed ? 'strikethrough' : ''}`}>
                  {task.title}
                </span>
              </label>

              <div className="milestone-meta-pill">
                <span className="category-tag">{task.category || 'General'}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
