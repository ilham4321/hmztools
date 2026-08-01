import { ThemeProvider } from 'next-themes'
import { Inter, Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getDictionary } from '@/lib/dictionary'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap'
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap'
})

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
      <body className={`${inter.variable} ${playfair.variable} ${plusJakarta.variable} min-h-screen flex flex-col relative overflow-x-hidden`}>
        {/* Animated Background Orbs */}
        <div className="fixed inset-0 pointer-events-none -z-10">
          <div className="orb-blue top-[-20%] left-[-10%] animate-pulse-glow" />
          <div className="orb-purple bottom-[-20%] right-[-10%] animate-pulse-glow delay-1000" />
          <div className="orb-pink top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 animate-pulse-glow delay-2000" />
          <div className="absolute inset-0 bg-grid-pattern" />
        </div>

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header lang={params.lang} dict={dict} />
          <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl relative z-10">
            {children}
          </main>
          <Footer lang={params.lang} />
        </ThemeProvider>
      </body>
    </html>
  )
}