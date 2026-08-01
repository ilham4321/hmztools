import { notFound } from 'next/navigation'
import { toolsData } from '@/data/tools'
import { getDictionary } from '@/lib/dictionary'
import ToolRenderer from '@/components/ToolRenderer'

export async function generateMetadata({ params }: { params: { lang: string; slug: string } }) {
  const tool = toolsData.find(t => t.slug === params.slug)
  if (!tool) return notFound()

  const t = tool.translations[params.lang as keyof typeof tool.translations] || tool.translations.id

  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: {
      languages: {
        id: `/id/tools/${params.slug}`,
        en: `/en/tools/${params.slug}`,
      }
    }
  }
}

export async function generateStaticParams() {
  const paths = []
  const locales = ['id', 'en']
  
  for (const locale of locales) {
    for (const tool of toolsData) {
      paths.push({
        lang: locale,
        slug: tool.slug
      })
    }
  }
  
  return paths
}

export default async function ToolPage({ params }: { params: { lang: string; slug: string } }) {
  const tool = toolsData.find(t => t.slug === params.slug)
  if (!tool) return notFound()

  const dict = await getDictionary(params.lang)
  const t = tool.translations[params.lang as keyof typeof tool.translations] || tool.translations.id

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: t.name,
    description: t.description,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'All',
    browserRequirements: 'JavaScript',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-3xl mx-auto">
        <ToolRenderer tool={tool} lang={params.lang} />
        
        <div className="mt-12 card">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t.articleTitle}
          </h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t.articleContent}
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
              {t.seoDescription}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}