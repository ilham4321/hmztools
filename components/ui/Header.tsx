'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Moon, Sun, Globe, Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { getDictionary, type Locale } from '@/lib/i18n/dictionary';

interface HeaderProps {
  lang: Locale;
}

export function Header({ lang }: HeaderProps) {
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [dict, setDict] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    getDictionary(lang).then(setDict);
  }, [lang]);

  if (!mounted || !dict) return null;

  const toggleLanguage = () => {
    const newLang = lang === 'id' ? 'en' : 'id';
    const path = pathname?.split('/').slice(2).join('/') || '';
    window.location.href = `/${newLang}/${path}`;
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/20 dark:border-gray-700/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href={`/${lang}`} className="flex items-center gap-2 group">
            <div className="relative w-8 h-8">
              <Image
                src="/logo.png"
                alt="HmzTools Logo"
                width={32}
                height={32}
                className="rounded-lg"
                priority
              />
            </div>
            <span className="text-xl font-bold text-gradient-blue group-hover:scale-105 transition-transform">
              HmzTools
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 rounded-lg glass glass-hover text-sm font-medium"
            >
              <Globe className="w-4 h-4" />
              <span>{lang === 'id' ? 'ID' : 'EN'}</span>
            </button>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg glass glass-hover"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>

          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg glass glass-hover"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20 dark:border-gray-700/30">
            <div className="flex flex-col gap-3">
              <button
                onClick={toggleLanguage}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg glass glass-hover text-sm font-medium w-full"
              >
                <Globe className="w-4 h-4" />
                <span>{lang === 'id' ? 'Bahasa Indonesia' : 'English'}</span>
              </button>
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg glass glass-hover text-sm font-medium w-full"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-4 h-4" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4" />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}