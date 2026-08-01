'use client'

import { useState } from 'react'

export default function UuidGenerator({ lang }: { lang: string }) {
  const [uuid, setUuid] = useState('')
  const [copied, setCopied] = useState(false)

  const generateUUID = () => {
    const newUuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0
      const v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
    setUuid(newUuid)
    setCopied(false)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(uuid)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <div className="space-y-4">
        <button onClick={generateUUID} className="btn-primary w-full">
          {lang === 'id' ? 'Generate UUID v4' : 'Generate UUID v4'}
        </button>
        {uuid && (
          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center gap-2">
              <code className="flex-1 text-sm font-mono text-gray-900 dark:text-white break-all">
                {uuid}
              </code>
              <button
                onClick={copyToClipboard}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
              >
                {copied ? (lang === 'id' ? 'Tersalin!' : 'Copied!') : (lang === 'id' ? 'Salin' : 'Copy')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}