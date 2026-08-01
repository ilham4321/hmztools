'use client'

import { useState } from 'react'
import { Link, Copy, Check, RefreshCw, ExternalLink, Upload, Download } from 'lucide-react'

export default function UrlEncoderDecoder({ lang }: { lang: string }) {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [copied, setCopied] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState('')
  const [encodeMode, setEncodeMode] = useState<'component' | 'full'>('component')

  const processUrl = () => {
    if (!input) {
      setError(lang === 'id' ? 'Masukkan URL terlebih dahulu' : 'Please enter URL first')
      return
    }
    
    setIsProcessing(true)
    setError('')
    setCopied(false)
    
    setTimeout(() => {
      try {
        if (mode === 'encode') {
          const encoded = encodeMode === 'component' 
            ? encodeURIComponent(input)
            : encodeURI(input)
          setOutput(encoded)
        } else {
          const decoded = decodeMode === 'component'
            ? decodeURIComponent(input)
            : decodeURI(input)
          setOutput(decoded)
        }
        setIsProcessing(false)
      } catch (e) {
        setError(lang === 'id' ? 'URL tidak valid' : 'Invalid URL')
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

  const openUrl = () => {
    if (!output) return
    window.open(output, '_blank')
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
          <Link className="w-4 h-4 inline mr-1" />
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
          <ExternalLink className="w-4 h-4 inline mr-1" />
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
        <button
          onClick={() => setEncodeMode('component')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            encodeMode === 'component'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          {lang === 'id' ? 'Component' : 'Component'}
        </button>
        <button
          onClick={() => setEncodeMode('full')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            encodeMode === 'full'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          {lang === 'id' ? 'Full URL' : 'Full URL'}
        </button>
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
            ({mode === 'encode' ? 'URL' : 'Encoded URL'})
          </span>
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={3}
          className="input-field font-mono text-sm"
          placeholder={
            mode === 'encode' 
              ? 'https://example.com?q=hello world' 
              : 'https%3A%2F%2Fexample.com%3Fq%3Dhello%20world'
          }
        />
      </div>

      <button
        onClick={processUrl}
        disabled={isProcessing || !input}
        className="btn-primary w-full flex items-center justify-center gap-2"
      >
        {isProcessing ? (
          <RefreshCw className="w-5 h-5 animate-spin" />
        ) : mode === 'encode' ? (
          <Link className="w-5 h-5" />
        ) : (
          <ExternalLink className="w-5 h-5" />
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
              {mode === 'decode' && (
                <button
                  onClick={openUrl}
                  className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                  title={lang === 'id' ? 'Buka URL' : 'Open URL'}
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 break-all">
            <code className="text-sm font-mono text-gray-900 dark:text-white select-all">
              {output}
            </code>
          </div>
        </div>
      )}
    </div>
  )
}