import { Providers } from '@/app/providers';
import { getDictionary, type Locale } from '@/lib/i18n/dictionary';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export async function generateMetadata({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang as Locale);
  return {
    title: {
      template: `%s | ${dict.metadata.title}`,
      default: dict.metadata.title,
    },
    description: dict.metadata.description,
    keywords: dict.metadata.keywords,
    authors: [{ name: 'HmzTools' }],
    creator: 'HamzzDev',
    publisher: 'HmzTools',
    metadataBase: new URL('https://hmztools.web.id'),
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
      other: [
        {
          rel: 'manifest',
          url: '/site.webmanifest',
        },
      ],
    },
    alternates: {
      canonical: `https://hmztools.web.id/${params.lang}`,
      languages: {
        'id': 'https://hmztools.web.id/id',
        'en': 'https://hmztools.web.id/en',
        'x-default': 'https://hmztools.web.id/id',
      },
    },
    openGraph: {
      title: dict.metadata.title,
      description: dict.metadata.description,
      url: `https://hmztools.web.id/${params.lang}`,
      siteName: 'HmzTools',
      locale: params.lang === 'id' ? 'id_ID' : 'en_US',
      type: 'website',
      images: [
        {
          url: 'https://hmztools.web.id/og-image.png',
          width: 1200,
          height: 630,
          alt: 'HmzTools',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.metadata.title,
      description: dict.metadata.description,
      images: ['https://hmztools.web.id/og-image.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'B7byqoQe6leWSF4eT33XISLw0fVMQRc5svbzK6Sl2bs',
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={params.lang} suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}