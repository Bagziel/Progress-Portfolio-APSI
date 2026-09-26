export default function ProjectsPage({ projects = [] }) {
    return (
        <div className="page-content">
            <div className="page-header">
                <h1>Projects</h1>
                <p className="page-description">WIP</p>
            </div>

            {projects.length === 0 ? (
                <div className="empty-state">
                <p>No projects to display.</p>
                </div>
            ) : (
                <div className="projects-grid">
                    {projects.map((project) => (
                        <article key={project.id} className="project-card">
                            <div className="project-header">
                                <h2>{project.title}</h2>
                                {project.featured && <span className="featured-badge">Featured</span>}
                            </div>
                            <p className="project-description">{project.description}</p>

                            <div className="tag-list">
                                {project.tools.map((tool) => (
                                    <span key={tool} className="tag">{tool}</span>
                                ))}
                            </div>

                            <footer>
                                <div className="action-links">
                                    {project.repoUrl && (
                                        <a href={project.repoUrl} target="_blank" rel="noreferrer" className="button-link">Repository</a>
                                    )}
                                    {project.liveUrl && (
                                        <a href={project.liveUrl} target="_blank" rel="noreferrer" className="button-link">Live Demo</a>
                                    )}
                                </div>
                            </footer>
                        </article>
                    ))}
                </div>
            )}
        </div>
    )
}