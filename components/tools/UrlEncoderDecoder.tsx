'use client'

import { useState } from 'react'

export default function UrlEncoderDecoder({ lang }: { lang: string }) {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')

  const processUrl = () => {
    try {
      if (mode === 'encode') {
        setOutput(encodeURIComponent(input))
      } else {
        setOutput(decodeURIComponent(input))
      }
    } catch (e) {
      setOutput(lang === 'id' ? 'Input tidak valid' : 'Invalid input')
    }
  }

  return (
    <div>
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            onClick={() => setMode('encode')}
            className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
              mode === 'encode'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            {lang === 'id' ? 'Encode' : 'Encode'}
          </button>
          <button
            onClick={() => setMode('decode')}
            className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
              mode === 'decode'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            {lang === 'id' ? 'Decode' : 'Decode'}
          </button>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {lang === 'id' ? 'Input' : 'Input'}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={4}
            className="input-field font-mono text-sm"
            placeholder={mode === 'encode' ? 'https://example.com?q=hello world' : 'https%3A%2F%2Fexample.com%3Fq%3Dhello%20world'}
          />
        </div>
        <button onClick={processUrl} className="btn-primary w-full">
          {mode === 'encode' ? (lang === 'id' ? 'Encode' : 'Encode') : (lang === 'id' ? 'Decode' : 'Decode')}
        </button>
        {output && (
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {lang === 'id' ? 'Hasil' : 'Result'}
            </p>
            <code className="text-sm font-mono text-gray-900 dark:text-white break-all">
              {output}
            </code>
          </div>
        )}
      </div>
    </div>
  )
}