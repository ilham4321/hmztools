'use client';

import { useState } from 'react';
import { BaseTool } from './BaseTool';
import { QRCodeSVG } from 'qrcode.react';
import { Download } from 'lucide-react';

interface QRCodeGeneratorProps {
  title: string;
  description: string;
  article: string;
  dict: any;
}

export function QRCodeGenerator({ title, description, article, dict }: QRCodeGeneratorProps) {
  const [text, setText] = useState('');
  const [size, setSize] = useState(200);

  const downloadQR = () => {
    const svgElement = document.querySelector('svg');
    if (svgElement) {
      const serializer = new XMLSerializer();
      const svgString = serializer.serializeToString(svgElement);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      
      img.onload = () => {
        canvas.width = size;
        canvas.height = size;
        ctx?.drawImage(img, 0, 0, size, size);
        const link = document.createElement('a');
        link.download = 'qrcode.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        URL.revokeObjectURL(url);
      };
      img.src = url;
    }
  };

  return (
    <BaseTool title={title} description={description} article={article}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Masukkan teks atau URL..."
            className="input-field flex-1"
          />
        </div>

        {text && (
          <div className="flex flex-col items-center gap-6">
            <div className="p-4 glass rounded-xl">
              <QRCodeSVG
                value={text}
                size={size}
                bgColor="#ffffff"
                fgColor="#000000"
                level="H"
                includeMargin
              />
            </div>

            <div className="flex flex-wrap gap-3 items-center">
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600 dark:text-gray-300">
                  Ukuran:
                </label>
                <input
                  type="range"
                  min="100"
                  max="400"
                  value={size}
                  onChange={(e) => setSize(parseInt(e.target.value))}
                  className="w-32"
                />
                <span className="text-sm text-gray-500">{size}px</span>
              </div>
              <button onClick={downloadQR} className="btn-primary">
                <Download className="w-4 h-4 inline mr-2" />
                {dict.common.download}
              </button>
            </div>
          </div>
        )}
      </div>
    </BaseTool>
  );
}