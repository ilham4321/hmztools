'use client';

import { useState, useEffect } from 'react';
import { X, AlertTriangle } from 'lucide-react';

interface TopNotificationProps {
  message: string;
  type?: 'info' | 'warning' | 'success' | 'error';
  duration?: number;
  onClose?: () => void;
}

export function TopNotification({ 
  message, 
  type = 'info', 
  duration = 8000,
  onClose 
}: TopNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Cek apakah user sudah dismiss
    const dismissed = localStorage.getItem('hmztools_dev_notification_dismissed');
    if (dismissed !== 'true') {
      // Tampilkan setelah 1 detik
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);

      // Auto hide setelah duration
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, duration);

      return () => {
        clearTimeout(timer);
        clearTimeout(hideTimer);
      };
    }
  }, [duration]);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('hmztools_dev_notification_dismissed', 'true');
    if (onClose) onClose();
  };

  if (!isVisible) return null;

  const getTypeStyles = () => {
    switch(type) {
      case 'warning':
        return 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400';
      case 'error':
        return 'bg-red-500/10 border-red-500/30 text-red-400';
      case 'success':
        return 'bg-green-500/10 border-green-500/30 text-green-400';
      default:
        return 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400';
    }
  };

  const getIcon = () => {
    switch(type) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0" />;
      case 'error':
        return <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-indigo-400 flex-shrink-0" />;
    }
  };

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-2xl animate-slide-down">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-sm shadow-lg ${getTypeStyles()}`}>
        {getIcon()}
        <p className="text-sm flex-1">{message}</p>
        <button
          onClick={handleClose}
          className="p-1 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}