'use client';

import { useState } from 'react';
import { BaseTool } from './BaseTool';
import { CalendarDays } from 'lucide-react';

interface DaysBetweenDatesProps {
  title: string;
  description: string;
  article: string;
  dict: any;
}

export function DaysBetweenDates({ title, description, article, dict }: DaysBetweenDatesProps) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [result, setResult] = useState<null | {
    days: number;
    weeks: number;
    months: number;
    years: number;
  }>(null);

  const calculateDifference = () => {
    if (!startDate || !endDate) return;
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start > end) return;

    const diffTime = end.getTime() - start.getTime();
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30.44);
    const years = Math.floor(days / 365.25);

    setResult({ days, weeks, months, years });
  };

  return (
    <BaseTool title={title} description={description} article={article}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Tanggal Mulai
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Tanggal Akhir
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="input-field"
              min={startDate}
            />
          </div>
        </div>

        <button onClick={calculateDifference} className="btn-primary">
          {dict.common.calculate}
        </button>

        {result && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 glass rounded-xl text-center">
              <CalendarDays className="w-6 h-6 mx-auto mb-2 text-indigo-500" />
              <div className="text-2xl font-bold text-gradient-blue">{result.days}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Hari</div>
            </div>
            <div className="p-4 glass rounded-xl text-center">
              <CalendarDays className="w-6 h-6 mx-auto mb-2 text-indigo-500" />
              <div className="text-2xl font-bold text-gradient-blue">{result.weeks}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Minggu</div>
            </div>
            <div className="p-4 glass rounded-xl text-center">
              <CalendarDays className="w-6 h-6 mx-auto mb-2 text-indigo-500" />
              <div className="text-2xl font-bold text-gradient-blue">{result.months}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Bulan</div>
            </div>
            <div className="p-4 glass rounded-xl text-center">
              <CalendarDays className="w-6 h-6 mx-auto mb-2 text-indigo-500" />
              <div className="text-2xl font-bold text-gradient-blue">{result.years}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Tahun</div>
            </div>
          </div>
        )}
      </div>
    </BaseTool>
  );
}