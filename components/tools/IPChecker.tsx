'use client';

import { useState, useEffect } from 'react';
import { BaseTool } from './BaseTool';
import { 
  Wifi, 
  MapPin, 
  Globe, 
  Clock, 
  Shield, 
  Server, 
  Smartphone,
  Copy,
  Check,
  RefreshCw,
  AlertCircle,
  Loader2
} from 'lucide-react';

interface IPCheckerProps {
  title: string;
  description: string;
  article: string;
  dict: any;
}

interface IPInfo {
  ip: string;
  country: string;
  country_code: string;
  region: string;
  city: string;
  latitude: number;
  longitude: number;
  timezone: string;
  isp: string;
  org: string;
  success: boolean;
  message?: string;
}

interface DeviceInfo {
  userAgent: string;
  platform: string;
  browser: string;
  os: string;
  device: string;
  screenResolution: string;
  language: string;
  online: boolean;
}

export function IPChecker({ title, description, article, dict }: IPCheckerProps) {
  const [ipInfo, setIpInfo] = useState<IPInfo | null>(null);
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  // Get device info
  useEffect(() => {
    try {
      const userAgent = navigator.userAgent;
      const platform = navigator.platform;
      const language = navigator.language;
      const online = navigator.onLine;

      let browser = 'Unknown';
      if (userAgent.indexOf('Firefox') > -1) browser = 'Firefox';
      else if (userAgent.indexOf('Chrome') > -1) browser = 'Chrome';
      else if (userAgent.indexOf('Safari') > -1) browser = 'Safari';
      else if (userAgent.indexOf('Edge') > -1) browser = 'Edge';
      else if (userAgent.indexOf('Opera') > -1) browser = 'Opera';

      let os = 'Unknown';
      if (userAgent.indexOf('Windows') > -1) os = 'Windows';
      else if (userAgent.indexOf('Mac OS') > -1) os = 'macOS';
      else if (userAgent.indexOf('Linux') > -1) os = 'Linux';
      else if (userAgent.indexOf('Android') > -1) os = 'Android';
      else if (userAgent.indexOf('iPhone') > -1) os = 'iOS';

      let device = 'Desktop';
      if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
        device = 'Mobile';
      }

      setDeviceInfo({
        userAgent,
        platform,
        browser,
        os,
        device,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        language,
        online,
      });
    } catch (err) {
      console.error('Error getting device info:', err);
    }
  }, []);

  // Get IP info from ipwho.is
  useEffect(() => {
    const getIPInfo = async () => {
      setLoading(true);
      setError('');

      try {
        // Gunakan endpoint yang benar sesuai dokumentasi
        const response = await fetch('https://ipwho.is/?fields=ip,country,country_code,region,city,latitude,longitude,timezone,isp,org,success,message');
        const data = await response.json();

        if (data && data.success) {
          setIpInfo({
            ip: data.ip || 'Tidak tersedia',
            country: data.country || 'Tidak tersedia',
            country_code: data.country_code || 'Tidak tersedia',
            region: data.region || 'Tidak tersedia',
            city: data.city || 'Tidak tersedia',
            latitude: data.latitude || 0,
            longitude: data.longitude || 0,
            timezone: data.timezone?.id || data.timezone || 'Tidak tersedia',
            isp: data.isp || 'Tidak tersedia',
            org: data.org || 'Tidak tersedia',
            success: data.success,
          });
        } else {
          setError(data?.message || 'Gagal mendapatkan informasi IP. Silakan coba lagi.');
        }
      } catch (err) {
        console.error('Error fetching IP info:', err);
        setError('Gagal terhubung ke server. Periksa koneksi internet Anda.');
      } finally {
        setLoading(false);
      }
    };

    getIPInfo();
  }, []);

  const refreshIP = async () => {
    setLoading(true);
    setError('');
    setIpInfo(null);

    try {
      const response = await fetch('https://ipwho.is/?fields=ip,country,country_code,region,city,latitude,longitude,timezone,isp,org,success,message');
      const data = await response.json();

      if (data && data.success) {
        setIpInfo({
          ip: data.ip || 'Tidak tersedia',
          country: data.country || 'Tidak tersedia',
          country_code: data.country_code || 'Tidak tersedia',
          region: data.region || 'Tidak tersedia',
          city: data.city || 'Tidak tersedia',
          latitude: data.latitude || 0,
          longitude: data.longitude || 0,
          timezone: data.timezone?.id || data.timezone || 'Tidak tersedia',
          isp: data.isp || 'Tidak tersedia',
          org: data.org || 'Tidak tersedia',
          success: data.success,
        });
      } else {
        setError(data?.message || 'Gagal mendapatkan informasi IP. Silakan coba lagi.');
      }
    } catch (err) {
      console.error('Error refreshing IP info:', err);
      setError('Gagal terhubung ke server. Periksa koneksi internet Anda.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyAllInfo = () => {
    if (!ipInfo) return;
    const infoText = `
📡 Informasi IP
━━━━━━━━━━━━━━━━━━━━━━━━━
🌐 IP Address: ${ipInfo.ip}
📍 Negara: ${ipInfo.country} (${ipInfo.country_code})
🏙️ Kota: ${ipInfo.city}
🗺️ Region: ${ipInfo.region}
🗺️ Koordinat: ${ipInfo.latitude}, ${ipInfo.longitude}
⏰ Timezone: ${ipInfo.timezone}
🏢 ISP: ${ipInfo.isp}
📡 Organization: ${ipInfo.org}

💻 Informasi Perangkat
━━━━━━━━━━━━━━━━━━━━━━━━━
🖥️ Perangkat: ${deviceInfo?.device || 'Unknown'}
💻 OS: ${deviceInfo?.os || 'Unknown'}
🌐 Browser: ${deviceInfo?.browser || 'Unknown'}
📱 Platform: ${deviceInfo?.platform || 'Unknown'}
🖥️ Resolusi: ${deviceInfo?.screenResolution || 'Unknown'}
🌍 Bahasa: ${deviceInfo?.language || 'Unknown'}
${deviceInfo?.online ? '✅ Online' : '❌ Offline'}
`;
    navigator.clipboard.writeText(infoText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const InfoItem = ({ icon: Icon, label, value, color = 'text-indigo-400' }: any) => (
    <div className="flex items-center gap-3 p-3 glass rounded-xl">
      <div className={`p-2 bg-${color.replace('text-', '')}/10 rounded-lg`}>
        <Icon className={`w-4 h-4 ${color}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-400 uppercase tracking-wider">{label}</p>
        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{value || 'Tidak tersedia'}</p>
      </div>
    </div>
  );

  // Tampilkan loading
  if (loading) {
    return (
      <BaseTool title={title} description={description} article={article}>
        <div className="p-12 text-center">
          <Loader2 className="w-12 h-12 mx-auto text-indigo-500 animate-spin" />
          <p className="mt-4 text-gray-500 dark:text-gray-400">Mendapatkan informasi IP...</p>
        </div>
      </BaseTool>
    );
  }

  return (
    <BaseTool title={title} description={description} article={article}>
      <div className="space-y-6">
        {/* Error */}
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-500">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm flex-1">{error}</span>
            <button
              onClick={refreshIP}
              className="px-4 py-1.5 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-sm transition-colors flex-shrink-0"
            >
              Coba Lagi
            </button>
          </div>
        )}

        {/* IP Address Card */}
        {ipInfo ? (
          <>
            {/* Main IP Card */}
            <div className="p-6 glass rounded-2xl text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl"></div>
              <div className="relative">
                <div className="flex items-center justify-center gap-4 mb-3">
                  <div className="p-3 bg-indigo-500/20 rounded-full">
                    <Wifi className="w-8 h-8 text-indigo-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">IP Address</p>
                    <div className="flex items-center gap-2">
                      <h2 className="text-3xl md:text-4xl font-bold text-gradient-blue">
                        {ipInfo.ip}
                      </h2>
                      <button
                        onClick={() => copyToClipboard(ipInfo.ip)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      >
                        {copied ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                  <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-xs font-medium">
                    {deviceInfo?.online ? '🟢 Online' : '🔴 Offline'}
                  </span>
                  <span className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full text-xs font-medium">
                    {ipInfo.country}
                  </span>
                  <span className="px-3 py-1 bg-purple-500/10 text-purple-500 rounded-full text-xs font-medium">
                    {ipInfo.isp}
                  </span>
                </div>
                <button
                  onClick={refreshIP}
                  className="mt-4 text-sm text-indigo-500 hover:text-indigo-600 transition-colors flex items-center gap-1 mx-auto"
                >
                  <RefreshCw className="w-4 h-4" />
                  Refresh IP
                </button>
              </div>
            </div>

            {/* Location */}
            <div className="p-4 glass rounded-xl">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Lokasi
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
                  <p className="text-xs text-gray-400">Negara</p>
                  <p className="text-sm font-medium">{ipInfo.country}</p>
                </div>
                <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
                  <p className="text-xs text-gray-400">Kode</p>
                  <p className="text-sm font-medium">{ipInfo.country_code}</p>
                </div>
                <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
                  <p className="text-xs text-gray-400">Kota</p>
                  <p className="text-sm font-medium">{ipInfo.city}</p>
                </div>
                <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
                  <p className="text-xs text-gray-400">Region</p>
                  <p className="text-sm font-medium">{ipInfo.region}</p>
                </div>
              </div>
            </div>

            {/* Detailed Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <InfoItem 
                icon={Globe} 
                label="Timezone" 
                value={ipInfo.timezone} 
                color="text-yellow-400"
              />
              <InfoItem 
                icon={Server} 
                label="ISP" 
                value={ipInfo.isp} 
                color="text-green-400"
              />
              <InfoItem 
                icon={Shield} 
                label="Organization" 
                value={ipInfo.org} 
                color="text-purple-400"
              />
              <InfoItem 
                icon={MapPin} 
                label="Koordinat" 
                value={`${ipInfo.latitude}, ${ipInfo.longitude}`} 
                color="text-red-400"
              />
            </div>

            {/* Device Info */}
            {deviceInfo && (
              <div className="p-4 glass rounded-xl">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                  <Smartphone className="w-4 h-4" />
                  Informasi Perangkat
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
                    <p className="text-xs text-gray-400">Perangkat</p>
                    <p className="text-sm font-medium">{deviceInfo.device}</p>
                  </div>
                  <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
                    <p className="text-xs text-gray-400">OS</p>
                    <p className="text-sm font-medium">{deviceInfo.os}</p>
                  </div>
                  <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
                    <p className="text-xs text-gray-400">Browser</p>
                    <p className="text-sm font-medium">{deviceInfo.browser}</p>
                  </div>
                  <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
                    <p className="text-xs text-gray-400">Resolusi</p>
                    <p className="text-sm font-medium">{deviceInfo.screenResolution}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Copy All */}
            <button
              onClick={copyAllInfo}
              className="w-full btn-secondary flex items-center justify-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Tersalin!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Semua Informasi
                </>
              )}
            </button>
          </>
        ) : null}
      </div>
    </BaseTool>
  );
}