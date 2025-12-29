function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; {currentYear} Portfolio. Built with React & Vite.</p>
      </div>
    </footer>
  )
}

export default Footer

