import SectionWrapper from '../SectionWrapper'

function Experience({ data }) {
  if (!data || !data.experiences) return null

  const { experiences } = data

  return (
    <SectionWrapper 
      id="experience" 
      title="Experience"
      subtitle="My professional journey"
      className="experience-section"
    >
      <div className="experience-timeline">
        {experiences.map((exp, index) => (
          <div key={index} className="experience-item">
            <div className="experience-header">
              <div>
                <h3 className="experience-title">{exp.title}</h3>
                <p className="experience-company">{exp.company}</p>
                <p className="experience-location">{exp.location}</p>
              </div>
              <div className="experience-date">
                {exp.startDate} - {exp.endDate}
              </div>
            </div>
            <p className="experience-description">{exp.description}</p>
            {exp.technologies && exp.technologies.length > 0 && (
              <div className="experience-technologies">
                {exp.technologies.map((tech, techIndex) => (
                  <span key={techIndex} className="tech-tag">{tech}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}

export default Experience

