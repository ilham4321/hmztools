'use client';

import { useState } from 'react';
import { BaseTool } from './BaseTool';
import { Dice } from 'lucide-react';

interface RandomNumberGeneratorProps {
  title: string;
  description: string;
  article: string;
  dict: any;
}

export function RandomNumberGenerator({ title, description, article, dict }: RandomNumberGeneratorProps) {
  const [min, setMin] = useState('1');
  const [max, setMax] = useState('100');
  const [count, setCount] = useState('1');
  const [results, setResults] = useState<number[]>([]);

  const generateNumbers = () => {
    const minNum = parseInt(min);
    const maxNum = parseInt(max);
    const countNum = parseInt(count);
    if (isNaN(minNum) || isNaN(maxNum) || isNaN(countNum) || minNum >= maxNum) return;

    const numbers: number[] = [];
    for (let i = 0; i < Math.min(countNum, 100); i++) {
      numbers.push(Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
    }
    setResults(numbers);
  };

  return (
    <BaseTool title={title} description={description} article={article}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Min</label>
            <input
              type="number"
              value={min}
              onChange={(e) => setMin(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Max</label>
            <input
              type="number"
              value={max}
              onChange={(e) => setMax(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Jumlah</label>
            <input
              type="number"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              className="input-field"
              min="1"
              max="100"
            />
          </div>
        </div>

        <button onClick={generateNumbers} className="btn-primary">
          <Dice className="w-4 h-4 inline mr-2" />
          {dict.common.generate}
        </button>

        {results.length > 0 && (
          <div className="p-6 glass rounded-xl">
            <div className="flex flex-wrap gap-3">
              {results.map((num, index) => (
                <div
                  key={index}
                  className="px-4 py-2 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-lg text-indigo-600 dark:text-indigo-400 font-mono text-lg font-bold"
                >
                  {num}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </BaseTool>
  );
}