'use client';

import { useState, useEffect } from 'react';
import { BaseTool } from './BaseTool';
import { 
  Link, 
  Copy, 
  Check, 
  RefreshCw, 
  QrCode,
  Download,
  History,
  Trash2,
  ExternalLink
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

interface URLShortenerProps {
  title: string;
  description: string;
  article: string;
  dict: any;
}

interface ShortenedURL {
  id: string;
  original: string;
  short: string;
  createdAt: string;
  clicks: number;
}

export function URLShortener({ title, description, article, dict }: URLShortenerProps) {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<ShortenedURL[]>([]);

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('hmztools_url_history');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  const generateShortURL = () => {
    if (!url) return;

    setIsLoading(true);

    // Simulasi generate short URL (client-side)
    setTimeout(() => {
      const shortId = Math.random().toString(36).substring(2, 8);
      const short = `https://hmztools.link/${shortId}`;
      setShortUrl(short);

      // Save to history
      const newHistory: ShortenedURL = {
        id: Date.now().toString(),
        original: url,
        short: short,
        createdAt: new Date().toLocaleString(),
        clicks: 0,
      };
      const updatedHistory = [newHistory, ...history].slice(0, 50);
      setHistory(updatedHistory);
      localStorage.setItem('hmztools_url_history', JSON.stringify(updatedHistory));

      setIsLoading(false);
    }, 800);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('hmztools_url_history');
  };

  const deleteHistoryItem = (id: string) => {
    const updated = history.filter(item => item.id !== id);
    setHistory(updated);
    localStorage.setItem('hmztools_url_history', JSON.stringify(updated));
  };

  const downloadQR = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.download = 'qrcode.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  return (
    <BaseTool title={title} description={description} article={article}>
      <div className="space-y-6">
        {/* Input */}
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
            URL Panjang
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://contoh.com/url/panjang/sekali"
                className="w-full px-4 py-3 pl-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
            <button
              onClick={generateShortURL}
              disabled={!url || isLoading}
              className="btn-primary whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Memproses...' : 'Shorten'}
            </button>
          </div>
        </div>

        {/* Result */}
        {shortUrl && (
          <div className="p-4 glass rounded-xl animate-slide-up">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-500 dark:text-gray-400">URL Pendek</p>
                <div className="flex items-center gap-2">
                  <a
                    href={shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-medium text-indigo-500 hover:text-indigo-600 truncate"
                  >
                    {shortUrl}
                  </a>
                  <ExternalLink className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => copyToClipboard(shortUrl)}
                  className="p-2 glass glass-hover rounded-lg transition-colors"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => setShowQR(!showQR)}
                  className="p-2 glass glass-hover rounded-lg transition-colors"
                >
                  <QrCode className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* QR Code */}
            {showQR && (
              <div className="mt-4 pt-4 border-t border-white/10 flex flex-col items-center gap-4 animate-slide-up">
                <div className="p-4 glass rounded-xl">
                  <QRCodeSVG
                    value={shortUrl}
                    size={150}
                    bgColor="#ffffff"
                    fgColor="#000000"
                    level="H"
                  />
                </div>
                <button
                  onClick={downloadQR}
                  className="btn-secondary text-sm flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download QR
                </button>
              </div>
            )}
          </div>
        )}

        {/* History */}
        {history.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <History className="w-4 h-4" />
                Riwayat ({history.length})
              </h4>
              <button
                onClick={clearHistory}
                className="text-sm text-red-500 hover:text-red-600 transition-colors flex items-center gap-1"
              >
                <Trash2 className="w-4 h-4" />
                Hapus Semua
              </button>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 glass rounded-xl text-sm"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-indigo-500 font-medium truncate">
                        {item.short}
                      </span>
                      <span className="text-gray-400">→</span>
                      <span className="text-gray-600 dark:text-gray-300 truncate">
                        {item.original}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {item.createdAt} • {item.clicks} klik
                    </div>
                  </div>
                  <button
                    onClick={() => deleteHistoryItem(item.id)}
                    className="p-1 hover:bg-red-500/10 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </BaseTool>
  );
}