'use client'

import { useState } from 'react'

export default function ColorConverter({ lang }: { lang: string }) {
  const [hex, setHex] = useState('#3498db')
  const [rgb, setRgb] = useState('52, 152, 219')
  const [hsl, setHsl] = useState('204, 70%, 53%')

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

  const handleHexChange = (value: string) => {
    setHex(value)
    const rgbResult = hexToRgb(value)
    if (rgbResult) {
      setRgb(`${rgbResult.r}, ${rgbResult.g}, ${rgbResult.b}`)
      const hslResult = rgbToHsl(rgbResult.r, rgbResult.g, rgbResult.b)
      setHsl(`${hslResult.h}, ${hslResult.s}%, ${hslResult.l}%`)
    }
  }

  return (
    <div>
      <div className="space-y-4">
        <div className="w-full h-32 rounded-lg" style={{ backgroundColor: hex }} />
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            HEX
          </label>
          <input
            type="text"
            value={hex}
            onChange={(e) => handleHexChange(e.target.value)}
            className="input-field font-mono"
            placeholder="#3498db"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            RGB
          </label>
          <input
            type="text"
            value={rgb}
            onChange={(e) => {
              setRgb(e.target.value)
              const parts = e.target.value.split(',').map(s => parseInt(s.trim()))
              if (parts.length === 3 && parts.every(n => !isNaN(n) && n >= 0 && n <= 255)) {
                const hslResult = rgbToHsl(parts[0], parts[1], parts[2])
                setHsl(`${hslResult.h}, ${hslResult.s}%, ${hslResult.l}%`)
                const hexValue = '#' + parts.map(n => n.toString(16).padStart(2, '0')).join('')
                setHex(hexValue)
              }
            }}
            className="input-field font-mono"
            placeholder="52, 152, 219"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            HSL
          </label>
          <input
            type="text"
            value={hsl}
            onChange={(e) => {
              setHsl(e.target.value)
              const parts = e.target.value.split(',').map(s => parseInt(s.trim()))
              if (parts.length === 3 && !isNaN(parts[0])) {
                const h = parts[0] / 360
                const s = parts[1] / 100
                const l = parts[2] / 100
                // Simple HSL to RGB conversion
                const rgbResult = hslToRgb(h, s, l)
                if (rgbResult) {
                  setRgb(`${rgbResult.r}, ${rgbResult.g}, ${rgbResult.b}`)
                  setHex('#' + [rgbResult.r, rgbResult.g, rgbResult.b].map(n => n.toString(16).padStart(2, '0')).join(''))
                }
              }
            }}
            className="input-field font-mono"
            placeholder="204, 70%, 53%"
          />
        </div>
      </div>
    </div>
  )
}

function hslToRgb(h: number, s: number, l: number) {
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