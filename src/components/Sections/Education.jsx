import SectionWrapper from '../SectionWrapper'
import ScrollableContainer from '../ScrollableContainer'

function Education({ data }) {
  if (!data || !data.educations) return null

  const { educations } = data

  return (
    <SectionWrapper 
      id="education" 
      title="Education"
      subtitle="My academic background"
      className="education-section"
    >
      <ScrollableContainer>
      <div className="education-list">
        {educations.map((edu, index) => (
          <div key={index} className="education-card card">
            <h3 className="education-degree">{edu.degree}</h3>
            <p className="education-institution">{edu.institution}</p>
            <p className="education-location">{edu.location}</p>
            <p className="education-date">{edu.startDate} - {edu.endDate}</p>
            {edu.gpa && (
              <p className="education-gpa">GPA: {edu.gpa}</p>
            )}
            {edu.description && (
              <p className="education-description">{edu.description}</p>
            )}
          </div>
        ))}
      </div>
      </ScrollableContainer>
    </SectionWrapper>
  )
}

export default Education

