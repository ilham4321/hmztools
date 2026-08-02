'use client';

import { useState, useEffect } from 'react';
import { BaseTool } from './BaseTool';
import { Copy, Check, Palette, Eye, EyeOff } from 'lucide-react';

interface ColorConverterProps {
  title: string;
  description: string;
  article: string;
  dict: any;
}

interface ColorHistory {
  hex: string;
  timestamp: string;
}

export function ColorConverter({ title, description, article, dict }: ColorConverterProps) {
  const [hex, setHex] = useState('#6366f1');
  const [rgb, setRgb] = useState({ r: 99, g: 102, b: 241 });
  const [hsl, setHsl] = useState({ h: 239, s: 84, l: 67 });
  const [cmyk, setCmyk] = useState({ c: 59, m: 58, y: 0, k: 5 });
  const [copied, setCopied] = useState(false);
  const [copyTarget, setCopyTarget] = useState('');
  const [history, setHistory] = useState<ColorHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#6366f1');

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('color_history');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  // Save color to history
  const saveToHistory = (hexColor: string) => {
    const newHistory = [{ hex: hexColor, timestamp: new Date().toLocaleString() }, ...history].slice(0, 20);
    setHistory(newHistory);
    localStorage.setItem('color_history', JSON.stringify(newHistory));
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
      return {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      };
    }
    return null;
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  const rgbToCmyk = (r: number, g: number, b: number) => {
    const c = 1 - (r / 255);
    const m = 1 - (g / 255);
    const y = 1 - (b / 255);
    const k = Math.min(c, m, y);
    
    if (k === 1) {
      return { c: 0, m: 0, y: 0, k: 100 };
    }
    
    return {
      c: Math.round(((c - k) / (1 - k)) * 100),
      m: Math.round(((m - k) / (1 - k)) * 100),
      y: Math.round(((y - k) / (1 - k)) * 100),
      k: Math.round(k * 100),
    };
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    setHex(color);
    const rgbResult = hexToRgb(color);
    if (rgbResult) {
      setRgb(rgbResult);
      setHsl(rgbToHsl(rgbResult.r, rgbResult.g, rgbResult.b));
      setCmyk(rgbToCmyk(rgbResult.r, rgbResult.g, rgbResult.b));
      saveToHistory(color);
    }
  };

  const handleHexInput = (value: string) => {
    let cleanValue = value;
    if (!cleanValue.startsWith('#')) {
      cleanValue = '#' + cleanValue;
    }
    if (/^#?[a-f\d]{6}$/i.test(cleanValue.replace('#', ''))) {
      setHex(cleanValue);
      setSelectedColor(cleanValue);
      const rgbResult = hexToRgb(cleanValue);
      if (rgbResult) {
        setRgb(rgbResult);
        setHsl(rgbToHsl(rgbResult.r, rgbResult.g, rgbResult.b));
        setCmyk(rgbToCmyk(rgbResult.r, rgbResult.g, rgbResult.b));
        saveToHistory(cleanValue);
      }
    }
  };

  const copyToClipboard = (text: string, target: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setCopyTarget(target);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('color_history');
  };

  const getContrastColor = (hexColor: string) => {
    const rgb = hexToRgb(hexColor);
    if (!rgb) return '#ffffff';
    const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
    return luminance > 0.5 ? '#000000' : '#ffffff';
  };

  const getTextColor = getContrastColor(hex);

  // Predefined colors
  const predefinedColors = [
    '#FF0000', '#FF4500', '#FF8C00', '#FFD700', '#FFFF00',
    '#7FFF00', '#00FF00', '#00FF7F', '#00FFFF', '#1E90FF',
    '#0000FF', '#8A2BE2', '#FF00FF', '#FF1493', '#FF69B4',
    '#FF6347', '#FF7F50', '#F0E68C', '#98FB98', '#87CEEB',
    '#9370DB', '#FFB6C1', '#DDA0DD', '#F5DEB3', '#FFF8DC',
  ];

  return (
    <BaseTool title={title} description={description} article={article}>
      <div className="space-y-6">
        {/* Color Preview */}
        <div className="relative overflow-hidden rounded-2xl border-2 border-white/10" style={{ backgroundColor: hex }}>
          <div className="flex items-center justify-between p-6" style={{ minHeight: '120px' }}>
            <div>
              <div className="text-2xl font-bold" style={{ color: getTextColor }}>
                {hex.toUpperCase()}
              </div>
              <div className="text-sm opacity-75" style={{ color: getTextColor }}>
                Klik untuk menyalin
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => copyToClipboard(hex, 'hex')}
                className="p-2 rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                style={{ color: getTextColor }}
              >
                {copied && copyTarget === 'hex' ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Color Picker */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative w-full sm:w-auto">
            <input
              type="color"
              value={selectedColor}
              onChange={(e) => handleColorChange(e.target.value)}
              className="w-full sm:w-20 h-16 rounded-xl cursor-pointer border-2 border-white/10"
            />
          </div>
          <div className="flex-1 w-full">
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <Palette className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type="text"
                value={hex}
                onChange={(e) => handleHexInput(e.target.value)}
                placeholder="#000000"
                className="w-full px-4 py-3 pl-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent text-gray-900 dark:text-white font-mono"
              />
            </div>
          </div>
        </div>

        {/* Predefined Colors */}
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
            Warna Populer
          </label>
          <div className="flex flex-wrap gap-2">
            {predefinedColors.map((color) => (
              <button
                key={color}
                onClick={() => handleColorChange(color)}
                className="w-8 h-8 rounded-lg border-2 border-white/10 hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>

        {/* Color Formats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 glass rounded-xl">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">RGB</h4>
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm">
                rgb({rgb.r}, {rgb.g}, {rgb.b})
              </span>
              <button
                onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, 'rgb')}
                className="p-1 hover:bg-white/10 rounded transition-colors"
              >
                {copied && copyTarget === 'rgb' ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
            <div className="mt-2 flex gap-2">
              <span className="text-xs px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded">R: {rgb.r}</span>
              <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded">G: {rgb.g}</span>
              <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">B: {rgb.b}</span>
            </div>
          </div>

          <div className="p-4 glass rounded-xl">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">HSL</h4>
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm">
                hsl({hsl.h}°, {hsl.s}%, {hsl.l}%)
              </span>
              <button
                onClick={() => copyToClipboard(`hsl(${hsl.h}°, ${hsl.s}%, ${hsl.l}%)`, 'hsl')}
                className="p-1 hover:bg-white/10 rounded transition-colors"
              >
                {copied && copyTarget === 'hsl' ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
            <div className="mt-2 flex gap-2">
              <span className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded">H: {hsl.h}°</span>
              <span className="text-xs px-2 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 rounded">S: {hsl.s}%</span>
              <span className="text-xs px-2 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded">L: {hsl.l}%</span>
            </div>
          </div>

          <div className="p-4 glass rounded-xl">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">CMYK</h4>
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm">
                cmyk({cmyk.c}%, {cmyk.m}%, {cmyk.y}%, {cmyk.k}%)
              </span>
              <button
                onClick={() => copyToClipboard(`cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`, 'cmyk')}
                className="p-1 hover:bg-white/10 rounded transition-colors"
              >
                {copied && copyTarget === 'cmyk' ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              <span className="text-xs px-2 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 rounded">C: {cmyk.c}%</span>
              <span className="text-xs px-2 py-1 bg-magenta-100 dark:bg-magenta-900/30 text-magenta-700 dark:text-magenta-300 rounded">M: {cmyk.m}%</span>
              <span className="text-xs px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded">Y: {cmyk.y}%</span>
              <span className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">K: {cmyk.k}%</span>
            </div>
          </div>

          <div className="p-4 glass rounded-xl">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">CSS Variable</h4>
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm text-xs break-all">
                --color: {hex};
              </span>
              <button
                onClick={() => copyToClipboard(`--color: ${hex};`, 'css')}
                className="p-1 hover:bg-white/10 rounded transition-colors flex-shrink-0 ml-2"
              >
                {copied && copyTarget === 'css' ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* History */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              {showHistory ? 'Sembunyikan Riwayat' : 'Tampilkan Riwayat'} ({history.length})
            </button>
            {history.length > 0 && (
              <button
                onClick={clearHistory}
                className="text-sm text-red-500 hover:text-red-600 transition-colors"
              >
                Hapus Semua
              </button>
            )}
          </div>

          {showHistory && history.length > 0 && (
            <div className="flex flex-wrap gap-2 animate-slide-up">
              {history.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleColorChange(item.hex)}
                  className="relative group w-12 h-12 rounded-xl border-2 border-white/10 hover:scale-110 transition-transform"
                  style={{ backgroundColor: item.hex }}
                  title={`${item.hex} - ${item.timestamp}`}
                >
                  <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 rounded-xl transition-opacity text-white text-xs font-mono">
                    {item.hex}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </BaseTool>
  );
}