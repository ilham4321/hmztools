'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import * as Icons from 'lucide-react';
import { Tool } from '@/data/tools';
import { type Locale } from '@/lib/i18n/dictionary';

interface HomeContentProps {
  tools: Tool[];
  dict: any;
  lang: Locale;
}

export function HomeContent({ tools, dict, lang }: HomeContentProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'general' | 'developer'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTools = useMemo(() => {
    let filtered = tools;
    if (activeCategory !== 'all') {
      filtered = filtered.filter(tool => tool.category === activeCategory);
    }
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(tool =>
        tool.name[lang].toLowerCase().includes(term) ||
        tool.description[lang].toLowerCase().includes(term)
      );
    }
    return filtered;
  }, [tools, activeCategory, searchTerm, lang]);

  const getIcon = (iconName: string) => {
    const Icon = (Icons as any)[iconName];
    return Icon ? <Icon className="w-6 h-6" /> : null;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-gradient-blue mb-4">
          {dict.home.title}
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {dict.home.subtitle}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeCategory === 'all'
                ? 'bg-indigo-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {dict.nav.all}
          </button>
          <button
            onClick={() => setActiveCategory('general')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeCategory === 'general'
                ? 'bg-indigo-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {dict.nav.general}
          </button>
          <button
            onClick={() => setActiveCategory('developer')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeCategory === 'developer'
                ? 'bg-indigo-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {dict.nav.developer}
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10">
            <Icons.Search className="w-4 h-4 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={dict.home.search}
            className="w-full px-4 py-2 pl-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>
      </div>

      {filteredTools.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">{dict.home.noResults}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTools.map((tool) => (
            <Link
              key={tool.id}
              href={`/${lang}/${tool.slug}`}
              className="card-glass group"
            >
              <div className="flex flex-col items-center text-center p-4">
                <div className="p-3 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/20 mb-4 group-hover:scale-110 transition-transform">
                  {getIcon(tool.icon)}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-indigo-500 transition-colors">
                  {tool.name[lang]}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {tool.description[lang]}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}