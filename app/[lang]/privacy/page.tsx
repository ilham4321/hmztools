import { Shield, CheckCircle, XCircle, Lock } from 'lucide-react'

export default async function PrivacyPage({ params }: { params: { lang: string } }) {
  const isId = params.lang === 'id'
  
  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="text-center mb-8">
        <Shield className="w-16 h-16 mx-auto text-purple-500 mb-4" />
        <h1 className="text-5xl md:text-6xl font-bold gradient-text font-playfair">
          {isId ? 'Kebijakan Privasi' : 'Privacy Policy'}
        </h1>
      </div>

      <div className="glass-premium rounded-3xl p-8 space-y-6">
        <div className="flex items-start gap-4 p-4 rounded-2xl bg-green-50/50 dark:bg-green-950/30">
          <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {isId ? 'Data Anda Aman' : 'Your Data is Safe'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {isId 
                ? 'HmzTools menghormati privasi Anda. Semua data diproses di browser Anda.' 
                : 'HmzTools respects your privacy. All data is processed in your browser.'}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-playfair">
            {isId ? 'Data yang Dikumpulkan' : 'Data Collected'}
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
              <XCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>{isId ? 'Tidak ada data pribadi yang dikumpulkan' : 'No personal data is collected'}</span>
            </li>
            <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
              <XCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>{isId ? 'Tidak ada cookie yang digunakan' : 'No cookies are used'}</span>
            </li>
            <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
              <XCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>{isId ? 'Tidak ada pelacakan atau analitik' : 'No tracking or analytics'}</span>
            </li>
            <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
              <Lock className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
              <span>{isId ? 'Semua data tetap di perangkat Anda' : 'All data stays on your device'}</span>
            </li>
          </ul>
        </div>

        <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/30">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {isId 
              ? 'Kami tidak menyimpan, membagikan, atau menjual data Anda dalam bentuk apapun. Privasi Anda adalah prioritas kami.' 
              : 'We do not store, share, or sell your data in any form. Your privacy is our priority.'}
          </p>
        </div>
      </div>
    </div>
  )
}