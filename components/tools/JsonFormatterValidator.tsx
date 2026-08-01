'use client'

import { useState } from 'react'
import { Code, CheckCircle, XCircle, Copy, Trash2, Download, Upload } from 'lucide-react'

export default function JsonFormatterValidator({ lang }: { lang: string }) {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [copied, setCopied] = useState(false)
  const [indentSize, setIndentSize] = useState(2)

  const validateAndFormat = () => {
    try {
      const parsed = JSON.parse(input)
      setIsValid(true)
      setError('')
      const formatted = JSON.stringify(parsed, null, indentSize)
      setOutput(formatted)
    } catch (e) {
      setIsValid(false)
      setError(e instanceof Error ? e.message : lang === 'id' ? 'JSON tidak valid' : 'Invalid JSON')
      setOutput('')
    }
  }

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input)
      setIsValid(true)
      setError('')
      const minified = JSON.stringify(parsed)
      setOutput(minified)
    } catch (e) {
      setIsValid(false)
      setError(e instanceof Error ? e.message : lang === 'id' ? 'JSON tidak valid' : 'Invalid JSON')
      setOutput('')
    }
  }

  const copyToClipboard = () => {
    if (!output) return
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const clearAll = () => {
    setInput('')
    setOutput('')
    setError('')
    setIsValid(null)
  }

  const downloadJson = () => {
    if (!output) return
    const blob = new Blob([output], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.download = 'formatted.json'
    link.href = url
    link.click()
    URL.revokeObjectURL(url)
  }

  const uploadJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      setInput(event.target?.result as string)
    }
    reader.readAsText(file)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={validateAndFormat}
          className="btn-primary flex items-center gap-2"
        >
          <Code className="w-4 h-4" />
          {lang === 'id' ? 'Format & Validasi' : 'Format & Validate'}
        </button>
        <button
          onClick={minifyJson}
          className="btn-secondary flex items-center gap-2"
        >
          <Code className="w-4 h-4" />
          {lang === 'id' ? 'Minify' : 'Minify'}
        </button>
        <div className="flex-1" />
        <button
          onClick={clearAll}
          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>
        <label className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg cursor-pointer transition-colors">
          <Upload className="w-5 h-5" />
          <input type="file" accept=".json" onChange={uploadJson} className="hidden" />
        </label>
      </div>

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

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl">
          <div className="flex items-start gap-3">
            <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-red-700 dark:text-red-400">
                {lang === 'id' ? 'Error Validasi' : 'Validation Error'}
              </p>
              <p className="text-sm text-red-600 dark:text-red-300">{error}</p>
            </div>
          </div>
        </div>
      )}

      {isValid !== null && !error && (
        <div className="p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="font-medium text-green-700 dark:text-green-400">
              {lang === 'id' ? 'JSON Valid ✓' : 'Valid JSON ✓'}
            </span>
            <span className="text-sm text-green-600 dark:text-green-300">
              {lang === 'id' ? 'Siap digunakan' : 'Ready to use'}
            </span>
          </div>
        </div>
      )}

      {output && (
        <div className="animate-fadeIn">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {lang === 'id' ? 'Output' : 'Output'}
            </label>
            <div className="flex gap-2">
              <button
                onClick={copyToClipboard}
                className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                title={lang === 'id' ? 'Salin' : 'Copy'}
              >
                {copied ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </button>
              <button
                onClick={downloadJson}
                className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                title={lang === 'id' ? 'Download' : 'Download'}
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <pre className="text-sm font-mono text-gray-900 dark:text-white whitespace-pre-wrap break-all max-h-96 overflow-y-auto">
              {output}
            </pre>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-400 mt-2">
            <span>
              {lang === 'id' ? 'Jumlah karakter' : 'Character count'}: {output.length}
            </span>
            <span>
              {lang === 'id' ? 'Baris' : 'Lines'}: {output.split('\n').length}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}