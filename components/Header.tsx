'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Sun, Moon, Globe, Home, Grid, Menu, X, Sparkles, Zap } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect } from 'react'

interface HeaderProps {
  lang: string
  dict: any
}

export default function Header({ lang, dict }: HeaderProps) {
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleLanguage = () => {
    const newLang = lang === 'id' ? 'en' : 'id'
    const newPathname = pathname.replace(`/${lang}`, `/${newLang}`)
    router.push(newPathname)
  }

  const navItems = [
    { href: `/${lang}`, label: lang === 'id' ? 'Beranda' : 'Home', icon: Home },
    { href: `/${lang}#tools`, label: lang === 'id' ? 'Alat' : 'Tools', icon: Grid },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'glass-premium shadow-2xl shadow-purple-500/10' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Menggunakan gambar asli */}
          <Link href={`/${lang}`} className="flex items-center gap-3 group">
            <div className="relative w-12 h-12">
              <Image 
                src="/logo.png" 
                alt="HmzTools" 
                width={48} 
                height={48} 
                className="w-12 h-12 rounded-xl transition-transform group-hover:scale-110" 
              />
            </div>
            <span className="text-2xl font-bold gradient-text">
              HmzTools
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                    isActive
                      ? 'text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-purple-500/25'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/20 dark:hover:bg-gray-800/30'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                  )}
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="relative px-4 py-2.5 rounded-xl glass-card hover:scale-105 transition-all duration-300 group"
            >
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-gray-600 dark:text-gray-300 group-hover:text-purple-500 transition-colors" />
                <span className="font-medium text-sm text-gray-700 dark:text-gray-300">
                  {lang === 'id' ? 'ID' : 'EN'}
                </span>
              </div>
            </button>
            
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="relative p-2.5 rounded-xl glass-card hover:scale-105 transition-all duration-300"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl glass-card hover:scale-105 transition-all duration-300"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-6 border-t border-white/10 animate-fade-up">
            <div className="space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-5 py-4 rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-purple-500/25'
                        : 'glass-card hover:scale-[1.02]'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                    {isActive && <Sparkles className="w-4 h-4 ml-auto" />}
                  </Link>
                )
              })}
              <div className="pt-4 mt-4 border-t border-white/10">
                <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
                  ✦ HmzTools — {lang === 'id' ? '15 Alat Gratis' : '15 Free Tools'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}