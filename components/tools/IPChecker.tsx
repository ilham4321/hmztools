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
  Loader2,
  Monitor,
  Database,
  MapPinned,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  ShieldAlert,
  ShieldQuestion
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix untuk marker icon Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// API Key untuk ipapi.com
const API_KEY = '4f25d484beeb3736334ce0094ae8f624';

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
  is_proxy?: boolean;
  is_vpn?: boolean;
  is_tor?: boolean;
  is_hosting?: boolean;
  postal?: string;
  calling_code?: string;
  flag?: string;
  continent?: string;
  currency?: string;
  is_eu?: boolean;
  connection_type?: string;
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
  const [showMap, setShowMap] = useState(true);

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

  // Get IP info from TWO APIs and combine
  useEffect(() => {
    const getIPInfo = async () => {
      setLoading(true);
      setError('');

      try {
        // API 1: ipapi.co (untuk lokasi, flag, calling code)
        const response1 = await fetch('https://ipapi.co/json/');
        const data1 = await response1.json();

        // API 2: api.ipapi.com (untuk ISP, Organisasi, Keamanan)
        const response2 = await fetch(
          `https://api.ipapi.com/api/check?access_key=${API_KEY}&format=json`
        );
        const data2 = await response2.json();

        console.log('ipapi.co data:', data1);
        console.log('ipapi.com data:', data2);

        // Gabungkan data dari kedua API
        if (data1 && !data1.error) {
          setIpInfo({
            // Dari ipapi.co (lokasi lebih akurat)
            ip: data1.ip || 'Tidak tersedia',
            country: data1.country_name || 'Tidak tersedia',
            country_code: data1.country_code || 'Tidak tersedia',
            region: data1.region_name || 'Tidak tersedia',
            city: data1.city || 'Tidak tersedia',
            latitude: data1.latitude || 0,
            longitude: data1.longitude || 0,
            timezone: data1.timezone || 'Tidak tersedia',
            continent: data1.continent_name || 'Tidak tersedia',
            postal: data1.postal || 'Tidak tersedia',
            calling_code: data1.calling_code || 'Tidak tersedia',
            flag: data1.country_flag_emoji || '🏳️',
            currency: data1.currency_name || 'Tidak tersedia',
            is_eu: data1.in_eu || false,
            // Dari api.ipapi.com (ISP, Org, Security)
            isp: data2?.connection?.isp || data2?.isp || data1.org || 'Tidak tersedia',
            org: data2?.connection?.org || data2?.org || data1.org || 'Tidak tersedia',
            is_proxy: data2?.security?.is_proxy || data2?.is_proxy || false,
            is_vpn: data2?.security?.is_vpn || data2?.is_vpn || false,
            is_tor: data2?.security?.is_tor || data2?.is_tor || false,
            is_hosting: data2?.security?.is_hosting || data2?.is_hosting || false,
            connection_type: data2?.connection_type || 'Tidak tersedia',
            success: true,
          });
        } else {
          setError('Gagal mendapatkan informasi IP. Silakan coba lagi.');
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
      const response1 = await fetch('https://ipapi.co/json/');
      const data1 = await response1.json();

      const response2 = await fetch(
        `https://api.ipapi.com/api/check?access_key=${API_KEY}&format=json`
      );
      const data2 = await response2.json();

      if (data1 && !data1.error) {
        setIpInfo({
          ip: data1.ip || 'Tidak tersedia',
          country: data1.country_name || 'Tidak tersedia',
          country_code: data1.country_code || 'Tidak tersedia',
          region: data1.region_name || 'Tidak tersedia',
          city: data1.city || 'Tidak tersedia',
          latitude: data1.latitude || 0,
          longitude: data1.longitude || 0,
          timezone: data1.timezone || 'Tidak tersedia',
          continent: data1.continent_name || 'Tidak tersedia',
          postal: data1.postal || 'Tidak tersedia',
          calling_code: data1.calling_code || 'Tidak tersedia',
          flag: data1.country_flag_emoji || '🏳️',
          currency: data1.currency_name || 'Tidak tersedia',
          is_eu: data1.in_eu || false,
          isp: data2?.connection?.isp || data2?.isp || data1.org || 'Tidak tersedia',
          org: data2?.connection?.org || data2?.org || data1.org || 'Tidak tersedia',
          is_proxy: data2?.security?.is_proxy || data2?.is_proxy || false,
          is_vpn: data2?.security?.is_vpn || data2?.is_vpn || false,
          is_tor: data2?.security?.is_tor || data2?.is_tor || false,
          is_hosting: data2?.security?.is_hosting || data2?.is_hosting || false,
          connection_type: data2?.connection_type || 'Tidak tersedia',
          success: true,
        });
      } else {
        setError('Gagal mendapatkan informasi IP. Silakan coba lagi.');
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
🗺️ Benua: ${ipInfo.continent}
🗺️ Koordinat: ${ipInfo.latitude}, ${ipInfo.longitude}
⏰ Timezone: ${ipInfo.timezone}
🏢 ISP: ${ipInfo.isp}
📡 Organization: ${ipInfo.org}
📮 ZIP: ${ipInfo.postal}
📞 Calling Code: +${ipInfo.calling_code}
💰 Mata Uang: ${ipInfo.currency}
📡 Connection Type: ${ipInfo.connection_type}

🔒 Privasi & Keamanan
━━━━━━━━━━━━━━━━━━━━━━━━━
${ipInfo.is_proxy ? '⚠️ Proxy Terdeteksi' : '✅ Proxy Tidak Terdeteksi'}
${ipInfo.is_vpn ? '⚠️ VPN Terdeteksi' : '✅ VPN Tidak Terdeteksi'}
${ipInfo.is_tor ? '⚠️ Tor Terdeteksi' : '✅ Tor Tidak Terdeteksi'}
${ipInfo.is_hosting ? '🔄 Hosting Terdeteksi' : '✅ Hosting Tidak Terdeteksi'}
${ipInfo.is_eu ? '🇪🇺 EU Member' : '🌍 Non-EU'}

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

  // Get security status
  const getSecurityStatus = () => {
    if (!ipInfo) return { status: 'unknown', label: 'Tidak Diketahui', icon: ShieldQuestion, color: 'text-gray-400' };
    
    if (ipInfo.is_proxy || ipInfo.is_vpn || ipInfo.is_tor) {
      return { 
        status: 'unsafe', 
        label: '⚠️ Tidak Aman - IP Terdeteksi Menggunakan Anonimizer', 
        icon: ShieldAlert, 
        color: 'text-red-500 bg-red-500/10' 
      };
    }
    
    if (ipInfo.is_hosting) {
      return { 
        status: 'hosting', 
        label: '🔄 Hosting/Server - IP Digunakan untuk Hosting', 
        icon: Server, 
        color: 'text-yellow-500 bg-yellow-500/10' 
      };
    }
    
    return { 
      status: 'safe', 
      label: '✅ Aman - IP Publik Normal', 
      icon: ShieldCheck, 
      color: 'text-green-500 bg-green-500/10' 
    };
  };

  const securityStatus = getSecurityStatus();
  const SecurityIcon = securityStatus.icon;

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

        {ipInfo ? (
          <>
            {/* Header: IP Address + Status */}
            <div className="p-6 glass rounded-2xl">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="p-3 bg-indigo-500/20 rounded-full flex-shrink-0">
                    <Wifi className="w-8 h-8 text-indigo-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-gray-500 dark:text-gray-400">IP Address</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-2xl md:text-3xl font-bold text-gradient-blue break-all">
                        {ipInfo.ip}
                      </h2>
                      <button
                        onClick={() => copyToClipboard(ipInfo.ip)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0"
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
                <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    deviceInfo?.online 
                      ? 'bg-green-500/10 text-green-500' 
                      : 'bg-red-500/10 text-red-500'
                  }`}>
                    {deviceInfo?.online ? '🟢 Online' : '🔴 Offline'}
                  </span>
                  <button
                    onClick={refreshIP}
                    className="px-3 py-1 text-sm text-indigo-500 hover:text-indigo-600 transition-colors flex items-center gap-1"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Refresh
                  </button>
                </div>
              </div>
            </div>

            {/* Status Keamanan IP */}
            <div className={`p-4 rounded-xl border flex items-center gap-3 ${securityStatus.color}`}>
              <SecurityIcon className="w-6 h-6 flex-shrink-0" />
              <div className="min-w-0">
                <p className="font-medium text-gray-900 dark:text-white break-words">
                  {securityStatus.label}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 break-words">
                  {securityStatus.status === 'safe' 
                    ? 'IP Anda tidak terdeteksi menggunakan proxy, VPN, atau Tor. Koneksi aman.' 
                    : securityStatus.status === 'hosting'
                    ? 'IP ini terdeteksi sebagai server/hosting. Bisa jadi server atau VPS.'
                    : 'IP ini terdeteksi menggunakan anonimizer (Proxy/VPN/Tor). Data lokasi mungkin tidak akurat.'}
                </p>
              </div>
            </div>

            {/* Map */}
            {showMap && ipInfo.latitude && ipInfo.longitude && ipInfo.latitude !== 0 && ipInfo.longitude !== 0 && (
              <div className="glass rounded-xl overflow-hidden">
                <div className="p-3 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <MapPinned className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                      Lokasi IP
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 truncate ml-2">
                    {ipInfo.city}, {ipInfo.country}
                  </span>
                </div>
                <div className="h-64 w-full">
                  <MapContainer
                    center={[ipInfo.latitude, ipInfo.longitude]}
                    zoom={13}
                    style={{ height: '100%', width: '100%' }}
                    zoomControl={false}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Circle
                      center={[ipInfo.latitude, ipInfo.longitude]}
                      radius={1000}
                      pathOptions={{
                        color: '#6366f1',
                        fillColor: '#6366f1',
                        fillOpacity: 0.2,
                      }}
                    />
                    <Marker position={[ipInfo.latitude, ipInfo.longitude]}>
                      <Popup>
                        <div className="text-center">
                          <p className="font-bold">{ipInfo.ip}</p>
                          <p className="text-sm">{ipInfo.city}, {ipInfo.country}</p>
                          <p className="text-xs text-gray-500">{ipInfo.isp}</p>
                        </div>
                      </Popup>
                    </Marker>
                  </MapContainer>
                </div>
              </div>
            )}

            {/* Grid 3 Kolom */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Lokasi */}
              <div className="p-4 glass rounded-xl overflow-hidden">
                <div className="flex items-center gap-2 mb-3">
                  <MapPinned className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Lokasi</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm gap-2">
                    <span className="text-gray-500 dark:text-gray-400 flex-shrink-0">Negara</span>
                    <span className="font-medium text-gray-900 dark:text-white text-right break-words">
                      {ipInfo.flag} {ipInfo.country}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm gap-2">
                    <span className="text-gray-500 dark:text-gray-400 flex-shrink-0">Kode</span>
                    <span className="font-medium text-gray-900 dark:text-white">{ipInfo.country_code}</span>
                  </div>
                  <div className="flex justify-between text-sm gap-2">
                    <span className="text-gray-500 dark:text-gray-400 flex-shrink-0">Kota</span>
                    <span className="font-medium text-gray-900 dark:text-white text-right break-words">{ipInfo.city}</span>
                  </div>
                  <div className="flex justify-between text-sm gap-2">
                    <span className="text-gray-500 dark:text-gray-400 flex-shrink-0">Region</span>
                    <span className="font-medium text-gray-900 dark:text-white text-right break-words">{ipInfo.region}</span>
                  </div>
                  <div className="flex justify-between text-sm gap-2">
                    <span className="text-gray-500 dark:text-gray-400 flex-shrink-0">Benua</span>
                    <span className="font-medium text-gray-900 dark:text-white text-right break-words">{ipInfo.continent}</span>
                  </div>
                  <div className="flex justify-between text-sm gap-2">
                    <span className="text-gray-500 dark:text-gray-400 flex-shrink-0">ZIP</span>
                    <span className="font-medium text-gray-900 dark:text-white">{ipInfo.postal}</span>
                  </div>
                  <div className="flex justify-between text-sm gap-2">
                    <span className="text-gray-500 dark:text-gray-400 flex-shrink-0">EU Member</span>
                    <span className="font-medium text-gray-900 dark:text-white">{ipInfo.is_eu ? '✅ Ya' : '❌ Tidak'}</span>
                  </div>
                </div>
              </div>

              {/* Jaringan */}
              <div className="p-4 glass rounded-xl overflow-hidden">
                <div className="flex items-center gap-2 mb-3">
                  <Database className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Jaringan</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row justify-between text-sm gap-1">
                    <span className="text-gray-500 dark:text-gray-400 flex-shrink-0">ISP</span>
                    <span className="font-medium text-gray-900 dark:text-white text-right break-words">{ipInfo.isp}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between text-sm gap-1">
                    <span className="text-gray-500 dark:text-gray-400 flex-shrink-0">Organisasi</span>
                    <span className="font-medium text-gray-900 dark:text-white text-right break-words">{ipInfo.org}</span>
                  </div>
                  <div className="flex justify-between text-sm gap-2">
                    <span className="text-gray-500 dark:text-gray-400 flex-shrink-0">Timezone</span>
                    <span className="font-medium text-gray-900 dark:text-white text-right break-words">{ipInfo.timezone}</span>
                  </div>
                  <div className="flex justify-between text-sm gap-2">
                    <span className="text-gray-500 dark:text-gray-400 flex-shrink-0">Calling Code</span>
                    <span className="font-medium text-gray-900 dark:text-white">+{ipInfo.calling_code}</span>
                  </div>
                  <div className="flex justify-between text-sm gap-2">
                    <span className="text-gray-500 dark:text-gray-400 flex-shrink-0">Mata Uang</span>
                    <span className="font-medium text-gray-900 dark:text-white text-right break-words">{ipInfo.currency}</span>
                  </div>
                  <div className="flex justify-between text-sm gap-2">
                    <span className="text-gray-500 dark:text-gray-400 flex-shrink-0">Koordinat</span>
                    <span className="font-medium text-gray-900 dark:text-white text-right break-words">{ipInfo.latitude}, {ipInfo.longitude}</span>
                  </div>
                  <div className="flex justify-between text-sm gap-2">
                    <span className="text-gray-500 dark:text-gray-400 flex-shrink-0">Connection Type</span>
                    <span className="font-medium text-gray-900 dark:text-white">{ipInfo.connection_type}</span>
                  </div>
                </div>
              </div>

              {/* Privasi & Keamanan */}
              <div className="p-4 glass rounded-xl overflow-hidden">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Privasi & Keamanan</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm gap-2">
                    <span className="text-gray-500 dark:text-gray-400 flex-shrink-0">Proxy</span>
                    <span className={`font-medium ${ipInfo.is_proxy ? 'text-red-500' : 'text-green-500'}`}>
                      {ipInfo.is_proxy ? '⚠️ Terdeteksi' : '✅ Aman'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm gap-2">
                    <span className="text-gray-500 dark:text-gray-400 flex-shrink-0">VPN</span>
                    <span className={`font-medium ${ipInfo.is_vpn ? 'text-red-500' : 'text-green-500'}`}>
                      {ipInfo.is_vpn ? '⚠️ Terdeteksi' : '✅ Aman'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm gap-2">
                    <span className="text-gray-500 dark:text-gray-400 flex-shrink-0">Tor</span>
                    <span className={`font-medium ${ipInfo.is_tor ? 'text-red-500' : 'text-green-500'}`}>
                      {ipInfo.is_tor ? '⚠️ Terdeteksi' : '✅ Aman'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm gap-2">
                    <span className="text-gray-500 dark:text-gray-400 flex-shrink-0">Hosting</span>
                    <span className={`font-medium ${ipInfo.is_hosting ? 'text-yellow-500' : 'text-green-500'}`}>
                      {ipInfo.is_hosting ? '🔄 Hosting' : '✅ Personal'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Perangkat - Grid 4 Kolom */}
            {deviceInfo && (
              <div className="p-4 glass rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <Monitor className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Informasi Perangkat</h4>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-center min-w-0">
                    <p className="text-xs text-gray-400">Perangkat</p>
                    <p className="text-sm font-medium truncate">{deviceInfo.device}</p>
                  </div>
                  <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-center min-w-0">
                    <p className="text-xs text-gray-400">OS</p>
                    <p className="text-sm font-medium truncate">{deviceInfo.os}</p>
                  </div>
                  <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-center min-w-0">
                    <p className="text-xs text-gray-400">Browser</p>
                    <p className="text-sm font-medium truncate">{deviceInfo.browser}</p>
                  </div>
                  <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-center min-w-0">
                    <p className="text-xs text-gray-400">Resolusi</p>
                    <p className="text-sm font-medium truncate">{deviceInfo.screenResolution}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Tombol Aksi */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={copyAllInfo}
                className="btn-secondary flex items-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Tersalin!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Semua
                  </>
                )}
              </button>
              <button
                onClick={() => setShowMap(!showMap)}
                className="btn-secondary flex items-center gap-2"
              >
                {showMap ? (
                  <>
                    <EyeOff className="w-4 h-4" />
                    Sembunyikan Peta
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4" />
                    Tampilkan Peta
                  </>
                )}
              </button>
            </div>

            {/* Privacy Notice */}
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800/30">
              <div className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <h5 className="text-sm font-medium text-blue-700 dark:text-blue-300 break-words">
                    🔒 Privasi Terjaga
                  </h5>
                  <p className="text-sm text-blue-600 dark:text-blue-400 break-words">
                    Informasi IP dan perangkat Anda hanya diproses di browser. 
                    Data tidak disimpan, tidak dilacak, dan tidak dibagikan ke pihak ketiga.
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : null}

        {/* Footer */}
        <div className="p-3 bg-gray-100 dark:bg-gray-800/50 rounded-xl text-center text-xs text-gray-500 dark:text-gray-400 break-words">
          <p>
            {ipInfo?.is_proxy || ipInfo?.is_vpn || ipInfo?.is_tor ? '⚠️ IP ini terdeteksi menggunakan anonimizer' : '✅ IP Anda aman'}
          </p>
        </div>
      </div>
    </BaseTool>
  );
}