import { useState, useRef } from 'react'
import * as pdfjsLib from 'pdfjs-dist'
import { UploadIcon } from './Icons'

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`

function PdfToImage() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [pages, setPages] = useState([])
  const [loading, setLoading] = useState(false)
  const [outputFormat, setOutputFormat] = useState('png')
  const [scale, setScale] = useState(2)
  const [dragging, setDragging] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileSelect = async (file) => {
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file)
      setLoading(true)
      try {
        await convertPdfToImages(file)
      } catch (error) {
        console.error('Error processing PDF:', error)
        alert('Failed to process PDF. Please try again.')
      } finally {
        setLoading(false)
      }
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

  const convertPdfToImages = async (file) => {
    const arrayBuffer = await file.arrayBuffer()
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
    const numPages = pdf.numPages
    const convertedPages = []

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await pdf.getPage(pageNum)
      const viewport = page.getViewport({ scale })
      
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      canvas.height = viewport.height
      canvas.width = viewport.width

      await page.render({
        canvasContext: context,
        viewport: viewport
      }).promise

      const mimeType = outputFormat === 'png' ? 'image/png' : 'image/jpeg'
      const quality = outputFormat === 'jpeg' ? 0.9 : undefined
      const imageData = canvas.toDataURL(mimeType, quality)
      
      convertedPages.push({
        pageNum,
        imageData,
        width: viewport.width,
        height: viewport.height
      })
    }

    setPages(convertedPages)
  }

  const downloadPage = (page) => {
    const link = document.createElement('a')
    link.download = `page-${page.pageNum}.${outputFormat}`
    link.href = page.imageData
    link.click()
  }

  const downloadAll = () => {
    pages.forEach((page, index) => {
      setTimeout(() => {
        downloadPage(page)
      }, index * 200)
    })
  }

  const regenerateImages = async () => {
    if (!selectedFile) return
    setLoading(true)
    setPages([])
    try {
      await convertPdfToImages(selectedFile)
    } catch (error) {
      console.error('Error regenerating images:', error)
      alert('Failed to regenerate images. Please try again.')
    } finally {
      setLoading(false)
    }
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
          <h3>Drop your PDF here</h3>
          <p>or click to browse</p>
          <input
            ref={fileInputRef}
            type="file"
            className="file-input"
            accept="application/pdf"
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
                onChange={(e) => {
                  setOutputFormat(e.target.value)
                }}
              >
                <option value="png">PNG</option>
                <option value="jpeg">JPEG</option>
              </select>
            </div>
            <div className="control-group">
              <label>Quality Scale: {scale}x</label>
              <input
                type="range"
                min="1"
                max="4"
                step="0.5"
                value={scale}
                onChange={(e) => setScale(parseFloat(e.target.value))}
              />
            </div>
            <div className="button-group">
              <button
                className="btn btn-primary"
                onClick={regenerateImages}
                disabled={loading}
              >
                {loading ? 'Converting...' : 'Regenerate with New Settings'}
              </button>
              {pages.length > 0 && (
                <button className="btn btn-secondary" onClick={downloadAll}>
                  Download All Pages
                </button>
              )}
            </div>
          </div>

          {loading && <div className="loading">Converting PDF to images</div>}

          {!loading && pages.length > 0 && (
            <div className="preview-container">
              <h3>Converted Pages ({pages.length} total)</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {pages.map((page) => (
                  <div key={page.pageNum} className="preview-box">
                    <h4>Page {page.pageNum}</h4>
                    <img
                      src={page.imageData}
                      alt={`Page ${page.pageNum}`}
                      style={{ width: '100%', border: '1px solid #ddd', borderRadius: '8px' }}
                    />
                    <div className="file-info">
                      {page.width} × {page.height} px
                    </div>
                    <button
                      className="btn btn-primary"
                      onClick={() => downloadPage(page)}
                      style={{ marginTop: '0.5rem', width: '100%' }}
                    >
                      Download Page {page.pageNum}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            className="btn btn-secondary"
            onClick={() => {
              setSelectedFile(null)
              setPages([])
            }}
            style={{ marginTop: '1rem' }}
          >
            Choose Another PDF
          </button>
        </>
      )}
    </div>
  )
}

export default PdfToImage
