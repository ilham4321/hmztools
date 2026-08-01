'use client'

import { useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react'

export default function QrCodeGenerator({ lang }: { lang: string }) {
  const [text, setText] = useState('')
  const [size, setSize] = useState(200)

  return (
    <div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {lang === 'id' ? 'Teks atau URL' : 'Text or URL'}
          </label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="https://example.com"
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {lang === 'id' ? 'Ukuran' : 'Size'} ({size}px)
          </label>
          <input
            type="range"
            min="100"
            max="400"
            value={size}
            onChange={(e) => setSize(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
        {text && (
          <div className="flex flex-col items-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <QRCodeCanvas value={text} size={size} level="H" />
            <button
              onClick={() => {
                const canvas = document.querySelector('canvas')
                if (canvas) {
                  const link = document.createElement('a')
                  link.download = 'qrcode.png'
                  link.href = canvas.toDataURL()
                  link.click()
                }
              }}
              className="mt-4 btn-primary"
            >
              {lang === 'id' ? 'Download QR Code' : 'Download QR Code'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}