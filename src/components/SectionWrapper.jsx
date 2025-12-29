function SectionWrapper({ id, title, subtitle, children, className = '' }) {
  return (
    <section id={id} className={`section-wrapper ${className}`}>
      {title && <h2 className="section-title">{title}</h2>}
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
      {children}
    </section>
  )
}

export default SectionWrapper

