'use client'

import { useState } from 'react'
import { DollarSign, Percent, ShoppingBag, Tag } from 'lucide-react'

export default function DiscountCalculator({ lang }: { lang: string }) {
  const [price, setPrice] = useState('')
  const [discount, setDiscount] = useState('')
  const [result, setResult] = useState<{
    originalPrice: number
    discountAmount: number
    finalPrice: number
    savings: number
    discountPercent: number
  } | null>(null)

  const calculateDiscount = () => {
    const p = parseFloat(price)
    const d = parseFloat(discount)
    if (isNaN(p) || isNaN(d) || p <= 0 || d < 0 || d > 100) return
    
    const discountAmount = (p * d) / 100
    const finalPrice = p - discountAmount
    const savings = p - finalPrice
    
    setResult({ 
      originalPrice: p, 
      discountAmount, 
      finalPrice, 
      savings,
      discountPercent: d 
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              {lang === 'id' ? 'Harga Awal' : 'Original Price'}
            </div>
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder={lang === 'id' ? 'Rp 100.000' : 'Rp 100.000'}
            className="input-field"
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <div className="flex items-center gap-2">
              <Percent className="w-4 h-4" />
              {lang === 'id' ? 'Diskon' : 'Discount'}
            </div>
          </label>
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            placeholder="10%"
            className="input-field"
            min="0"
            max="100"
          />
        </div>
      </div>

      <button onClick={calculateDiscount} className="btn-primary w-full flex items-center justify-center gap-2">
        <Tag className="w-5 h-5" />
        {lang === 'id' ? 'Hitung Diskon' : 'Calculate Discount'}
      </button>

      {result && (
        <div className="space-y-4 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {lang === 'id' ? 'Harga Awal' : 'Original Price'}
              </p>
              <p className="text-xl font-bold text-gray-900 dark:text-white line-through">
                {formatCurrency(result.originalPrice)}
              </p>
            </div>
            <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-xl">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {lang === 'id' ? 'Potongan' : 'Discount'}
              </p>
              <p className="text-xl font-bold text-red-600 dark:text-red-400">
                -{formatCurrency(result.discountAmount)}
              </p>
              <p className="text-sm text-red-500">({result.discountPercent}%)</p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-xl">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {lang === 'id' ? 'Harga Akhir' : 'Final Price'}
              </p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {formatCurrency(result.finalPrice)}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl">
            <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">
              {lang === 'id' ? 'Anda Hemat' : 'You Save'} {formatCurrency(result.savings)}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}