import { useState, useRef } from 'react'
import imageCompression from 'browser-image-compression'
import { UploadIcon } from './Icons'

function ImageCompressor() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [compressedImage, setCompressedImage] = useState(null)
  const [compressedFile, setCompressedFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [compressionLevel, setCompressionLevel] = useState(0.8)
  const [maxSizeMB, setMaxSizeMB] = useState(1)
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
      setCompressedImage(null)
      setCompressedFile(null)
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

  const compressImage = async () => {
    if (!selectedFile) return

    setLoading(true)
    try {
      const options = {
        maxSizeMB: maxSizeMB,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        initialQuality: compressionLevel
      }

      const compressed = await imageCompression(selectedFile, options)
      
      const reader = new FileReader()
      reader.onload = (e) => {
        setCompressedImage(e.target.result)
      }
      reader.readAsDataURL(compressed)
      
      setCompressedFile(compressed)
    } catch (error) {
      console.error('Compression error:', error)
      alert('Failed to compress image. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const downloadImage = () => {
    if (!compressedFile) return
    const link = document.createElement('a')
    link.download = `compressed-${selectedFile.name}`
    link.href = URL.createObjectURL(compressedFile)
    link.click()
  }

  const compressionRatio = compressedFile
    ? ((1 - compressedFile.size / selectedFile.size) * 100).toFixed(1)
    : 0

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
            <div className="control-group">
              <label>Maximum File Size (MB): {maxSizeMB}</label>
              <input
                type="range"
                min="0.1"
                max="5"
                step="0.1"
                value={maxSizeMB}
                onChange={(e) => setMaxSizeMB(parseFloat(e.target.value))}
              />
            </div>
            <div className="control-group">
              <label>Compression Quality: {Math.round(compressionLevel * 100)}%</label>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={compressionLevel}
                onChange={(e) => setCompressionLevel(parseFloat(e.target.value))}
              />
            </div>
            <div className="button-group">
              <button
                className="btn btn-primary"
                onClick={compressImage}
                disabled={loading}
              >
                {loading ? 'Compressing...' : 'Compress Image'}
              </button>
              {compressedImage && (
                <button className="btn btn-secondary" onClick={downloadImage}>
                  Download Compressed
                </button>
              )}
            </div>
          </div>

          {loading && <div className="loading">Compressing image</div>}

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
                {compressedImage && (
                  <div className="preview-box">
                    <h4>Compressed</h4>
                    <img src={compressedImage} alt="Compressed" />
                    <div className="file-info">
                      Size: {(compressedFile.size / 1024).toFixed(2)} KB
                      <br />
                      Reduced by {compressionRatio}%
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
              setCompressedImage(null)
              setCompressedFile(null)
            }}
          >
            Choose Another Image
          </button>
        </>
      )}
    </div>
  )
}

export default ImageCompressor
