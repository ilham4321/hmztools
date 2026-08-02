'use client';

import { useState } from 'react';
import { BaseTool } from './BaseTool';
import { Braces, Copy, Check, AlertCircle } from 'lucide-react';

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

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError('');
    } catch (e) {
      setError('Invalid JSON: ' + (e as Error).message);
      setOutput('');
    }
  };

  const validateJSON = () => {
    try {
      JSON.parse(input);
      setError('Valid JSON!');
    } catch (e) {
      setError('Invalid JSON: ' + (e as Error).message);
    }
  };

  const copyToClipboard = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <BaseTool title={title} description={description} article={article}>
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3">
          <button onClick={formatJSON} className="btn-primary">
            <Braces className="w-4 h-4 inline mr-2" />
            {dict.common.format}
          </button>
          <button onClick={validateJSON} className="btn-secondary">
            <Check className="w-4 h-4 inline mr-2" />
            Validate
          </button>
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Masukkan JSON di sini..."
          className="input-field min-h-[150px] font-mono text-sm"
        />

        {error && (
          <div className={`p-3 rounded-xl flex items-center gap-2 ${
            error === 'Valid JSON!' 
              ? 'bg-green-500/10 text-green-500' 
              : 'bg-red-500/10 text-red-500'
          }`}>
            {error === 'Valid JSON!' ? (
              <Check className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            <span className="text-sm">{error}</span>
          </div>
        )}

        {output && (
          <div className="relative">
            <pre className="p-4 glass rounded-xl font-mono text-sm overflow-x-auto">
              {output}
            </pre>
            <button
              onClick={copyToClipboard}
              className="absolute top-2 right-2 p-2 glass glass-hover rounded-lg"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        )}
      </div>
    </BaseTool>
  );
}