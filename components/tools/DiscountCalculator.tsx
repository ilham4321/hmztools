'use client'

import { useState } from 'react'

export default function DiscountCalculator({ lang }: { lang: string }) {
  const [price, setPrice] = useState('')
  const [discount, setDiscount] = useState('')
  const [result, setResult] = useState<{
    discountAmount: number
    finalPrice: number
  } | null>(null)

  const calculateDiscount = () => {
    const p = parseFloat(price)
    const d = parseFloat(discount)
    if (isNaN(p) || isNaN(d)) return
    const discountAmount = (p * d) / 100
    const finalPrice = p - discountAmount
    setResult({ discountAmount, finalPrice })
  }

  return (
    <div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {lang === 'id' ? 'Harga Awal' : 'Original Price'}
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="100000"
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {lang === 'id' ? 'Diskon (%)' : 'Discount (%)'}
          </label>
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            placeholder="10"
            className="input-field"
          />
        </div>
        <button onClick={calculateDiscount} className="btn-primary w-full">
          {lang === 'id' ? 'Hitung Diskon' : 'Calculate Discount'}
        </button>
        {result && (
          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg space-y-2">
            <p className="text-gray-900 dark:text-white">
              <span className="font-semibold">{lang === 'id' ? 'Potongan:' : 'Discount:'}</span> Rp {result.discountAmount.toLocaleString()}
            </p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {lang === 'id' ? 'Harga Akhir:' : 'Final Price:'} Rp {result.finalPrice.toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}