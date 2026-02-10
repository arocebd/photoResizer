import { useState, useRef } from 'react'
import { PDFDocument } from 'pdf-lib'
import { ImageIcon } from './Icons'

function ImageToPdf() {
  const [selectedFiles, setSelectedFiles] = useState([])
  const [previews, setPreviews] = useState([])
  const [pdfUrl, setPdfUrl] = useState(null)
  const [loading, setLoading] = useState(false)
  const [dragging, setDragging] = useState(false)
  const fileInputRef = useRef(null)

  const handleFilesSelect = (files) => {
    const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'))
    if (imageFiles.length === 0) return

    setSelectedFiles(imageFiles)
    
    const previewPromises = imageFiles.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          resolve({ file, url: e.target.result })
        }
        reader.readAsDataURL(file)
      })
    })

    Promise.all(previewPromises).then(setPreviews)
    setPdfUrl(null)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    handleFilesSelect(e.dataTransfer.files)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragging(true)
  }

  const handleDragLeave = () => {
    setDragging(false)
  }

  const removeImage = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
    setPreviews(prev => prev.filter((_, i) => i !== index))
  }

  const moveImage = (index, direction) => {
    const newFiles = [...selectedFiles]
    const newPreviews = [...previews]
    const newIndex = index + direction

    if (newIndex < 0 || newIndex >= newFiles.length) return

    ;[newFiles[index], newFiles[newIndex]] = [newFiles[newIndex], newFiles[index]]
    ;[newPreviews[index], newPreviews[newIndex]] = [newPreviews[newIndex], newPreviews[index]]

    setSelectedFiles(newFiles)
    setPreviews(newPreviews)
  }

  const createPdf = async () => {
    if (selectedFiles.length === 0) return

    setLoading(true)
    try {
      const pdfDoc = await PDFDocument.create()

      for (const preview of previews) {
        const imageBytes = await fetch(preview.url).then(res => res.arrayBuffer())
        
        let image
        if (preview.file.type === 'image/png') {
          image = await pdfDoc.embedPng(imageBytes)
        } else {
          image = await pdfDoc.embedJpg(imageBytes)
        }

        const { width, height } = image.scale(1)
        
        // Calculate page size to fit image (max A4 size)
        const maxWidth = 595 // A4 width in points
        const maxHeight = 842 // A4 height in points
        
        let pageWidth = width
        let pageHeight = height
        
        if (width > maxWidth || height > maxHeight) {
          const widthRatio = maxWidth / width
          const heightRatio = maxHeight / height
          const ratio = Math.min(widthRatio, heightRatio)
          
          pageWidth = width * ratio
          pageHeight = height * ratio
        }

        const page = pdfDoc.addPage([pageWidth, pageHeight])
        page.drawImage(image, {
          x: 0,
          y: 0,
          width: pageWidth,
          height: pageHeight
        })
      }

      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      setPdfUrl(url)
    } catch (error) {
      console.error('Error creating PDF:', error)
      alert('Failed to create PDF. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const downloadPdf = () => {
    if (!pdfUrl) return
    const link = document.createElement('a')
    link.download = 'images-to-pdf.pdf'
    link.href = pdfUrl
    link.click()
  }

  return (
    <div>
      {selectedFiles.length === 0 ? (
        <div
          className={`upload-area ${dragging ? 'dragging' : ''}`}
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <div className="upload-icon"><ImageIcon /></div>
          <h3>Drop your images here</h3>
          <p>or click to browse (multiple images supported)</p>
          <input
            ref={fileInputRef}
            type="file"
            className="file-input"
            accept="image/*"
            multiple
            onChange={(e) => handleFilesSelect(e.target.files)}
          />
        </div>
      ) : (
        <>
          <div className="controls">
            <div className="button-group">
              <button
                className="btn btn-primary"
                onClick={createPdf}
                disabled={loading}
              >
                {loading ? 'Creating PDF...' : 'Create PDF'}
              </button>
              {pdfUrl && (
                <button className="btn btn-secondary" onClick={downloadPdf}>
                  Download PDF
                </button>
              )}
            </div>
          </div>

          {loading && <div className="loading">Creating PDF from images</div>}

          {!loading && (
            <>
              <div className="preview-container">
                <h3>Images to Include ({previews.length} total)</h3>
                <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1rem' }}>
                  Drag images to reorder, or use arrow buttons
                </p>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {previews.map((preview, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '1rem',
                        background: 'white',
                        borderRadius: '8px',
                        border: '1px solid #e0e0e0'
                      }}
                    >
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#667eea', minWidth: '30px' }}>
                        {index + 1}
                      </div>
                      <img
                        src={preview.url}
                        alt={`Preview ${index + 1}`}
                        style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px' }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                          {preview.file.name}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#666' }}>
                          {(preview.file.size / 1024).toFixed(2)} KB
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => moveImage(index, -1)}
                          disabled={index === 0}
                          style={{
                            padding: '0.5rem 1rem',
                            background: '#6c757d',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: index === 0 ? 'not-allowed' : 'pointer',
                            opacity: index === 0 ? 0.5 : 1
                          }}
                        >
                          ↑
                        </button>
                        <button
                          onClick={() => moveImage(index, 1)}
                          disabled={index === previews.length - 1}
                          style={{
                            padding: '0.5rem 1rem',
                            background: '#6c757d',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: index === previews.length - 1 ? 'not-allowed' : 'pointer',
                            opacity: index === previews.length - 1 ? 0.5 : 1
                          }}
                        >
                          ↓
                        </button>
                        <button
                          onClick={() => removeImage(index)}
                          style={{
                            padding: '0.5rem 1rem',
                            background: '#dc3545',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {pdfUrl && (
                <div className="preview-container">
                  <h3>PDF Preview</h3>
                  <iframe
                    src={pdfUrl}
                    style={{
                      width: '100%',
                      height: '500px',
                      border: '1px solid #ddd',
                      borderRadius: '8px'
                    }}
                    title="PDF Preview"
                  />
                </div>
              )}
            </>
          )}

          <button
            className="btn btn-secondary"
            onClick={() => {
              setSelectedFiles([])
              setPreviews([])
              setPdfUrl(null)
            }}
            style={{ marginTop: '1rem' }}
          >
            Choose Different Images
          </button>
        </>
      )}
    </div>
  )
}

export default ImageToPdf
