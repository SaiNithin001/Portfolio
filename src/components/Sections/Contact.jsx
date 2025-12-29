import SectionWrapper from '../SectionWrapper'

function Contact({ data }) {
  if (!data) return null

  const { email, phone, location, message, socialLinks } = data

  return (
    <SectionWrapper 
      id="contact" 
      title="Get In Touch"
      subtitle={message || "Feel free to reach out if you'd like to collaborate or just want to connect!"}
      className="contact-section"
    >
      <div className="contact-content">
        <div className="contact-info">
          <div className="contact-item">
            <h4>Email</h4>
            {email && (
              <a href={`mailto:${email}`} className="contact-link">{email}</a>
            )}
          </div>
          {phone && (
            <div className="contact-item">
              <h4>Phone</h4>
              <a href={`tel:${phone}`} className="contact-link">{phone}</a>
            </div>
          )}
          {location && (
            <div className="contact-item">
              <h4>Location</h4>
              <p>{location}</p>
            </div>
          )}
        </div>
        <div className="contact-social">
          <h4>Connect with me</h4>
          <div className="social-links">
            {socialLinks.github && (
              <a 
                href={socialLinks.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                GitHub
              </a>
            )}
            {socialLinks.linkedin && (
              <a 
                href={socialLinks.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                LinkedIn
              </a>
            )}
            {socialLinks.twitter && (
              <a 
                href={socialLinks.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Twitter
              </a>
            )}
            {socialLinks.email && (
              <a 
                href={socialLinks.email}
                className="btn btn-primary"
              >
                Email
              </a>
            )}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

export default Contact

