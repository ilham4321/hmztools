'use client'

import Link from 'next/link'
import { Github, Twitter, Linkedin, Mail, Heart, Zap, Shield, Award } from 'lucide-react'

interface FooterProps {
  lang: string
}

export default function Footer({ lang }: FooterProps) {
  const currentYear = new Date().getFullYear()
  
  const footerLinks = {
    id: {
      about: 'Tentang',
      features: 'Fitur',
      privacy: 'Privasi',
      terms: 'Syarat',
      contact: 'Kontak',
      tools: '15 Alat Gratis',
      description: 'Kumpulan alat online gratis untuk kebutuhan sehari-hari dan pengembangan.',
      copyright: 'Hak Cipta Dilindungi',
      builtWith: 'Dibangun dengan',
      love: '❤️',
    },
    en: {
      about: 'About',
      features: 'Features',
      privacy: 'Privacy',
      terms: 'Terms',
      contact: 'Contact',
      tools: '15 Free Tools',
      description: 'Collection of free online tools for daily needs and development.',
      copyright: 'All Rights Reserved',
      builtWith: 'Built with',
      love: '❤️',
    }
  }

  const t = footerLinks[lang as keyof typeof footerLinks] || footerLinks.id

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  HmzTools
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
                {t.description}
              </p>
              <div className="flex gap-3">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
                   className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  <Github className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                   className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  <Twitter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                   className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  <Linkedin className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </a>
                <a href="mailto:hello@hmztools.com"
                   className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  <Mail className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">{t.about}</h3>
              <ul className="space-y-2">
                <li><Link href={`/${lang}/about`} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t.about}</Link></li>
                <li><Link href={`/${lang}/features`} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t.features}</Link></li>
                <li><Link href={`/${lang}/tools`} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t.tools}</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">{t.contact}</h3>
              <ul className="space-y-2">
                <li><Link href={`/${lang}/privacy`} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t.privacy}</Link></li>
                <li><Link href={`/${lang}/terms`} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t.terms}</Link></li>
                <li><Link href={`/${lang}/contact`} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t.contact}</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="py-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span>© {currentYear} HmzTools.</span>
              <span>{t.copyright}.</span>
              <span className="hidden sm:inline">|</span>
              <span className="flex items-center gap-1">
                {t.builtWith} <Heart className="w-4 h-4 text-red-500 animate-pulse" /> {lang === 'id' ? 'di Indonesia' : 'in Indonesia'}
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1 text-gray-500 dark:text-gray-500">
                <Shield className="w-3 h-3" />
                {lang === 'id' ? 'Aman & Gratis' : 'Secure & Free'}
              </span>
              <span className="flex items-center gap-1 text-gray-500 dark:text-gray-500">
                <Award className="w-3 h-3" />
                {lang === 'id' ? '15 Alat' : '15 Tools'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}