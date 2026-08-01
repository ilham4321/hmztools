'use client'

import { Tool } from '@/data/tools'
import dynamic from 'next/dynamic'

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
    return <div className="card">Tool not found</div>
  }

  return (
    <div className="card">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t.name}</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">{t.description}</p>
      <Component lang={lang} />
    </div>
  )
}