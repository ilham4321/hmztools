'use client';

import { useState, useEffect } from 'react';
import { BaseTool } from './BaseTool';
import { 
  Shield, 
  Check, 
  X, 
  AlertTriangle, 
  Clock,
  Copy,
  Check as CheckIcon,
  RefreshCw
} from 'lucide-react';

interface PasswordStrengthCheckerProps {
  title: string;
  description: string;
  article: string;
  dict: any;
}

interface StrengthResult {
  score: number;
  label: string;
  color: string;
  bgColor: string;
  timeToCrack: string;
  feedback: string[];
  isStrong: boolean;
}

export function PasswordStrengthChecker({ title, description, article, dict }: PasswordStrengthCheckerProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState<StrengthResult | null>(null);
  const [copied, setCopied] = useState(false);

  const checkStrength = (pass: string): StrengthResult => {
    let score = 0;
    const feedback: string[] = [];

    // Length check
    if (pass.length === 0) {
      return {
        score: 0,
        label: 'Kosong',
        color: 'text-gray-400',
        bgColor: 'bg-gray-200 dark:bg-gray-700',
        timeToCrack: '-',
        feedback: ['Masukkan password untuk dicek'],
        isStrong: false,
      };
    }

    if (pass.length < 6) {
      feedback.push('Password terlalu pendek (minimal 6 karakter)');
    } else {
      score += 1;
    }

    if (pass.length >= 8) {
      score += 1;
    }

    if (pass.length >= 12) {
      score += 1;
    }

    // Character variety
    if (/[a-z]/.test(pass)) score += 1;
    else feedback.push('Tambahkan huruf kecil');

    if (/[A-Z]/.test(pass)) score += 1;
    else feedback.push('Tambahkan huruf besar');

    if (/[0-9]/.test(pass)) score += 1;
    else feedback.push('Tambahkan angka');

    if (/[^a-zA-Z0-9]/.test(pass)) score += 1;
    else feedback.push('Tambahkan simbol (!@#$%^&*)');

    // Common patterns
    const commonPatterns = [
      '123456', 'password', 'qwerty', 'admin', 'letmein', 
      'welcome', 'monkey', 'dragon', 'master', 'hello'
    ];
    
    if (commonPatterns.some(p => pass.toLowerCase().includes(p))) {
      score = Math.max(0, score - 2);
      feedback.push('Password mengandung kata umum yang mudah ditebak');
    }

    // Repeated characters
    if (/(.)\1{2,}/.test(pass)) {
      score = Math.max(0, score - 1);
      feedback.push('Ada karakter yang berulang');
    }

    // Sequential characters
    if (/abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz/i.test(pass)) {
      score = Math.max(0, score - 1);
      feedback.push('Ada huruf yang berurutan');
    }

    if (/012|123|234|345|456|567|678|789/.test(pass)) {
      score = Math.max(0, score - 1);
      feedback.push('Ada angka yang berurutan');
    }

    // Cap score at 10
    score = Math.min(score, 10);

    // Determine strength level
    let label: string;
    let color: string;
    let bgColor: string;
    let timeToCrack: string;
    let isStrong: boolean;

    if (score <= 2) {
      label = 'Sangat Lemah';
      color = 'text-red-500';
      bgColor = 'bg-red-500';
      timeToCrack = 'Kurang dari 1 detik';
      isStrong = false;
    } else if (score <= 4) {
      label = 'Lemah';
      color = 'text-orange-500';
      bgColor = 'bg-orange-500';
      timeToCrack = 'Beberapa detik';
      isStrong = false;
    } else if (score <= 6) {
      label = 'Sedang';
      color = 'text-yellow-500';
      bgColor = 'bg-yellow-500';
      timeToCrack = 'Beberapa jam';
      isStrong = false;
    } else if (score <= 8) {
      label = 'Kuat';
      color = 'text-green-500';
      bgColor = 'bg-green-500';
      timeToCrack = 'Beberapa bulan';
      isStrong = true;
    } else {
      label = 'Sangat Kuat';
      color = 'text-emerald-500';
      bgColor = 'bg-emerald-500';
      timeToCrack = 'Bertahun-tahun';
      isStrong = true;
    }

    // Add suggestions if no feedback and not strong
    if (feedback.length === 0 && !isStrong) {
      feedback.push('Gunakan kombinasi huruf besar, kecil, angka, dan simbol');
    }

    return {
      score,
      label,
      color,
      bgColor,
      timeToCrack,
      feedback: feedback.length > 0 ? feedback : ['Password kuat!'],
      isStrong,
    };
  };

  useEffect(() => {
    setStrength(checkStrength(password));
  }, [password]);

  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const generateStrongPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    let result = '';
    for (let i = 0; i < 16; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(result);
  };

  return (
    <BaseTool title={title} description={description} article={article}>
      <div className="space-y-6">
        {/* Input */}
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
            Password
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password untuk dicek..."
                className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            <button
              onClick={generateStrongPassword}
              className="px-4 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <RefreshCw className="w-4 h-4" />
              Generate
            </button>
            <button
              onClick={copyToClipboard}
              disabled={!password}
              className="px-4 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {copied ? (
                <CheckIcon className="w-5 h-5 text-green-500" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Strength Result */}
        {strength && password && (
          <div className="space-y-4 animate-slide-up">
            {/* Score Bar */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-300">Kekuatan</span>
                <span className={`font-bold ${strength.color}`}>{strength.label}</span>
              </div>
              <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${strength.bgColor}`}
                  style={{ width: `${(strength.score / 10) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>Lemah</span>
                <span>Sedang</span>
                <span>Kuat</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 glass rounded-xl text-center">
                <p className="text-xs text-gray-500">Panjang</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{password.length}</p>
              </div>
              <div className="p-3 glass rounded-xl text-center">
                <p className="text-xs text-gray-500">Huruf Kecil</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {(password.match(/[a-z]/g) || []).length}
                </p>
              </div>
              <div className="p-3 glass rounded-xl text-center">
                <p className="text-xs text-gray-500">Huruf Besar</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {(password.match(/[A-Z]/g) || []).length}
                </p>
              </div>
              <div className="p-3 glass rounded-xl text-center">
                <p className="text-xs text-gray-500">Angka & Simbol</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {(password.match(/[0-9^a-zA-Z]/g) || []).length}
                </p>
              </div>
            </div>

            {/* Time to Crack */}
            <div className="p-4 glass rounded-xl">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-indigo-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Estimasi waktu crack</p>
                  <p className="font-bold text-gray-900 dark:text-white">{strength.timeToCrack}</p>
                </div>
              </div>
            </div>

            {/* Feedback */}
            <div className="p-4 glass rounded-xl">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Saran
              </h4>
              <ul className="space-y-1">
                {strength.feedback.map((item, index) => (
                  <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2">
                    {strength.isStrong ? (
                      <Check className="w-4 h-4 text-green-500 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />
                    )}
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </BaseTool>
  );
}