'use client';

import { useState } from 'react';
import { BaseTool } from './BaseTool';
import { Calendar, Clock, Users } from 'lucide-react';

interface AgeCalculatorProps {
  title: string;
  description: string;
  article: string;
  dict: any;
}

export function AgeCalculator({ title, description, article, dict }: AgeCalculatorProps) {
  const [birthDate, setBirthDate] = useState('');
  const [age, setAge] = useState<null | {
    years: number;
    months: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>(null);

  const calculateAge = () => {
    if (!birthDate) return;
    const birth = new Date(birthDate);
    const now = new Date();
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;
    const totalSeconds = totalMinutes * 60;

    setAge({
      years,
      months,
      days,
      hours: Math.floor((now.getTime() - birth.getTime()) / (1000 * 60 * 60)) % 24,
      minutes: Math.floor((now.getTime() - birth.getTime()) / (1000 * 60)) % 60,
      seconds: Math.floor((now.getTime() - birth.getTime()) / 1000) % 60,
    });
  };

  return (
    <BaseTool title={title} description={description} article={article}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="input-field flex-1"
            max={new Date().toISOString().split('T')[0]}
          />
          <button onClick={calculateAge} className="btn-primary">
            {dict.common.calculate}
          </button>
        </div>

        {age && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            <div className="p-4 glass rounded-xl text-center">
              <Calendar className="w-6 h-6 mx-auto mb-2 text-indigo-500" />
              <div className="text-2xl font-bold text-gradient-blue">{age.years}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Tahun</div>
            </div>
            <div className="p-4 glass rounded-xl text-center">
              <Calendar className="w-6 h-6 mx-auto mb-2 text-indigo-500" />
              <div className="text-2xl font-bold text-gradient-blue">{age.months}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Bulan</div>
            </div>
            <div className="p-4 glass rounded-xl text-center">
              <Calendar className="w-6 h-6 mx-auto mb-2 text-indigo-500" />
              <div className="text-2xl font-bold text-gradient-blue">{age.days}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Hari</div>
            </div>
            <div className="p-4 glass rounded-xl text-center">
              <Clock className="w-6 h-6 mx-auto mb-2 text-indigo-500" />
              <div className="text-2xl font-bold text-gradient-blue">{age.hours}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Jam</div>
            </div>
            <div className="p-4 glass rounded-xl text-center">
              <Clock className="w-6 h-6 mx-auto mb-2 text-indigo-500" />
              <div className="text-2xl font-bold text-gradient-blue">{age.minutes}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Menit</div>
            </div>
            <div className="p-4 glass rounded-xl text-center">
              <Users className="w-6 h-6 mx-auto mb-2 text-indigo-500" />
              <div className="text-2xl font-bold text-gradient-blue">{age.seconds}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Detik</div>
            </div>
          </div>
        )}
      </div>
    </BaseTool>
  );
}