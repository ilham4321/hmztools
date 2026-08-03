'use client';

import { useState } from 'react';
import { PDFBase } from './PDFBase';
import { Image, Download, Loader2, Check, Settings, FileImage } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
import JSZip from 'jszip';

// Set worker untuk pdf.js
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface PDFToImagesProps {
  title: string;
  description: string;
  article: string;
  dict: any;
}

export function PDFToImages({ title, description, article, dict }: PDFToImagesProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imageQuality, setImageQuality] = useState(1.0);
  const [imageFormat, setImageFormat] = useState<'png' | 'jpeg'>('png');
  const [isComplete, setIsComplete] = useState(false);
  const [pageCount, setPageCount] = useState(0);

  const processPDF = async (file: File) => {
    setIsProcessing(true);
    setProgress(0);
    setIsComplete(false);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const totalPages = pdf.numPages;
      setPageCount(totalPages);

      const zip = new JSZip();
      const images: { data: string; page: number }[] = [];

      for (let i = 1; i <= totalPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: imageQuality * 2 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        if (context) {
          await page.render({ canvasContext: context, viewport }).promise;
          const imageData = canvas.toDataURL(`image/${imageFormat}`, 0.9);
          images.push({ data: imageData.split(',')[1], page: i });
        }

        setProgress(Math.round((i / totalPages) * 100));
      }

      // Buat ZIP
      images.forEach((img) => {
        const ext = imageFormat === 'png' ? 'png' : 'jpg';
        zip.file(`page-${img.page}.${ext}`, img.data, { base64: true });
      });

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `pdf-pages.zip`;
      link.click();
      URL.revokeObjectURL(url);

      setIsComplete(true);
    } catch (error) {
      console.error('Error processing PDF:', error);
      alert('Gagal memproses PDF. Pastikan file valid.');
    } finally {
      setIsProcessing(false);
    }
  };

  const resetAll = () => {
    setIsComplete(false);
    setProgress(0);
    setPageCount(0);
  };

  return (
    <PDFBase
      title={title}
      description={description}
      article={article}
      onFileUpload={processPDF}
      isProcessing={isProcessing}
      processingText={`Mengkonversi halaman ${Math.round(progress)}%`}
    >
      <div className="space-y-6">
        {/* Settings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
              <Settings className="w-4 h-4 inline mr-1" />
              Kualitas Gambar
            </label>
            <div className="flex gap-2">
              {[0.5, 1.0, 2.0].map((quality) => (
                <button
                  key={quality}
                  onClick={() => setImageQuality(quality)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    imageQuality === quality
                      ? 'bg-indigo-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {quality === 0.5 ? 'SD' : quality === 1.0 ? 'HD' : '4K'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
              <FileImage className="w-4 h-4 inline mr-1" />
              Format
            </label>
            <div className="flex gap-2">
              {['png', 'jpeg'].map((format) => (
                <button
                  key={format}
                  onClick={() => setImageFormat(format as 'png' | 'jpeg')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    imageFormat === format
                      ? 'bg-indigo-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {format.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Progress */}
        {isProcessing && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
              <span>Memproses...</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Complete */}
        {isComplete && (
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800/30 flex items-center gap-3">
            <Check className="w-5 h-5 text-green-500" />
            <div>
              <p className="font-medium text-green-700 dark:text-green-300">
                Selesai! {pageCount} halaman dikonversi.
              </p>
              <p className="text-sm text-green-600 dark:text-green-400">
                Download ZIP telah dimulai secara otomatis.
              </p>
            </div>
            <button
              onClick={resetAll}
              className="ml-auto text-sm text-indigo-500 hover:text-indigo-600 transition-colors"
            >
              Proses ulang
            </button>
          </div>
        )}

        {/* Info */}
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800/30">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            ⚡ Semua proses di browser. File PDF tidak diupload ke server. 100% aman & privat.
          </p>
        </div>
      </div>
    </PDFBase>
  );
}