'use client'

import { Tool } from '@/data/tools'
import dynamic from 'next/dynamic'
import { Sparkles } from 'lucide-react'

const toolsMap: Record<string, any> = {
  'age-calculator': dynamic(() => import('./tools/AgeCalculator')),
  'discount-calculator': dynamic(() => import('./tools/DiscountCalculator')),
  'bmi-calculator': dynamic(() => import('./tools/BmiCalculator')),
  'days-between-dates': dynamic(() => import('./tools/DaysBetweenDates')),
  'random-number-generator': dynamic(() => import('./tools/RandomNumberGenerator')),
  'word-character-counter': dynamic(() => import('./tools/WordCharacterCounter')),
  'password-generator': dynamic(() => import('./tools/PasswordGenerator')),
  'image-compressor': dynamic(() => import('./tools/ImageCompressor')),
  'qr-code-generator': dynamic(() => import('./tools/QrCodeGenerator')),
  'uuid-generator': dynamic(() => import('./tools/UuidGenerator')),
  'json-formatter-validator': dynamic(() => import('./tools/JsonFormatterValidator')),
  'base64-encoder-decoder': dynamic(() => import('./tools/Base64EncoderDecoder')),
  'url-encoder-decoder': dynamic(() => import('./tools/UrlEncoderDecoder')),
  'color-converter': dynamic(() => import('./tools/ColorConverter')),
  'hash-generator': dynamic(() => import('./tools/HashGenerator')),
}

interface ToolRendererProps {
  tool: Tool
  lang: string
}

export default function ToolRenderer({ tool, lang }: ToolRendererProps) {
  const Component = toolsMap[tool.slug]
  const t = tool.translations[lang as keyof typeof tool.translations] || tool.translations.id

  if (!Component) {
    return <div className="glass-premium rounded-2xl p-12 text-center">Tool not found</div>
  }

  return (
    <div className="relative">
      {/* Decorative gradient background */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
      
      <div className="relative glass-premium rounded-3xl p-8 md:p-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20">
            <Sparkles className="w-6 h-6 text-purple-500" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold gradient-text">{t.name}</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">{t.description}</p>
          </div>
        </div>
        
        <div className="mt-6">
          <Component lang={lang} />
        </div>
      </div>
    </div>
  )
}