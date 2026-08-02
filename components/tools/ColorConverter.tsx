'use client';

import { useState, useEffect, useRef } from 'react';
import { BaseTool } from './BaseTool';
import { Copy, Check, Palette, Eye, EyeOff, ArrowLeft, ArrowRight } from 'lucide-react';

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
  
  // State untuk gradient
  const [gradientColors, setGradientColors] = useState<string[]>(['#6366f1', '#8b5cf6', '#d946ef']);
  const [gradientAngle, setGradientAngle] = useState(45);
  const [gradientType, setGradientType] = useState<'linear' | 'radial'>('linear');
  const [showGradientPicker, setShowGradientPicker] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gradientCanvasRef = useRef<HTMLCanvasElement>(null);

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('color_history');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
    const savedGradients = localStorage.getItem('gradient_history');
    if (savedGradients) {
      const parsed = JSON.parse(savedGradients);
      if (parsed.length > 0) {
        setGradientColors(parsed);
      }
    }
  }, []);

  // Save color to history
  const saveToHistory = (hexColor: string) => {
    const newHistory = [{ hex: hexColor, timestamp: new Date().toLocaleString() }, ...history].slice(0, 20);
    setHistory(newHistory);
    localStorage.setItem('color_history', JSON.stringify(newHistory));
  };

  // Save gradient to history
  const saveGradientToHistory = (colors: string[]) => {
    localStorage.setItem('gradient_history', JSON.stringify(colors));
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

  // Draw color picker on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Draw gradient color wheel
    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, '#ff0000');
    gradient.addColorStop(0.17, '#ff8800');
    gradient.addColorStop(0.33, '#ffff00');
    gradient.addColorStop(0.5, '#00ff00');
    gradient.addColorStop(0.67, '#00ffff');
    gradient.addColorStop(0.83, '#0000ff');
    gradient.addColorStop(1, '#ff00ff');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Overlay dengan hitam/putih
    const overlay = ctx.createLinearGradient(0, 0, 0, height);
    overlay.addColorStop(0, 'rgba(255,255,255,1)');
    overlay.addColorStop(0.5, 'rgba(255,255,255,0)');
    overlay.addColorStop(0.5, 'rgba(0,0,0,0)');
    overlay.addColorStop(1, 'rgba(0,0,0,1)');
    ctx.fillStyle = overlay;
    ctx.fillRect(0, 0, width, height);

  }, []);

  // Handle canvas click untuk pick color
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(x, y, 1, 1);
    const data = imageData.data;
    
    const hexColor = '#' + 
      data[0].toString(16).padStart(2, '0') + 
      data[1].toString(16).padStart(2, '0') + 
      data[2].toString(16).padStart(2, '0');
    
    handleColorChange(hexColor);
  };

  // Update gradient preview
  useEffect(() => {
    const canvas = gradientCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    let gradient;
    if (gradientType === 'linear') {
      const rad = (gradientAngle * Math.PI) / 180;
      const x1 = width/2 - Math.cos(rad) * width/2;
      const y1 = height/2 - Math.sin(rad) * height/2;
      const x2 = width/2 + Math.cos(rad) * width/2;
      const y2 = height/2 + Math.sin(rad) * height/2;
      gradient = ctx.createLinearGradient(x1, y1, x2, y2);
    } else {
      gradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width/2);
    }

    gradientColors.forEach((color, index) => {
      gradient.addColorStop(index / (gradientColors.length - 1), color);
    });

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

  }, [gradientColors, gradientAngle, gradientType]);

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

  // Add gradient color
  const addGradientColor = () => {
    const newColors = [...gradientColors, '#ffffff'];
    if (newColors.length > 6) return;
    setGradientColors(newColors);
    saveGradientToHistory(newColors);
  };

  // Remove gradient color
  const removeGradientColor = (index: number) => {
    if (gradientColors.length <= 2) return;
    const newColors = gradientColors.filter((_, i) => i !== index);
    setGradientColors(newColors);
    saveGradientToHistory(newColors);
  };

  // Update gradient color
  const updateGradientColor = (index: number, color: string) => {
    const newColors = [...gradientColors];
    newColors[index] = color;
    setGradientColors(newColors);
    saveGradientToHistory(newColors);
  };

  // Copy gradient CSS
  const copyGradientCSS = () => {
    const direction = gradientType === 'linear' ? `${gradientAngle}deg` : 'circle';
    const colors = gradientColors.join(', ');
    const css = `background: ${gradientType}-gradient(${direction}, ${colors});`;
    copyToClipboard(css, 'gradient');
  };

  // Predefined gradients
  const predefinedGradients = [
    ['#667eea', '#764ba2'],
    ['#f093fb', '#f5576c'],
    ['#4facfe', '#00f2fe'],
    ['#43e97b', '#38f9d7'],
    ['#fa709a', '#fee140'],
    ['#a18cd1', '#fbc2eb'],
    ['#fccb90', '#d57eeb'],
    ['#89f7fe', '#66a6ff'],
  ];

  const applyPredefinedGradient = (colors: string[]) => {
    setGradientColors(colors);
    saveGradientToHistory(colors);
  };

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

        {/* Color Picker Canvas */}
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
            Pilih Warna (Geser untuk memilih)
          </label>
          <canvas
            ref={canvasRef}
            width={600}
            height={200}
            onClick={handleCanvasClick}
            className="w-full rounded-xl cursor-crosshair border-2 border-white/10"
          />
        </div>

        {/* Color Picker Input */}
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

        {/* Tabs: Color & Gradient */}
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setShowGradientPicker(false)}
            className={`px-4 py-2 text-sm font-medium transition-all ${
              !showGradientPicker
                ? 'text-indigo-500 border-b-2 border-indigo-500'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Color
          </button>
          <button
            onClick={() => setShowGradientPicker(true)}
            className={`px-4 py-2 text-sm font-medium transition-all ${
              showGradientPicker
                ? 'text-indigo-500 border-b-2 border-indigo-500'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Gradient
          </button>
        </div>

        {/* Gradient Picker */}
        {showGradientPicker && (
          <div className="space-y-4 animate-slide-up">
            {/* Gradient Preview */}
            <div className="relative overflow-hidden rounded-2xl border-2 border-white/10">
              <canvas
                ref={gradientCanvasRef}
                width={600}
                height={120}
                className="w-full"
              />
              <div className="absolute bottom-2 right-2 flex gap-2">
                <button
                  onClick={copyGradientCSS}
                  className="px-3 py-1.5 text-xs bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white rounded-lg transition-colors flex items-center gap-1"
                >
                  {copied && copyTarget === 'gradient' ? (
                    <Check className="w-3 h-3" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                  Copy CSS
                </button>
              </div>
            </div>

            {/* Gradient Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                  Tipe Gradient
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setGradientType('linear')}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      gradientType === 'linear'
                        ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    Linear
                  </button>
                  <button
                    onClick={() => setGradientType('radial')}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      gradientType === 'radial'
                        ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    Radial
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                  Sudut: {gradientAngle}°
                </label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={gradientAngle}
                  onChange={(e) => setGradientAngle(parseInt(e.target.value))}
                  className="w-full accent-indigo-500"
                />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>0°</span>
                  <span>90°</span>
                  <span>180°</span>
                  <span>270°</span>
                  <span>360°</span>
                </div>
              </div>
            </div>

            {/* Gradient Colors */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                Warna Gradient
              </label>
              <div className="flex flex-wrap gap-3">
                {gradientColors.map((color, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="relative">
                      <input
                        type="color"
                        value={color}
                        onChange={(e) => updateGradientColor(index, e.target.value)}
                        className="w-12 h-12 rounded-xl cursor-pointer border-2 border-white/10"
                      />
                      <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-gray-400">
                        {index + 1}
                      </span>
                    </div>
                    {gradientColors.length > 2 && (
                      <button
                        onClick={() => removeGradientColor(index)}
                        className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors"
                      >
                        <span className="text-red-500 text-xs">×</span>
                      </button>
                    )}
                  </div>
                ))}
                {gradientColors.length < 6 && (
                  <button
                    onClick={addGradientColor}
                    className="w-12 h-12 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-indigo-500 transition-colors flex items-center justify-center text-2xl text-gray-400 hover:text-indigo-500"
                  >
                    +
                  </button>
                )}
              </div>
            </div>

            {/* Predefined Gradients */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                Gradient Populer
              </label>
              <div className="flex flex-wrap gap-2">
                {predefinedGradients.map((gradient, index) => (
                  <button
                    key={index}
                    onClick={() => applyPredefinedGradient(gradient)}
                    className="w-16 h-10 rounded-xl border-2 border-white/10 hover:scale-105 transition-transform"
                    style={{
                      background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`
                    }}
                    title={`${gradient[0]} → ${gradient[1]}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Color Formats - Only show when not in gradient mode */}
        {!showGradientPicker && (
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
        )}

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