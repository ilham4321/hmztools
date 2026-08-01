'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { toolsData } from '@/data/tools'
import { getDictionary } from '@/lib/dictionary'
import { 
  Sparkles, ArrowRight, Zap, Wrench, Code, Search, 
  Star, Shield, Rocket, Infinity, Users, Award,
  TrendingUp, Clock, Layers, Gem
} from 'lucide-react'

export default function HomePage() {
  const params = useParams()
  const lang = params.lang as string
  const [dictionary, setDictionary] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<'all' | 'general' | 'developer'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [hoveredTool, setHoveredTool] = useState<string | null>(null)

  useEffect(() => {
    getDictionary(lang).then(dict => setDictionary(dict))
  }, [lang])

  if (!dictionary) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="relative w-20 h-20 border-4 border-t-purple-500 border-r-blue-500 border-b-pink-500 border-l-transparent rounded-full animate-spin" />
      </div>
    </div>
  )

  const filteredTools = toolsData.filter(tool => {
    const matchTab = activeTab === 'all' || tool.category === activeTab
    const t = tool.translations[lang as keyof typeof tool.translations] || tool.translations.id
    const matchSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       t.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchTab && matchSearch
  })

  const stats = [
    { icon: Zap, label: lang === 'id' ? 'Alat Gratis' : 'Free Tools', value: '15' },
    { icon: Users, label: lang === 'id' ? 'Pengguna Aktif' : 'Active Users', value: '10K+' },
    { icon: Clock, label: lang === 'id' ? 'Siap Pakai' : 'Ready to Use', value: '24/7' },
    { icon: Shield, label: lang === 'id' ? 'Aman & Private' : 'Secure & Private', value: '100%' },
  ]

  return (
    <div className="space-y-16">
      {/* Hero Section - Premium */}
      <section className="relative pt-20 pb-12">
        <div className="absolute inset-0 hero-gradient opacity-30 rounded-3xl blur-2xl" />
        
        <div className="relative text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full glass-premium mb-6 animate-fade-up">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-medium bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              {lang === 'id' ? '✨ 15 Alat Online Gratis' : '✨ 15 Free Online Tools'}
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <span className="gradient-text">HmzTools</span>
            <br />
            <span className="text-gray-900 dark:text-white">
              {lang === 'id' ? 'Solusi Cerdas' : 'Smart Solutions'}
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 animate-fade-up max-w-2xl mx-auto" style={{ animationDelay: '0.2s' }}>
            {dictionary.home.subtitle}
          </p>

          <div className="flex flex-wrap justify-center gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <Link href="#tools" className="btn-premium">
              <span className="flex items-center gap-2">
                {lang === 'id' ? 'Mulai Gunakan' : 'Get Started'}
                <ArrowRight className="w-5 h-5" />
              </span>
            </Link>
            <Link href={`/${lang}/about`} className="btn-premium-secondary">
              <span className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                {lang === 'id' ? 'Pelajari Lebih' : 'Learn More'}
              </span>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-3xl mx-auto animate-fade-up" style={{ animationDelay: '0.4s' }}>
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="glass-premium rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300">
                <Icon className="w-6 h-6 mx-auto text-purple-500 mb-2" />
                <p className="text-2xl font-bold gradient-text">{stat.value}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Search & Filter */}
      <section id="tools" className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'id' ? 'Cari alat...' : 'Search tools...'}
              className="input-premium pl-12"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'general', 'developer'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                  activeTab === tab
                    ? 'btn-premium'
                    : 'glass-premium text-gray-600 dark:text-gray-300 hover:scale-105'
                }`}
              >
                {dictionary.home[tab as keyof typeof dictionary.home]}
              </button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        {filteredTools.length === 0 ? (
          <div className="text-center py-20">
            <Gem className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {lang === 'id' ? 'Tidak ada alat yang ditemukan' : 'No tools found'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool, index) => {
              const t = tool.translations[lang as keyof typeof tool.translations] || tool.translations.id
              const isHovered = hoveredTool === tool.slug
              const Icon = tool.category === 'general' ? Wrench : Code
              
              return (
                <Link
                  key={tool.slug}
                  href={`/${lang}/tools/${tool.slug}`}
                  className="group relative"
                  onMouseEnter={() => setHoveredTool(tool.slug)}
                  onMouseLeave={() => setHoveredTool(null)}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />
                  
                  <div className="relative glass-premium rounded-2xl p-8 hover:scale-[1.02] transition-all duration-500 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity" />
                        <div className={`relative p-3.5 rounded-2xl bg-gradient-to-br 
                          ${tool.category === 'general' 
                            ? 'from-blue-500/20 to-cyan-500/20' 
                            : 'from-purple-500/20 to-pink-500/20'
                          } group-hover:scale-110 transition-transform duration-300`}
                        >
                          <Icon className={`w-6 h-6 
                            ${tool.category === 'general' 
                              ? 'text-blue-500' 
                              : 'text-purple-500'
                            }`} 
                          />
                        </div>
                      </div>
                      
                      <div className={`text-xs font-medium px-3 py-1.5 rounded-full 
                        ${tool.category === 'general' 
                          ? 'bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400' 
                          : 'bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400'
                        }`}
                      >
                        {tool.category === 'general' 
                          ? (lang === 'id' ? 'Umum' : 'General') 
                          : 'Developer'}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:gradient-text transition-all">
                      {t.name}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 text-sm flex-1">
                      {t.description}
                    </p>

                    <div className="mt-4 flex items-center text-sm font-medium text-purple-500 group-hover:gap-3 transition-all">
                      <span>{lang === 'id' ? 'Gunakan Sekarang' : 'Use Now'}</span>
                      <ArrowRight className={`w-4 h-4 transform transition-all duration-300 
                        ${isHovered ? 'translate-x-2' : ''}`} 
                      />
                    </div>

                    {isHovered && (
                      <div className="absolute top-4 right-4">
                        <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
                      </div>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </section>

      {/* CTA Section - Premium */}
      <section className="relative overflow-hidden rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        
        <div className="relative p-12 md:p-16 text-center">
          <Rocket className="w-16 h-16 mx-auto text-white/80 mb-6 animate-float" />
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {lang === 'id' ? 'Siap Membantu Pekerjaan Anda' : 'Ready to Help Your Work'}
          </h2>
          
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
            {lang === 'id' 
              ? '15 alat praktis yang siap digunakan kapan saja, di mana saja. Gratis, cepat, dan tanpa registrasi.' 
              : '15 practical tools ready to use anytime, anywhere. Free, fast, and no registration needed.'}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="#tools" className="bg-white/20 backdrop-blur-sm px-8 py-4 rounded-2xl font-semibold text-white hover:bg-white/30 transition-all hover:scale-105">
              <span className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                {lang === 'id' ? 'Jelajahi Semua Alat' : 'Explore All Tools'}
              </span>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-8 mt-8 text-white/60 text-sm">
            <span>✦ {lang === 'id' ? 'Tanpa Registrasi' : 'No Registration'}</span>
            <span>✦ {lang === 'id' ? '100% Gratis' : '100% Free'}</span>
            <span>✦ {lang === 'id' ? 'Data Aman' : 'Data Secure'}</span>
          </div>
        </div>
      </section>
    </div>
  )
}