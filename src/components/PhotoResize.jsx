import { useState, useRef } from 'react'
import { UploadIcon } from './Icons'

function PhotoResize() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [resizedImage, setResizedImage] = useState(null)
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 })
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true)
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 })
  const [dragging, setDragging] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
          setOriginalDimensions({ width: img.width, height: img.height })
          setDimensions({ width: img.width, height: img.height })
        }
        img.src = e.target.result
        setPreview(e.target.result)
      }
      reader.readAsDataURL(file)
      setResizedImage(null)
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

  const handleWidthChange = (width) => {
    const newWidth = parseInt(width) || 0
    if (maintainAspectRatio && originalDimensions.width > 0) {
      const aspectRatio = originalDimensions.height / originalDimensions.width
      setDimensions({ width: newWidth, height: Math.round(newWidth * aspectRatio) })
    } else {
      setDimensions(prev => ({ ...prev, width: newWidth }))
    }
  }

  const handleHeightChange = (height) => {
    const newHeight = parseInt(height) || 0
    if (maintainAspectRatio && originalDimensions.height > 0) {
      const aspectRatio = originalDimensions.width / originalDimensions.height
      setDimensions({ width: Math.round(newHeight * aspectRatio), height: newHeight })
    } else {
      setDimensions(prev => ({ ...prev, height: newHeight }))
    }
  }

  const resizeImage = () => {
    if (!preview) return

    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = dimensions.width
      canvas.height = dimensions.height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, dimensions.width, dimensions.height)
      setResizedImage(canvas.toDataURL('image/png'))
    }
    img.src = preview
  }

  const downloadImage = () => {
    if (!resizedImage) return
    const link = document.createElement('a')
    link.download = `resized-${dimensions.width}x${dimensions.height}.png`
    link.href = resizedImage
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
            <div className="control-row">
              <div className="control-group">
                <label>Width (px)</label>
                <input
                  type="number"
                  value={dimensions.width}
                  onChange={(e) => handleWidthChange(e.target.value)}
                  min="1"
                />
              </div>
              <div className="control-group">
                <label>Height (px)</label>
                <input
                  type="number"
                  value={dimensions.height}
                  onChange={(e) => handleHeightChange(e.target.value)}
                  min="1"
                />
              </div>
            </div>
            <div className="control-group">
              <label>
                <input
                  type="checkbox"
                  checked={maintainAspectRatio}
                  onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                  style={{ marginRight: '0.5rem' }}
                />
                Maintain aspect ratio
              </label>
            </div>
            <div className="button-group">
              <button className="btn btn-primary" onClick={resizeImage}>
                Resize Image
              </button>
              {resizedImage && (
                <button className="btn btn-secondary" onClick={downloadImage}>
                  Download Resized
                </button>
              )}
            </div>
          </div>

          <div className="preview-container">
            <h3>Preview</h3>
            <div className="preview-images">
              <div className="preview-box">
                <h4>Original ({originalDimensions.width} × {originalDimensions.height})</h4>
                <img src={preview} alt="Original" />
                <div className="file-info">
                  Size: {(selectedFile.size / 1024).toFixed(2)} KB
                </div>
              </div>
              {resizedImage && (
                <div className="preview-box">
                  <h4>Resized ({dimensions.width} × {dimensions.height})</h4>
                  <img src={resizedImage} alt="Resized" />
                </div>
              )}
            </div>
          </div>

          <button
            className="btn btn-secondary"
            onClick={() => {
              setSelectedFile(null)
              setPreview(null)
              setResizedImage(null)
            }}
          >
            Choose Another Image
          </button>
        </>
      )}
    </div>
  )
}

export default PhotoResize
