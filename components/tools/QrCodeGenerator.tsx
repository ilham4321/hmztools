'use client'

import { useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { Download, RefreshCw, Palette, Maximize, Minimize, Copy, Check } from 'lucide-react'

export default function QrCodeGenerator({ lang }: { lang: string }) {
  const [text, setText] = useState('')
  const [size, setSize] = useState(256)
  const [fgColor, setFgColor] = useState('#000000')
  const [bgColor, setBgColor] = useState('#ffffff')
  const [copied, setCopied] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  const generateQR = () => {
    if (!text) return
    setIsGenerating(true)
    setTimeout(() => setIsGenerating(false), 500)
  }

  const downloadQR = () => {
    const canvas = document.querySelector('canvas')
    if (canvas) {
      const link = document.createElement('a')
      link.download = `qrcode-${text.substring(0, 20)}.png`
      link.href = canvas.toDataURL()
      link.click()
    }
  }

  const copyText = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const presets = [
    { name: 'Default', fg: '#000000', bg: '#ffffff' },
    { name: 'Blue', fg: '#2563eb', bg: '#ffffff' },
    { name: 'Purple', fg: '#7c3aed', bg: '#ffffff' },
    { name: 'Pink', fg: '#ec4899', bg: '#ffffff' },
    { name: 'Green', fg: '#16a34a', bg: '#ffffff' },
    { name: 'Dark', fg: '#ffffff', bg: '#1a1a1a' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {lang === 'id' ? 'Teks atau URL' : 'Text or URL'}
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="https://example.com"
            className="input-field flex-1"
            onKeyDown={(e) => e.key === 'Enter' && generateQR()}
          />
          <button
            onClick={copyText}
            className="p-3 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            title={lang === 'id' ? 'Salin' : 'Copy'}
          >
            {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              {lang === 'id' ? 'Warna QR' : 'QR Colors'}
            </div>
          </label>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-xs text-gray-500">{lang === 'id' ? 'Depan' : 'Foreground'}</label>
              <input
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="w-full h-10 rounded-lg cursor-pointer"
              />
            </div>
            <div className="flex-1">
              <label className="text-xs text-gray-500">{lang === 'id' ? 'Belakang' : 'Background'}</label>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-full h-10 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <div className="flex items-center gap-2">
              <Maximize className="w-4 h-4" />
              {lang === 'id' ? 'Ukuran' : 'Size'}
            </div>
          </label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="128"
              max="512"
              value={size}
              onChange={(e) => setSize(parseInt(e.target.value))}
              className="flex-1"
            />
            <span className="text-sm font-bold text-blue-600 dark:text-blue-400 w-12">
              {size}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="text-xs text-gray-500 self-center">
          {lang === 'id' ? 'Preset:' : 'Presets:'}
        </span>
        {presets.map((preset) => (
          <button
            key={preset.name}
            onClick={() => {
              setFgColor(preset.fg)
              setBgColor(preset.bg)
            }}
            className="px-3 py-1 text-xs rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <span className="flex items-center gap-1">
              <span 
                className="w-3 h-3 rounded-full border border-gray-300"
                style={{ backgroundColor: preset.fg }}
              />
              {preset.name}
            </span>
          </button>
        ))}
      </div>

      <button
        onClick={generateQR}
        disabled={!text || isGenerating}
        className="btn-primary w-full flex items-center justify-center gap-2"
      >
        {isGenerating ? (
          <RefreshCw className="w-5 h-5 animate-spin" />
        ) : (
          <RefreshCw className="w-5 h-5" />
        )}
        {lang === 'id' ? 'Generate QR Code' : 'Generate QR Code'}
      </button>

      {text && (
        <div className="flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl animate-fadeIn">
          <div className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
            <QRCodeCanvas 
              value={text} 
              size={size} 
              fgColor={fgColor}
              bgColor={bgColor}
              level="H"
              includeMargin
            />
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={downloadQR}
              className="btn-primary flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              {lang === 'id' ? 'Download' : 'Download'}
            </button>
            <button
              onClick={() => {
                const canvas = document.querySelector('canvas')
                if (canvas) {
                  const link = document.createElement('a')
                  link.download = 'qrcode.svg'
                  const svg = canvas.toDataURL('image/svg+xml')
                  link.href = svg
                  link.click()
                }
              }}
              className="btn-secondary flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              SVG
            </button>
          </div>
        </div>
      )}
    </div>
  )
}