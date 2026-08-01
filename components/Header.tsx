'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Sun, Moon, Globe } from 'lucide-react'
import Image from 'next/image'

interface HeaderProps {
  lang: string
  dict: any
}

export default function Header({ lang, dict }: HeaderProps) {
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const router = useRouter()

  const toggleLanguage = () => {
    const newLang = lang === 'id' ? 'en' : 'id'
    const newPathname = pathname.replace(`/${lang}`, `/${newLang}`)
    router.push(newPathname)
  }

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between h-16">
          <Link href={`/${lang}`} className="flex items-center gap-2">
            <Image src="/logo.png" alt="HmzTools" width={40} height={40} className="w-10 h-10" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">HmzTools</span>
          </Link>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span className="font-medium">{lang === 'id' ? 'ID' : 'EN'}</span>
            </button>
            
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}