'use client'

import { useState } from 'react'

export default function WordCharacterCounter({ lang }: { lang: string }) {
  const [text, setText] = useState('')

  const words = text.trim() ? text.trim().split(/\s+/).length : 0
  const chars = text.length
  const charsNoSpace = text.replace(/\s/g, '').length
  const paragraphs = text.trim() ? text.trim().split(/\n+/).length : 0

  return (
    <div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {lang === 'id' ? 'Masukkan Teks' : 'Enter Text'}
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={6}
            className="input-field"
            placeholder={lang === 'id' ? 'Tulis atau tempel teks di sini...' : 'Type or paste text here...'}
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">{lang === 'id' ? 'Kata' : 'Words'}</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{words}</p>
          </div>
          <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">{lang === 'id' ? 'Karakter' : 'Characters'}</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{chars}</p>
          </div>
          <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">{lang === 'id' ? 'Karakter (tanpa spasi)' : 'Chars (no spaces)'}</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{charsNoSpace}</p>
          </div>
          <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">{lang === 'id' ? 'Paragraf' : 'Paragraphs'}</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{paragraphs}</p>
          </div>
        </div>
      </div>
    </div>
  )
}