'use client'

import { useState } from 'react'
import { Type, AlignLeft, Hash, FileText, Copy, Trash2 } from 'lucide-react'

export default function WordCharacterCounter({ lang }: { lang: string }) {
  const [text, setText] = useState('')
  const [copied, setCopied] = useState(false)

  const words = text.trim() ? text.trim().split(/\s+/).length : 0
  const chars = text.length
  const charsNoSpace = text.replace(/\s/g, '').length
  const paragraphs = text.trim() ? text.trim().split(/\n+/).length : 0
  const sentences = text.trim() ? text.split(/[.!?]+/).filter(s => s.trim()).length : 0
  const readingTime = Math.ceil(words / 200)
  const speakingTime = Math.ceil(words / 150)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const clearText = () => {
    setText('')
  }

  const stats = [
    { label: lang === 'id' ? 'Kata' : 'Words', value: words, icon: Type, color: 'blue' },
    { label: lang === 'id' ? 'Karakter' : 'Characters', value: chars, icon: Hash, color: 'purple' },
    { label: lang === 'id' ? 'Karakter (tanpa spasi)' : 'Chars (no spaces)', value: charsNoSpace, icon: AlignLeft, color: 'pink' },
    { label: lang === 'id' ? 'Paragraf' : 'Paragraphs', value: paragraphs, icon: FileText, color: 'green' },
    { label: lang === 'id' ? 'Kalimat' : 'Sentences', value: sentences, icon: FileText, color: 'orange' },
  ]

  return (
    <div className="space-y-6">
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          className="input-field font-mono text-sm"
          placeholder={lang === 'id' ? 'Tulis atau tempel teks di sini...' : 'Type or paste text here...'}
        />
        <div className="absolute bottom-3 right-3 flex gap-2">
          {text && (
            <>
              <button
                onClick={copyToClipboard}
                className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-all"
                title={lang === 'id' ? 'Salin' : 'Copy'}
              >
                {copied ? '✅' : <Copy className="w-4 h-4" />}
              </button>
              <button
                onClick={clearText}
                className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-all"
                title={lang === 'id' ? 'Hapus' : 'Clear'}
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {stats.map((stat) => {
          const Icon = stat.icon
          const colorClasses = {
            blue: 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400',
            purple: 'bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400',
            pink: 'bg-pink-50 dark:bg-pink-950/30 text-pink-600 dark:text-pink-400',
            green: 'bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400',
            orange: 'bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400',
          }
          return (
            <div key={stat.label} className={`p-4 rounded-xl text-center ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
              <Icon className="w-5 h-5 mx-auto mb-2" />
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs opacity-80">{stat.label}</p>
            </div>
          )
        })}
      </div>

      {text && (
        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <span>
            📖 {lang === 'id' ? 'Waktu baca' : 'Reading time'}: ~{readingTime} {lang === 'id' ? 'menit' : 'min'}
          </span>
          <span>
            🎤 {lang === 'id' ? 'Waktu bicara' : 'Speaking time'}: ~{speakingTime} {lang === 'id' ? 'menit' : 'min'}
          </span>
        </div>
      )}
    </div>
  )
}