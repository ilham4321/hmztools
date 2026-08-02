'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, Mail, Instagram, Coffee } from 'lucide-react';
import { getDictionary, type Locale } from '@/lib/i18n/dictionary';

interface FooterProps {
  lang: Locale;
}

export function Footer({ lang }: FooterProps) {
  const [dict, setDict] = useState<any>(null);

  useEffect(() => {
    getDictionary(lang).then(setDict);
  }, [lang]);

  if (!dict) return null;

  return (
    <footer className="mt-20 glass border-t border-white/10 dark:border-gray-700/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gradient-blue">HmzTools</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {lang === 'id' 
                ? 'Koleksi alat online gratis untuk kebutuhan sehari-hari dan pengembangan.' 
                : 'Collection of free online tools for daily needs and development.'}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              &copy; {new Date().getFullYear()} HmzTools. {dict.footer.rights}
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 dark:text-white">
              {dict.footer.support}
            </h4>
            <div className="space-y-2">
              <Link
                href="https://saweria.co/hmztools"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
              >
                <Coffee className="w-4 h-4" />
                {dict.footer.donate}
              </Link>
              <Link
                href="mailto:support.hmztools@gmail.com"
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
                {dict.footer.contact}
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 dark:text-white">
              {dict.footer.social}
            </h4>
            <div className="space-y-2">
              <Link
                href="https://instagram.com/hamzzdev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
              >
                <Instagram className="w-4 h-4" />
                Instagram
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 dark:border-gray-700/20 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1">
            {lang === 'id' ? 'Dibuat dengan' : 'Made with'}
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            {lang === 'id' ? 'oleh HamzzDev' : 'by HamzzDev'}
          </p>
        </div>
      </div>
    </footer>
  );
}