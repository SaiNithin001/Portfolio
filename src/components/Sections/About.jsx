import SectionWrapper from '../SectionWrapper'

function About({ data }) {
  if (!data) return null

  const { name, title, bio, profileImage, location, email, socialLinks } = data

  return (
    <SectionWrapper 
      id="about" 
      title="About Me"
      className="about-section"
    >
      <div className="about-content">
        {profileImage && (
          <div className="profile-image-container">
            <img src={profileImage} alt={name} className="profile-image" />
          </div>
        )}
        <div className="about-text">
          <h1 className="hero-title">
            Hi, I'm <span className="text-gradient">{name}</span>
          </h1>
          <h2 className="hero-subtitle">{title}</h2>
          <p className="bio">{bio}</p>
          {location && (
            <p className="location">
              <span className="location-icon">📍</span> {location}
            </p>
          )}
          <div className="social-links">
            {socialLinks.github && (
              <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="social-link">
                GitHub
              </a>
            )}
            {socialLinks.linkedin && (
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                LinkedIn
              </a>
            )}
            {socialLinks.twitter && (
              <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="social-link">
                Twitter
              </a>
            )}
            {email && (
              <a href={`mailto:${email}`} className="social-link">
                Email
              </a>
            )}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

export default About

