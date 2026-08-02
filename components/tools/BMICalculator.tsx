'use client';

import { useState } from 'react';
import { BaseTool } from './BaseTool';
import { Ruler, Weight, Activity, Info } from 'lucide-react';

interface BMICalculatorProps {
  title: string;
  description: string;
  article: string;
  dict: any;
}

export function BMICalculator({ title, description, article, dict }: BMICalculatorProps) {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState<null | {
    bmi: number;
    category: string;
    color: string;
    message: string;
    idealWeightMin: number;
    idealWeightMax: number;
  }>(null);

  const calculateBMI = () => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    if (isNaN(h) || isNaN(w) || h <= 0 || w <= 0) return;

    const bmi = w / (h * h);
    let category: string;
    let color: string;
    let message: string;

    if (bmi < 16) {
      category = 'Kurus Parah';
      color = 'text-red-500';
      message = 'Segera konsultasi ke dokter';
    } else if (bmi < 18.5) {
      category = 'Kurus';
      color = 'text-yellow-500';
      message = 'Perlu menambah berat badan';
    } else if (bmi < 25) {
      category = 'Normal';
      color = 'text-green-500';
      message = 'Berat badan ideal, pertahankan!';
    } else if (bmi < 30) {
      category = 'Gemuk';
      color = 'text-orange-500';
      message = 'Perlu mengurangi berat badan';
    } else if (bmi < 35) {
      category = 'Obesitas I';
      color = 'text-red-500';
      message = 'Segera konsultasi ke dokter';
    } else {
      category = 'Obesitas II';
      color = 'text-red-600';
      message = 'Segera konsultasi ke dokter';
    }

    const idealWeightMin = Math.round(18.5 * h * h * 10) / 10;
    const idealWeightMax = Math.round(24.9 * h * h * 10) / 10;

    setResult({
      bmi: Math.round(bmi * 100) / 100,
      category,
      color,
      message,
      idealWeightMin,
      idealWeightMax,
    });
  };

  const getBMIColor = (bmi: number) => {
    if (bmi < 18.5) return 'bg-yellow-500';
    if (bmi < 25) return 'bg-green-500';
    if (bmi < 30) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <BaseTool title={title} description={description} article={article}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Tinggi Badan (cm)
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                <Ruler className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="Contoh: 170"
                className="w-full px-4 py-3 pl-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                min="50"
                max="250"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Berat Badan (kg)
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                <Weight className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Contoh: 70"
                className="w-full px-4 py-3 pl-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                min="10"
                max="300"
              />
            </div>
          </div>
        </div>

        <button onClick={calculateBMI} className="btn-primary w-full sm:w-auto">
          <Activity className="w-4 h-4 inline mr-2" />
          {dict.common.calculate}
        </button>

        {result && (
          <div className="animate-slide-up space-y-4">
            {/* BMI Gauge */}
            <div className="relative pt-6">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>16</span>
                <span>18.5</span>
                <span>25</span>
                <span>30</span>
                <span>35</span>
              </div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: `${Math.min((result.bmi / 40) * 100, 100)}%`,
                    background: `linear-gradient(to right, #eab308, #22c55e, #f97316, #ef4444)`,
                  }}
                />
              </div>
              <div
                className="absolute -top-1 w-4 h-4 bg-white dark:bg-gray-900 border-2 border-indigo-500 rounded-full transition-all duration-1000"
                style={{
                  left: `calc(${Math.min((result.bmi / 40) * 100, 100)}% - 8px)`,
                }}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 glass rounded-xl text-center">
                <div className="text-5xl font-bold text-gradient-blue mb-1">
                  {result.bmi}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">BMI</div>
              </div>
              <div className="p-4 glass rounded-xl text-center">
                <div className={`text-2xl font-bold ${result.color}`}>
                  {result.category}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {result.message}
                </div>
              </div>
              <div className="p-4 glass rounded-xl text-center">
                <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Berat Ideal
                </div>
                <div className="text-lg font-bold text-emerald-500">
                  {result.idealWeightMin} - {result.idealWeightMax} kg
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Berdasarkan BMI 18.5 - 24.9
                </div>
              </div>
            </div>

            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800/30 flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-700 dark:text-blue-300">
                BMI adalah indikator umum, bukan diagnosis medis. Konsultasikan dengan profesional kesehatan untuk penilaian yang lebih akurat.
              </p>
            </div>
          </div>
        )}
      </div>
    </BaseTool>
  );
}