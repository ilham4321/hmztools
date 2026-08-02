'use client';

import { ReactNode } from 'react';

interface ClientLayoutProps {
  children: ReactNode;
  params: { lang: string };
}

export function ClientLayout({ children, params }: ClientLayoutProps) {
  return (
    <main className="min-h-screen pt-16">
      {children}
    </main>
  );
}