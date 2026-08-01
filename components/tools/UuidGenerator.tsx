'use client'

import { useState } from 'react'
import { Copy, Check, RefreshCw, Hash, Clock, GitBranch } from 'lucide-react'

export default function UuidGenerator({ lang }: { lang: string }) {
  const [uuid, setUuid] = useState('')
  const [copied, setCopied] = useState(false)
  const [history, setHistory] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [version, setVersion] = useState<'v4' | 'v1' | 'v3' | 'v5'>('v4')

  const generateUUID = () => {
    setIsGenerating(true)
    setTimeout(() => {
      let newUuid = ''
      
      if (version === 'v4') {
        newUuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          const r = Math.random() * 16 | 0
          const v = c === 'x' ? r : (r & 0x3 | 0x8)
          return v.toString(16)
        })
      } else if (version === 'v1') {
        // Simulasi UUID v1 (time-based)
        const timestamp = Date.now().toString(16).padStart(12, '0')
        const random = Math.random().toString(16).substring(2, 15)
        newUuid = `${timestamp.substring(0, 8)}-${timestamp.substring(8, 12)}-1${random.substring(0, 3)}-${random.substring(3, 7)}-${random.substring(7, 19)}`
      } else {
        // v3 dan v5 simulasi
        newUuid = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[x]/g, function(c) {
          const r = Math.random() * 16 | 0
          return r.toString(16)
        })
      }
      
      setUuid(newUuid)
      setHistory(prev => [newUuid, ...prev].slice(0, 10))
      setIsGenerating(false)
    }, 300)
  }

  const copyToClipboard = () => {
    if (!uuid) return
    navigator.clipboard.writeText(uuid)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const clearHistory = () => {
    setHistory([])
  }

  const getVersionInfo = () => {
    const versions = {
      v1: { 
        label: 'UUID v1', 
        desc: lang === 'id' ? 'Berbasis waktu dan MAC address' : 'Time-based with MAC address',
        emoji: '⏰'
      },
      v3: { 
        label: 'UUID v3', 
        desc: lang === 'id' ? 'Berbasis MD5 hash' : 'MD5 hash based',
        emoji: '🔐'
      },
      v4: { 
        label: 'UUID v4', 
        desc: lang === 'id' ? 'Acak (paling umum)' : 'Random (most common)',
        emoji: '🎲'
      },
      v5: { 
        label: 'UUID v5', 
        desc: lang === 'id' ? 'Berbasis SHA-1 hash' : 'SHA-1 hash based',
        emoji: '🔒'
      }
    }
    return versions[version]
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2 flex-wrap">
        {(['v1', 'v3', 'v4', 'v5'] as const).map((v) => (
          <button
            key={v}
            onClick={() => setVersion(v)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              version === v
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {v.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl">
        <div className="flex items-center gap-2">
          <span className="text-xl">{getVersionInfo().emoji}</span>
          <span className="font-medium text-gray-900 dark:text-white">
            {getVersionInfo().label}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            - {getVersionInfo().desc}
          </span>
        </div>
      </div>

      <button
        onClick={generateUUID}
        disabled={isGenerating}
        className="btn-primary w-full flex items-center justify-center gap-2"
      >
        {isGenerating ? (
          <RefreshCw className="w-5 h-5 animate-spin" />
        ) : (
          <Hash className="w-5 h-5" />
        )}
        {lang === 'id' ? `Generate ${version.toUpperCase()}` : `Generate ${version.toUpperCase()}`}
      </button>

      {uuid && (
        <div className="space-y-4 animate-fadeIn">
          <div className="flex items-center gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-blue-200 dark:border-blue-800">
            <code className="flex-1 text-sm font-mono text-gray-900 dark:text-white break-all select-all">
              {uuid}
            </code>
            <button
              onClick={copyToClipboard}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5 text-gray-500" />}
            </button>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>
                {lang === 'id' ? 'Dibuat' : 'Generated'}: {new Date().toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <GitBranch className="w-4 h-4" />
              <span>UUID {version.toUpperCase()}</span>
            </div>
          </div>

          {history.length > 1 && (
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {lang === 'id' ? 'Riwayat' : 'History'}
                </h4>
                <button
                  onClick={clearHistory}
                  className="text-xs text-red-500 hover:text-red-600"
                >
                  {lang === 'id' ? 'Hapus semua' : 'Clear all'}
                </button>
              </div>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {history.slice(1).map((id, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs">
                    <span className="text-gray-400">#{index + 1}</span>
                    <code className="text-gray-600 dark:text-gray-400 font-mono truncate">
                      {id}
                    </code>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}