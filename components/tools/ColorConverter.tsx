'use client'

import { useState, useEffect } from 'react'
import { Palette, Copy, Check, RefreshCw, Eye, Droplet } from 'lucide-react'

export default function ColorConverter({ lang }: { lang: string }) {
  const [hex, setHex] = useState('#3498db')
  const [rgb, setRgb] = useState('52, 152, 219')
  const [hsl, setHsl] = useState('204, 70%, 53%')
  const [copied, setCopied] = useState<string | null>(null)
  const [history, setHistory] = useState<string[]>(['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6'])

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    if (!result) return null
    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    }
  }

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255
    g /= 255
    b /= 255
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0, s = 0, l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
        case g: h = ((b - r) / d + 2) / 6; break
        case b: h = ((r - g) / d + 4) / 6; break
      }
    }
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    }
  }

  const hslToRgb = (h: number, s: number, l: number) => {
    h /= 360
    s /= 100
    l /= 100
    let r, g, b
    if (s === 0) {
      r = g = b = l
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1
        if (t > 1) t -= 1
        if (t < 1/6) return p + (q - p) * 6 * t
        if (t < 1/2) return q
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
        return p
      }
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s
      const p = 2 * l - q
      r = hue2rgb(p, q, h + 1/3)
      g = hue2rgb(p, q, h)
      b = hue2rgb(p, q, h - 1/3)
    }
    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    }
  }

  const handleHexChange = (value: string) => {
    setHex(value)
    const rgbResult = hexToRgb(value)
    if (rgbResult) {
      setRgb(`${rgbResult.r}, ${rgbResult.g}, ${rgbResult.b}`)
      const hslResult = rgbToHsl(rgbResult.r, rgbResult.g, rgbResult.b)
      setHsl(`${hslResult.h}, ${hslResult.s}%, ${hslResult.l}%`)
      if (!history.includes(value)) {
        setHistory(prev => [value, ...prev].slice(0, 10))
      }
    }
  }

  const handleRgbChange = (value: string) => {
    setRgb(value)
    const parts = value.split(',').map(s => parseInt(s.trim()))
    if (parts.length === 3 && parts.every(n => !isNaN(n) && n >= 0 && n <= 255)) {
      const hslResult = rgbToHsl(parts[0], parts[1], parts[2])
      setHsl(`${hslResult.h}, ${hslResult.s}%, ${hslResult.l}%`)
      const hexValue = '#' + parts.map(n => n.toString(16).padStart(2, '0')).join('')
      setHex(hexValue)
      if (!history.includes(hexValue)) {
        setHistory(prev => [hexValue, ...prev].slice(0, 10))
      }
    }
  }

  const handleHslChange = (value: string) => {
    setHsl(value)
    const parts = value.split(',').map(s => parseInt(s.trim()))
    if (parts.length === 3 && !isNaN(parts[0])) {
      const rgbResult = hslToRgb(parts[0], parts[1], parts[2])
      if (rgbResult) {
        setRgb(`${rgbResult.r}, ${rgbResult.g}, ${rgbResult.b}`)
        const hexValue = '#' + [rgbResult.r, rgbResult.g, rgbResult.b].map(n => n.toString(16).padStart(2, '0')).join('')
        setHex(hexValue)
        if (!history.includes(hexValue)) {
          setHistory(prev => [hexValue, ...prev].slice(0, 10))
        }
      }
    }
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  const randomColor = () => {
    const randomHex = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')
    handleHexChange(randomHex)
  }

  const complementaryColor = () => {
    const rgbResult = hexToRgb(hex)
    if (rgbResult) {
      const comp = {
        r: 255 - rgbResult.r,
        g: 255 - rgbResult.g,
        b: 255 - rgbResult.b
      }
      const hexValue = '#' + [comp.r, comp.g, comp.b].map(n => n.toString(16).padStart(2, '0')).join('')
      handleHexChange(hexValue)
    }
  }

  const getTextColor = () => {
    const rgbResult = hexToRgb(hex)
    if (rgbResult) {
      const brightness = (rgbResult.r * 299 + rgbResult.g * 587 + rgbResult.b * 114) / 1000
      return brightness > 128 ? '#000000' : '#ffffff'
    }
    return '#000000'
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={randomColor}
          className="btn-secondary flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          {lang === 'id' ? 'Acak' : 'Random'}
        </button>
        <button
          onClick={complementaryColor}
          className="btn-secondary flex items-center gap-2"
        >
          <Palette className="w-4 h-4" />
          {lang === 'id' ? 'Komplementer' : 'Complementary'}
        </button>
      </div>

      <div 
        className="w-full h-48 rounded-2xl transition-all duration-300 relative overflow-hidden"
        style={{ backgroundColor: hex }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center" style={{ color: getTextColor() }}>
            <p className="text-2xl font-bold">{hex}</p>
            <p className="text-sm opacity-80">RGB({rgb})</p>
            <p className="text-sm opacity-80">HSL({hsl})</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              HEX
            </div>
          </label>
          <div className="flex gap-2">
            <input
              type="color"
              value={hex}
              onChange={(e) => handleHexChange(e.target.value)}
              className="w-12 h-12 rounded-lg cursor-pointer border border-gray-200 dark:border-gray-700"
            />
            <input
              type="text"
              value={hex}
              onChange={(e) => handleHexChange(e.target.value)}
              className="input-field flex-1 font-mono"
            />
            <button
              onClick={() => copyToClipboard(hex, 'hex')}
              className="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
            >
              {copied === 'hex' ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <div className="flex items-center gap-2">
              <Droplet className="w-4 h-4" />
              RGB
            </div>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={rgb}
              onChange={(e) => handleRgbChange(e.target.value)}
              className="input-field flex-1 font-mono"
              placeholder="52, 152, 219"
            />
            <button
              onClick={() => copyToClipboard(`rgb(${rgb})`, 'rgb')}
              className="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
            >
              {copied === 'rgb' ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              HSL
            </div>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={hsl}
              onChange={(e) => handleHslChange(e.target.value)}
              className="input-field flex-1 font-mono"
              placeholder="204, 70%, 53%"
            />
            <button
              onClick={() => copyToClipboard(`hsl(${hsl})`, 'hsl')}
              className="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
            >
              {copied === 'hsl' ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {history.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {lang === 'id' ? 'Riwayat Warna' : 'Color History'}
          </h4>
          <div className="flex flex-wrap gap-2">
            {history.map((color, index) => (
              <button
                key={index}
                onClick={() => handleHexChange(color)}
                className="w-10 h-10 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}