import { useState } from 'react';

export default function ProjectsPage({ projects = [] }) {
  const [selectedToolFilter, setSelectedToolFilter] = useState('All');

  // Extract unique tools
  const allTools = [
    'All',
    ...Array.from(
      new Set(
        projects.flatMap((p) => (Array.isArray(p.tools) ? p.tools : []))
      )
    ),
  ];

  const filteredProjects =
    selectedToolFilter === 'All'
      ? projects
      : projects.filter((p) =>
          Array.isArray(p.tools) && p.tools.includes(selectedToolFilter)
        );

  return (
    <div className="page-content projects-view">
      <div className="page-header-block">
        <div className="header-eyebrow">// REPOSITORY ARCHIVE [SECTOR 02]</div>
        <h1 className="page-main-title">Projects</h1>
        <p className="page-lead-desc">
          Documenting on-device AI/ML systems, mobile applications, responsive web platforms, and full-stack software engineering projects.
        </p>

        {/* Filter Chips Bar */}
        {allTools.length > 1 && (
          <div className="tools-filter-bar" aria-label="Filter by technology">
            {allTools.map((tool) => (
              <button
                key={tool}
                type="button"
                className={`tool-filter-btn ${selectedToolFilter === tool ? 'active' : ''}`}
                onClick={() => {
                  setSelectedToolFilter(tool);
                }}
              >
                {tool}
                {tool === 'All' && ` (${projects.length})`}
              </button>
            ))}
          </div>
        )}
      </div>

      {filteredProjects.length === 0 ? (
        <div className="empty-state-bento">
          <div className="empty-state-icon">📡</div>
          <h3>No Projects Match Selected Filter</h3>
          <p>No project records found under &ldquo;{selectedToolFilter}&rdquo;.</p>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setSelectedToolFilter('All');
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="projects-bento-grid">
          {filteredProjects.map((project) => {
            const repo = project.repository || project.repoUrl;
            const live = project.liveDemo || project.liveUrl;
            const tools = Array.isArray(project.tools) ? project.tools : [];
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

                <h2 className="project-title">{project.name || project.title}</h2>
                {project.subtitle && (
                  <div className="project-subtitle">{project.subtitle}</div>
                )}
                <p className="project-description">{project.description}</p>

                {Array.isArray(project.highlights) && project.highlights.length > 0 && (
                  <ul className="project-highlights">
                    {project.highlights.map((highlight, idx) => (
                      <li key={idx}>{highlight}</li>
                    ))}
                  </ul>
                )}

                {tools.length > 0 && (
                  <div className="project-tools-wrap">
                    {tools.map((tool) => (
                      <span key={tool} className="tool-chip">
                        {tool}
                      </span>
                    ))}
                  </div>
                )}

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
                        <span>Live Demo</span>
                        <span className="icon">⚡</span>
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
