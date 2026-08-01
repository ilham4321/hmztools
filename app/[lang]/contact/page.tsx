import { Mail, Github, Instagram, MessageCircle, Send, Sparkles } from 'lucide-react'

export default async function ContactPage({ params }: { params: { lang: string } }) {
  const isId = params.lang === 'id'
  
  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="text-center mb-8">
        <MessageCircle className="w-16 h-16 mx-auto text-purple-500 mb-4" />
        <h1 className="text-5xl md:text-6xl font-bold gradient-text font-playfair">
          {isId ? 'Hubungi Kami' : 'Contact Us'}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mt-2">
          {isId 
            ? 'Ada pertanyaan atau saran? Kami siap membantu!' 
            : 'Have questions or suggestions? We\'re here to help!'}
        </p>
      </div>

      <div className="glass-premium rounded-3xl p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a 
            href="mailto:support.hmztools@gmail.com"
            className="group p-6 rounded-2xl glass-card hover:scale-105 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {isId ? 'Email' : 'Email'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm break-all">support.hmztools@gmail.com</p>
            <div className="mt-2 text-xs text-purple-500 group-hover:translate-x-1 transition-transform">
              {isId ? 'Kirim email →' : 'Send email →'}
            </div>
          </a>

          <a 
            href="https://github.com/ilham4321/hmztools"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 rounded-2xl glass-card hover:scale-105 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Github className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">GitHub</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">/ilham4321/hmztools</p>
            <div className="mt-2 text-xs text-purple-500 group-hover:translate-x-1 transition-transform">
              {isId ? 'Lihat repository →' : 'View repository →'}
            </div>
          </a>

          <a 
            href="https://instagram.com/hamzzdev"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 rounded-2xl glass-card hover:scale-105 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 via-red-500 to-orange-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Instagram className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Instagram</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">@hamzzdev</p>
            <div className="mt-2 text-xs text-purple-500 group-hover:translate-x-1 transition-transform">
              {isId ? 'Ikuti kami →' : 'Follow us →'}
            </div>
          </a>
        </div>

        <div className="flex items-center gap-3 p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/30">
          <Send className="w-5 h-5 text-purple-500" />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {isId 
              ? 'Kami akan merespon dalam 24 jam kerja' 
              : 'We will respond within 24 business hours'}
          </p>
        </div>

        <div className="flex items-center gap-2 p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/30 text-sm text-gray-600 dark:text-gray-400">
          <Sparkles className="w-4 h-4 text-blue-500" />
          <span>
            {isId 
              ? '💡 Tips: Sertakan detail lengkap agar kami bisa membantu lebih cepat' 
              : '💡 Tip: Include complete details so we can help you faster'}
          </span>
        </div>
      </div>
    </div>
  )
}