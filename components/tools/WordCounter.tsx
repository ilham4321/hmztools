'use client';

import { useState } from 'react';
import { BaseTool } from './BaseTool';
import { Type } from 'lucide-react';

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
  });

  const countStats = () => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const characters = text.length;
    const charactersNoSpace = text.replace(/\s/g, '').length;
    const sentences = text ? text.split(/[.!?]+/).filter(s => s.trim()).length : 0;
    const paragraphs = text ? text.split(/\n\s*\n/).filter(p => p.trim()).length : 0;

    setStats({ words, characters, charactersNoSpace, sentences, paragraphs });
  };

  return (
    <BaseTool title={title} description={description} article={article}>
      <div className="space-y-6">
        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            countStats();
          }}
          placeholder="Masukkan teks di sini..."
          className="input-field min-h-[200px] resize-y"
        />

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          <div className="p-3 glass rounded-xl text-center">
            <div className="text-2xl font-bold text-gradient-blue">{stats.words}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Kata</div>
          </div>
          <div className="p-3 glass rounded-xl text-center">
            <div className="text-2xl font-bold text-gradient-blue">{stats.characters}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Karakter</div>
          </div>
          <div className="p-3 glass rounded-xl text-center">
            <div className="text-2xl font-bold text-gradient-blue">{stats.charactersNoSpace}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Tanpa Spasi</div>
          </div>
          <div className="p-3 glass rounded-xl text-center">
            <div className="text-2xl font-bold text-gradient-blue">{stats.sentences}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Kalimat</div>
          </div>
          <div className="p-3 glass rounded-xl text-center">
            <div className="text-2xl font-bold text-gradient-blue">{stats.paragraphs}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Paragraf</div>
          </div>
        </div>
      </div>
    </BaseTool>
  );
}