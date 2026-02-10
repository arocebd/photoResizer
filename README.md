# Khotiyan Resizer

A powerful, all-in-one photo editing web application built with React. All processing happens directly in your browser - no uploads to servers, ensuring complete privacy.

## Features

### Photo Resize
- Resize images to custom dimensions
- Maintain aspect ratio option
- Real-time preview of original and resized images
- Support for all common image formats

### Format Converter
- Convert between PNG, JPEG, and WEBP
- Adjustable quality settings for JPEG/WEBP
- Lossless PNG conversion
- File size comparison

### Image Compressor
- Reduce file size while maintaining quality
- Adjustable compression level
- Maximum file size control
- Shows compression ratio

### PDF to Image
- Convert PDF pages to images (PNG/JPEG)
- Process multiple pages at once
- Adjustable quality scale
- Download individual pages or all at once

### Image to PDF
- Combine multiple images into a single PDF
- Reorder images before conversion
- Support for PNG and JPEG inputs
- Preview generated PDF

### Background Remover
- AI-powered automatic background removal
- Works with portraits and objects
- PNG output with transparency
- Checkerboard preview for transparency

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder, ready to be deployed to any static hosting service.

## Technologies Used

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **browser-image-compression** - Client-side image compression
- **pdf-lib** - PDF generation and manipulation
- **pdfjs-dist** - PDF rendering to canvas
- **@imgly/background-removal** - AI-powered background removal

## Browser Support

Works in all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

## Privacy

All image processing happens locally in your browser. No images are uploaded to any server, ensuring complete privacy and security of your files.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.
