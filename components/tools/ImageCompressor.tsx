'use client';

import { useState, useRef } from 'react';
import { BaseTool } from './BaseTool';
import { Image, Download, Upload } from 'lucide-react';

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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const compressImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
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
      compressImage(file);
    }
  };

  const downloadImage = () => {
    if (compressedImage) {
      const link = document.createElement('a');
      link.href = compressedImage;
      link.download = 'compressed-image.jpg';
      link.click();
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
            {dict.common.upload}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Kualitas: {quality}%
          </label>
          <input
            type="range"
            min="10"
            max="100"
            value={quality}
            onChange={(e) => {
              setQuality(parseInt(e.target.value));
              if (fileInputRef.current?.files?.[0]) {
                compressImage(fileInputRef.current.files[0]);
              }
            }}
            className="w-full"
          />
        </div>

        {originalImage && compressedImage && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Original</h4>
              <img
                src={originalImage}
                alt="Original"
                className="w-full rounded-xl border border-white/10"
              />
              <p className="text-sm text-gray-500">
                Size: {(originalSize / 1024).toFixed(2)} KB
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Compressed</h4>
              <img
                src={compressedImage}
                alt="Compressed"
                className="w-full rounded-xl border border-white/10"
              />
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Size: {(compressedSize / 1024).toFixed(2)} KB
                </p>
                <button onClick={downloadImage} className="btn-primary text-sm">
                  <Download className="w-4 h-4 inline mr-2" />
                  {dict.common.download}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </BaseTool>
  );
}