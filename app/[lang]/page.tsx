'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { toolsData } from '@/data/tools'
import { getDictionary } from '@/lib/dictionary'
import { Sparkles, ArrowRight, Zap, Wrench, Code, Search } from 'lucide-react'

export default function HomePage() {
  const params = useParams()
  const lang = params.lang as string
  const [dictionary, setDictionary] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<'all' | 'general' | 'developer'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    getDictionary(lang).then(dict => setDictionary(dict))
  }, [lang])

  if (!dictionary) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
    </div>
  )

  const filteredTools = toolsData.filter(tool => {
    const matchTab = activeTab === 'all' || tool.category === activeTab
    const t = tool.translations[lang as keyof typeof tool.translations] || tool.translations.id
    const matchSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       t.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchTab && matchSearch
  })

  const getCategoryColor = (category: string) => {
    return category === 'general' 
      ? 'from-blue-500 to-cyan-500'
      : 'from-purple-500 to-pink-500'
  }

  const getCategoryIcon = (category: string) => {
    return category === 'general' ? Wrench : Code
  }

  return (
    <div>
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-950 rounded-full mb-4">
          <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
            {lang === 'id' ? '15 Alat Online Gratis' : '15 Free Online Tools'}
          </span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          {dictionary.home.title}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {dictionary.home.subtitle}
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'id' ? 'Cari alat...' : 'Search tools...'}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'general', 'developer'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {dictionary.home[tab as keyof typeof dictionary.home]}
            </button>
          ))}
        </div>
      </div>

      {filteredTools.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            {lang === 'id' ? 'Tidak ada alat yang ditemukan' : 'No tools found'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool, index) => {
            const t = tool.translations[lang as keyof typeof tool.translations] || tool.translations.id
            const Icon = getCategoryIcon(tool.category)
            const color = getCategoryColor(tool.category)
            
            return (
              <Link
                key={tool.slug}
                href={`/${lang}/tools/${tool.slug}`}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2"
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${color}`}></div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${color} bg-opacity-10`}>
                      <Icon className={`w-6 h-6 text-${tool.category === 'general' ? 'blue' : 'purple'}-600`} />
                    </div>
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                      tool.category === 'general' 
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                        : 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300'
                    }`}>
                      {tool.category === 'general' ? (lang === 'id' ? 'Umum' : 'General') : 'Developer'}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {t.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                    {t.description}
                  </p>
                  <div className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:gap-2 transition-all">
                    <span>{lang === 'id' ? 'Gunakan Sekarang' : 'Use Now'}</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}

      <div className="mt-16 p-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl text-white text-center">
        <Zap className="w-12 h-12 mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-2">
          {lang === 'id' ? 'Siap Membantu Pekerjaan Anda' : 'Ready to Help Your Work'}
        </h2>
        <p className="text-white/80 max-w-2xl mx-auto">
          {lang === 'id' 
            ? '15 alat praktis yang siap digunakan kapan saja, di mana saja. Gratis dan tanpa perlu registrasi.' 
            : '15 practical tools ready to use anytime, anywhere. Free and no registration needed.'}
        </p>
      </div>
    </div>
  )
}