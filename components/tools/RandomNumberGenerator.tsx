'use client'

import { useState } from 'react'

export default function RandomNumberGenerator({ lang }: { lang: string }) {
  const [min, setMin] = useState('1')
  const [max, setMax] = useState('100')
  const [result, setResult] = useState<number | null>(null)

  const generateNumber = () => {
    const minNum = parseInt(min)
    const maxNum = parseInt(max)
    if (isNaN(minNum) || isNaN(maxNum) || minNum >= maxNum) return
    const random = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum
    setResult(random)
  }

  return (
    <div>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {lang === 'id' ? 'Minimum' : 'Minimum'}
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
              {lang === 'id' ? 'Maksimum' : 'Maximum'}
            </label>
            <input
              type="number"
              value={max}
              onChange={(e) => setMax(e.target.value)}
              className="input-field"
            />
          </div>
        </div>
        <button onClick={generateNumber} className="btn-primary w-full">
          {lang === 'id' ? 'Generate Angka' : 'Generate Number'}
        </button>
        {result !== null && (
          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 text-center">
              {result}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}