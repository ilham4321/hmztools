'use client';

import { useState, useEffect } from 'react';
import { BaseTool } from './BaseTool';
import { Copy, Check } from 'lucide-react';

interface ColorConverterProps {
  title: string;
  description: string;
  article: string;
  dict: any;
}

export function ColorConverter({ title, description, article, dict }: ColorConverterProps) {
  const [hex, setHex] = useState('#6366f1');
  const [rgb, setRgb] = useState({ r: 99, g: 102, b: 241 });
  const [hsl, setHsl] = useState({ h: 239, s: 84, l: 67 });
  const [copied, setCopied] = useState(false);
  const [copyTarget, setCopyTarget] = useState('');

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

  const handleHexChange = (value: string) => {
    setHex(value);
    const rgbResult = hexToRgb(value);
    if (rgbResult) {
      setRgb(rgbResult);
      setHsl(rgbToHsl(rgbResult.r, rgbResult.g, rgbResult.b));
    }
  };

  const copyToClipboard = (text: string, target: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setCopyTarget(target);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    handleHexChange('#6366f1');
  }, []);

  return (
    <BaseTool title={title} description={description} article={article}>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-xl border border-white/10 flex-shrink-0"
            style={{ backgroundColor: hex }}
          />
          <div className="flex-1">
            <input
              type="text"
              value={hex}
              onChange={(e) => handleHexChange(e.target.value)}
              className="input-field font-mono"
              placeholder="#000000"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 glass rounded-xl">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">RGB</h4>
            <div className="flex items-center gap-4">
              <span className="font-mono">
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
          </div>
          <div className="p-4 glass rounded-xl">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">HSL</h4>
            <div className="flex items-center gap-4">
              <span className="font-mono">
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
          </div>
        </div>
      </div>
    </BaseTool>
  );
}