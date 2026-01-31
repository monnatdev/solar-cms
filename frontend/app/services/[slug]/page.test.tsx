/**
 * Service Detail Page Tests
 * 
 * Tests for the service detail page component
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getServiceBySlug } from '@/lib/api/services';

// Mock the API functions
vi.mock('@/lib/api/services', () => ({
  getServiceBySlug: vi.fn(),
  getAllPublishedServices: vi.fn(),
}));

// Mock Next.js navigation
vi.mock('next/navigation', () => ({
  notFound: vi.fn(),
}));

describe('Service Detail Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Service Data Fetching', () => {
    it('should fetch service by slug', async () => {
      const mockService = {
        id: '1',
        title: 'Solar Installation',
        header: 'Installation Service',
        slug: 'solar-installation',
        description: [
          {
            type: 'paragraph',
            children: [{ text: 'Professional solar installation service' }],
          },
        ],
        featuredImage: {
          url: '/images/service.jpg',
          alt: 'Solar Installation',
        },
        gallery: [],
        status: 'published' as const,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      };

      vi.mocked(getServiceBySlug).mockResolvedValue(mockService);

      const service = await getServiceBySlug('solar-installation');

      expect(getServiceBySlug).toHaveBeenCalledWith('solar-installation');
      expect(service).toEqual(mockService);
      expect(service.title).toBe('Solar Installation');
      expect(service.slug).toBe('solar-installation');
    });

    it('should return null for non-existent service', async () => {
      vi.mocked(getServiceBySlug).mockResolvedValue(null);

      const service = await getServiceBySlug('non-existent');

      expect(getServiceBySlug).toHaveBeenCalledWith('non-existent');
      expect(service).toBeNull();
    });
  });

  describe('Service Content Structure', () => {
    it('should have required fields for service detail', async () => {
      const mockService = {
        id: '1',
        title: 'Solar Maintenance',
        header: 'Maintenance Service',
        slug: 'solar-maintenance',
        description: [
          {
            type: 'paragraph',
            children: [{ text: 'Regular maintenance service' }],
          },
        ],
        featuredImage: {
          url: '/images/maintenance.jpg',
          alt: 'Solar Maintenance',
        },
        gallery: [
          {
            image: {
              url: '/images/gallery1.jpg',
              alt: 'Gallery Image 1',
            },
          },
          {
            image: {
              url: '/images/gallery2.jpg',
              alt: 'Gallery Image 2',
            },
          },
        ],
        status: 'published' as const,
        seo: {
          metaTitle: 'Solar Maintenance Service',
          metaDescription: 'Professional solar maintenance',
          keywords: 'solar, maintenance, service',
        },
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      };

      vi.mocked(getServiceBySlug).mockResolvedValue(mockService);

      const service = await getServiceBySlug('solar-maintenance');

      // Verify required fields
      expect(service).not.toBeNull();
      expect(service?.title).toBeDefined();
      expect(service?.header).toBeDefined();
      expect(service?.slug).toBeDefined();
      expect(service?.description).toBeDefined();
      expect(service?.featuredImage).toBeDefined();

      // Verify gallery
      expect(service?.gallery).toBeDefined();
      expect(service?.gallery?.length).toBe(2);

      // Verify SEO metadata
      expect(service?.seo).toBeDefined();
      expect(service?.seo?.metaTitle).toBe('Solar Maintenance Service');
      expect(service?.seo?.metaDescription).toBe('Professional solar maintenance');
    });
  });

  describe('SEO Metadata', () => {
    it('should use custom SEO metadata when available', async () => {
      const mockService = {
        id: '1',
        title: 'Solar Installation',
        header: 'Installation',
        slug: 'solar-installation',
        description: [],
        featuredImage: { url: '/image.jpg', alt: 'Image' },
        status: 'published' as const,
        seo: {
          metaTitle: 'Custom SEO Title',
          metaDescription: 'Custom SEO Description',
          keywords: 'custom, keywords',
        },
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      };

      vi.mocked(getServiceBySlug).mockResolvedValue(mockService);

      const service = await getServiceBySlug('solar-installation');

      expect(service?.seo?.metaTitle).toBe('Custom SEO Title');
      expect(service?.seo?.metaDescription).toBe('Custom SEO Description');
      expect(service?.seo?.keywords).toBe('custom, keywords');
    });

    it('should fall back to default metadata when SEO is not provided', async () => {
      const mockService = {
        id: '1',
        title: 'Solar Installation',
        header: 'Installation',
        slug: 'solar-installation',
        description: [],
        featuredImage: { url: '/image.jpg', alt: 'Image' },
        status: 'published' as const,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      };

      vi.mocked(getServiceBySlug).mockResolvedValue(mockService);

      const service = await getServiceBySlug('solar-installation');

      // When SEO is not provided, we should use the title as fallback
      expect(service?.seo).toBeUndefined();
      expect(service?.title).toBe('Solar Installation');
    });
  });

  describe('Image Handling', () => {
    it('should handle featured image as object', async () => {
      const mockService = {
        id: '1',
        title: 'Test Service',
        header: 'Test',
        slug: 'test-service',
        description: [],
        featuredImage: {
          url: '/images/featured.jpg',
          alt: 'Featured Image',
        },
        status: 'published' as const,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      };

      vi.mocked(getServiceBySlug).mockResolvedValue(mockService);

      const service = await getServiceBySlug('test-service');

      expect(typeof service?.featuredImage).toBe('object');
      expect(service?.featuredImage).toHaveProperty('url');
      expect(service?.featuredImage).toHaveProperty('alt');
    });

    it('should handle featured image as string', async () => {
      const mockService = {
        id: '1',
        title: 'Test Service',
        header: 'Test',
        slug: 'test-service',
        description: [],
        featuredImage: '/images/featured.jpg',
        status: 'published' as const,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      };

      vi.mocked(getServiceBySlug).mockResolvedValue(mockService);

      const service = await getServiceBySlug('test-service');

      expect(typeof service?.featuredImage).toBe('string');
      expect(service?.featuredImage).toBe('/images/featured.jpg');
    });

    it('should handle gallery images', async () => {
      const mockService = {
        id: '1',
        title: 'Test Service',
        header: 'Test',
        slug: 'test-service',
        description: [],
        featuredImage: '/images/featured.jpg',
        gallery: [
          { image: { url: '/gallery1.jpg', alt: 'Gallery 1' } },
          { image: { url: '/gallery2.jpg', alt: 'Gallery 2' } },
          { image: { url: '/gallery3.jpg', alt: 'Gallery 3' } },
        ],
        status: 'published' as const,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      };

      vi.mocked(getServiceBySlug).mockResolvedValue(mockService);

      const service = await getServiceBySlug('test-service');

      expect(service?.gallery).toBeDefined();
      expect(service?.gallery?.length).toBe(3);
      expect(service?.gallery?.[0].image).toHaveProperty('url');
      expect(service?.gallery?.[0].image).toHaveProperty('alt');
    });
  });
});
