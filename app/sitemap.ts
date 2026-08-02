import { MetadataRoute } from 'next';
import { toolsData } from '@/data/tools';

const baseUrl = 'https://hmztools.web.id';
const locales = ['id', 'en'];

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemap: MetadataRoute.Sitemap = [];

  // Homepage for each locale
  locales.forEach(locale => {
    sitemap.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    });
  });

  // Tool pages for each locale
  locales.forEach(locale => {
    toolsData.forEach(tool => {
      sitemap.push({
        url: `${baseUrl}/${locale}/${tool.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });
  });

  return sitemap;
}