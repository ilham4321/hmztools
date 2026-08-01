'use client'

import { useState } from 'react'
import * as CryptoJS from 'crypto-js'
import { Shield, Copy, Check, RefreshCw, Lock, Hash } from 'lucide-react'

export default function HashGenerator({ lang }: { lang: string }) {
  const [input, setInput] = useState('')
  const [results, setResults] = useState<{
    md5: string
    sha1: string
    sha256: string
    sha512: string
    sha3: string
  }>({ md5: '', sha1: '', sha256: '', sha512: '', sha3: '' })
  const [copied, setCopied] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedHash, setSelectedHash] = useState<'md5' | 'sha1' | 'sha256' | 'sha512' | 'sha3'>('sha256')

  const generateHashes = () => {
    if (!input) return
    
    setIsGenerating(true)
    setTimeout(() => {
      setResults({
        md5: CryptoJS.MD5(input).toString(),
        sha1: CryptoJS.SHA1(input).toString(),
        sha256: CryptoJS.SHA256(input).toString(),
        sha512: CryptoJS.SHA512(input).toString(),
        sha3: CryptoJS.SHA3(input).toString()
      })
      setIsGenerating(false)
    }, 300)
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  const hashInfo = {
    md5: { 
      label: 'MD5', 
      length: 32, 
      color: 'blue',
      desc: lang === 'id' ? 'Cepat, tidak aman' : 'Fast, not secure'
    },
    sha1: { 
      label: 'SHA-1', 
      length: 40, 
      color: 'purple',
      desc: lang === 'id' ? 'Cukup cepat' : 'Quite fast'
    },
    sha256: { 
      label: 'SHA-256', 
      length: 64, 
      color: 'green',
      desc: lang === 'id' ? 'Aman, standar' : 'Secure, standard'
    },
    sha512: { 
      label: 'SHA-512', 
      length: 128, 
      color: 'orange',
      desc: lang === 'id' ? 'Sangat aman' : 'Very secure'
    },
    sha3: { 
      label: 'SHA-3', 
      length: 64, 
      color: 'pink',
      desc: lang === 'id' ? 'Terbaru, aman' : 'Latest, secure'
    }
  }

  const getColorClass = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800',
      purple: 'bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800',
      green: 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800',
      orange: 'bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800',
      pink: 'bg-pink-50 dark:bg-pink-950/30 border-pink-200 dark:border-pink-800'
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  const getTextColorClass = (color: string) => {
    const colors = {
      blue: 'text-blue-600 dark:text-blue-400',
      purple: 'text-purple-600 dark:text-purple-400',
      green: 'text-green-600 dark:text-green-400',
      orange: 'text-orange-600 dark:text-orange-400',
      pink: 'text-pink-600 dark:text-pink-400'
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl">
        <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        <span className="text-sm text-gray-700 dark:text-gray-300">
          {lang === 'id' 
            ? 'Hash digunakan untuk verifikasi integritas data dan keamanan' 
            : 'Hash is used for data integrity verification and security'}
        </span>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {lang === 'id' ? 'Input Teks' : 'Text Input'}
        </label>
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={3}
            className="input-field flex-1 font-mono text-sm"
            placeholder={lang === 'id' ? 'Masukkan teks untuk di-hash...' : 'Enter text to hash...'}
          />
          <button
            onClick={generateHashes}
            disabled={isGenerating || !input}
            className="btn-primary px-6 flex items-center justify-center"
          >
            {isGenerating ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <Lock className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {results.md5 && (
        <div className="space-y-3 animate-fadeIn">
          <div className="flex flex-wrap gap-2 mb-2">
            {Object.entries(hashInfo).map(([key, info]) => (
              <button
                key={key}
                onClick={() => setSelectedHash(key as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedHash === key
                    ? `bg-${info.color}-600 text-white shadow-lg shadow-${info.color}-500/25`
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {info.label}
              </button>
            ))}
          </div>

          {Object.entries(results).map(([key, value]) => {
            const info = hashInfo[key as keyof typeof hashInfo]
            if (!info) return null
            const isSelected = selectedHash === key
            
            return (
              <div
                key={key}
                className={`p-4 rounded-xl border transition-all ${
                  isSelected ? getColorClass(info.color) : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                } ${isSelected ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
                style={{ display: isSelected ? 'block' : 'none' }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Hash className={`w-5 h-5 ${getTextColorClass(info.color)}`} />
                    <span className={`font-semibold ${getTextColorClass(info.color)}`}>
                      {info.label}
                    </span>
                    <span className="text-xs text-gray-400">
                      {info.length} {lang === 'id' ? 'karakter' : 'chars'} • {info.desc}
                    </span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(value, key)}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    {copied === key ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <code className="text-sm font-mono text-gray-900 dark:text-white break-all select-all">
                  {value}
                </code>
              </div>
            )
          })}

          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
              <div>
                <span className="text-gray-500">MD5:</span>
                <span className="text-gray-700 dark:text-gray-300 ml-1">{results.md5.substring(0, 12)}...</span>
              </div>
              <div>
                <span className="text-gray-500">SHA-1:</span>
                <span className="text-gray-700 dark:text-gray-300 ml-1">{results.sha1.substring(0, 12)}...</span>
              </div>
              <div>
                <span className="text-gray-500">SHA-256:</span>
                <span className="text-gray-700 dark:text-gray-300 ml-1">{results.sha256.substring(0, 12)}...</span>
              </div>
              <div>
                <span className="text-gray-500">SHA-512:</span>
                <span className="text-gray-700 dark:text-gray-300 ml-1">{results.sha512.substring(0, 12)}...</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}