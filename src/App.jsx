import { useState } from 'react'
import './App.css'
import PhotoResize from './components/PhotoResize'
import ImageConverter from './components/ImageConverter'
import ImageCompressor from './components/ImageCompressor'
import PdfToImage from './components/PdfToImage'
import ImageToPdf from './components/ImageToPdf'
import BackgroundRemover from './components/BackgroundRemover'
import { ResizeIcon, ConvertIcon, CompressIcon, PdfToImageIcon, ImageToPdfIcon, BackgroundRemoveIcon } from './components/Icons'
import AdSenseDisplay from './components/AdSense'
import SEOContent from './components/SEOContent'

function App() {
  const [activeTool, setActiveTool] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const features = [
    {
      id: 'resize',
      title: 'Photo Resize',
      description: 'Resize images to custom dimensions',
      component: PhotoResize,
      icon: ResizeIcon
    },
    {
      id: 'convert',
      title: 'Format Convert',
      description: 'Convert between PNG, JPEG, WEBP',
      component: ImageConverter,
      icon: ConvertIcon
    },
    {
      id: 'compress',
      title: 'Compress',
      description: 'Reduce file size while maintaining quality',
      component: ImageCompressor,
      icon: CompressIcon
    },
    {
      id: 'pdf-to-image',
      title: 'PDF to Image',
      description: 'Convert PDF pages to JPEG/PNG',
      component: PdfToImage,
      icon: PdfToImageIcon
    },
    {
      id: 'image-to-pdf',
      title: 'Image to PDF',
      description: 'Convert JPEG/PNG to PDF',
      component: ImageToPdf,
      icon: ImageToPdfIcon
    },
    {
      id: 'background-remove',
      title: 'Remove Background',
      description: 'Automatically remove image background',
      component: BackgroundRemover,
      icon: BackgroundRemoveIcon
    }
  ]

  const activeFeature = features.find(f => f.id === activeTool)

  const handleToolClick = (toolId) => {
    setActiveTool(toolId)
    setMobileMenuOpen(false)
    window.scrollTo(0, 0)
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="header-top">
          <div className="header-logo">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            <h1>Khotiyan Resizer</h1>
          </div>

          <button 
            className="mobile-menu-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            ☰
          </button>

          <nav className={`header-nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            {features.map(feature => (
              <button
                key={feature.id}
                className={activeTool === feature.id ? 'active' : ''}
                onClick={() => handleToolClick(feature.id)}
              >
                {feature.title}
              </button>
            ))}
          </nav>

          <div className="header-actions">
            <span>Free Tool</span>
          </div>
        </div>
      </header>

      {/* Hero Section (only shown when no tool is active) */}
      {!activeTool && (
        <section className="hero-section">
          <h2>The All-in-One Image Tool</h2>
          <p>Easily resize, convert, compress, and edit your images for FREE. All processing happens in your browser - no uploads!</p>
        </section>
      )}

      {/* Main Content */}
      <main className="main-content">
        {!activeTool ? (
          <>
            {/* Top Banner Ad */}
            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
              <AdSenseDisplay adSlot="1234567890" adFormat="horizontal" />
            </div>

            <section className="features-section">
              <h3>Select a Tool to Get Started</h3>
              <div className="features-grid">
                {features.map(feature => {
                  const IconComponent = feature.icon
                  return (
                    <button
                      key={feature.id}
                      className="feature-card"
                      onClick={() => handleToolClick(feature.id)}
                    >
                      <IconComponent />
                      <h3>{feature.title}</h3>
                      <p>{feature.description}</p>
                    </button>
                  )
                })}
              </div>
            </section>

            {/* Middle Content Ad */}
            <div style={{ margin: '3rem auto', maxWidth: '728px', textAlign: 'center' }}>
              <AdSenseDisplay adSlot="0987654321" adFormat="horizontal" />
            </div>

            {/* SEO Content Section */}
            <SEOContent />
          </>
        ) : (
          <div className="tool-container">
            <div className="tool-header">
              <h2>{activeFeature.title}</h2>
              <button className="back-button" onClick={() => setActiveTool(null)}>
                ← Back to Tools
              </button>
            </div>

            {/* In-Content Ad (shows when tool is active) */}
            <div style={{ marginBottom: '2rem' }}>
              <AdSenseDisplay adSlot="1122334455" adFormat="auto" />
            </div>

            <activeFeature.component />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>&copy; 2026 Khotiyan Resizer. All rights reserved.</p>
        <p>All processing happens locally in your browser. No data is uploaded to any server.</p>
      </footer>
    </div>
  )
}

export default App
