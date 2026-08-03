'use client';

import { useState } from 'react';
import { PDFBase } from './PDFBase';
import { RotateCw, RotateCcw, Check, RefreshCw } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';

interface PDFRotatorProps {
  title: string;
  description: string;
  article: string;
  dict: any;
}

export function PDFRotator({ title, description, article, dict }: PDFRotatorProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [rotation, setRotation] = useState<90 | 180 | 270>(90);
  const [file, setFile] = useState<File | null>(null);

  const processPDF = async (uploadedFile: File) => {
    setFile(uploadedFile);
    setIsProcessing(true);
    setIsComplete(false);

    try {
      const arrayBuffer = await uploadedFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();

      // Konversi rotation ke number untuk pdf-lib
      const rotValue = rotation as number;

      pages.forEach(page => {
        const { width, height } = page.getSize();
        // Gunakan setRotation dengan nilai number
        (page as any).setRotation(rotValue);
        // Adjust page size for rotation
        if (rotation === 90 || rotation === 270) {
          page.setSize(height, width);
        }
      });

      const pdfBytes = await pdfDoc.save();
      
      // Cara lain untuk membuat Blob dari Uint8Array
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const originalName = uploadedFile.name.replace('.pdf', '');
      link.download = `${originalName}-rotated-${rotation}deg.pdf`;
      link.click();
      URL.revokeObjectURL(url);

      setIsComplete(true);
    } catch (error) {
      console.error('Error rotating PDF:', error);
      alert('Gagal merotasi PDF. Pastikan file valid.');
    } finally {
      setIsProcessing(false);
    }
  };

  const resetAll = () => {
    setIsComplete(false);
    setFile(null);
  };

  return (
    <PDFBase
      title={title}
      description={description}
      article={article}
      onFileUpload={processPDF}
      isProcessing={isProcessing}
      processingText={`Merotasi PDF...`}
    >
      <div className="space-y-6">
        {/* Rotation Options */}
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-3">
            <RotateCw className="w-4 h-4 inline mr-1" />
            Pilih Sudut Rotasi
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[90, 180, 270].map((deg) => (
              <button
                key={deg}
                onClick={() => setRotation(deg as 90 | 180 | 270)}
                className={`p-4 rounded-xl text-center transition-all ${
                  rotation === deg
                    ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex justify-center mb-1">
                  {deg === 90 && <RotateCw className="w-6 h-6" />}
                  {deg === 180 && <RotateCw className="w-6 h-6 rotate-180" />}
                  {deg === 270 && <RotateCcw className="w-6 h-6" />}
                </div>
                <span className="text-sm font-medium">{deg}°</span>
              </button>
            ))}
          </div>
        </div>

        {/* Complete */}
        {isComplete && (
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800/30 flex items-center gap-3 animate-slide-up">
            <Check className="w-5 h-5 text-green-500" />
            <div>
              <p className="font-medium text-green-700 dark:text-green-300">
                Rotasi selesai! PDF berhasil di-rotate.
              </p>
              <p className="text-sm text-green-600 dark:text-green-400">
                File telah di-download secara otomatis.
              </p>
            </div>
            <button
              onClick={resetAll}
              className="ml-auto text-sm text-indigo-500 hover:text-indigo-600 transition-colors flex items-center gap-1"
            >
              <RefreshCw className="w-4 h-4" />
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