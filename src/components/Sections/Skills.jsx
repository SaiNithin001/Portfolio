import SectionWrapper from '../SectionWrapper'
import ScrollableContainer from '../ScrollableContainer'

function Skills({ data }) {
  if (!data || !data.categories) return null

  const { categories } = data

  return (
    <SectionWrapper 
      id="skills" 
      title="Skills"
      subtitle="Technologies and tools I work with"
      className="skills-section"
    >
      <ScrollableContainer>
      <div className="skills-grid">
        {categories.map((category, index) => (
          <div key={index} className="skill-category">
            <h3 className="category-title">{category.name}</h3>
            <div className="skills-list">
              {category.skills.map((skill, skillIndex) => (
                <div key={skillIndex} className="skill-item">
                  <span className="skill-name">{skill.name}</span>
                  <span className={`skill-level skill-level-${skill.level.toLowerCase()}`}>
                    {skill.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      </ScrollableContainer>
    </SectionWrapper>
  )
}

export default Skills

