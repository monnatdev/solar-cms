/**
 * Unit tests for sitemap generation
 * Tests that sitemap includes all published content
 * 
 * Requirements: 15.3
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import sitemap from './sitemap';
import * as articlesApi from '@/lib/api/articles';
import * as servicesApi from '@/lib/api/services';
import * as reviewsApi from '@/lib/api/reviews';

// Mock the API modules
vi.mock('@/lib/api/articles');
vi.mock('@/lib/api/services');
vi.mock('@/lib/api/reviews');

describe('sitemap', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Set environment variable for tests
    process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com';
  });

  it('should include static pages', async () => {
    // Mock empty content
    vi.mocked(articlesApi.getAllPublishedArticles).mockResolvedValue([]);
    vi.mocked(servicesApi.getAllPublishedServices).mockResolvedValue([]);
    vi.mocked(reviewsApi.getAllPublishedReviews).mockResolvedValue([]);

    const result = await sitemap();

    // Check that static pages are included
    const urls = result.map((entry) => entry.url);
    expect(urls).toContain('https://example.com');
    expect(urls).toContain('https://example.com/services');
    expect(urls).toContain('https://example.com/reviews');
    expect(urls).toContain('https://example.com/articles');
  });

  it('should include all published articles', async () => {
    const mockArticles = [
      {
        id: '1',
        title: 'Article 1',
        slug: 'article-1',
        header: 'Header 1',
        excerpt: 'Excerpt 1',
        content: {},
        featuredImage: { id: 'img1', url: '/img1.jpg', alt: 'Image 1' },
        publishedDate: '2024-01-01',
        status: 'published' as const,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-02T00:00:00Z',
      },
      {
        id: '2',
        title: 'Article 2',
        slug: 'article-2',
        header: 'Header 2',
        excerpt: 'Excerpt 2',
        content: {},
        featuredImage: { id: 'img2', url: '/img2.jpg', alt: 'Image 2' },
        publishedDate: '2024-01-03',
        status: 'published' as const,
        createdAt: '2024-01-03T00:00:00Z',
        updatedAt: '2024-01-04T00:00:00Z',
      },
    ];

    vi.mocked(articlesApi.getAllPublishedArticles).mockResolvedValue(mockArticles);
    vi.mocked(servicesApi.getAllPublishedServices).mockResolvedValue([]);
    vi.mocked(reviewsApi.getAllPublishedReviews).mockResolvedValue([]);

    const result = await sitemap();

    // Check that article pages are included
    const urls = result.map((entry) => entry.url);
    expect(urls).toContain('https://example.com/articles/article-1');
    expect(urls).toContain('https://example.com/articles/article-2');
  });

  it('should include all published services', async () => {
    const mockServices = [
      {
        id: '1',
        title: 'Service 1',
        slug: 'service-1',
        header: 'Header 1',
        description: {},
        featuredImage: { id: 'img1', url: '/img1.jpg', alt: 'Image 1' },
        status: 'published' as const,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-02T00:00:00Z',
      },
      {
        id: '2',
        title: 'Service 2',
        slug: 'service-2',
        header: 'Header 2',
        description: {},
        featuredImage: { id: 'img2', url: '/img2.jpg', alt: 'Image 2' },
        status: 'published' as const,
        createdAt: '2024-01-03T00:00:00Z',
        updatedAt: '2024-01-04T00:00:00Z',
      },
    ];

    vi.mocked(articlesApi.getAllPublishedArticles).mockResolvedValue([]);
    vi.mocked(servicesApi.getAllPublishedServices).mockResolvedValue(mockServices);
    vi.mocked(reviewsApi.getAllPublishedReviews).mockResolvedValue([]);

    const result = await sitemap();

    // Check that service pages are included
    const urls = result.map((entry) => entry.url);
    expect(urls).toContain('https://example.com/services/service-1');
    expect(urls).toContain('https://example.com/services/service-2');
  });

  it('should include all content types together', async () => {
    const mockArticles = [
      {
        id: '1',
        title: 'Article 1',
        slug: 'article-1',
        header: 'Header 1',
        excerpt: 'Excerpt 1',
        content: {},
        featuredImage: { id: 'img1', url: '/img1.jpg', alt: 'Image 1' },
        publishedDate: '2024-01-01',
        status: 'published' as const,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-02T00:00:00Z',
      },
    ];

    const mockServices = [
      {
        id: '1',
        title: 'Service 1',
        slug: 'service-1',
        header: 'Header 1',
        description: {},
        featuredImage: { id: 'img1', url: '/img1.jpg', alt: 'Image 1' },
        status: 'published' as const,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-02T00:00:00Z',
      },
    ];

    vi.mocked(articlesApi.getAllPublishedArticles).mockResolvedValue(mockArticles);
    vi.mocked(servicesApi.getAllPublishedServices).mockResolvedValue(mockServices);
    vi.mocked(reviewsApi.getAllPublishedReviews).mockResolvedValue([]);

    const result = await sitemap();

    // Check total count: 4 static pages + 1 article + 1 service = 6
    expect(result.length).toBe(6);

    const urls = result.map((entry) => entry.url);
    expect(urls).toContain('https://example.com/articles/article-1');
    expect(urls).toContain('https://example.com/services/service-1');
  });

  it('should use correct lastModified dates from content', async () => {
    const mockArticles = [
      {
        id: '1',
        title: 'Article 1',
        slug: 'article-1',
        header: 'Header 1',
        excerpt: 'Excerpt 1',
        content: {},
        featuredImage: { id: 'img1', url: '/img1.jpg', alt: 'Image 1' },
        publishedDate: '2024-01-01',
        status: 'published' as const,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-15T10:30:00Z',
      },
    ];

    vi.mocked(articlesApi.getAllPublishedArticles).mockResolvedValue(mockArticles);
    vi.mocked(servicesApi.getAllPublishedServices).mockResolvedValue([]);
    vi.mocked(reviewsApi.getAllPublishedReviews).mockResolvedValue([]);

    const result = await sitemap();

    const articleEntry = result.find((entry) => entry.url === 'https://example.com/articles/article-1');
    expect(articleEntry).toBeDefined();
    expect(articleEntry?.lastModified).toEqual(new Date('2024-01-15T10:30:00Z'));
  });

  it('should set correct priorities for different page types', async () => {
    vi.mocked(articlesApi.getAllPublishedArticles).mockResolvedValue([]);
    vi.mocked(servicesApi.getAllPublishedServices).mockResolvedValue([]);
    vi.mocked(reviewsApi.getAllPublishedReviews).mockResolvedValue([]);

    const result = await sitemap();

    const homeEntry = result.find((entry) => entry.url === 'https://example.com');
    const servicesEntry = result.find((entry) => entry.url === 'https://example.com/services');
    const reviewsEntry = result.find((entry) => entry.url === 'https://example.com/reviews');
    const articlesEntry = result.find((entry) => entry.url === 'https://example.com/articles');

    expect(homeEntry?.priority).toBe(1.0);
    expect(servicesEntry?.priority).toBe(0.9);
    expect(reviewsEntry?.priority).toBe(0.8);
    expect(articlesEntry?.priority).toBe(0.8);
  });

  it('should handle API errors gracefully and return static pages', async () => {
    // Mock API errors
    vi.mocked(articlesApi.getAllPublishedArticles).mockRejectedValue(new Error('API Error'));
    vi.mocked(servicesApi.getAllPublishedServices).mockRejectedValue(new Error('API Error'));
    vi.mocked(reviewsApi.getAllPublishedReviews).mockRejectedValue(new Error('API Error'));

    const result = await sitemap();

    // Should still return static pages
    expect(result.length).toBe(4);
    const urls = result.map((entry) => entry.url);
    expect(urls).toContain('https://example.com');
    expect(urls).toContain('https://example.com/services');
    expect(urls).toContain('https://example.com/reviews');
    expect(urls).toContain('https://example.com/articles');
  });

  it('should use fallback URL when NEXT_PUBLIC_SITE_URL is not set', async () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;

    vi.mocked(articlesApi.getAllPublishedArticles).mockResolvedValue([]);
    vi.mocked(servicesApi.getAllPublishedServices).mockResolvedValue([]);
    vi.mocked(reviewsApi.getAllPublishedReviews).mockResolvedValue([]);

    const result = await sitemap();

    const urls = result.map((entry) => entry.url);
    expect(urls).toContain('http://localhost:3000');
    expect(urls).toContain('http://localhost:3000/services');
  });
});
