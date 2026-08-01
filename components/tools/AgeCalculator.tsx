'use client'

import { useState } from 'react'

export default function AgeCalculator({ lang }: { lang: string }) {
  const [birthDate, setBirthDate] = useState('')
  const [result, setResult] = useState<{
    years: number
    months: number
    days: number
  } | null>(null)

  const calculateAge = () => {
    if (!birthDate) return
    const birth = new Date(birthDate)
    const now = new Date()
    let years = now.getFullYear() - birth.getFullYear()
    let months = now.getMonth() - birth.getMonth()
    let days = now.getDate() - birth.getDate()

    if (days < 0) {
      months--
      const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0)
      days += lastMonth.getDate()
    }
    if (months < 0) {
      years--
      months += 12
    }

    setResult({ years, months, days })
  }

  return (
    <div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {lang === 'id' ? 'Tanggal Lahir' : 'Birth Date'}
          </label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="input-field"
          />
        </div>
        <button onClick={calculateAge} className="btn-primary w-full">
          {lang === 'id' ? 'Hitung Umur' : 'Calculate Age'}
        </button>
        {result && (
          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {lang === 'id' ? 'Umur Anda:' : 'Your Age:'}
            </p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {result.years} {lang === 'id' ? 'tahun' : 'years'}, {result.months} {lang === 'id' ? 'bulan' : 'months'}, {result.days} {lang === 'id' ? 'hari' : 'days'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}