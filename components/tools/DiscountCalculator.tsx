'use client';

import { useState, useEffect } from 'react';
import { BaseTool } from './BaseTool';
import { Percent, DollarSign, History, Trash2 } from 'lucide-react';

interface DiscountCalculatorProps {
  title: string;
  description: string;
  article: string;
  dict: any;
}

interface HistoryItem {
  id: string;
  originalPrice: number;
  discount: number;
  discountType: 'percentage' | 'nominal';
  finalPrice: number;
  discountAmount: number;
  date: string;
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
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('discount_history');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  const saveToHistory = (data: any) => {
    const newHistory = [data, ...history].slice(0, 20);
    setHistory(newHistory);
    localStorage.setItem('discount_history', JSON.stringify(newHistory));
  };

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

    const resultData = {
      finalPrice: Math.round(finalPrice * 100) / 100,
      discountAmount: Math.round(discountAmount * 100) / 100,
      discountPercentage: Math.round(discountPercentage * 100) / 100,
    };
    setResult(resultData);

    saveToHistory({
      id: Date.now().toString(),
      originalPrice: price,
      discount: disc,
      discountType,
      ...resultData,
      date: new Date().toLocaleString(),
    });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('discount_history');
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
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
                className="w-full px-4 py-3 pl-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
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
                className="w-full px-4 py-3 pl-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                min="0"
                step={discountType === 'percentage' ? '1' : '1000'}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setDiscountType('percentage')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              discountType === 'percentage'
                ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Persentase
          </button>
          <button
            onClick={() => setDiscountType('nominal')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              discountType === 'nominal'
                ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Nominal
          </button>
          <button onClick={calculateDiscount} className="btn-primary">
            Hitung Diskon
          </button>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="btn-secondary flex items-center gap-2"
          >
            <History className="w-4 h-4" />
            Riwayat
          </button>
        </div>

        {result && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-slide-up">
            <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl text-center border border-green-200 dark:border-green-800/30">
              <div className="text-sm text-gray-500 dark:text-gray-400">Diskon</div>
              <div className="text-2xl font-bold text-green-500">
                {formatCurrency(result.discountAmount)}
              </div>
              <div className="text-xs text-gray-400">
                ({result.discountPercentage}%)
              </div>
            </div>
            <div className="p-4 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-xl text-center border border-indigo-200 dark:border-indigo-800/30">
              <div className="text-sm text-gray-500 dark:text-gray-400">Harga Akhir</div>
              <div className="text-2xl font-bold text-gradient-blue">
                {formatCurrency(result.finalPrice)}
              </div>
            </div>
            <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl text-center border border-emerald-200 dark:border-emerald-800/30">
              <div className="text-sm text-gray-500 dark:text-gray-400">Hemat</div>
              <div className="text-2xl font-bold text-emerald-500">
                {formatCurrency(result.discountAmount)}
              </div>
            </div>
          </div>
        )}

        {showHistory && history.length > 0 && (
          <div className="space-y-2 animate-slide-up">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Riwayat Perhitungan
              </h4>
              <button
                onClick={clearHistory}
                className="text-sm text-red-500 hover:text-red-600 transition-colors flex items-center gap-1"
              >
                <Trash2 className="w-4 h-4" />
                Hapus Semua
              </button>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="p-3 glass rounded-xl flex items-center justify-between text-sm"
                >
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">
                      {item.originalPrice.toLocaleString()} → 
                    </span>
                    <span className="font-bold text-indigo-500 ml-1">
                      {formatCurrency(item.finalPrice)}
                    </span>
                    <span className="text-xs text-gray-400 ml-2">
                      ({item.discountPercentage}% off)
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">
                    {item.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </BaseTool>
  );
}