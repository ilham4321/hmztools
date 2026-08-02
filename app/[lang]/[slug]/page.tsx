import { notFound } from 'next/navigation';
import { getDictionary, type Locale } from '@/lib/i18n/dictionary';
import { toolsData } from '@/data/tools';
import { ClientLayout } from '@/components/ui/ClientLayout';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { ToolFactory } from '@/components/tools/ToolFactory';

export async function generateStaticParams() {
  const paths: { lang: string; slug: string }[] = [];
  const locales: Locale[] = ['id', 'en'];

  for (const locale of locales) {
    for (const tool of toolsData) {
      paths.push({
        lang: locale,
        slug: tool.slug,
      });
    }
  }

  return paths;
}

// HANYA generateMetadata, TANPA metadata static
export async function generateMetadata({ params }: { params: { lang: string; slug: string } }) {
  const dict = await getDictionary(params.lang as Locale);
  const tool = toolsData.find(t => t.slug === params.slug);

  if (!tool) {
    return {
      title: 'Tool Not Found',
      description: 'The requested tool could not be found.',
    };
  }

  const toolData = dict.tools[tool.id];
  if (!toolData) {
    return {
      title: 'Tool Not Found',
      description: 'The requested tool could not be found.',
    };
  }

  return {
    title: toolData.seoTitle,
    description: toolData.seoDescription,
    keywords: `${tool.name[params.lang as Locale]}, ${dict.metadata.keywords}`,
    alternates: {
      canonical: `https://hmztools.web.id/${params.lang}/${tool.slug}`,
      languages: {
        'id': `https://hmztools.web.id/id/${tool.slug}`,
        'en': `https://hmztools.web.id/en/${tool.slug}`,
        'x-default': `https://hmztools.web.id/id/${tool.slug}`,
      },
    },
  };
}

export default async function ToolPage({ params }: { params: { lang: string; slug: string } }) {
  const dict = await getDictionary(params.lang as Locale);
  const tool = toolsData.find(t => t.slug === params.slug);

  if (!tool) {
    notFound();
  }

  const toolData = dict.tools[tool.id];
  if (!toolData) {
    notFound();
  }

  // JSON-LD Schema for WebApplication
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: toolData.name,
    description: toolData.description,
    url: `https://hmztools.web.id/${params.lang}/${tool.slug}`,
    applicationCategory: 'Utility',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Person',
      name: 'HamzzDev',
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
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <ToolFactory
              toolId={tool.id}
              title={toolData.name}
              description={toolData.description}
              article={toolData.article}
              dict={dict}
            />
          </div>
        </main>
        <Footer lang={params.lang as Locale} />
      </ClientLayout>
    </>
  );
}