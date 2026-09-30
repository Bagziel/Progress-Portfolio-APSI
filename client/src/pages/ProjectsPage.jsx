export default function ProjectsPage({ projects = [] }) {
  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Projects & Case Studies</h1>
        <p className="lede">
          Work demonstrating exploratory data analysis, database design, ETL pipelines, and interactive reporting.
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="card empty-state">
          <p>No projects documented yet.</p>
        </div>
      ) : (
        <div className="projects-grid">
          {projects.map((project) => {
            const repo = project.repository || project.repoUrl;
            const live = project.liveDemo || project.liveUrl;
            const tools = Array.isArray(project.tools) ? project.tools : [];

            return (
              <article key={project.id} className="card project-card">
                <div className="project-header">
                  <h2>{project.name || project.title}</h2>
                  {(project.featured || project.completed) && (
                    <span className="featured-badge">Featured</span>
                  )}
                </div>
                <p className="project-desc">{project.description}</p>

                {tools.length > 0 && (
                  <div className="tag-list">
                    {tools.map((tool) => (
                      <span key={tool} className="tag-badge">
                        {tool}
                      </span>
                    ))}
                  </div>
                )}

                <footer>
                  <div className="action-links">
                    {repo && repo !== "N/A" && (
                      <a
                        href={repo}
                        target="_blank"
                        rel="noreferrer"
                        className="button-link"
                      >
                        Repository ↗
                      </a>
                    )}
                    {live && live !== "N/A" && (
                      <a
                        href={live}
                        target="_blank"
                        rel="noreferrer"
                        className="button-link secondary"
                      >
                        Live / Demo ↗
                      </a>
                    )}
                  </div>
                </footer>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}