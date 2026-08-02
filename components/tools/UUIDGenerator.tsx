'use client';

import { useState } from 'react';
import { BaseTool } from './BaseTool';
import { Copy, RefreshCw } from 'lucide-react';

interface UUIDGeneratorProps {
  title: string;
  description: string;
  article: string;
  dict: any;
}

export function UUIDGenerator({ title, description, article, dict }: UUIDGeneratorProps) {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(1);
  const [copied, setCopied] = useState<number | null>(null);

  const generateUUID = () => {
    const newUuids: string[] = [];
    for (let i = 0; i < Math.min(count, 100); i++) {
      const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
      newUuids.push(uuid);
    }
    setUuids(newUuids);
    setCopied(null);
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <BaseTool title={title} description={description} article={article}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1 flex items-center gap-2">
            <label className="text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">
              Jumlah:
            </label>
            <input
              type="number"
              value={count}
              onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
              className="input-field w-24"
              min="1"
              max="100"
            />
          </div>
          <button onClick={generateUUID} className="btn-primary">
            <RefreshCw className="w-4 h-4 inline mr-2" />
            {dict.common.generate}
          </button>
        </div>

        {uuids.length > 0 && (
          <div className="space-y-2">
            {uuids.map((uuid, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 glass rounded-xl"
              >
                <code className="font-mono text-sm text-gray-800 dark:text-gray-200 break-all">
                  {uuid}
                </code>
                <button
                  onClick={() => copyToClipboard(uuid, index)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0 ml-2"
                >
                  <Copy className="w-4 h-4" />
                  {copied === index && (
                    <span className="text-xs text-green-500 ml-2">
                      {dict.common.copied}
                    </span>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </BaseTool>
  );
}