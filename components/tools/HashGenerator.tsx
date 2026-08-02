'use client';

import { useState } from 'react';
import { BaseTool } from './BaseTool';
import { Lock, Copy, Check } from 'lucide-react';
import CryptoJS from 'crypto-js';

interface HashGeneratorProps {
  title: string;
  description: string;
  article: string;
  dict: any;
}

export function HashGenerator({ title, description, article, dict }: HashGeneratorProps) {
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState<{ md5: string; sha1: string; sha256: string }>({
    md5: '',
    sha1: '',
    sha256: '',
  });
  const [copied, setCopied] = useState<{ [key: string]: boolean }>({});

  const generateHashes = () => {
    if (!input) return;
    setHashes({
      md5: CryptoJS.MD5(input).toString(),
      sha1: CryptoJS.SHA1(input).toString(),
      sha256: CryptoJS.SHA256(input).toString(),
    });
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied({ ...copied, [type]: true });
    setTimeout(() => setCopied({ ...copied, [type]: false }), 2000);
  };

  return (
    <BaseTool title={title} description={description} article={article}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Masukkan teks untuk di-hash..."
            className="input-field flex-1"
          />
          <button onClick={generateHashes} className="btn-primary">
            <Lock className="w-4 h-4 inline mr-2" />
            {dict.common.generate}
          </button>
        </div>

        {hashes.md5 && (
          <div className="space-y-3">
            <div className="p-4 glass rounded-xl">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">MD5</h4>
                <button
                  onClick={() => copyToClipboard(hashes.md5, 'md5')}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                >
                  {copied.md5 ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              <code className="font-mono text-sm break-all">{hashes.md5}</code>
            </div>
            <div className="p-4 glass rounded-xl">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">SHA-1</h4>
                <button
                  onClick={() => copyToClipboard(hashes.sha1, 'sha1')}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                >
                  {copied.sha1 ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              <code className="font-mono text-sm break-all">{hashes.sha1}</code>
            </div>
            <div className="p-4 glass rounded-xl">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">SHA-256</h4>
                <button
                  onClick={() => copyToClipboard(hashes.sha256, 'sha256')}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                >
                  {copied.sha256 ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              <code className="font-mono text-sm break-all">{hashes.sha256}</code>
            </div>
          </div>
        )}
      </div>
    </BaseTool>
  );
}