'use client'

import { useState } from 'react'

export default function PasswordGenerator({ lang }: { lang: string }) {
  const [length, setLength] = useState(12)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [password, setPassword] = useState('')

  const generatePassword = () => {
    let chars = ''
    if (includeUppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (includeLowercase) chars += 'abcdefghijklmnopqrstuvwxyz'
    if (includeNumbers) chars += '0123456789'
    if (includeSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?'

    if (!chars) {
      setPassword(lang === 'id' ? 'Pilih setidaknya satu opsi' : 'Select at least one option')
      return
    }

    let result = ''
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setPassword(result)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
  }

  return (
    <div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {lang === 'id' ? 'Panjang Password' : 'Password Length'} ({length})
          </label>
          <input
            type="range"
            min="4"
            max="32"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-gray-700 dark:text-gray-300">
              {lang === 'id' ? 'Huruf Besar (A-Z)' : 'Uppercase (A-Z)'}
            </span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-gray-700 dark:text-gray-300">
              {lang === 'id' ? 'Huruf Kecil (a-z)' : 'Lowercase (a-z)'}
            </span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-gray-700 dark:text-gray-300">
              {lang === 'id' ? 'Angka (0-9)' : 'Numbers (0-9)'}
            </span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-gray-700 dark:text-gray-300">
              {lang === 'id' ? 'Simbol' : 'Symbols'}
            </span>
          </label>
        </div>
        <button onClick={generatePassword} className="btn-primary w-full">
          {lang === 'id' ? 'Generate Password' : 'Generate Password'}
        </button>
        {password && (
          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center gap-2">
              <code className="flex-1 text-lg font-mono text-gray-900 dark:text-white break-all">
                {password}
              </code>
              <button
                onClick={copyToClipboard}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
              >
                {lang === 'id' ? 'Salin' : 'Copy'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}