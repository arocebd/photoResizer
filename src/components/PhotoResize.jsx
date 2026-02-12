import { useState, useRef, useEffect } from 'react'
import { UploadIcon } from './Icons'

function PhotoResize() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [resizedImage, setResizedImage] = useState(null)
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 })
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true)
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 })
  const [dragging, setDragging] = useState(false)
  const [mode, setMode] = useState('resize') // 'resize' or 'crop'
  const [cropArea, setCropArea] = useState({ x: 0, y: 0, width: 200, height: 200 })
  const [isDraggingCrop, setIsDraggingCrop] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const fileInputRef = useRef(null)
  const canvasRef = useRef(null)
  const imageRef = useRef(null)

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

  const cropImage = () => {
    if (!preview) return

    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = cropArea.width
      canvas.height = cropArea.height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(
        img,
        cropArea.x,
        cropArea.y,
        cropArea.width,
        cropArea.height,
        0,
        0,
        cropArea.width,
        cropArea.height
      )
      setResizedImage(canvas.toDataURL('image/png'))
    }
    img.src = preview
  }

  const handleCanvasMouseDown = (e) => {
    if (mode !== 'crop') return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    // Check if clicking inside crop area to drag
    if (
      x >= cropArea.x &&
      x <= cropArea.x + cropArea.width &&
      y >= cropArea.y &&
      y <= cropArea.y + cropArea.height
    ) {
      setIsDraggingCrop(true)
      setDragStart({ x: x - cropArea.x, y: y - cropArea.y })
    } else {
      // Start new crop area
      setCropArea({ x, y, width: 0, height: 0 })
      setIsDraggingCrop(true)
      setDragStart({ x: 0, y: 0 })
    }
  }

  const handleCanvasMouseMove = (e) => {
    if (!isDraggingCrop || mode !== 'crop') return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (cropArea.width === 0 && cropArea.height === 0) {
      // Drawing new crop area
      const width = x - cropArea.x
      const height = y - cropArea.y
      setCropArea({ ...cropArea, width: Math.max(10, width), height: Math.max(10, height) })
    } else {
      // Moving existing crop area
      const newX = Math.max(0, Math.min(x - dragStart.x, originalDimensions.width - cropArea.width))
      const newY = Math.max(0, Math.min(y - dragStart.y, originalDimensions.height - cropArea.height))
      setCropArea({ ...cropArea, x: newX, y: newY })
    }
  }

  const handleCanvasMouseUp = () => {
    setIsDraggingCrop(false)
  }

  useEffect(() => {
    if (mode === 'crop' && preview && imageRef.current) {
      const img = imageRef.current
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight

      // Draw image
      ctx.drawImage(img, 0, 0)

      // Draw crop overlay
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Clear crop area
      ctx.clearRect(cropArea.x, cropArea.y, cropArea.width, cropArea.height)
      ctx.drawImage(
        img,
        cropArea.x,
        cropArea.y,
        cropArea.width,
        cropArea.height,
        cropArea.x,
        cropArea.y,
        cropArea.width,
        cropArea.height
      )

      // Draw crop border
      ctx.strokeStyle = '#667eea'
      ctx.lineWidth = 2
      ctx.strokeRect(cropArea.x, cropArea.y, cropArea.width, cropArea.height)
    }
  }, [mode, preview, cropArea])

  const downloadImage = () => {
    if (!resizedImage) return
    const link = document.createElement('a')
    const filename = mode === 'crop' 
      ? `cropped-${cropArea.width}x${cropArea.height}.png`
      : `resized-${dimensions.width}x${dimensions.height}.png`
    link.download = filename
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
            <div className="control-row" style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  className={`btn ${mode === 'resize' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => {
                    setMode('resize')
                    setResizedImage(null)
                  }}
                >
                  Resize Mode
                </button>
                <button
                  className={`btn ${mode === 'crop' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => {
                    setMode('crop')
                    setResizedImage(null)
                    setCropArea({ 
                      x: Math.floor(originalDimensions.width * 0.25), 
                      y: Math.floor(originalDimensions.height * 0.25), 
                      width: Math.floor(originalDimensions.width * 0.5), 
                      height: Math.floor(originalDimensions.height * 0.5) 
                    })
                  }}
                >
                  Crop Mode
                </button>
              </div>
            </div>

            {mode === 'resize' && (
              <>
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
              </>
            )}

            {mode === 'crop' && (
              <>
                <p style={{ margin: '0 0 1rem 0', color: '#666', fontSize: '0.9rem' }}>
                  Click and drag on the image to select crop area
                </p>
                <div className="control-row">
                  <div className="control-group">
                    <label>X Position</label>
                    <input
                      type="number"
                      value={Math.round(cropArea.x)}
                      onChange={(e) => setCropArea({ ...cropArea, x: Math.max(0, parseInt(e.target.value) || 0) })}
                      min="0"
                      max={originalDimensions.width - cropArea.width}
                    />
                  </div>
                  <div className="control-group">
                    <label>Y Position</label>
                    <input
                      type="number"
                      value={Math.round(cropArea.y)}
                      onChange={(e) => setCropArea({ ...cropArea, y: Math.max(0, parseInt(e.target.value) || 0) })}
                      min="0"
                      max={originalDimensions.height - cropArea.height}
                    />
                  </div>
                </div>
                <div className="control-row">
                  <div className="control-group">
                    <label>Crop Width</label>
                    <input
                      type="number"
                      value={Math.round(cropArea.width)}
                      onChange={(e) => setCropArea({ ...cropArea, width: Math.max(10, parseInt(e.target.value) || 10) })}
                      min="10"
                      max={originalDimensions.width}
                    />
                  </div>
                  <div className="control-group">
                    <label>Crop Height</label>
                    <input
                      type="number"
                      value={Math.round(cropArea.height)}
                      onChange={(e) => setCropArea({ ...cropArea, height: Math.max(10, parseInt(e.target.value) || 10) })}
                      min="10"
                      max={originalDimensions.height}
                    />
                  </div>
                </div>
                <div className="button-group">
                  <button className="btn btn-primary" onClick={cropImage}>
                    Crop Image
                  </button>
                  {resizedImage && (
                    <button className="btn btn-secondary" onClick={downloadImage}>
                      Download Cropped
                    </button>
                  )}
                </div>
              </>
            )}
          </div>

          <div className="preview-container">
            <h3>{mode === 'resize' ? 'Preview' : 'Crop Area (Drag to adjust)'}</h3>
            <div className="preview-images">
              <div className="preview-box">
                <h4>Original ({originalDimensions.width} × {originalDimensions.height})</h4>
                {mode === 'crop' ? (
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <img 
                      ref={imageRef}
                      src={preview} 
                      alt="Original" 
                      style={{ display: 'none' }}
                    />
                    <canvas
                      ref={canvasRef}
                      style={{ 
                        maxWidth: '100%', 
                        cursor: 'crosshair',
                        border: '1px solid #ddd',
                        borderRadius: '4px'
                      }}
                      onMouseDown={handleCanvasMouseDown}
                      onMouseMove={handleCanvasMouseMove}
                      onMouseUp={handleCanvasMouseUp}
                      onMouseLeave={handleCanvasMouseUp}
                    />
                  </div>
                ) : (
                  <>
                    <img src={preview} alt="Original" />
                    <div className="file-info">
                      Size: {(selectedFile.size / 1024).toFixed(2)} KB
                    </div>
                  </>
                )}
              </div>
              {resizedImage && (
                <div className="preview-box">
                  <h4>
                    {mode === 'resize' 
                      ? `Resized (${dimensions.width} × ${dimensions.height})`
                      : `Cropped (${Math.round(cropArea.width)} × ${Math.round(cropArea.height)})`
                    }
                  </h4>
                  <img src={resizedImage} alt={mode === 'resize' ? 'Resized' : 'Cropped'} />
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
              setMode('resize')
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
