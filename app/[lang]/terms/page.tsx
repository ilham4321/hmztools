import { Award, AlertCircle, CheckCircle, FileText } from 'lucide-react'

export default async function TermsPage({ params }: { params: { lang: string } }) {
  const isId = params.lang === 'id'
  
  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="text-center mb-8">
        <FileText className="w-16 h-16 mx-auto text-purple-500 mb-4" />
        <h1 className="text-5xl md:text-6xl font-bold gradient-text font-playfair">
          {isId ? 'Syarat & Ketentuan' : 'Terms & Conditions'}
        </h1>
      </div>

      <div className="glass-premium rounded-3xl p-8 space-y-6">
        <div className="flex items-start gap-4 p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/30">
          <AlertCircle className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {isId ? 'Persetujuan Penggunaan' : 'Acceptance of Use'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {isId 
                ? 'Dengan menggunakan HmzTools, Anda menyetujui syarat dan ketentuan berikut:' 
                : 'By using HmzTools, you agree to the following terms and conditions:'}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-playfair">
            {isId ? 'Ketentuan Penggunaan' : 'Terms of Use'}
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
              <CheckCircle className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
              <span>{isId ? 'Penggunaan alat sepenuhnya tanggung jawab pengguna' : 'Use of tools is entirely at your own risk'}</span>
            </li>
            <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
              <CheckCircle className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
              <span>{isId ? 'Layanan disediakan "sebagaimana adanya" tanpa jaminan' : 'Service is provided "as is" without warranty'}</span>
            </li>
            <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
              <CheckCircle className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
              <span>{isId ? 'Kami tidak bertanggung jawab atas kerugian yang timbul' : 'We are not liable for any damages arising'}</span>
            </li>
            <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
              <CheckCircle className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
              <span>{isId ? 'Kami berhak mengubah layanan tanpa pemberitahuan' : 'We reserve the right to change the service without notice'}</span>
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-2 p-4 rounded-2xl bg-gray-50/50 dark:bg-gray-800/50">
          <Award className="w-5 h-5 text-purple-500" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {isId 
              ? 'Terakhir diperbarui: Julk 2026' 
              : 'Last updated: July 2026'}
          </span>
        </div>
      </div>
    </div>
  )
}