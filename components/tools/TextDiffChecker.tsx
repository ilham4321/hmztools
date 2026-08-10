'use client';

import { useState } from 'react';
import { BaseTool } from './BaseTool';
import { 
  GitCompare, 
  Copy, 
  Check, 
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  FileText
} from 'lucide-react';

interface TextDiffCheckerProps {
  title: string;
  description: string;
  article: string;
  dict: any;
}

interface DiffResult {
  lineNumber: number;
  type: 'added' | 'removed' | 'unchanged';
  content: string;
}

export function TextDiffChecker({ title, description, article, dict }: TextDiffCheckerProps) {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [diffResults, setDiffResults] = useState<DiffResult[]>([]);
  const [showDiff, setShowDiff] = useState(false);
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'side-by-side' | 'unified'>('unified');

  const compareTexts = () => {
    if (!text1 && !text2) return;

    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    const result: DiffResult[] = [];

    // Simple diff algorithm (like Unix diff)
    const maxLines = Math.max(lines1.length, lines2.length);
    
    for (let i = 0; i < maxLines; i++) {
      const line1 = lines1[i] || '';
      const line2 = lines2[i] || '';
      
      if (line1 === line2) {
        result.push({ lineNumber: i + 1, type: 'unchanged', content: line1 });
      } else if (line1 && !line2) {
        result.push({ lineNumber: i + 1, type: 'removed', content: line1 });
      } else if (!line1 && line2) {
        result.push({ lineNumber: i + 1, type: 'added', content: line2 });
      } else {
        // Try to find matching lines
        const nextMatch = lines2.slice(i + 1).indexOf(line1);
        if (nextMatch !== -1 && nextMatch < 3) {
          // Add the missing lines from text2
          for (let j = i; j < i + nextMatch; j++) {
            result.push({ lineNumber: j + 1, type: 'added', content: lines2[j] || '' });
          }
          i += nextMatch;
          result.push({ lineNumber: i + 1, type: 'unchanged', content: line1 });
        } else {
          result.push({ lineNumber: i + 1, type: 'removed', content: line1 });
          if (line2) {
            result.push({ lineNumber: i + 1, type: 'added', content: line2 });
          }
        }
      }
    }

    setDiffResults(result);
    setShowDiff(true);
  };

  const clearAll = () => {
    setText1('');
    setText2('');
    setDiffResults([]);
    setShowDiff(false);
  };

  const swapTexts = () => {
    const temp = text1;
    setText1(text2);
    setText2(temp);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getDiffStats = () => {
    const added = diffResults.filter(r => r.type === 'added').length;
    const removed = diffResults.filter(r => r.type === 'removed').length;
    const unchanged = diffResults.filter(r => r.type === 'unchanged').length;
    return { added, removed, unchanged };
  };

  const getLineColor = (type: string) => {
    switch(type) {
      case 'added': return 'bg-green-500/20 border-l-4 border-green-500';
      case 'removed': return 'bg-red-500/20 border-l-4 border-red-500';
      default: return 'bg-transparent';
    }
  };

  const getLinePrefix = (type: string) => {
    switch(type) {
      case 'added': return '+ ';
      case 'removed': return '- ';
      default: return '  ';
    }
  };

  return (
    <BaseTool title={title} description={description} article={article}>
      <div className="space-y-6">
        {/* Input */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
              Teks 1 (Original)
            </label>
            <textarea
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              placeholder="Masukkan teks pertama..."
              className="w-full min-h-[200px] p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent text-gray-900 dark:text-white font-mono text-sm resize-y"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
              Teks 2 (Modified)
            </label>
            <textarea
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              placeholder="Masukkan teks kedua..."
              className="w-full min-h-[200px] p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent text-gray-900 dark:text-white font-mono text-sm resize-y"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <button onClick={compareTexts} className="btn-primary">
            <GitCompare className="w-4 h-4 inline mr-2" />
            Bandingkan
          </button>
          <button onClick={swapTexts} className="btn-secondary">
            <ArrowLeft className="w-4 h-4 inline mr-1" />
            <ArrowRight className="w-4 h-4 inline" />
            Swap
          </button>
          <button onClick={clearAll} className="btn-secondary">
            <RefreshCw className="w-4 h-4 inline mr-2" />
            Clear
          </button>
          {diffResults.length > 0 && (
            <>
              <button
                onClick={() => setViewMode('unified')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  viewMode === 'unified'
                    ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                Unified
              </button>
              <button
                onClick={() => setViewMode('side-by-side')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  viewMode === 'side-by-side'
                    ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                Side by Side
              </button>
            </>
          )}
        </div>

        {/* Diff Result */}
        {showDiff && diffResults.length > 0 && (
          <div className="space-y-4 animate-slide-up">
            {/* Stats */}
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                <span className="text-gray-600 dark:text-gray-300">Added: {getDiffStats().added}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                <span className="text-gray-600 dark:text-gray-300">Removed: {getDiffStats().removed}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
                <span className="text-gray-600 dark:text-gray-300">Unchanged: {getDiffStats().unchanged}</span>
              </div>
              <button
                onClick={() => copyToClipboard(
                  diffResults.map(r => `${getLinePrefix(r.type)}${r.content}`).join('\n')
                )}
                className="text-sm text-indigo-500 hover:text-indigo-600 transition-colors flex items-center gap-1 ml-auto"
              >
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                Copy Diff
              </button>
            </div>

            {/* Diff Display */}
            <div className="glass rounded-xl overflow-hidden">
              {viewMode === 'unified' ? (
                <div className="p-4 font-mono text-sm max-h-[400px] overflow-y-auto">
                  {diffResults.map((diff, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-2 px-2 py-0.5 ${getLineColor(diff.type)}`}
                    >
                      <span className="text-xs text-gray-400 select-none min-w-[30px]">
                        {diff.lineNumber}
                      </span>
                      <span className={`${diff.type === 'added' ? 'text-green-600 dark:text-green-400' : ''} ${diff.type === 'removed' ? 'text-red-600 dark:text-red-400' : ''}`}>
                        {getLinePrefix(diff.type)}
                      </span>
                      <span className="whitespace-pre-wrap break-all">{diff.content}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-0">
                  <div className="border-r border-gray-200 dark:border-gray-700">
                    <div className="p-2 bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-500 border-b border-gray-200 dark:border-gray-700">
                      Original
                    </div>
                    <div className="p-2 font-mono text-sm max-h-[400px] overflow-y-auto">
                      {diffResults.map((diff, index) => (
                        <div
                          key={index}
                          className={`flex items-start gap-2 px-2 py-0.5 ${diff.type === 'removed' ? 'bg-red-500/20 border-l-4 border-red-500' : ''}`}
                        >
                          <span className={`${diff.type === 'removed' ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-300'}`}>
                            {diff.type === 'removed' ? '-' : ' '}
                          </span>
                          <span className="whitespace-pre-wrap break-all">{diff.content}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="p-2 bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-500 border-b border-gray-200 dark:border-gray-700">
                      Modified
                    </div>
                    <div className="p-2 font-mono text-sm max-h-[400px] overflow-y-auto">
                      {diffResults.map((diff, index) => (
                        <div
                          key={index}
                          className={`flex items-start gap-2 px-2 py-0.5 ${diff.type === 'added' ? 'bg-green-500/20 border-l-4 border-green-500' : ''}`}
                        >
                          <span className={`${diff.type === 'added' ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-300'}`}>
                            {diff.type === 'added' ? '+' : ' '}
                          </span>
                          <span className="whitespace-pre-wrap break-all">{diff.content}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </BaseTool>
  );
}