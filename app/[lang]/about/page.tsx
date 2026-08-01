import { getDictionary } from '@/lib/dictionary'
import { Sparkles, Rocket, Shield, Zap, Users, Code } from 'lucide-react'

export default async function AboutPage({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang)
  
  return (
    <div className="max-w-4xl mx-auto py-10 space-y-8">
      <div className="text-center">
        <h1 className="text-5xl md:text-6xl font-bold gradient-text font-playfair mb-4">
          {params.lang === 'id' ? 'Tentang HmzTools' : 'About HmzTools'}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          {params.lang === 'id' 
            ? 'Koleksi alat online premium untuk kebutuhan Anda' 
            : 'Premium online tools collection for your needs'}
        </p>
      </div>

      <div className="glass-premium rounded-3xl p-8 space-y-6">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {params.lang === 'id' 
              ? 'HmzTools adalah kumpulan 15 alat online gratis yang dirancang dengan standar premium untuk membantu kebutuhan sehari-hari dan pengembangan profesional. Semua alat berjalan sepenuhnya di sisi klien (client-side) sehingga cepat, aman, dan tidak memerlukan biaya server.'
              : 'HmzTools is a collection of 15 free online tools designed with premium standards to help with daily needs and professional development. All tools run entirely on the client-side, making them fast, secure, and cost-free.'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="p-6 rounded-2xl glass-premium">
            <Zap className="w-8 h-8 text-purple-500 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {params.lang === 'id' ? '15 Alat Praktis' : '15 Practical Tools'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {params.lang === 'id' 
                ? 'Dari kalkulator hingga generator, semua kebutuhan Anda tersedia' 
                : 'From calculators to generators, all your needs are covered'}
            </p>
          </div>
          
          <div className="p-6 rounded-2xl glass-premium">
            <Sparkles className="w-8 h-8 text-purple-500 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {params.lang === 'id' ? 'Bilingual' : 'Bilingual'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {params.lang === 'id' 
                ? 'Tersedia dalam Bahasa Indonesia dan Inggris' 
                : 'Available in Indonesian and English'}
            </p>
          </div>
          
          <div className="p-6 rounded-2xl glass-premium">
            <Shield className="w-8 h-8 text-purple-500 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {params.lang === 'id' ? '100% Aman' : '100% Secure'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {params.lang === 'id' 
                ? 'Data Anda diproses di browser, tidak pernah ke server' 
                : 'Your data is processed in browser, never sent to server'}
            </p>
          </div>
          
          <div className="p-6 rounded-2xl glass-premium">
            <Rocket className="w-8 h-8 text-purple-500 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {params.lang === 'id' ? 'Cepat & Modern' : 'Fast & Modern'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {params.lang === 'id' 
                ? 'Alat akan terus bertambah seiring berjalannya waktu dan permintaan' 
                : 'tools will continue to grow as time goes by and demand increases'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/30">
          <Users className="w-5 h-5 text-purple-500" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {params.lang === 'id' 
              ? 'Dibuat oleh HamzzDev' 
              : 'Created by HamzzDev'}
          </span>
        </div>
      </div>
    </div>
  )
}