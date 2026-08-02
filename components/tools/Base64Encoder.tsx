'use client';

import { useState } from 'react';
import { BaseTool } from './BaseTool';
import { Copy, Check } from 'lucide-react';

interface Base64EncoderProps {
  title: string;
  description: string;
  article: string;
  dict: any;
}

export function Base64Encoder({ title, description, article, dict }: Base64EncoderProps) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [copied, setCopied] = useState(false);

  const process = () => {
    try {
      if (mode === 'encode') {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input))));
      }
    } catch (e) {
      setOutput('Error: ' + (e as Error).message);
    }
  };

  const copyToClipboard = () => {
    if (output && !output.startsWith('Error')) {
      navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <BaseTool title={title} description={description} article={article}>
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setMode('encode')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              mode === 'encode'
                ? 'bg-indigo-500 text-white'
                : 'glass glass-hover'
            }`}
          >
            {dict.common.encode}
          </button>
          <button
            onClick={() => setMode('decode')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              mode === 'decode'
                ? 'bg-indigo-500 text-white'
                : 'glass glass-hover'
            }`}
          >
            {dict.common.decode}
          </button>
          <button onClick={process} className="btn-primary">
            {mode === 'encode' ? dict.common.encode : dict.common.decode}
          </button>
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Masukkan teks untuk di${mode === 'encode' ? 'encode' : 'decode'}...`}
          className="input-field min-h-[100px] font-mono text-sm"
        />

        {output && (
          <div className="relative">
            <pre className="p-4 glass rounded-xl font-mono text-sm overflow-x-auto min-h-[50px]">
              {output}
            </pre>
            {!output.startsWith('Error') && (
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
            )}
          </div>
        )}
      </div>
    </BaseTool>
  );
}