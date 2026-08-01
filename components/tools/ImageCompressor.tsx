'use client'

import { useState, useRef } from 'react'
import { Upload, Download, Image as ImageIcon, FileImage, Check, X, RefreshCw, Crop, Trash2 } from 'lucide-react'

export default function ImageCompressor({ lang }: { lang: string }) {
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [compressedImage, setCompressedImage] = useState<string | null>(null)
  const [originalSize, setOriginalSize] = useState<number>(0)
  const [compressedSize, setCompressedSize] = useState<number>(0)
  const [quality, setQuality] = useState(70)
  const [isCompressing, setIsCompressing] = useState(false)
  const [fileName, setFileName] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    processFile(file)
  }

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert(lang === 'id' ? 'File harus berupa gambar' : 'File must be an image')
      return
    }
    
    setFileName(file.name)
    setOriginalSize(file.size)
    const reader = new FileReader()
    reader.onload = (event) => {
      setOriginalImage(event.target?.result as string)
      setCompressedImage(null)
    }
    reader.readAsDataURL(file)
  }

  const compressImage = () => {
    if (!originalImage) return

    setIsCompressing(true)
    setTimeout(() => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const maxWidth = 1200
        const maxHeight = 1200
        let width = img.width
        let height = img.height

        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height)
          width *= ratio
          height *= ratio
        }

        canvas.width = width
        canvas.height = height
        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = 'high'
        ctx.drawImage(img, 0, 0, width, height)

        const qualityValue = quality / 100
        const compressed = canvas.toDataURL('image/jpeg', qualityValue)
        setCompressedImage(compressed)

        const compressedSizeBytes = compressed.length * 0.75
        setCompressedSize(compressedSizeBytes)
        setIsCompressing(false)
      }
      img.src = originalImage
    }, 500)
  }

  const downloadImage = () => {
    if (!compressedImage) return
    const link = document.createElement('a')
    const name = fileName.replace(/\.[^.]+$/, '') || 'compressed'
    link.download = `${name}-compressed.jpg`
    link.href = compressedImage
    link.click()
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
  }

  const getSavings = () => {
    if (!originalSize || !compressedSize) return 0
    return ((originalSize - compressedSize) / originalSize * 100).toFixed(1)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) processFile(file)
  }

  return (
    <div className="space-y-6">
      {!originalImage ? (
        <div
          className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all ${
            isDragging
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30'
              : 'border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-500'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <Upload className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {lang === 'id' ? 'Upload Gambar' : 'Upload Image'}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            {lang === 'id' 
              ? 'Drag & drop atau klik untuk memilih gambar' 
              : 'Drag & drop or click to select image'}
          </p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="btn-primary inline-flex"
          >
            <ImageIcon className="w-5 h-5 mr-2" />
            {lang === 'id' ? 'Pilih Gambar' : 'Select Image'}
          </button>
          <p className="text-xs text-gray-400 mt-4">
            {lang === 'id' ? 'Format: JPG, PNG, WebP' : 'Formats: JPG, PNG, WebP'}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <div className="flex items-center gap-3">
              <FileImage className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {fileName}
              </span>
            </div>
            <button
              onClick={() => {
                setOriginalImage(null)
                setCompressedImage(null)
              }}
              className="text-red-500 hover:text-red-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {lang === 'id' ? 'Kualitas Kompresi' : 'Compression Quality'} ({quality}%)
            </label>
            <input
              type="range"
              min="10"
              max="100"
              value={quality}
              onChange={(e) => setQuality(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>{lang === 'id' ? 'Ukuran kecil' : 'Small size'}</span>
              <span>{lang === 'id' ? 'Kualitas tinggi' : 'High quality'}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {lang === 'id' ? 'Gambar Asli' : 'Original Image'}
              </p>
              <div className="relative rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                <img src={originalImage} alt="Original" className="w-full h-auto" />
                <div className="absolute bottom-2 right-2 px-3 py-1 bg-black/70 text-white text-sm rounded-lg">
                  {formatSize(originalSize)}
                </div>
              </div>
            </div>
            {compressedImage && (
              <div className="animate-fadeIn">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {lang === 'id' ? 'Gambar Kompres' : 'Compressed Image'}
                </p>
                <div className="relative rounded-xl overflow-hidden border border-green-200 dark:border-green-700">
                  <img src={compressedImage} alt="Compressed" className="w-full h-auto" />
                  <div className="absolute bottom-2 right-2 px-3 py-1 bg-black/70 text-white text-sm rounded-lg">
                    {formatSize(compressedSize)}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={compressImage}
              disabled={isCompressing || !!compressedImage}
              className="btn-primary flex-1 min-w-[140px] flex items-center justify-center gap-2"
            >
              {isCompressing ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : compressedImage ? (
                <Check className="w-5 h-5" />
              ) : (
                <Crop className="w-5 h-5" />
              )}
              {isCompressing 
                ? (lang === 'id' ? 'Mengompres...' : 'Compressing...')
                : compressedImage 
                  ? (lang === 'id' ? 'Selesai!' : 'Done!')
                  : (lang === 'id' ? 'Kompres' : 'Compress')
              }
            </button>
            
            {compressedImage && (
              <>
                <button
                  onClick={downloadImage}
                  className="btn-secondary flex-1 min-w-[140px] flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  {lang === 'id' ? 'Download' : 'Download'}
                </button>
                <div className="flex-1 min-w-[140px] p-3 bg-green-50 dark:bg-green-950/30 rounded-xl text-center">
                  <p className="text-sm text-green-600 dark:text-green-400 font-semibold">
                    {lang === 'id' ? 'Hemat' : 'Saved'} {getSavings()}%
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatSize(originalSize)} → {formatSize(compressedSize)}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}