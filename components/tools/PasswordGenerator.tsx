'use client'

import { useState } from 'react'
import { Copy, RefreshCw, Check, Shield, Lock, Key } from 'lucide-react'

export default function PasswordGenerator({ lang }: { lang: string }) {
  const [length, setLength] = useState(16)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [password, setPassword] = useState('')
  const [copied, setCopied] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  const generatePassword = () => {
    setIsGenerating(true)
    setTimeout(() => {
      let chars = ''
      if (includeUppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      if (includeLowercase) chars += 'abcdefghijklmnopqrstuvwxyz'
      if (includeNumbers) chars += '0123456789'
      if (includeSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?'

      if (!chars) {
        setPassword(lang === 'id' ? 'Pilih setidaknya satu opsi' : 'Select at least one option')
        setIsGenerating(false)
        return
      }

      let result = ''
      for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      setPassword(result)
      setIsGenerating(false)
    }, 300)
  }

  const copyToClipboard = () => {
    if (!password) return
    navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getStrength = () => {
    let score = 0
    if (length >= 12) score++
    if (length >= 16) score++
    if (includeUppercase) score++
    if (includeLowercase) score++
    if (includeNumbers) score++
    if (includeSymbols) score++
    
    if (score <= 2) return { 
      label: lang === 'id' ? 'Lemah' : 'Weak', 
      color: 'text-red-500',
      bar: 'w-1/4 bg-red-500',
      emoji: '🔴'
    }
    if (score <= 3) return { 
      label: lang === 'id' ? 'Sedang' : 'Medium', 
      color: 'text-yellow-500',
      bar: 'w-2/4 bg-yellow-500',
      emoji: '🟡'
    }
    if (score <= 4) return { 
      label: lang === 'id' ? 'Kuat' : 'Strong', 
      color: 'text-green-500',
      bar: 'w-3/4 bg-green-500',
      emoji: '🟢'
    }
    return { 
      label: lang === 'id' ? 'Sangat Kuat' : 'Very Strong', 
      color: 'text-emerald-500',
      bar: 'w-full bg-emerald-500',
      emoji: '💪'
    }
  }

  const strength = getStrength()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl">
        <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        <span className="text-sm text-gray-700 dark:text-gray-300">
          {lang === 'id' 
            ? 'Gunakan password yang kuat untuk keamanan maksimal' 
            : 'Use strong passwords for maximum security'}
        </span>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {lang === 'id' ? 'Panjang Password' : 'Password Length'}
          </label>
          <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{length}</span>
        </div>
        <input
          type="range"
          min="4"
          max="32"
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>4</span>
          <span>32</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { key: 'uppercase', label: lang === 'id' ? 'Huruf Besar (A-Z)' : 'Uppercase (A-Z)', checked: includeUppercase, set: setIncludeUppercase },
          { key: 'lowercase', label: lang === 'id' ? 'Huruf Kecil (a-z)' : 'Lowercase (a-z)', checked: includeLowercase, set: setIncludeLowercase },
          { key: 'numbers', label: lang === 'id' ? 'Angka (0-9)' : 'Numbers (0-9)', checked: includeNumbers, set: setIncludeNumbers },
          { key: 'symbols', label: lang === 'id' ? 'Simbol (!@#)' : 'Symbols (!@#)', checked: includeSymbols, set: setIncludeSymbols },
        ].map(({ key, label, checked, set }) => (
          <label key={key} className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => set(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
          </label>
        ))}
      </div>

      <button
        onClick={generatePassword}
        disabled={isGenerating}
        className="btn-primary w-full flex items-center justify-center gap-2"
      >
        {isGenerating ? (
          <RefreshCw className="w-5 h-5 animate-spin" />
        ) : (
          <Key className="w-5 h-5" />
        )}
        {lang === 'id' ? 'Generate Password' : 'Generate Password'}
      </button>

      {password && (
        <div className="space-y-4 animate-fadeIn">
          <div className="flex items-center gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700">
            <Lock className="w-5 h-5 text-gray-500 flex-shrink-0" />
            <code className="flex-1 text-lg font-mono text-gray-900 dark:text-white break-all select-all">
              {password}
            </code>
            <button
              onClick={copyToClipboard}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5 text-gray-500" />}
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {lang === 'id' ? 'Kekuatan Password' : 'Password Strength'}
              </span>
              <span className={`text-sm font-semibold ${strength.color}`}>
                {strength.emoji} {strength.label}
              </span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className={`h-full ${strength.bar} transition-all duration-500`} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}