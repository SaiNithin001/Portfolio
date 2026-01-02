import { useState, useEffect } from 'react'
import Navigation from './Navigation'
import ThemeToggle from './ThemeToggle'

function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo">
          <a href="#about">Portfolio</a>
        </div>
        <div className="header-right">
          <Navigation />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

export default Header

