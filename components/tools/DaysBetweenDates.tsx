'use client'

import { useState } from 'react'

export default function DaysBetweenDates({ lang }: { lang: string }) {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [result, setResult] = useState<number | null>(null)

  const calculateDays = () => {
    if (!startDate || !endDate) return
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    setResult(diffDays)
  }

  return (
    <div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {lang === 'id' ? 'Tanggal Mulai' : 'Start Date'}
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {lang === 'id' ? 'Tanggal Akhir' : 'End Date'}
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="input-field"
          />
        </div>
        <button onClick={calculateDays} className="btn-primary w-full">
          {lang === 'id' ? 'Hitung Selisih' : 'Calculate Days'}
        </button>
        {result !== null && (
          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {result} {lang === 'id' ? 'hari' : 'days'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}