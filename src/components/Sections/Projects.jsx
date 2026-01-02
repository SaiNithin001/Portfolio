import SectionWrapper from '../SectionWrapper'
import ScrollableContainer from '../ScrollableContainer'

function Projects({ data }) {
  if (!data || !data.projects) return null

  const { projects } = data

  return (
    <SectionWrapper 
      id="projects" 
      title="Projects"
      subtitle="Some of my recent work"
      className="projects-section"
    >
      <ScrollableContainer>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card card">
            {project.image && (
              <div className="project-image">
                <img src={project.image} alt={project.title} />
              </div>
            )}
            <div className="project-content">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-technologies">
                {project.technologies.map((tech, techIndex) => (
                  <span key={techIndex} className="tech-tag">{tech}</span>
                ))}
              </div>
              <div className="project-links">
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    View Code
                  </a>
                )}
                {project.liveUrl && (
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      </ScrollableContainer>
    </SectionWrapper>
  )
}

export default Projects

