'use client';

import { ReactNode, useState, useRef } from 'react';
import { Upload, FileText, X, Check, Loader2 } from 'lucide-react';

interface PDFBaseProps {
  title: string;
  description: string;
  article: string;
  children: ReactNode;
  onFileUpload?: (file: File) => void;
  isProcessing?: boolean;
  processingText?: string;
}

export function PDFBase({ 
  title, 
  description, 
  article, 
  children,
  onFileUpload,
  isProcessing = false,
  processingText = 'Memproses...'
}: PDFBaseProps) {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (selectedFile: File) => {
    if (selectedFile.type === 'application/pdf' || selectedFile.name.endsWith('.pdf')) {
      setFile(selectedFile);
      if (onFileUpload) onFileUpload(selectedFile);
    } else {
      alert('Mohon upload file PDF!');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gradient-blue mb-3">
          {title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          {description}
        </p>
      </div>

      {/* Upload Area */}
      <div className="card-glass mb-8">
        <div
          className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
            dragActive
              ? 'border-indigo-500 bg-indigo-500/10'
              : 'border-gray-300 dark:border-gray-600 hover:border-indigo-400'
          } ${file ? 'bg-green-500/5 border-green-500' : ''}`}
          onDragEnter={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={(e) => { e.preventDefault(); setDragActive(false); }}
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFile(e.target.files[0]);
              }
            }}
            className="hidden"
          />

          {isProcessing ? (
            <div className="py-8">
              <Loader2 className="w-12 h-12 mx-auto text-indigo-500 animate-spin" />
              <p className="mt-3 text-gray-600 dark:text-gray-300">{processingText}</p>
            </div>
          ) : file ? (
            <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <FileText className="w-6 h-6 text-green-500" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900 dark:text-white">{file.name}</p>
                  <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                </div>
              </div>
              <button
                onClick={removeFile}
                className="p-2 hover:bg-red-500/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-red-500" />
              </button>
            </div>
          ) : (
            <>
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-indigo-500/10 rounded-full">
                  <Upload className="w-8 h-8 text-indigo-500" />
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium text-indigo-500 cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                  Klik untuk upload
                </span>
                {' '}atau drag & drop PDF di sini
              </p>
              <p className="text-sm text-gray-400 mt-2">Maksimal 50MB</p>
            </>
          )}
        </div>

        {/* Tool-specific content */}
        {file && !isProcessing && (
          <div className="mt-6 animate-slide-up">
            {children}
          </div>
        )}
      </div>

      {/* Article */}
      <div className="prose prose-indigo dark:prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ __html: article }} />
      </div>
    </div>
  );
}