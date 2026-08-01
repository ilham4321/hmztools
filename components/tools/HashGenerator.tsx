'use client'

import { useState } from 'react'
import * as CryptoJS from 'crypto-js'

export default function HashGenerator({ lang }: { lang: string }) {
  const [input, setInput] = useState('')
  const [results, setResults] = useState<{
    md5: string
    sha1: string
    sha256: string
  }>({ md5: '', sha1: '', sha256: '' })

  const generateHashes = () => {
    if (!input) return
    setResults({
      md5: CryptoJS.MD5(input).toString(),
      sha1: CryptoJS.SHA1(input).toString(),
      sha256: CryptoJS.SHA256(input).toString()
    })
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {lang === 'id' ? 'Input Teks' : 'Text Input'}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={4}
            className="input-field font-mono text-sm"
            placeholder={lang === 'id' ? 'Masukkan teks untuk di-hash...' : 'Enter text to hash...'}
          />
        </div>
        <button onClick={generateHashes} className="btn-primary w-full">
          {lang === 'id' ? 'Generate Hash' : 'Generate Hash'}
        </button>
        {results.md5 && (
          <div className="space-y-3">
            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">MD5</span>
                <button
                  onClick={() => copyToClipboard(results.md5)}
                  className="px-2 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                >
                  {lang === 'id' ? 'Salin' : 'Copy'}
                </button>
              </div>
              <code className="text-sm font-mono text-gray-900 dark:text-white break-all">
                {results.md5}
              </code>
            </div>
            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">SHA-1</span>
                <button
                  onClick={() => copyToClipboard(results.sha1)}
                  className="px-2 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                >
                  {lang === 'id' ? 'Salin' : 'Copy'}
                </button>
              </div>
              <code className="text-sm font-mono text-gray-900 dark:text-white break-all">
                {results.sha1}
              </code>
            </div>
            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">SHA-256</span>
                <button
                  onClick={() => copyToClipboard(results.sha256)}
                  className="px-2 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                >
                  {lang === 'id' ? 'Salin' : 'Copy'}
                </button>
              </div>
              <code className="text-sm font-mono text-gray-900 dark:text-white break-all">
                {results.sha256}
              </code>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}