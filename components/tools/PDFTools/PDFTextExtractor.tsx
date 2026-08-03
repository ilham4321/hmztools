'use client';

import { useState } from 'react';
import { PDFBase } from './PDFBase';
import { FileText, Copy, Check, Download, Settings, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface PDFTextExtractorProps {
  title: string;
  description: string;
  article: string;
  dict: any;
}

interface ExtractedText {
  page: number;
  text: string;
}

export function PDFTextExtractor({ title, description, article, dict }: PDFTextExtractorProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [extractedTexts, setExtractedTexts] = useState<ExtractedText[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showAllPages, setShowAllPages] = useState(false);
  const [pageCount, setPageCount] = useState(0);

  const processPDF = async (file: File) => {
    setIsProcessing(true);
    setProgress(0);
    setIsComplete(false);
    setExtractedTexts([]);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const totalPages = pdf.numPages;
      setPageCount(totalPages);

      const texts: ExtractedText[] = [];

      for (let i = 1; i <= totalPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const text = textContent.items.map((item: any) => item.str).join(' ');
        texts.push({ page: i, text: text.trim() || '(Kosong)' });
        setProgress(Math.round((i / totalPages) * 100));
      }

      setExtractedTexts(texts);
      setIsComplete(true);
    } catch (error) {
      console.error('Error extracting text:', error);
      alert('Gagal mengekstrak teks. Pastikan file PDF valid.');
    } finally {
      setIsProcessing(false);
    }
  };

  const copyAllText = () => {
    const allText = extractedTexts.map(t => `--- Halaman ${t.page} ---\n${t.text}`).join('\n\n');
    navigator.clipboard.writeText(allText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadText = () => {
    const allText = extractedTexts.map(t => `--- Halaman ${t.page} ---\n${t.text}`).join('\n\n');
    const blob = new Blob([allText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'extracted-text.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  const getTotalCharacters = () => {
    return extractedTexts.reduce((sum, t) => sum + t.text.length, 0);
  };

  const getTotalWords = () => {
    return extractedTexts.reduce((sum, t) => sum + t.text.split(/\s+/).filter(w => w).length, 0);
  };

  const displayedTexts = showAllPages ? extractedTexts : extractedTexts.slice(0, 3);

  return (
    <PDFBase
      title={title}
      description={description}
      article={article}
      onFileUpload={processPDF}
      isProcessing={isProcessing}
      processingText={`Mengekstrak teks ${Math.round(progress)}%`}
    >
      <div className="space-y-6">
        {/* Stats */}
        {isComplete && (
          <div className="grid grid-cols-3 gap-3 animate-slide-up">
            <div className="p-3 glass rounded-xl text-center">
              <div className="text-2xl font-bold text-indigo-400">{pageCount}</div>
              <div className="text-xs text-gray-500">Halaman</div>
            </div>
            <div className="p-3 glass rounded-xl text-center">
              <div className="text-2xl font-bold text-green-400">{getTotalWords().toLocaleString()}</div>
              <div className="text-xs text-gray-500">Kata</div>
            </div>
            <div className="p-3 glass rounded-xl text-center">
              <div className="text-2xl font-bold text-blue-400">{getTotalCharacters().toLocaleString()}</div>
              <div className="text-xs text-gray-500">Karakter</div>
            </div>
          </div>
        )}

        {/* Actions */}
        {isComplete && (
          <div className="flex flex-wrap gap-3">
            <button onClick={copyAllText} className="btn-primary">
              {copied ? (
                <Check className="w-4 h-4 inline mr-2" />
              ) : (
                <Copy className="w-4 h-4 inline mr-2" />
              )}
              {copied ? 'Tersalin!' : 'Copy Semua Teks'}
            </button>
            <button onClick={downloadText} className="btn-secondary">
              <Download className="w-4 h-4 inline mr-2" />
              Download .txt
            </button>
          </div>
        )}

        {/* Extracted Text */}
        {isComplete && extractedTexts.length > 0 && (
          <div className="space-y-4 animate-slide-up">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Hasil Ekstraksi Teks
              </h4>
              {extractedTexts.length > 3 && (
                <button
                  onClick={() => setShowAllPages(!showAllPages)}
                  className="text-sm text-indigo-500 hover:text-indigo-600 transition-colors flex items-center gap-1"
                >
                  {showAllPages ? (
                    <>
                      <ChevronUp className="w-4 h-4" />
                      Sembunyikan
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4" />
                      Lihat Semua ({extractedTexts.length} halaman)
                    </>
                  )}
                </button>
              )}
            </div>

            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {displayedTexts.map((item) => (
                <div key={item.page} className="p-4 glass rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded">
                      Halaman {item.page}
                    </span>
                    <span className="text-xs text-gray-400">
                      {item.text.split(/\s+/).filter(w => w).length} kata
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
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