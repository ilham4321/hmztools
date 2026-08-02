'use client';

import { useState, useEffect } from 'react';
import { BaseTool } from './BaseTool';
import { Type, Copy, Check, FileText, Clock } from 'lucide-react';

interface WordCounterProps {
  title: string;
  description: string;
  article: string;
  dict: any;
}

export function WordCounter({ title, description, article, dict }: WordCounterProps) {
  const [text, setText] = useState('');
  const [stats, setStats] = useState({
    words: 0,
    characters: 0,
    charactersNoSpace: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0,
    speakingTime: 0,
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const characters = text.length;
    const charactersNoSpace = text.replace(/\s/g, '').length;
    const sentences = text ? text.split(/[.!?]+/).filter(s => s.trim()).length : 0;
    const paragraphs = text ? text.split(/\n\s*\n/).filter(p => p.trim()).length : 0;
    const readingTime = Math.ceil(words / 200);
    const speakingTime = Math.ceil(words / 130);

    setStats({ words, characters, charactersNoSpace, sentences, paragraphs, readingTime, speakingTime });
  }, [text]);

  const copyToClipboard = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearText = () => {
    setText('');
  };

  return (
    <BaseTool title={title} description={description} article={article}>
      <div className="space-y-6">
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Masukkan teks di sini..."
            className="w-full min-h-[200px] p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-y"
          />
          <div className="absolute bottom-3 right-3 flex gap-2">
            {text && (
              <>
                <button
                  onClick={clearText}
                  className="px-3 py-1.5 text-sm bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors"
                >
                  Clear
                </button>
                <button
                  onClick={copyToClipboard}
                  className="px-3 py-1.5 text-sm bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors flex items-center gap-1"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      Copy
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
          <div className="p-3 glass rounded-xl text-center">
            <div className="text-xl font-bold text-gradient-blue">{stats.words}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Kata</div>
          </div>
          <div className="p-3 glass rounded-xl text-center">
            <div className="text-xl font-bold text-gradient-blue">{stats.characters}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Karakter</div>
          </div>
          <div className="p-3 glass rounded-xl text-center">
            <div className="text-xl font-bold text-gradient-blue">{stats.charactersNoSpace}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Tanpa Spasi</div>
          </div>
          <div className="p-3 glass rounded-xl text-center">
            <div className="text-xl font-bold text-gradient-blue">{stats.sentences}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Kalimat</div>
          </div>
          <div className="p-3 glass rounded-xl text-center">
            <div className="text-xl font-bold text-gradient-blue">{stats.paragraphs}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Paragraf</div>
          </div>
          <div className="p-3 glass rounded-xl text-center">
            <div className="text-xl font-bold text-gradient-blue">{stats.readingTime}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Menit Baca</div>
          </div>
          <div className="p-3 glass rounded-xl text-center">
            <div className="text-xl font-bold text-gradient-blue">{stats.speakingTime}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Menit Bicara</div>
          </div>
        </div>

        {text && (
          <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <FileText className="w-4 h-4" />
              <span>Kepadatan: </span>
              {stats.words > 0 && (
                <>
                  <span className="font-medium">
                    {Math.round(stats.characters / stats.words)} karakter/kata
                  </span>
                  <span className="mx-1">•</span>
                  <Clock className="w-4 h-4" />
                  <span>{stats.readingTime} menit membaca</span>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </BaseTool>
  );
}