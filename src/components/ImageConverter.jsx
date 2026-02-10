import { useState, useRef } from 'react'
import { UploadIcon } from './Icons'

function ImageConverter() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [convertedImage, setConvertedImage] = useState(null)
  const [outputFormat, setOutputFormat] = useState('png')
  const [quality, setQuality] = useState(0.9)
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
      setConvertedImage(null)
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

  const convertImage = () => {
    if (!preview) return

    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      
      // For JPEG, fill background with white
      if (outputFormat === 'jpeg') {
        ctx.fillStyle = '#FFFFFF'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }
      
      ctx.drawImage(img, 0, 0)
      
      const mimeType = `image/${outputFormat === 'jpg' ? 'jpeg' : outputFormat}`
      const dataUrl = canvas.toDataURL(mimeType, quality)
      setConvertedImage(dataUrl)
    }
    img.src = preview
  }

  const downloadImage = () => {
    if (!convertedImage) return
    const link = document.createElement('a')
    const extension = outputFormat === 'jpg' ? 'jpeg' : outputFormat
    link.download = `converted.${extension}`
    link.href = convertedImage
    link.click()
  }

  const getFileExtension = (filename) => {
    return filename.split('.').pop().toUpperCase()
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
          <p>or click to browse (PNG, JPEG, WEBP supported)</p>
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
            <div className="control-group">
              <label>Output Format</label>
              <select
                value={outputFormat}
                onChange={(e) => setOutputFormat(e.target.value)}
              >
                <option value="png">PNG</option>
                <option value="jpeg">JPEG</option>
                <option value="webp">WEBP</option>
              </select>
            </div>
            {(outputFormat === 'jpeg' || outputFormat === 'webp') && (
              <div className="control-group">
                <label>Quality: {Math.round(quality * 100)}%</label>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.1"
                  value={quality}
                  onChange={(e) => setQuality(parseFloat(e.target.value))}
                />
              </div>
            )}
            <div className="button-group">
              <button className="btn btn-primary" onClick={convertImage}>
                Convert Image
              </button>
              {convertedImage && (
                <button className="btn btn-secondary" onClick={downloadImage}>
                  Download Converted
                </button>
              )}
            </div>
          </div>

          <div className="preview-container">
            <h3>Preview</h3>
            <div className="preview-images">
              <div className="preview-box">
                <h4>Original ({getFileExtension(selectedFile.name)})</h4>
                <img src={preview} alt="Original" />
                <div className="file-info">
                  Size: {(selectedFile.size / 1024).toFixed(2)} KB
                </div>
              </div>
              {convertedImage && (
                <div className="preview-box">
                  <h4>Converted ({outputFormat.toUpperCase()})</h4>
                  <img src={convertedImage} alt="Converted" />
                  <div className="file-info">
                    Estimated size: {(convertedImage.length * 0.75 / 1024).toFixed(2)} KB
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            className="btn btn-secondary"
            onClick={() => {
              setSelectedFile(null)
              setPreview(null)
              setConvertedImage(null)
            }}
          >
            Choose Another Image
          </button>
        </>
      )}
    </div>
  )
}

export default ImageConverter
