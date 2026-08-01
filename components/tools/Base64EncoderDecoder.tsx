'use client'

import { useState } from 'react'
import { Lock, Unlock, Copy, Check, RefreshCw, Upload, Download } from 'lucide-react'

export default function Base64EncoderDecoder({ lang }: { lang: string }) {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [copied, setCopied] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState('')

  const processBase64 = () => {
    if (!input) {
      setError(lang === 'id' ? 'Masukkan teks terlebih dahulu' : 'Please enter text first')
      return
    }
    
    setIsProcessing(true)
    setError('')
    setCopied(false)
    
    setTimeout(() => {
      try {
        if (mode === 'encode') {
          const encoded = btoa(unescape(encodeURIComponent(input)))
          setOutput(encoded)
        } else {
          const decoded = decodeURIComponent(escape(atob(input)))
          setOutput(decoded)
        }
        setIsProcessing(false)
      } catch (e) {
        setError(lang === 'id' ? 'Input tidak valid untuk Base64' : 'Invalid input for Base64')
        setOutput('')
        setIsProcessing(false)
      }
    }, 300)
  }

  const copyToClipboard = () => {
    if (!output) return
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const swapMode = () => {
    setMode(mode === 'encode' ? 'decode' : 'encode')
    setInput('')
    setOutput('')
    setError('')
    setCopied(false)
  }

  const clearAll = () => {
    setInput('')
    setOutput('')
    setError('')
    setCopied(false)
  }

  const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      if (mode === 'encode') {
        setInput(content)
      } else {
        setInput(content.trim())
      }
    }
    reader.readAsText(file)
  }

  const downloadOutput = () => {
    if (!output) return
    const blob = new Blob([output], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.download = `output.${mode === 'encode' ? 'b64' : 'txt'}`
    link.href = url
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setMode('encode')}
          className={`flex-1 min-w-[100px] py-2 rounded-lg font-medium transition-all ${
            mode === 'encode'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          <Lock className="w-4 h-4 inline mr-1" />
          {lang === 'id' ? 'Encode' : 'Encode'}
        </button>
        <button
          onClick={() => setMode('decode')}
          className={`flex-1 min-w-[100px] py-2 rounded-lg font-medium transition-all ${
            mode === 'decode'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          <Unlock className="w-4 h-4 inline mr-1" />
          {lang === 'id' ? 'Decode' : 'Decode'}
        </button>
        <button
          onClick={swapMode}
          className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        <label className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg cursor-pointer transition-colors text-sm">
          <Upload className="w-4 h-4 inline mr-1" />
          {lang === 'id' ? 'Upload File' : 'Upload File'}
          <input type="file" accept=".txt,.b64" onChange={uploadFile} className="hidden" />
        </label>
        <button
          onClick={clearAll}
          className="px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors text-sm"
        >
          {lang === 'id' ? 'Hapus' : 'Clear'}
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {lang === 'id' ? 'Input' : 'Input'}
          <span className="text-xs text-gray-400 ml-2">
            ({mode === 'encode' ? 'Plain Text' : 'Base64'})
          </span>
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
          className="input-field font-mono text-sm"
          placeholder={
            mode === 'encode' 
              ? 'Hello World' 
              : 'SGVsbG8gV29ybGQ='
          }
        />
      </div>

      <button
        onClick={processBase64}
        disabled={isProcessing || !input}
        className="btn-primary w-full flex items-center justify-center gap-2"
      >
        {isProcessing ? (
          <RefreshCw className="w-5 h-5 animate-spin" />
        ) : mode === 'encode' ? (
          <Lock className="w-5 h-5" />
        ) : (
          <Unlock className="w-5 h-5" />
        )}
        {mode === 'encode' ? (lang === 'id' ? 'Encode' : 'Encode') : (lang === 'id' ? 'Decode' : 'Decode')}
      </button>

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl">
          <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
        </div>
      )}

      {output && (
        <div className="animate-fadeIn space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {lang === 'id' ? 'Hasil' : 'Result'}
            </label>
            <div className="flex gap-2">
              <button
                onClick={copyToClipboard}
                className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                title={lang === 'id' ? 'Salin' : 'Copy'}
              >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </button>
              <button
                onClick={downloadOutput}
                className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                title={lang === 'id' ? 'Download' : 'Download'}
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <code className="text-sm font-mono text-gray-900 dark:text-white break-all select-all">
              {output}
            </code>
          </div>
          <div className="text-xs text-gray-400">
            {lang === 'id' ? 'Panjang' : 'Length'}: {output.length} {lang === 'id' ? 'karakter' : 'characters'}
          </div>
        </div>
      )}
    </div>
  )
}