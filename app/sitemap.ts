import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://hmztools.vercel.app'
  const locales = ['id', 'en']
  
  const tools = [
    'age-calculator',
    'discount-calculator',
    'bmi-calculator',
    'days-between-dates',
    'random-number-generator',
    'word-character-counter',
    'password-generator',
    'image-compressor',
    'qr-code-generator',
    'uuid-generator',
    'json-formatter-validator',
    'base64-encoder-decoder',
    'url-encoder-decoder',
    'color-converter',
    'hash-generator'
  ]

  const sitemapEntries: MetadataRoute.Sitemap = []

  locales.forEach(locale => {
    sitemapEntries.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    })

    tools.forEach(tool => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/tools/${tool}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      })
    })
  })

  return sitemapEntries
}