import { useState, useEffect } from 'react'
import sectionsConfig from '../../config/sections.json'

function Navigation() {
  const [activeSection, setActiveSection] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sections = sectionsConfig.map(s => s.id)
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = (e, id) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const headerHeight = 80
      const elementPosition = element.offsetTop - headerHeight
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="nav">
      <button 
        className="mobile-menu-toggle"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul className={`nav-list ${isMobileMenuOpen ? 'open' : ''}`}>
        {sectionsConfig.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={activeSection === section.id ? 'active' : ''}
              onClick={(e) => handleClick(e, section.id)}
            >
              {section.id.charAt(0).toUpperCase() + section.id.slice(1)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navigation

