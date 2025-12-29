import { useEffect, useState } from 'react'
import sectionsConfig from './config/sections.json'
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'

// Import all section components
import About from './components/Sections/About'
import Skills from './components/Sections/Skills'
import Projects from './components/Sections/Projects'
import Certifications from './components/Sections/Certifications'
import Experience from './components/Sections/Experience'
import Education from './components/Sections/Education'
import Contact from './components/Sections/Contact'

// Component mapping
const componentMap = {
  About,
  Skills,
  Projects,
  Certifications,
  Experience,
  Education,
  Contact,
}

function App() {
  const [sections, setSections] = useState([])
  const [sectionData, setSectionData] = useState({})

  useEffect(() => {
    // Load sections configuration
    setSections(sectionsConfig)

    // Load data for each section
    const loadSectionData = async () => {
      const dataPromises = sectionsConfig.map(async (section) => {
        try {
          const data = await import(`./data/${section.data}.json`)
          return { [section.id]: data.default || data }
        } catch (error) {
          console.warn(`Failed to load data for section ${section.id}:`, error)
          return { [section.id]: null }
        }
      })

      const loadedData = await Promise.all(dataPromises)
      const mergedData = Object.assign({}, ...loadedData)
      setSectionData(mergedData)
    }

    loadSectionData()
  }, [])

  const renderSection = (section) => {
    const Component = componentMap[section.component]
    const data = sectionData[section.id]

    if (!Component) {
      console.warn(`Component ${section.component} not found`)
      return null
    }

    return <Component key={section.id} id={section.id} data={data} />
  }

  return (
    <div className="app">
      <Header />
      <main>
        {sections.map((section) => renderSection(section))}
      </main>
      <Footer />
    </div>
  )
}

export default App
