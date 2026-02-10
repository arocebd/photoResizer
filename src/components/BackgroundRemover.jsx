import { useState, useRef } from 'react'
import { removeBackground } from '@imgly/background-removal'
import { UploadIcon } from './Icons'

function BackgroundRemover() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [processedImage, setProcessedImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [dragging, setDragging] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target.result)
      }
      reader.readAsDataURL(file)
      setProcessedImage(null)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    handleFileSelect(file)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragging(true)
  }

  const handleDragLeave = () => {
    setDragging(false)
  }

  const removeBg = async () => {
    if (!preview) return

    setLoading(true)
    try {
      const blob = await removeBackground(preview)
      const url = URL.createObjectURL(blob)
      setProcessedImage(url)
    } catch (error) {
      console.error('Background removal error:', error)
      alert('Failed to remove background. Please try again with a different image.')
    } finally {
      setLoading(false)
    }
  }

  const downloadImage = () => {
    if (!processedImage) return
    const link = document.createElement('a')
    link.download = `no-background-${selectedFile.name.replace(/\.[^/.]+$/, '')}.png`
    link.href = processedImage
    link.click()
  }

  return (
    <div>
      {!selectedFile ? (
        <div
          className={`upload-area ${dragging ? 'dragging' : ''}`}
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <div className="upload-icon"><UploadIcon /></div>
          <h3>Drop your image here</h3>
          <p>or click to browse</p>
          <p style={{ fontSize: '0.85rem', color: '#999', marginTop: '0.5rem' }}>
            Note: First use may take longer as model loads
          </p>
          <input
            ref={fileInputRef}
            type="file"
            className="file-input"
            accept="image/*"
            onChange={(e) => handleFileSelect(e.target.files[0])}
          />
        </div>
      ) : (
        <>
          <div className="controls">
            <div className="button-group">
              <button
                className="btn btn-primary"
                onClick={removeBg}
                disabled={loading}
              >
                {loading ? 'Removing Background...' : 'Remove Background'}
              </button>
              {processedImage && (
                <button className="btn btn-secondary" onClick={downloadImage}>
                  Download Result
                </button>
              )}
            </div>
          </div>

          {loading && (
            <div className="loading">
              Removing background... This may take a minute on first use
            </div>
          )}

          {!loading && (
            <div className="preview-container">
              <h3>Preview</h3>
              <div className="preview-images">
                <div className="preview-box">
                  <h4>Original</h4>
                  <img src={preview} alt="Original" />
                  <div className="file-info">
                    Size: {(selectedFile.size / 1024).toFixed(2)} KB
                  </div>
                </div>
                {processedImage && (
                  <div className="preview-box">
                    <h4>Background Removed</h4>
                    <div style={{
                      background: 'repeating-conic-gradient(#ddd 0% 25%, white 0% 50%) 50% / 20px 20px',
                      padding: '1rem',
                      borderRadius: '8px'
                    }}>
                      <img src={processedImage} alt="Processed" style={{ display: 'block' }} />
                    </div>
                    <div className="file-info" style={{ marginTop: '1rem' }}>
                      PNG format with transparency
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <button
            className="btn btn-secondary"
            onClick={() => {
              setSelectedFile(null)
              setPreview(null)
              setProcessedImage(null)
            }}
          >
            Choose Another Image
          </button>
        </>
      )}
    </div>
  )
}

export default BackgroundRemover
