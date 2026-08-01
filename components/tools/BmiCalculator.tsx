'use client'

import { useState } from 'react'

export default function BmiCalculator({ lang }: { lang: string }) {
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [result, setResult] = useState<{
    bmi: number
    category: string
  } | null>(null)

  const calculateBMI = () => {
    const w = parseFloat(weight)
    const h = parseFloat(height) / 100
    if (isNaN(w) || isNaN(h) || h === 0) return
    const bmi = w / (h * h)
    let category = ''
    if (bmi < 18.5) category = lang === 'id' ? 'Kurus' : 'Underweight'
    else if (bmi < 25) category = lang === 'id' ? 'Normal' : 'Normal'
    else if (bmi < 30) category = lang === 'id' ? 'Overweight' : 'Overweight'
    else category = lang === 'id' ? 'Obesitas' : 'Obese'
    setResult({ bmi, category })
  }

  return (
    <div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {lang === 'id' ? 'Berat Badan (kg)' : 'Weight (kg)'}
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="70"
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {lang === 'id' ? 'Tinggi Badan (cm)' : 'Height (cm)'}
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="175"
            className="input-field"
          />
        </div>
        <button onClick={calculateBMI} className="btn-primary w-full">
          {lang === 'id' ? 'Hitung BMI' : 'Calculate BMI'}
        </button>
        {result && (
          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {lang === 'id' ? 'BMI:' : 'BMI:'} {result.bmi.toFixed(2)}
            </p>
            <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
              {lang === 'id' ? 'Kategori:' : 'Category:'} {result.category}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}