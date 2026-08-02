'use client';

import { useState, useEffect } from 'react';
import { BaseTool } from './BaseTool';
import { 
  Braces, 
  Copy, 
  Check, 
  AlertCircle, 
  Minimize2, 
  Maximize2, 
  Download, 
  Upload, 
  Search,
  FileJson,
  Trash2,
  RefreshCw
} from 'lucide-react';

interface JSONFormatterProps {
  title: string;
  description: string;
  article: string;
  dict: any;
}

export function JSONFormatter({ title, description, article, dict }: JSONFormatterProps) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<'format' | 'minify'>('format');
  const [indentSize, setIndentSize] = useState(2);
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [stats, setStats] = useState({ lines: 0, chars: 0, size: 0 });
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<number[]>([]);
  const [currentSearchIndex, setCurrentSearchIndex] = useState(-1);

  // Update stats when output changes
  useEffect(() => {
    if (output) {
      const lines = output.split('\n').length;
      const chars = output.length;
      const size = new Blob([output]).size;
      setStats({ lines, chars, size });
    } else {
      setStats({ lines: 0, chars: 0, size: 0 });
    }
  }, [output]);

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, mode === 'format' ? indentSize : 0);
      setOutput(formatted);
      setError('');
      setSearchResults([]);
      setCurrentSearchIndex(-1);
    } catch (e) {
      setError('Invalid JSON: ' + (e as Error).message);
      setOutput('');
    }
  };

  const validateJSON = () => {
    try {
      const parsed = JSON.parse(input);
      setError('✅ Valid JSON!');
      // Show formatted preview
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
    } catch (e) {
      setError('❌ Invalid JSON: ' + (e as Error).message);
      setOutput('');
    }
  };

  const minifyJSON = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError('');
      setMode('minify');
      setSearchResults([]);
      setCurrentSearchIndex(-1);
    } catch (e) {
      setError('Invalid JSON: ' + (e as Error).message);
      setOutput('');
    }
  };

  const beautifyJSON = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, indentSize);
      setOutput(formatted);
      setError('');
      setMode('format');
      setSearchResults([]);
      setCurrentSearchIndex(-1);
    } catch (e) {
      setError('Invalid JSON: ' + (e as Error).message);
      setOutput('');
    }
  };

  const copyToClipboard = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadJSON = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'formatted.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const uploadJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setInput(content);
        setError('');
        setOutput('');
        setSearchResults([]);
        setCurrentSearchIndex(-1);
      };
      reader.readAsText(file);
    }
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setError('');
    setSearchTerm('');
    setSearchResults([]);
    setCurrentSearchIndex(-1);
  };

  const handleSearch = () => {
    if (!searchTerm.trim() || !output) {
      setSearchResults([]);
      setCurrentSearchIndex(-1);
      return;
    }

    const results: number[] = [];
    const lines = output.split('\n');
    lines.forEach((line, index) => {
      if (line.toLowerCase().includes(searchTerm.toLowerCase())) {
        results.push(index);
      }
    });
    setSearchResults(results);
    setCurrentSearchIndex(results.length > 0 ? 0 : -1);
  };

  const goToSearchResult = (direction: 'next' | 'prev') => {
    if (searchResults.length === 0) return;
    if (direction === 'next') {
      setCurrentSearchIndex((prev) => (prev + 1) % searchResults.length);
    } else {
      setCurrentSearchIndex((prev) => (prev - 1 + searchResults.length) % searchResults.length);
    }
  };

  const getLineWithHighlight = (line: string, index: number) => {
    if (!searchTerm.trim() || !searchResults.includes(index)) return line;
    const isActive = index === searchResults[currentSearchIndex];
    return line;
  };

  const getSizeLabel = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const getExampleJSON = () => {
    const example = {
      name: "HmzTools",
      version: "1.0.0",
      description: "Collection of free online tools",
      features: [
        "Age Calculator",
        "Discount Calculator",
        "BMI Calculator",
        "JSON Formatter"
      ],
      metadata: {
        author: "HamzzDev",
        website: "https://hmztools.web.id",
        isActive: true,
        rating: 4.8
      }
    };
    setInput(JSON.stringify(example, null, 2));
    setError('');
    setOutput('');
    setSearchResults([]);
    setCurrentSearchIndex(-1);
  };

  return (
    <BaseTool title={title} description={description} article={article}>
      <div className="space-y-6">
        {/* Toolbar */}
        <div className="flex flex-wrap gap-2">
          <button onClick={formatJSON} className="btn-primary">
            <Braces className="w-4 h-4 inline mr-2" />
            Format
          </button>
          <button onClick={minifyJSON} className="btn-secondary">
            <Minimize2 className="w-4 h-4 inline mr-2" />
            Minify
          </button>
          <button onClick={beautifyJSON} className="btn-secondary">
            <Maximize2 className="w-4 h-4 inline mr-2" />
            Beautify
          </button>
          <button onClick={validateJSON} className="btn-secondary">
            <Check className="w-4 h-4 inline mr-2" />
            Validate
          </button>
          <button onClick={downloadJSON} className="btn-secondary" disabled={!output}>
            <Download className="w-4 h-4 inline mr-2" />
            Download
          </button>
          <button onClick={clearAll} className="btn-secondary">
            <Trash2 className="w-4 h-4 inline mr-2" />
            Clear
          </button>
          <button onClick={getExampleJSON} className="btn-secondary">
            <FileJson className="w-4 h-4 inline mr-2" />
            Example
          </button>
        </div>

        {/* Upload */}
        <div className="flex items-center gap-4">
          <label className="btn-secondary cursor-pointer">
            <Upload className="w-4 h-4 inline mr-2" />
            Upload JSON
            <input
              type="file"
              accept=".json,application/json"
              onChange={uploadJSON}
              className="hidden"
            />
          </label>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {input ? `${stats.lines} lines, ${getSizeLabel(stats.size)}` : 'Paste your JSON below'}
          </span>
        </div>

        {/* Indent Size */}
        {mode === 'format' && (
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Indent Size:
            </label>
            <div className="flex gap-1">
              {[2, 4, 6, 8].map((size) => (
                <button
                  key={size}
                  onClick={() => setIndentSize(size)}
                  className={`px-3 py-1 rounded-lg text-sm transition-all ${
                    indentSize === size
                      ? 'bg-indigo-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
            Input JSON
          </label>
          <textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError('');
              setOutput('');
              setSearchResults([]);
              setCurrentSearchIndex(-1);
            }}
            placeholder='Paste your JSON here... e.g. {"name": "HmzTools"}'
            className="w-full min-h-[150px] p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent text-gray-900 dark:text-white font-mono text-sm placeholder-gray-500 dark:placeholder-gray-400 resize-y"
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className={`p-3 rounded-xl flex items-center gap-2 ${
            error.includes('Valid')
              ? 'bg-green-500/10 text-green-500 border border-green-500/20'
              : 'bg-red-500/10 text-red-500 border border-red-500/20'
          }`}>
            {error.includes('Valid') ? (
              <Check className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Output */}
        {output && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Output {mode === 'format' ? '(Formatted)' : '(Minified)'}
              </label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">
                  {stats.lines} lines • {getSizeLabel(stats.size)}
                </span>
                <button
                  onClick={copyToClipboard}
                  className="p-2 glass glass-hover rounded-lg transition-colors"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    if (!e.target.value) {
                      setSearchResults([]);
                      setCurrentSearchIndex(-1);
                    }
                  }}
                  placeholder="Search in output..."
                  className="w-full px-4 py-2 pl-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
              <button
                onClick={handleSearch}
                className="px-4 py-2 btn-secondary"
              >
                Search
              </button>
              {searchResults.length > 0 && (
                <div className="flex items-center gap-1">
                  <span className="text-sm text-gray-400">
                    {currentSearchIndex + 1}/{searchResults.length}
                  </span>
                  <button
                    onClick={() => goToSearchResult('prev')}
                    className="p-1 glass glass-hover rounded"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => goToSearchResult('next')}
                    className="p-1 glass glass-hover rounded"
                  >
                    ↓
                  </button>
                </div>
              )}
            </div>

            {/* Output Display */}
            <div className="relative">
              <pre className="p-4 glass rounded-xl font-mono text-sm overflow-x-auto max-h-[400px] overflow-y-auto">
                {output.split('\n').map((line, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      showLineNumbers ? 'pl-8' : ''
                    } ${
                      searchResults.includes(index) && searchTerm
                        ? searchResults[currentSearchIndex] === index
                          ? 'bg-yellow-200 dark:bg-yellow-800/50 border-l-4 border-yellow-500'
                          : 'bg-yellow-100 dark:bg-yellow-900/30'
                        : ''
                    }`}
                  >
                    {showLineNumbers && (
                      <span className="absolute left-0 text-gray-400 text-xs select-none" style={{ minWidth: '20px' }}>
                        {index + 1}
                      </span>
                    )}
                    <span className="whitespace-pre-wrap break-all">
                      {searchResults.includes(index) && searchTerm
                        ? line.split(new RegExp(`(${searchTerm})`, 'gi')).map((part, i) =>
                            part.toLowerCase() === searchTerm.toLowerCase() ? (
                              <mark key={i} className="bg-yellow-300 dark:bg-yellow-600 rounded">
                                {part}
                              </mark>
                            ) : (
                              part
                            )
                          )
                        : line}
                    </span>
                  </div>
                ))}
              </pre>
            </div>
          </div>
        )}
      </div>
    </BaseTool>
  );
}