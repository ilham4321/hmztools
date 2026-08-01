'use client'

import { useState, useRef } from 'react'

export default function ImageCompressor({ lang }: { lang: string }) {
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [compressedImage, setCompressedImage] = useState<string | null>(null)
  const [originalSize, setOriginalSize] = useState<number>(0)
  const [compressedSize, setCompressedSize] = useState<number>(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setOriginalSize(file.size)
    const reader = new FileReader()
    reader.onload = (event) => {
      setOriginalImage(event.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const compressImage = () => {
    if (!originalImage) return

    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const maxWidth = 800
      const maxHeight = 800
      let width = img.width
      let height = img.height

      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height)
        width *= ratio
        height *= ratio
      }

      canvas.width = width
      canvas.height = height
      ctx.drawImage(img, 0, 0, width, height)

      const compressed = canvas.toDataURL('image/jpeg', 0.7)
      setCompressedImage(compressed)

      const compressedSizeBytes = compressed.length * 0.75
      setCompressedSize(compressedSizeBytes)
    }
    img.src = originalImage
  }

  const downloadImage = () => {
    if (!compressedImage) return
    const link = document.createElement('a')
    link.download = 'compressed-image.jpg'
    link.href = compressedImage
    link.click()
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
  }

  return (
    <div>
      <div className="space-y-4">
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="btn-secondary w-full"
          >
            {lang === 'id' ? 'Pilih Gambar' : 'Select Image'}
          </button>
        </div>

        {originalImage && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {lang === 'id' ? 'Gambar Asli' : 'Original Image'}
                </p>
                <img src={originalImage} alt="Original" className="max-w-full h-auto rounded-lg border border-gray-200 dark:border-gray-700" />
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{formatSize(originalSize)}</p>
              </div>
              {compressedImage && (
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {lang === 'id' ? 'Gambar Kompres' : 'Compressed Image'}
                  </p>
                  <img src={compressedImage} alt="Compressed" className="max-w-full h-auto rounded-lg border border-gray-200 dark:border-gray-700" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{formatSize(compressedSize)}</p>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <button onClick={compressImage} className="btn-primary flex-1">
                {lang === 'id' ? 'Kompres' : 'Compress'}
              </button>
              {compressedImage && (
                <button onClick={downloadImage} className="btn-secondary flex-1">
                  {lang === 'id' ? 'Download' : 'Download'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}