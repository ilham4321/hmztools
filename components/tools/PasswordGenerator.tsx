'use client';

import { useState } from 'react';
import { BaseTool } from './BaseTool';
import { Key, Copy, RefreshCw, Shield, Check, Eye, EyeOff, Info } from 'lucide-react'; // <-- Tambahkan Info di import

interface PasswordGeneratorProps {
  title: string;
  description: string;
  article: string;
  dict: any;
}

export function PasswordGenerator({ title, description, article, dict }: PasswordGeneratorProps) {
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [strength, setStrength] = useState(0);

  const checkStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 12) score++;
    if (pass.length >= 16) score++;
    if (/[a-z]/.test(pass)) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^a-zA-Z0-9]/.test(pass)) score++;
    if (pass.length >= 20) score++;
    return Math.min(score, 7);
  };

  const generatePassword = () => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let chars = '';
    if (includeUppercase) chars += uppercase;
    if (includeLowercase) chars += lowercase;
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;

    if (chars === '') return;

    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(result);
    setCopied(false);
    setStrength(checkStrength(result));
  };

  const copyToClipboard = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStrengthText = () => {
    if (strength <= 2) return { text: 'Lemah', color: 'text-red-500' };
    if (strength <= 4) return { text: 'Sedang', color: 'text-yellow-500' };
    if (strength <= 6) return { text: 'Kuat', color: 'text-green-500' };
    return { text: 'Sangat Kuat', color: 'text-emerald-500' };
  };

  const strengthInfo = getStrengthText();

  return (
    <BaseTool title={title} description={description} article={article}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              readOnly
              placeholder="Klik Generate untuk membuat password"
              className="w-full px-4 py-3 pr-24 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent text-gray-900 dark:text-white font-mono placeholder-gray-500 dark:placeholder-gray-400"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 text-gray-400" />
                ) : (
                  <Eye className="w-4 h-4 text-gray-400" />
                )}
              </button>
              <button
                onClick={copyToClipboard}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                disabled={!password}
              >
                <Copy className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
          <button onClick={generatePassword} className="btn-primary w-full sm:w-auto">
            <RefreshCw className="w-4 h-4 inline mr-2" />
            {dict.common.generate}
          </button>
        </div>

        {copied && (
          <div className="text-green-500 text-sm text-center animate-fade-in">
            <Check className="w-4 h-4 inline mr-1" />
            {dict.common.copied}
          </div>
        )}

        {password && (
          <div className="flex items-center gap-4 animate-slide-up">
            <div className="flex-1">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Kekuatan</span>
                <span className={strengthInfo.color}>{strengthInfo.text}</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${(strength / 7) * 100}%`,
                    background: `linear-gradient(to right, #ef4444, #eab308, #22c55e, #10b981)`,
                  }}
                />
              </div>
            </div>
            <Shield className={`w-5 h-5 ${strengthInfo.color}`} />
          </div>
        )}

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Panjang: {length}
            </label>
            <input
              type="range"
              min="4"
              max="64"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="flex-1 accent-indigo-500"
            />
            <span className="text-xs text-gray-400 min-w-[30px]">{length}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-indigo-500 focus:ring-indigo-500 cursor-pointer"
              />
              Huruf Besar
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-indigo-500 focus:ring-indigo-500 cursor-pointer"
              />
              Huruf Kecil
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-indigo-500 focus:ring-indigo-500 cursor-pointer"
              />
              Angka
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-indigo-500 focus:ring-indigo-500 cursor-pointer"
              />
              Simbol
            </label>
          </div>
        </div>

        {password && (
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800/30 flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Gunakan password yang kuat dan unik untuk setiap akun. Jangan bagikan password dengan siapapun.
            </p>
          </div>
        )}
      </div>
    </BaseTool>
  );
}