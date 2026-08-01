'use client'

import { useState } from 'react'

export default function JsonFormatterValidator({ lang }: { lang: string }) {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input)
      const formatted = JSON.stringify(parsed, null, 2)
      setOutput(formatted)
      setError('')
    } catch (e) {
      setError(lang === 'id' ? 'JSON tidak valid' : 'Invalid JSON')
      setOutput('')
    }
  }

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input)
      const minified = JSON.stringify(parsed)
      setOutput(minified)
      setError('')
    } catch (e) {
      setError(lang === 'id' ? 'JSON tidak valid' : 'Invalid JSON')
      setOutput('')
    }
  }

  return (
    <div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {lang === 'id' ? 'Input JSON' : 'JSON Input'}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={6}
            className="input-field font-mono text-sm"
            placeholder='{"name": "HmzTools", "version": "1.0"}'
          />
        </div>
        <div className="flex gap-2">
          <button onClick={formatJson} className="btn-primary flex-1">
            {lang === 'id' ? 'Format' : 'Format'}
          </button>
          <button onClick={minifyJson} className="btn-secondary flex-1">
            {lang === 'id' ? 'Minify' : 'Minify'}
          </button>
        </div>
        {error && (
          <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg">
            {error}
          </div>
        )}
        {output && (
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <pre className="text-sm font-mono text-gray-900 dark:text-white whitespace-pre-wrap break-all">
              {output}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}