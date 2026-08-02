import { getDictionary, type Locale } from '@/lib/i18n/dictionary';
import { ClientLayout } from '@/components/ui/ClientLayout';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { HomeContent } from '@/components/HomeContent';

export async function generateMetadata({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang as Locale);
  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
    keywords: dict.metadata.keywords,
    alternates: {
      canonical: `https://hmztools.web.id/${params.lang}`,
      languages: {
        'id': 'https://hmztools.web.id/id',
        'en': 'https://hmztools.web.id/en',
        'x-default': 'https://hmztools.web.id/id',
      },
    },
  };
}

export default async function HomePage({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang as Locale);
  const { toolsData } = await import('@/data/tools');

  // JSON-LD Schema for Website
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'HmzTools',
    description: dict.metadata.description,
    url: `https://hmztools.web.id/${params.lang}`,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `https://hmztools.web.id/${params.lang}/?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ClientLayout params={params}>
        <Header lang={params.lang as Locale} />
        <main className="min-h-screen pt-16">
          <HomeContent tools={toolsData} dict={dict} lang={params.lang as Locale} />
        </main>
        <Footer lang={params.lang as Locale} />
      </ClientLayout>
    </>
  );
}