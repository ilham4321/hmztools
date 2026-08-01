'use client'

import { useState } from 'react'
import { Calendar, Clock, User, Cake } from 'lucide-react'

export default function AgeCalculator({ lang }: { lang: string }) {
  const [birthDate, setBirthDate] = useState('')
  const [result, setResult] = useState<{
    years: number
    months: number
    days: number
    hours: number
    minutes: number
    seconds: number
    totalDays: number
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

    const totalDays = Math.floor((now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24))
    const hours = now.getHours()
    const minutes = now.getMinutes()
    const seconds = now.getSeconds()

    setResult({ years, months, days, hours, minutes, seconds, totalDays })
  }

  const getAgeCategory = (age: number) => {
    if (age < 1) return { label: lang === 'id' ? 'Bayi' : 'Baby', emoji: '👶' }
    if (age < 5) return { label: lang === 'id' ? 'Balita' : 'Toddler', emoji: '🧒' }
    if (age < 13) return { label: lang === 'id' ? 'Anak-anak' : 'Child', emoji: '👦' }
    if (age < 20) return { label: lang === 'id' ? 'Remaja' : 'Teen', emoji: '🧑' }
    if (age < 40) return { label: lang === 'id' ? 'Dewasa Muda' : 'Young Adult', emoji: '👨' }
    if (age < 60) return { label: lang === 'id' ? 'Dewasa' : 'Adult', emoji: '👨‍🦰' }
    return { label: lang === 'id' ? 'Lansia' : 'Senior', emoji: '👴' }
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <Cake className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {lang === 'id' ? 'Masukkan Tanggal Lahir' : 'Enter Birth Date'}
          </h3>
        </div>
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="input-field"
          max={new Date().toISOString().split('T')[0]}
        />
        <button onClick={calculateAge} className="btn-primary w-full mt-4">
          <Calendar className="w-5 h-5" />
          {lang === 'id' ? 'Hitung Umur' : 'Calculate Age'}
        </button>
      </div>

      {result && (
        <div className="space-y-4 animate-fadeIn">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl text-center">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{result.years}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{lang === 'id' ? 'Tahun' : 'Years'}</p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-xl text-center">
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{result.months}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{lang === 'id' ? 'Bulan' : 'Months'}</p>
            </div>
            <div className="p-4 bg-pink-50 dark:bg-pink-950/30 rounded-xl text-center">
              <p className="text-2xl font-bold text-pink-600 dark:text-pink-400">{result.days}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{lang === 'id' ? 'Hari' : 'Days'}</p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-xl text-center">
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{result.totalDays.toLocaleString()}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{lang === 'id' ? 'Total Hari' : 'Total Days'}</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700 dark:text-gray-300">
                {lang === 'id' ? 'Kategori Umur' : 'Age Category'}
              </span>
            </div>
            <span className="text-lg font-semibold">
              {getAgeCategory(result.years).emoji} {getAgeCategory(result.years).label}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Clock className="w-4 h-4" />
            <span>
              {lang === 'id' ? 'Detail: ' : 'Details: '}
              {result.hours}h {result.minutes}m {result.seconds}s
            </span>
          </div>
        </div>
      )}
    </div>
  )
}