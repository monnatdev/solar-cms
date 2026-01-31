/**
 * Sitemap generation for Solar Cell CMS
 * Automatically generates sitemap.xml from articles, services, and reviews
 * 
 * Requirements: 15.3
 */

import { MetadataRoute } from 'next';
import { getAllPublishedArticles } from '@/lib/api/articles';
import { getAllPublishedServices } from '@/lib/api/services';
import { getAllPublishedReviews } from '@/lib/api/reviews';

/**
 * Generate sitemap entries for all published content
 * This function is called by Next.js to generate sitemap.xml
 * 
 * @returns Array of sitemap entries
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get base URL from environment variable
  // Should be set via environment variable in production
  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  try {
    // Fetch all published content from Payload CMS
    const [articles, services, reviews] = await Promise.all([
      getAllPublishedArticles(),
      getAllPublishedServices(),
      getAllPublishedReviews(),
    ]);

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
      {
        url: BASE_URL,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
      },
      {
        url: `${BASE_URL}/services`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      },
      {
        url: `${BASE_URL}/reviews`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      },
      {
        url: `${BASE_URL}/articles`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
      },
    ];

    // Article pages
    const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
      url: `${BASE_URL}/articles/${article.slug}`,
      lastModified: new Date(article.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    // Service pages
    const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
      url: `${BASE_URL}/services/${service.slug}`,
      lastModified: new Date(service.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    }));

    // Reviews don't have individual pages, so we don't include them in sitemap
    // They are displayed on the /reviews page which is already included

    // Combine all pages
    return [...staticPages, ...servicePages, ...articlePages];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    
    // Return at least static pages if content fetching fails
    return [
      {
        url: BASE_URL,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
      },
      {
        url: `${BASE_URL}/services`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      },
      {
        url: `${BASE_URL}/reviews`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      },
      {
        url: `${BASE_URL}/articles`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
      },
    ];
  }
}
