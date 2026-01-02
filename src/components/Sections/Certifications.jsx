import SectionWrapper from '../SectionWrapper'
import ScrollableContainer from '../ScrollableContainer'

function Certifications({ data }) {
  if (!data || !data.certifications) return null

  const { certifications } = data

  return (
    <SectionWrapper 
      id="certifications" 
      title="Certifications"
      subtitle="Professional certifications and achievements"
      className="certifications-section"
    >
      <ScrollableContainer>
      <div className="certifications-grid">
        {certifications.map((cert, index) => (
          <div key={index} className="certification-card card">
            {cert.image && (
              <div className="cert-image">
                <img src={cert.image} alt={cert.name} />
              </div>
            )}
            <div className="cert-content">
              <h3 className="cert-name">{cert.name}</h3>
              <p className="cert-issuer">{cert.issuer}</p>
              <p className="cert-date">Issued: {cert.date}</p>
              {cert.credentialId && (
                <p className="cert-id">Credential ID: {cert.credentialId}</p>
              )}
              {cert.credentialUrl && (
                <a 
                  href={cert.credentialUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Verify Credential
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
      </ScrollableContainer>
    </SectionWrapper>
  )
}

export default Certifications

