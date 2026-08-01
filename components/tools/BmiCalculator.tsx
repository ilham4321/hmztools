'use client'

import { useState } from 'react'
import { Activity, Weight, Ruler, Heart, AlertCircle } from 'lucide-react'

export default function BmiCalculator({ lang }: { lang: string }) {
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [result, setResult] = useState<{
    bmi: number
    category: string
    color: string
    icon: string
    description: string
    idealWeightRange: string
  } | null>(null)

  const calculateBMI = () => {
    const w = parseFloat(weight)
    const h = parseFloat(height) / 100
    if (isNaN(w) || isNaN(h) || h === 0 || w <= 0) return
    
    const bmi = w / (h * h)
    let category = ''
    let color = ''
    let icon = ''
    let description = ''
    let idealWeightRange = ''

    if (bmi < 18.5) {
      category = lang === 'id' ? 'Kurus' : 'Underweight'
      color = 'text-yellow-500'
      icon = '⚠️'
      description = lang === 'id' ? 'Berat badan di bawah normal' : 'Below normal weight'
      idealWeightRange = '18.5 - 24.9'
    } else if (bmi < 25) {
      category = lang === 'id' ? 'Normal' : 'Normal'
      color = 'text-green-500'
      icon = '✅'
      description = lang === 'id' ? 'Berat badan ideal dan sehat' : 'Ideal and healthy weight'
      idealWeightRange = '18.5 - 24.9'
    } else if (bmi < 30) {
      category = lang === 'id' ? 'Overweight' : 'Overweight'
      color = 'text-orange-500'
      icon = '⚠️'
      description = lang === 'id' ? 'Berat badan berlebih' : 'Excess weight'
      idealWeightRange = '18.5 - 24.9'
    } else {
      category = lang === 'id' ? 'Obesitas' : 'Obese'
      color = 'text-red-500'
      icon = '🚨'
      description = lang === 'id' ? 'Berat badan sangat berlebih' : 'Very excess weight'
      idealWeightRange = '18.5 - 24.9'
    }

    setResult({ bmi, category, color, icon, description, idealWeightRange })
  }

  const getBMIColor = (bmi: number) => {
    if (bmi < 18.5) return 'bg-yellow-500'
    if (bmi < 25) return 'bg-green-500'
    if (bmi < 30) return 'bg-orange-500'
    return 'bg-red-500'
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <div className="flex items-center gap-2">
              <Weight className="w-4 h-4" />
              {lang === 'id' ? 'Berat Badan (kg)' : 'Weight (kg)'}
            </div>
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="70"
            className="input-field"
            min="0"
            step="0.1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <div className="flex items-center gap-2">
              <Ruler className="w-4 h-4" />
              {lang === 'id' ? 'Tinggi Badan (cm)' : 'Height (cm)'}
            </div>
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="175"
            className="input-field"
            min="0"
            step="0.1"
          />
        </div>
      </div>

      <button onClick={calculateBMI} className="btn-primary w-full flex items-center justify-center gap-2">
        <Activity className="w-5 h-5" />
        {lang === 'id' ? 'Hitung BMI' : 'Calculate BMI'}
      </button>

      {result && (
        <div className="space-y-4 animate-fadeIn">
          <div className="relative pt-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>18.5</span>
              <span>25</span>
              <span>30</span>
            </div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className={`h-full ${getBMIColor(result.bmi)} transition-all duration-500`}
                style={{ 
                  width: `${Math.min((result.bmi / 40) * 100, 100)}%`,
                  marginLeft: `${Math.min((18.5 / 40) * 100, 100)}%`
                }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{lang === 'id' ? 'Kurus' : 'Underweight'}</span>
              <span>{lang === 'id' ? 'Normal' : 'Normal'}</span>
              <span>{lang === 'id' ? 'Overweight' : 'Overweight'}</span>
              <span>{lang === 'id' ? 'Obesitas' : 'Obese'}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {lang === 'id' ? 'Nilai BMI' : 'BMI Value'}
              </p>
              <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                {result.bmi.toFixed(1)}
              </p>
            </div>
            <div className={`p-6 rounded-xl text-center ${result.color}`}>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {lang === 'id' ? 'Kategori' : 'Category'}
              </p>
              <p className="text-3xl font-bold">
                {result.icon} {result.category}
              </p>
              <p className="text-sm mt-1">{result.description}</p>
            </div>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl">
            <div className="flex items-center gap-2 text-sm">
              <Heart className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-gray-700 dark:text-gray-300">
                {lang === 'id' ? 'Rentang BMI Ideal' : 'Ideal BMI Range'}: {result.idealWeightRange}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}