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
        <>
          <section className="hero-section">
            <h2>The All-in-One Image Tool</h2>
            <p>Easily resize, convert, compress, and edit your images for FREE. All processing happens in your browser - no uploads!</p>
          </section>

          {/* Introduction Content */}
          <section style={{ 
            maxWidth: '1200px', 
            margin: '2rem auto', 
            padding: '0 1rem',
            lineHeight: '1.8',
            color: '#333'
          }}>
            <article>
              <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#333' }}>
                Free Online Image Editor & Photo Resizer Tool
              </h1>
              
              <p style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>
                Welcome to <strong>Khotiyan Resizer</strong>, your complete solution for online image editing. 
                Whether you need to resize photos for social media, convert image formats for your website, 
                compress large files for email, work with PDF documents, or remove backgrounds from images, 
                our free tool handles it all. Best of all, everything processes directly in your browser - 
                your images never leave your device, ensuring complete privacy and security.
              </p>

              <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem', color: '#444' }}>
                Why Choose Our Image Editing Tool?
              </h2>
              
              <p style={{ marginBottom: '1rem' }}>
                Unlike other online image editors that require uploading your files to remote servers, 
                our tool performs all processing locally on your device. This means faster results, 
                complete privacy, and the ability to work offline once the page loads. No registration required, 
                no watermarks, and absolutely free to use.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', margin: '2rem 0' }}>
                <div>
                  <h3 style={{ color: '#667eea', marginBottom: '0.5rem' }}>🔒 100% Private</h3>
                  <p>Your images are processed entirely in your browser. Nothing is uploaded to any server, 
                  ensuring your photos and documents remain completely private and secure.</p>
                </div>
                <div>
                  <h3 style={{ color: '#667eea', marginBottom: '0.5rem' }}>⚡ Lightning Fast</h3>
                  <p>No server processing means instant results. Resize, convert, or compress images in seconds 
                  without waiting for uploads or downloads.</p>
                </div>
                <div>
                  <h3 style={{ color: '#667eea', marginBottom: '0.5rem' }}>💰 Completely Free</h3>
                  <p>No hidden fees, subscriptions, or premium tiers. All features are available to everyone, 
                  forever free with no limitations.</p>
                </div>
              </div>
            </article>
          </section>
        </>
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
