'use client';

import { useState, useRef } from 'react';
import { BaseTool } from './BaseTool';
import { Image as ImageIcon, Download, Upload } from 'lucide-react';

interface ImageCompressorProps {
  title: string;
  description: string;
  article: string;
  dict: any;
}

export function ImageCompressor({ title, description, article, dict }: ImageCompressorProps) {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [quality, setQuality] = useState(70);
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const compressImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = document.createElement('img') as HTMLImageElement;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const maxWidth = 1920;
        const maxHeight = 1080;
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        const qualityValue = quality / 100;
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              setCompressedImage(url);
              setCompressedSize(blob.size);
            }
          },
          'image/jpeg',
          qualityValue
        );
      };
      img.src = e.target?.result as string;
      setOriginalImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setOriginalSize(file.size);
      setFileName(file.name);
      compressImage(file);
    }
  };

  const downloadImage = () => {
    if (compressedImage) {
      const link = document.createElement('a');
      link.href = compressedImage;
      const nameParts = fileName.split('.');
      const ext = nameParts.pop();
      const name = nameParts.join('.');
      link.download = `${name}-compressed.${ext || 'jpg'}`;
      link.click();
    }
  };

  const resetAll = () => {
    setOriginalImage(null);
    setCompressedImage(null);
    setOriginalSize(0);
    setCompressedSize(0);
    setFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <BaseTool title={title} description={description} article={article}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="btn-primary flex-1"
          >
            <Upload className="w-4 h-4 inline mr-2" />
            {dict.common.upload || 'Upload Image'}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          {originalImage && (
            <button onClick={resetAll} className="btn-secondary">
              Reset
            </button>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Kualitas: {quality}%
            </label>
            <span className="text-sm text-gray-500">
              {originalSize > 0 && `${(originalSize / 1024).toFixed(2)} KB`}
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={quality}
            onChange={(e) => {
              const newQuality = parseInt(e.target.value);
              setQuality(newQuality);
              if (fileInputRef.current?.files?.[0]) {
                const file = fileInputRef.current.files[0];
                setOriginalSize(file.size);
                compressImage(file);
              }
            }}
            className="w-full"
          />
        </div>

        {originalImage && compressedImage && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Original</h4>
              <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                <img
                  src={originalImage}
                  alt="Original"
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-sm text-gray-500">
                Size: {(originalSize / 1024).toFixed(2)} KB
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Compressed</h4>
              <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                <img
                  src={compressedImage}
                  alt="Compressed"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Size: {(compressedSize / 1024).toFixed(2)} KB
                </p>
                <button onClick={downloadImage} className="btn-primary text-sm">
                  <Download className="w-4 h-4 inline mr-2" />
                  {dict.common.download}
                </button>
              </div>
              {originalSize > 0 && compressedSize > 0 && (
                <p className="text-xs text-green-500">
                  Terkompres: {((1 - compressedSize / originalSize) * 100).toFixed(0)}%
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </BaseTool>
  );
}