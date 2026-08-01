'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { toolsData } from '@/data/tools'
import { getDictionary } from '@/lib/dictionary'

export default function HomePage() {
  const params = useParams()
  const lang = params.lang as string
  const [dictionary, setDictionary] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<'all' | 'general' | 'developer'>('all')

  useEffect(() => {
    getDictionary(lang).then(dict => setDictionary(dict))
  }, [lang])

  if (!dictionary) return <div>Loading...</div>

  const filteredTools = toolsData.filter(tool => {
    if (activeTab === 'all') return true
    return tool.category === activeTab
  })

  return (
    <div>
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {dictionary.home.title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          {dictionary.home.subtitle}
        </p>
      </div>

      <div className="flex justify-center gap-2 mb-8">
        {['all', 'general', 'developer'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === tab
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {dictionary.home[tab as keyof typeof dictionary.home]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => {
          const t = tool.translations[lang as keyof typeof tool.translations] || tool.translations.id
          return (
            <Link
              key={tool.slug}
              href={`/${lang}/tools/${tool.slug}`}
              className="card hover:scale-[1.02] transition-transform"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {t.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t.description}
              </p>
              <span className={`inline-block mt-3 text-xs font-medium px-2 py-1 rounded ${
                tool.category === 'general' 
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                  : 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
              }`}>
                {tool.category === 'general' ? 'Umum' : 'Developer'}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}