'use client';

import { useState } from 'react';
import { PDFBase } from './PDFBase';
import { 
  Info, 
  FileText, 
  User, 
  Calendar, 
  Hash, 
  Copy, 
  Check,
  File,
  Layers,
  Github,
  Printer,
  FileJson
} from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface PDFInfoViewerProps {
  title: string;
  description: string;
  article: string;
  dict: any;
}

interface PDFInfo {
  pageCount: number;
  title: string;
  author: string;
  creator: string;
  subject: string;
  keywords: string;
  producer: string;
  creationDate: string;
  modDate: string;
  pdfVersion: string;
  fileSize: string;
}

export function PDFInfoViewer({ title, description, article, dict }: PDFInfoViewerProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [info, setInfo] = useState<PDFInfo | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [copied, setCopied] = useState(false);

  const processPDF = async (file: File) => {
    setIsProcessing(true);
    setIsComplete(false);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const metadata = await pdf.getMetadata();
      const info = metadata.info as any;

      const fileSize = file.size < 1024 * 1024 
        ? `${(file.size / 1024).toFixed(1)} KB`
        : `${(file.size / (1024 * 1024)).toFixed(1)} MB`;

      setInfo({
        pageCount: pdf.numPages,
        title: info.Title || 'Tidak tersedia',
        author: info.Author || 'Tidak tersedia',
        creator: info.Creator || 'Tidak tersedia',
        subject: info.Subject || 'Tidak tersedia',
        keywords: info.Keywords || 'Tidak tersedia',
        producer: info.Producer || 'Tidak tersedia',
        creationDate: info.CreationDate ? new Date(info.CreationDate).toLocaleDateString('id-ID') : 'Tidak tersedia',
        modDate: info.ModDate ? new Date(info.ModDate).toLocaleDateString('id-ID') : 'Tidak tersedia',
        pdfVersion: info.PDFFormatVersion || 'Tidak tersedia',
        fileSize,
      });

      setIsComplete(true);
    } catch (error) {
      console.error('Error reading PDF info:', error);
      alert('Gagal membaca informasi PDF. Pastikan file valid.');
    } finally {
      setIsProcessing(false);
    }
  };

  const copyInfo = () => {
    if (!info) return;
    const text = `
📄 Informasi PDF
━━━━━━━━━━━━━━━━━━━━━━━━━
📄 Jumlah Halaman: ${info.pageCount}
📁 Ukuran File: ${info.fileSize}
📌 Judul: ${info.title}
👤 Author: ${info.author}
💻 Creator: ${info.creator}
📚 Subject: ${info.subject}
🏷️ Keywords: ${info.keywords}
🖨️ Producer: ${info.producer}
📅 Dibuat: ${info.creationDate}
📅 Dimodifikasi: ${info.modDate}
📌 Versi PDF: ${info.pdfVersion}
`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const InfoItem = ({ icon: Icon, label, value, color = 'text-indigo-400' }: any) => (
    <div className="flex items-start gap-3 p-3 glass rounded-xl">
      <div className={`p-2 bg-${color.replace('text-', '')}/10 rounded-lg`}>
        <Icon className={`w-4 h-4 ${color}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-400 uppercase tracking-wider">{label}</p>
        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{value}</p>
      </div>
    </div>
  );

  return (
    <PDFBase
      title={title}
      description={description}
      article={article}
      onFileUpload={processPDF}
      isProcessing={isProcessing}
      processingText="Membaca informasi PDF..."
    >
      <div className="space-y-6">
        {/* Info Grid */}
        {isComplete && info && (
          <div className="animate-slide-up">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <InfoItem 
                icon={Layers} 
                label="Jumlah Halaman" 
                value={info.pageCount} 
                color="text-indigo-400"
              />
              <InfoItem 
                icon={File} 
                label="Ukuran File" 
                value={info.fileSize} 
                color="text-green-400"
              />
              <InfoItem 
                icon={FileText} 
                label="Judul" 
                value={info.title} 
                color="text-blue-400"
              />
              <InfoItem 
                icon={User} 
                label="Author" 
                value={info.author} 
                color="text-purple-400"
              />
              <InfoItem 
                icon={Github} 
                label="Creator" 
                value={info.creator} 
                color="text-orange-400"
              />
              <InfoItem 
                icon={Book} 
                label="Subject" 
                value={info.subject} 
                color="text-pink-400"
              />
              <InfoItem 
                icon={Hash} 
                label="Keywords" 
                value={info.keywords} 
                color="text-yellow-400"
              />
              <InfoItem 
                icon={Printer} 
                label="Producer" 
                value={info.producer} 
                color="text-cyan-400"
              />
              <InfoItem 
                icon={Calendar} 
                label="Tanggal Dibuat" 
                value={info.creationDate} 
                color="text-emerald-400"
              />
              <InfoItem 
                icon={Calendar} 
                label="Tanggal Dimodifikasi" 
                value={info.modDate} 
                color="text-rose-400"
              />
              <InfoItem 
                icon={FileJson} 
                label="Versi PDF" 
                value={info.pdfVersion} 
                color="text-violet-400"
              />
            </div>

            {/* Copy Button */}
            <div className="mt-4 flex justify-end">
              <button onClick={copyInfo} className="btn-secondary">
                {copied ? (
                  <Check className="w-4 h-4 inline mr-2" />
                ) : (
                  <Copy className="w-4 h-4 inline mr-2" />
                )}
                {copied ? 'Tersalin!' : 'Copy Info'}
              </button>
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

// Book icon untuk subject
const Book = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);