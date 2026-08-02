'use client';

import { ReactNode } from 'react';
import { Share2, Bookmark, BookmarkCheck } from 'lucide-react';
import { useState, useEffect } from 'react';

interface BaseToolProps {
  title: string;
  description: string;
  article: string;
  children: ReactNode;
}

export function BaseTool({ title, description, article, children }: BaseToolProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('hmztools_bookmarks') || '[]');
    setIsBookmarked(bookmarks.includes(title));
  }, [title]);

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('hmztools_bookmarks') || '[]');
    if (isBookmarked) {
      const newBookmarks = bookmarks.filter((b: string) => b !== title);
      localStorage.setItem('hmztools_bookmarks', JSON.stringify(newBookmarks));
    } else {
      bookmarks.push(title);
      localStorage.setItem('hmztools_bookmarks', JSON.stringify(bookmarks));
    }
    setIsBookmarked(!isBookmarked);
  };

  const shareTool = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gradient-blue mb-3">
              {title}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {description}
            </p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={toggleBookmark}
              className="p-2 glass glass-hover rounded-lg transition-all"
              aria-label="Bookmark"
            >
              {isBookmarked ? (
                <BookmarkCheck className="w-5 h-5 text-indigo-500" />
              ) : (
                <Bookmark className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={shareTool}
              className="p-2 glass glass-hover rounded-lg transition-all"
              aria-label="Share"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
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