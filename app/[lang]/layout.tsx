import { ThemeProvider } from 'next-themes'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import { getDictionary } from '@/lib/dictionary'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang)
  return {
    title: {
      template: `%s | HmzTools`,
      default: 'HmzTools'
    },
    description: dict.meta.description,
    alternates: {
      languages: {
        'id': '/id',
        'en': '/en',
      }
    }
  }
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  const dict = await getDictionary(params.lang)
  
  return (
    <html lang={params.lang} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.png" />
      </head>
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900 transition-colors`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header lang={params.lang} dict={dict} />
          <main className="container mx-auto px-4 py-8 max-w-6xl">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}