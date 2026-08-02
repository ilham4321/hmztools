'use client';

import { useState } from 'react';
import { BaseTool } from './BaseTool';
import { Ruler, Weight } from 'lucide-react';

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
  }>(null);

  const calculateBMI = () => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    if (isNaN(h) || isNaN(w) || h <= 0 || w <= 0) return;

    const bmi = w / (h * h);
    let category: string;
    let color: string;
    let message: string;

    if (bmi < 18.5) {
      category = 'Kurus';
      color = 'text-yellow-500';
      message = 'Kekurangan berat badan';
    } else if (bmi < 25) {
      category = 'Normal';
      color = 'text-green-500';
      message = 'Berat badan ideal';
    } else if (bmi < 30) {
      category = 'Gemuk';
      color = 'text-orange-500';
      message = 'Kelebihan berat badan';
    } else {
      category = 'Obesitas';
      color = 'text-red-500';
      message = 'Obesitas';
    }

    setResult({
      bmi: Math.round(bmi * 100) / 100,
      category,
      color,
      message,
    });
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
              <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="Contoh: 170"
                className="input-field pl-10"
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
              <Weight className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Contoh: 70"
                className="input-field pl-10"
                min="10"
                max="300"
              />
            </div>
          </div>
        </div>

        <button onClick={calculateBMI} className="btn-primary w-full sm:w-auto">
          {dict.common.calculate}
        </button>

        {result && (
          <div className="p-6 glass rounded-xl text-center">
            <div className="text-6xl font-bold text-gradient-blue mb-2">
              {result.bmi}
            </div>
            <div className={`text-2xl font-bold ${result.color}`}>
              {result.category}
            </div>
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {result.message}
            </div>
          </div>
        )}
      </div>
    </BaseTool>
  );
}