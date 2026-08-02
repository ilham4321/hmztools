'use client';

import { ReactNode } from 'react';

interface BaseToolProps {
  title: string;
  description: string;
  article: string;
  children: ReactNode;
}

export function BaseTool({ title, description, article, children }: BaseToolProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gradient-blue mb-4">
          {title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          {description}
        </p>
      </div>

      <div className="card-glass mb-12">
        {children}
      </div>

      <div className="prose prose-indigo dark:prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ __html: article }} />
      </div>
    </div>
  );
}