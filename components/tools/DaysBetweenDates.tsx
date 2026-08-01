'use client'

import { useState } from 'react'
import { CalendarDays, Clock, Calendar, TrendingUp } from 'lucide-react'

export default function DaysBetweenDates({ lang }: { lang: string }) {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [result, setResult] = useState<{
    days: number
    weeks: number
    months: number
    years: number
    hours: number
    minutes: number
    seconds: number
  } | null>(null)

  const calculateDays = () => {
    if (!startDate || !endDate) return
    const start = new Date(startDate)
    const end = new Date(endDate)
    
    if (start > end) {
      alert(lang === 'id' ? 'Tanggal mulai harus lebih awal' : 'Start date must be earlier')
      return
    }
    
    const diffTime = end.getTime() - start.getTime()
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    const weeks = Math.floor(days / 7)
    const months = Math.floor(days / 30.44)
    const years = Math.floor(days / 365.25)
    const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diffTime % (1000 * 60)) / 1000)
    
    setResult({ days, weeks, months, years, hours, minutes, seconds })
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {lang === 'id' ? 'Tanggal Mulai' : 'Start Date'}
            </div>
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
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4" />
              {lang === 'id' ? 'Tanggal Akhir' : 'End Date'}
            </div>
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="input-field"
          />
        </div>
      </div>

      <button onClick={calculateDays} className="btn-primary w-full flex items-center justify-center gap-2">
        <TrendingUp className="w-5 h-5" />
        {lang === 'id' ? 'Hitung Selisih' : 'Calculate Difference'}
      </button>

      {result && (
        <div className="space-y-4 animate-fadeIn">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl text-center">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{result.days}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{lang === 'id' ? 'Hari' : 'Days'}</p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-xl text-center">
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{result.weeks}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{lang === 'id' ? 'Minggu' : 'Weeks'}</p>
            </div>
            <div className="p-4 bg-pink-50 dark:bg-pink-950/30 rounded-xl text-center">
              <p className="text-2xl font-bold text-pink-600 dark:text-pink-400">{result.months}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{lang === 'id' ? 'Bulan' : 'Months'}</p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-xl text-center">
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{result.years}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{lang === 'id' ? 'Tahun' : 'Years'}</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <Clock className="w-5 h-5 text-gray-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {lang === 'id' ? 'Detail waktu' : 'Time details'}: {result.hours}h {result.minutes}m {result.seconds}s
            </span>
          </div>
        </div>
      )}
    </div>
  )
}