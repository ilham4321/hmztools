'use client';

import { useState } from 'react';
import { BaseTool } from './BaseTool';
import { Percent, DollarSign } from 'lucide-react';

interface DiscountCalculatorProps {
  title: string;
  description: string;
  article: string;
  dict: any;
}

export function DiscountCalculator({ title, description, article, dict }: DiscountCalculatorProps) {
  const [originalPrice, setOriginalPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [discountType, setDiscountType] = useState<'percentage' | 'nominal'>('percentage');
  const [result, setResult] = useState<null | {
    finalPrice: number;
    discountAmount: number;
    discountPercentage: number;
  }>(null);

  const calculateDiscount = () => {
    const price = parseFloat(originalPrice);
    const disc = parseFloat(discount);
    if (isNaN(price) || isNaN(disc) || price <= 0 || disc < 0) return;

    let finalPrice: number;
    let discountAmount: number;
    let discountPercentage: number;

    if (discountType === 'percentage') {
      const percentage = Math.min(disc, 100);
      discountAmount = (price * percentage) / 100;
      finalPrice = price - discountAmount;
      discountPercentage = percentage;
    } else {
      discountAmount = Math.min(disc, price);
      finalPrice = price - discountAmount;
      discountPercentage = (discountAmount / price) * 100;
    }

    setResult({
      finalPrice: Math.round(finalPrice * 100) / 100,
      discountAmount: Math.round(discountAmount * 100) / 100,
      discountPercentage: Math.round(discountPercentage * 100) / 100,
    });
  };

  return (
    <BaseTool title={title} description={description} article={article}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Harga Awal
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                <DollarSign className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type="number"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                placeholder="Contoh: 100000"
                className="w-full px-4 py-2 pl-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                min="0"
                step="1000"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {discountType === 'percentage' ? 'Diskon %' : 'Diskon Nominal'}
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                {discountType === 'percentage' ? (
                  <Percent className="w-4 h-4 text-gray-400" />
                ) : (
                  <DollarSign className="w-4 h-4 text-gray-400" />
                )}
              </div>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                placeholder={discountType === 'percentage' ? 'Contoh: 20' : 'Contoh: 50000'}
                className="w-full px-4 py-2 pl-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                min="0"
                step={discountType === 'percentage' ? '1' : '1000'}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setDiscountType('percentage')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              discountType === 'percentage'
                ? 'bg-indigo-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Persentase
          </button>
          <button
            onClick={() => setDiscountType('nominal')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              discountType === 'nominal'
                ? 'bg-indigo-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Nominal
          </button>
          <button onClick={calculateDiscount} className="btn-primary">
            {dict.common.calculate}
          </button>
        </div>

        {result && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl text-center">
              <div className="text-sm text-gray-500 dark:text-gray-400">Diskon</div>
              <div className="text-2xl font-bold text-green-500">
                Rp {result.discountAmount.toLocaleString('id-ID')}
              </div>
              <div className="text-xs text-gray-400">
                ({result.discountPercentage}%)
              </div>
            </div>
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl text-center">
              <div className="text-sm text-gray-500 dark:text-gray-400">Harga Akhir</div>
              <div className="text-2xl font-bold text-gradient-blue">
                Rp {result.finalPrice.toLocaleString('id-ID')}
              </div>
            </div>
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl text-center">
              <div className="text-sm text-gray-500 dark:text-gray-400">Hemat</div>
              <div className="text-2xl font-bold text-emerald-500">
                Rp {result.discountAmount.toLocaleString('id-ID')}
              </div>
            </div>
          </div>
        )}
      </div>
    </BaseTool>
  );
}