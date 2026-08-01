'use client'

import { useState } from 'react'
import { RefreshCw, TrendingDown, TrendingUp, Copy, Shuffle } from 'lucide-react'

export default function RandomNumberGenerator({ lang }: { lang: string }) {
  const [min, setMin] = useState('1')
  const [max, setMax] = useState('100')
  const [result, setResult] = useState<number | null>(null)
  const [history, setHistory] = useState<number[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState(false)

  const generateNumber = () => {
    const minNum = parseInt(min)
    const maxNum = parseInt(max)
    if (isNaN(minNum) || isNaN(maxNum) || minNum >= maxNum) {
      alert(lang === 'id' ? 'Range tidak valid' : 'Invalid range')
      return
    }
    
    setIsGenerating(true)
    setTimeout(() => {
      const random = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum
      setResult(random)
      setHistory(prev => [random, ...prev].slice(0, 10))
      setIsGenerating(false)
    }, 300)
  }

  const copyToClipboard = () => {
    if (result === null) return
    navigator.clipboard.writeText(result.toString())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const clearHistory = () => {
    setHistory([])
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <div className="flex items-center gap-2">
              <TrendingDown className="w-4 h-4" />
              {lang === 'id' ? 'Minimum' : 'Minimum'}
            </div>
          </label>
          <input
            type="number"
            value={min}
            onChange={(e) => setMin(e.target.value)}
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              {lang === 'id' ? 'Maksimum' : 'Maximum'}
            </div>
          </label>
          <input
            type="number"
            value={max}
            onChange={(e) => setMax(e.target.value)}
            className="input-field"
          />
        </div>
      </div>

      <button 
        onClick={generateNumber} 
        disabled={isGenerating}
        className="btn-primary w-full flex items-center justify-center gap-2"
      >
        {isGenerating ? (
          <RefreshCw className="w-5 h-5 animate-spin" />
        ) : (
          <Shuffle className="w-5 h-5" />
        )}
        {lang === 'id' ? 'Generate Angka' : 'Generate Number'}
      </button>

      {result !== null && (
        <div className="space-y-4 animate-fadeIn">
          <div className="relative p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-2xl text-center">
            <p className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {result}
            </p>
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={copyToClipboard}
                className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-all"
              >
                {copied ? '✅' : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {history.length > 0 && (
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {lang === 'id' ? 'Riwayat' : 'History'}
                </h4>
                <button
                  onClick={clearHistory}
                  className="text-xs text-red-500 hover:text-red-600"
                >
                  {lang === 'id' ? 'Hapus' : 'Clear'}
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {history.map((num, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white dark:bg-gray-700 rounded-lg text-sm font-mono shadow"
                  >
                    {num}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}