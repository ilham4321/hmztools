'use client';

import { useState } from 'react';
import { BaseTool } from './BaseTool';
import { Calendar, Clock, Users, Zap, Cake } from 'lucide-react';

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
    totalDays: number;
    nextBirthday: number;
    zodiac: string;
  }>(null);

  const getZodiac = (month: number, day: number) => {
    const signs = [
      { name: 'Capricorn', start: [1, 1], end: [1, 19] },
      { name: 'Aquarius', start: [1, 20], end: [2, 18] },
      { name: 'Pisces', start: [2, 19], end: [3, 20] },
      { name: 'Aries', start: [3, 21], end: [4, 19] },
      { name: 'Taurus', start: [4, 20], end: [5, 20] },
      { name: 'Gemini', start: [5, 21], end: [6, 20] },
      { name: 'Cancer', start: [6, 21], end: [7, 22] },
      { name: 'Leo', start: [7, 23], end: [8, 22] },
      { name: 'Virgo', start: [8, 23], end: [9, 22] },
      { name: 'Libra', start: [9, 23], end: [10, 22] },
      { name: 'Scorpio', start: [10, 23], end: [11, 21] },
      { name: 'Sagittarius', start: [11, 22], end: [12, 21] },
    ];

    for (const sign of signs) {
      const [sMonth, sDay] = sign.start;
      const [eMonth, eDay] = sign.end;
      if (
        (month === sMonth && day >= sDay) ||
        (month === eMonth && day <= eDay) ||
        (month > sMonth && month < eMonth)
      ) {
        return sign.name;
      }
    }
    return 'Capricorn';
  };

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
    
    // Next birthday
    let nextBirthday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < now) {
      nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    }
    const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    const zodiac = getZodiac(birth.getMonth() + 1, birth.getDate());

    setAge({
      years,
      months,
      days,
      hours: Math.floor((now.getTime() - birth.getTime()) / (1000 * 60 * 60)) % 24,
      minutes: Math.floor((now.getTime() - birth.getTime()) / (1000 * 60)) % 60,
      seconds: Math.floor((now.getTime() - birth.getTime()) / 1000) % 60,
      totalDays,
      nextBirthday: daysUntilBirthday,
      zodiac,
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
            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent text-gray-900 dark:text-white"
            max={new Date().toISOString().split('T')[0]}
          />
          <button onClick={calculateAge} className="btn-primary whitespace-nowrap">
            <Zap className="w-4 h-4 inline mr-2" />
            {dict.common.calculate}
          </button>
        </div>

        {age && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 animate-slide-up">
              <div className="p-4 glass rounded-xl text-center">
                <Calendar className="w-6 h-6 mx-auto mb-2 text-indigo-500" />
                <div className="text-2xl font-bold text-gradient-blue">{age.years}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Tahun</div>
              </div>
              <div className="p-4 glass rounded-xl text-center">
                <Calendar className="w-6 h-6 mx-auto mb-2 text-indigo-500" />
                <div className="text-2xl font-bold text-gradient-blue">{age.months}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Bulan</div>
              </div>
              <div className="p-4 glass rounded-xl text-center">
                <Calendar className="w-6 h-6 mx-auto mb-2 text-indigo-500" />
                <div className="text-2xl font-bold text-gradient-blue">{age.days}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Hari</div>
              </div>
              <div className="p-4 glass rounded-xl text-center">
                <Clock className="w-6 h-6 mx-auto mb-2 text-indigo-500" />
                <div className="text-2xl font-bold text-gradient-blue">{age.hours}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Jam</div>
              </div>
              <div className="p-4 glass rounded-xl text-center">
                <Clock className="w-6 h-6 mx-auto mb-2 text-indigo-500" />
                <div className="text-2xl font-bold text-gradient-blue">{age.minutes}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Menit</div>
              </div>
              <div className="p-4 glass rounded-xl text-center">
                <Users className="w-6 h-6 mx-auto mb-2 text-indigo-500" />
                <div className="text-2xl font-bold text-gradient-blue">{age.seconds}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Detik</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl text-center border border-indigo-200 dark:border-indigo-800/30">
                <div className="text-sm text-gray-500 dark:text-gray-400">Total Hari</div>
                <div className="text-2xl font-bold text-indigo-500">{age.totalDays.toLocaleString()}</div>
              </div>
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl text-center border border-emerald-200 dark:border-emerald-800/30">
                <div className="text-sm text-gray-500 dark:text-gray-400">Hari ke Ultah</div>
                <div className="text-2xl font-bold text-emerald-500">{age.nextBirthday}</div>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl text-center border border-purple-200 dark:border-purple-800/30">
                <div className="text-sm text-gray-500 dark:text-gray-400">Zodiak</div>
                <div className="text-2xl font-bold text-purple-500">
                  <Cake className="w-5 h-5 inline mr-1" />
                  {age.zodiac}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </BaseTool>
  );
}