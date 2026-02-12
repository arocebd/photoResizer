import React from 'react'

const SEOContent = () => {
  return (
    <section style={styles.seoSection}>
      <div style={styles.container}>
        {/* Main SEO Content */}
        <article style={styles.article}>
          <h1 style={styles.h1}>Free Online Image Resizer, Converter & Photo Editor</h1>
          
          <p style={styles.paragraph}>
            <strong>Khotiyan Resizer</strong> is a powerful, free online image editing tool that helps you resize photos, 
            convert image formats, compress files, work with PDFs, and remove backgrounds using AI technology. 
            All processing happens directly in your browser - no uploads to servers, ensuring complete privacy and security.
          </p>

          <h2 style={styles.h2}>Why Choose Our Image Resizer?</h2>
          <ul style={styles.list}>
            <li><strong>100% Free:</strong> No subscriptions, no hidden fees - completely free forever</li>
            <li><strong>Privacy First:</strong> All processing happens locally in your browser</li>
            <li><strong>No Upload Required:</strong> Your images never leave your device</li>
            <li><strong>Fast & Efficient:</strong> Instant processing with no server delays</li>
            <li><strong>No Registration:</strong> Start using immediately without creating an account</li>
            <li><strong>Works Offline:</strong> Once loaded, works without internet connection</li>
          </ul>

          <h2 style={styles.h2}>Powerful Image Editing Features</h2>
          
          <h3 style={styles.h3}>1. Photo Resizer</h3>
          <p style={styles.paragraph}>
            Resize images to any dimension while maintaining quality. Perfect for social media posts, profile pictures, 
            thumbnails, or website optimization. Supports custom width and height with optional aspect ratio lock.
          </p>

          <h3 style={styles.h3}>2. Image Format Converter</h3>
          <p style={styles.paragraph}>
            Convert between PNG, JPEG, and WEBP formats instantly. Adjust quality settings for compressed formats. 
            Ideal for optimizing images for websites, reducing file sizes, or meeting specific format requirements.
          </p>

          <h3 style={styles.h3}>3. Image Compressor</h3>
          <p style={styles.paragraph}>
            Reduce image file sizes without significant quality loss. Set maximum file size or compression level 
            to optimize images for faster web loading, email attachments, or storage constraints.
          </p>

          <h3 style={styles.h3}>4. PDF to Image Converter</h3>
          <p style={styles.paragraph}>
            Extract pages from PDF documents and convert them to high-quality images (PNG or JPEG). 
            Process multiple pages at once or select specific pages. Perfect for presentations, documentation, or sharing.
          </p>

          <h3 style={styles.h3}>5. Image to PDF Converter</h3>
          <p style={styles.paragraph}>
            Combine multiple images into a single PDF document. Reorder images before conversion, 
            preview the final PDF, and create professional documents from your photos.
          </p>

          <h3 style={styles.h3}>6. AI Background Remover</h3>
          <p style={styles.paragraph}>
            Remove image backgrounds automatically using advanced AI technology. 
            Perfect for product photos, profile pictures, or creating transparent PNG images for design work.
          </p>

          <h2 style={styles.h2}>How to Use Khotiyan Resizer</h2>
          <ol style={styles.list}>
            <li>Select the tool you need from the homepage</li>
            <li>Upload your image by clicking or dragging and dropping</li>
            <li>Adjust settings as needed (dimensions, format, quality, etc.)</li>
            <li>Click the process/convert button</li>
            <li>Download your edited image</li>
          </ol>

          <h2 style={styles.h2}>Common Use Cases</h2>
          <ul style={styles.list}>
            <li>Resize photos for Instagram, Facebook, Twitter, or LinkedIn posts</li>
            <li>Compress images to reduce website loading time and improve SEO</li>
            <li>Convert images to specific formats required by platforms or applications</li>
            <li>Create profile pictures with transparent backgrounds</li>
            <li>Extract images from PDF documents for reuse</li>
            <li>Combine multiple photos into a single PDF portfolio</li>
            <li>Optimize images for email attachments</li>
            <li>Prepare images for printing at specific dimensions</li>
          </ul>

          <h2 style={styles.h2}>Frequently Asked Questions</h2>
          
          <h3 style={styles.h3}>Is Khotiyan Resizer really free?</h3>
          <p style={styles.paragraph}>
            Yes! All features are completely free with no limitations, subscriptions, or hidden costs.
          </p>

          <h3 style={styles.h3}>Are my images uploaded to your servers?</h3>
          <p style={styles.paragraph}>
            No. All image processing happens locally in your browser. Your files never leave your device, 
            ensuring complete privacy and security.
          </p>

          <h3 style={styles.h3}>What image formats are supported?</h3>
          <p style={styles.paragraph}>
            We support all common image formats including PNG, JPEG, JPG, WEBP, GIF, BMP, and more. 
            PDF files are also supported for conversion tools.
          </p>

          <h3 style={styles.h3}>Is there a file size limit?</h3>
          <p style={styles.paragraph}>
            No artificial limits! The only limitation is your device's processing power and available memory. 
            Most modern devices can handle very large files without issues.
          </p>

          <h3 style={styles.h3}>Do I need to install any software?</h3>
          <p style={styles.paragraph}>
            No installation required! Khotiyan Resizer works directly in your web browser on any device - 
            Windows, Mac, Linux, Android, or iOS.
          </p>

          <h3 style={styles.h3}>Can I use this for commercial purposes?</h3>
          <p style={styles.paragraph}>
            Absolutely! You can use Khotiyan Resizer for personal and commercial projects without any restrictions.
          </p>

          <h2 style={styles.h2}>Browser Compatibility</h2>
          <p style={styles.paragraph}>
            Works perfectly on all modern browsers including Google Chrome, Mozilla Firefox, Safari, Microsoft Edge, 
            and Opera. Mobile browsers are fully supported for on-the-go editing.
          </p>

          <h2 style={styles.h2}>Privacy & Security</h2>
          <p style={styles.paragraph}>
            Your privacy is our priority. Since all processing happens in your browser, your images are never 
            uploaded to any server. We don't store, view, or have access to your files. No tracking, 
            no data collection - just pure functionality.
          </p>

          <div style={styles.keywords}>
            <p><small>
              <strong>Related searches:</strong> resize image online, photo resizer, compress image, 
              image converter, PDF to image, background remover, free photo editor, online image editor, 
              resize photo for web, convert PNG to JPEG, image compression tool, batch image resize, 
              transparent background, remove background from photo
            </small></p>
          </div>
        </article>
      </div>
    </section>
  )
}

const styles = {
  seoSection: {
    background: '#fff',
    padding: '3rem 2rem',
    borderTop: '1px solid #e8e8e8'
  },
  container: {
    maxWidth: '900px',
    margin: '0 auto'
  },
  article: {
    lineHeight: '1.8',
    color: '#333'
  },
  h1: {
    fontSize: '2rem',
    marginBottom: '1rem',
    color: '#2c3e50',
    fontWeight: '700'
  },
  h2: {
    fontSize: '1.6rem',
    marginTop: '2rem',
    marginBottom: '1rem',
    color: '#34495e',
    fontWeight: '600'
  },
  h3: {
    fontSize: '1.3rem',
    marginTop: '1.5rem',
    marginBottom: '0.75rem',
    color: '#667eea',
    fontWeight: '600'
  },
  paragraph: {
    marginBottom: '1rem',
    fontSize: '1rem',
    color: '#555'
  },
  list: {
    marginBottom: '1rem',
    paddingLeft: '2rem',
    color: '#555'
  },
  keywords: {
    marginTop: '3rem',
    padding: '1.5rem',
    background: '#f8f9fa',
    borderRadius: '8px',
    borderLeft: '4px solid #667eea'
  }
}

export default SEOContent
