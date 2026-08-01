'use client'

import Link from 'next/link'
import { Github, Instagram, Mail, Heart, Zap, Shield, Award, Sparkles, Rocket, Home, Grid, Info, FileText, MessageCircle, Lock, Coffee } from 'lucide-react'

interface FooterProps {
  lang: string
}

export default function Footer({ lang }: FooterProps) {
  const currentYear = new Date().getFullYear()
  
  const footerLinks = {
    id: {
      about: 'Tentang Kami',
      privacy: 'Kebijakan Privasi',
      terms: 'Syarat & Ketentuan',
      contact: 'Hubungi Kami',
      tools: 'Semua Alat',
      home: 'Beranda',
      description: 'Koleksi premium alat online gratis untuk kebutuhan sehari-hari dan pengembangan profesional.',
      copyright: 'Hak Cipta Dilindungi',
      builtWith: 'Dibangun dengan',
      love: '❤️',
      backToHome: 'Kembali ke Beranda',
      features: 'Fitur Unggulan',
      developer: 'Developer Tools',
      general: 'General Tools',
      support: 'Dukung Kami',
      supportDesc: 'Dukung pengembangan HmzTools dengan donasi'
    },
    en: {
      about: 'About Us',
      privacy: 'Privacy Policy',
      terms: 'Terms & Conditions',
      contact: 'Contact Us',
      tools: 'All Tools',
      home: 'Home',
      description: 'Premium collection of free online tools for daily needs and professional development.',
      copyright: 'All Rights Reserved',
      builtWith: 'Built with',
      love: '❤️',
      backToHome: 'Back to Home',
      features: 'Features',
      developer: 'Developer Tools',
      general: 'General Tools',
      support: 'Support Us',
      supportDesc: 'Support HmzTools development with donation'
    }
  }

  const t = footerLinks[lang as keyof typeof footerLinks] || footerLinks.id

  const navItems = [
    { href: `/${lang}`, label: t.home, icon: Home },
    { href: `/${lang}#tools`, label: t.tools, icon: Grid },
    { href: `/${lang}/about`, label: t.about, icon: Info },
    { href: `/${lang}/contact`, label: t.contact, icon: MessageCircle },
  ]

  const quickLinks = [
    { href: `/${lang}#tools?tab=general`, label: t.general, icon: Sparkles },
    { href: `/${lang}#tools?tab=developer`, label: t.developer, icon: Rocket },
  ]

  const legalLinks = [
    { href: `/${lang}/privacy`, label: t.privacy, icon: Shield },
    { href: `/${lang}/terms`, label: t.terms, icon: FileText },
  ]

  return (
    <footer className="relative mt-20 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30" />
      
      <div className="relative glass-premium rounded-t-3xl">
        <div className="container mx-auto px-4 max-w-7xl py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Brand - Kolom 1 */}
            <div className="col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-xl opacity-50" />
                  <div className="relative w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl shadow-purple-500/30">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                </div>
                <span className="text-2xl font-bold gradient-text">HmzTools</span>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-sm leading-relaxed text-sm">
                {t.description}
              </p>
              
              <a 
                href="https://saweria.co/hamzzdev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 text-white font-medium text-sm hover:scale-105 transition-all duration-300 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 mb-4 group"
              >
                <Coffee className="w-4 h-4 group-hover:animate-pulse" />
                {t.support}
                <span className="text-xs opacity-80">☕</span>
              </a>
              
              <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">
                {t.supportDesc}
              </p>
              
              <div className="flex gap-3">
                <a 
                  href="https://github.com/ilham4321/hmztools" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-3 rounded-2xl glass-premium hover:scale-110 transition-all duration-300 hover:shadow-purple-500/20"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </a>
                <a 
                  href="https://instagram.com/hamzzdev" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl glass-premium hover:scale-110 transition-all duration-300 hover:shadow-pink-500/20"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </a>
                <a 
                  href="mailto:support.hmztools@gmail.com"
                  className="p-3 rounded-2xl glass-premium hover:scale-110 transition-all duration-300 hover:shadow-red-500/20"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </a>
              </div>
            </div>

            {/* Navigasi Utama - Kolom 2 */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                {lang === 'id' ? 'Navigasi' : 'Navigation'}
              </h3>
              <ul className="space-y-3">
                {navItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={item.href}>
                      <Link 
                        href={item.href} 
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-all duration-300 hover:translate-x-1"
                      >
                        <Icon className="w-3.5 h-3.5 opacity-50" />
                        {item.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Kategori Tools - Kolom 3 */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                {lang === 'id' ? 'Kategori' : 'Categories'}
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={item.href}>
                      <Link 
                        href={item.href} 
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-all duration-300 hover:translate-x-1"
                      >
                        <Icon className="w-3.5 h-3.5 opacity-50" />
                        {item.label}
                      </Link>
                    </li>
                  )
                })}
                <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Award className="w-3.5 h-3.5 opacity-50" />
                  15 {lang === 'id' ? 'Alat Gratis' : 'Free Tools'}
                </li>
                <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Lock className="w-3.5 h-3.5 opacity-50" />
                  {lang === 'id' ? '100% Client-Side' : '100% Client-Side'}
                </li>
              </ul>
            </div>

            {/* Legal & Info - Kolom 4 */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                {lang === 'id' ? 'Legal' : 'Legal'}
              </h3>
              <ul className="space-y-3">
                {legalLinks.map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={item.href}>
                      <Link 
                        href={item.href} 
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-all duration-300 hover:translate-x-1"
                      >
                        <Icon className="w-3.5 h-3.5 opacity-50" />
                        {item.label}
                      </Link>
                    </li>
                  )
                })}
                <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Shield className="w-3.5 h-3.5 opacity-50" />
                  {lang === 'id' ? 'Aman & Terpercaya' : 'Safe & Trusted'}
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom - Copyright Only */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                © {currentYear} HmzTools | {t.copyright}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}