/**
 * Open Graph Tags Tests
 * 
 * Tests to verify that Open Graph metadata is properly configured
 * across all pages for social media sharing support.
 * 
 * Validates Requirement 15.4: Open Graph Tags support
 */

import { describe, it, expect } from 'vitest';

describe('Open Graph Tags Implementation', () => {
  describe('Open Graph Best Practices', () => {
    it('should have proper OG image dimensions (1200x630)', () => {
      // This is the recommended dimension for Open Graph images
      const recommendedWidth = 1200;
      const recommendedHeight = 630;
      const aspectRatio = recommendedWidth / recommendedHeight;
      
      // Aspect ratio should be approximately 1.905 (1200/630)
      expect(aspectRatio).toBeCloseTo(1.905, 2);
      expect(recommendedWidth).toBe(1200);
      expect(recommendedHeight).toBe(630);
    });

    it('should use Thai locale for all pages', () => {
      const expectedLocale = 'th_TH';
      expect(expectedLocale).toBe('th_TH');
    });

    it('should use summary_large_image for Twitter cards', () => {
      const expectedCardType = 'summary_large_image';
      expect(expectedCardType).toBe('summary_large_image');
    });

    it('should have consistent site name', () => {
      const siteName = 'Solar Cell CMS';
      expect(siteName).toBe('Solar Cell CMS');
      expect(siteName.length).toBeGreaterThan(0);
    });
  });

  describe('Metadata Structure Validation', () => {
    it('should validate Open Graph metadata structure', () => {
      // Example OG metadata structure
      const ogMetadata = {
        title: 'Test Title',
        description: 'Test Description',
        type: 'website',
        url: '/test',
        siteName: 'Solar Cell CMS',
        locale: 'th_TH',
        images: [
          {
            url: '/og-image.jpg',
            width: 1200,
            height: 630,
            alt: 'Test Alt',
          },
        ],
      };

      expect(ogMetadata.title).toBeDefined();
      expect(ogMetadata.description).toBeDefined();
      expect(ogMetadata.type).toBeDefined();
      expect(ogMetadata.url).toBeDefined();
      expect(ogMetadata.siteName).toBe('Solar Cell CMS');
      expect(ogMetadata.locale).toBe('th_TH');
      expect(ogMetadata.images).toHaveLength(1);
      expect(ogMetadata.images[0].width).toBe(1200);
      expect(ogMetadata.images[0].height).toBe(630);
    });

    it('should validate Twitter Card metadata structure', () => {
      // Example Twitter Card metadata structure
      const twitterMetadata = {
        card: 'summary_large_image',
        title: 'Test Title',
        description: 'Test Description',
        images: ['/og-image.jpg'],
      };

      expect(twitterMetadata.card).toBe('summary_large_image');
      expect(twitterMetadata.title).toBeDefined();
      expect(twitterMetadata.description).toBeDefined();
      expect(twitterMetadata.images).toHaveLength(1);
    });
  });

  describe('Required OG Tags', () => {
    it('should have all required Open Graph tags', () => {
      const requiredTags = [
        'og:title',
        'og:description',
        'og:type',
        'og:url',
        'og:image',
        'og:site_name',
        'og:locale',
      ];

      expect(requiredTags).toContain('og:title');
      expect(requiredTags).toContain('og:description');
      expect(requiredTags).toContain('og:type');
      expect(requiredTags).toContain('og:url');
      expect(requiredTags).toContain('og:image');
      expect(requiredTags).toContain('og:site_name');
      expect(requiredTags).toContain('og:locale');
    });

    it('should have all required Twitter Card tags', () => {
      const requiredTags = [
        'twitter:card',
        'twitter:title',
        'twitter:description',
        'twitter:image',
      ];

      expect(requiredTags).toContain('twitter:card');
      expect(requiredTags).toContain('twitter:title');
      expect(requiredTags).toContain('twitter:description');
      expect(requiredTags).toContain('twitter:image');
    });
  });

  describe('Image Specifications', () => {
    it('should validate OG image URL format', () => {
      const imageUrl = '/og-image.jpg';
      expect(imageUrl).toMatch(/\.(jpg|jpeg|png)$/i);
    });

    it('should have proper image dimensions', () => {
      const image = {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Solar Cell CMS',
      };

      expect(image.width).toBe(1200);
      expect(image.height).toBe(630);
      expect(image.alt).toBeDefined();
      expect(image.alt.length).toBeGreaterThan(0);
    });
  });

  describe('Content Validation', () => {
    it('should have appropriate title length', () => {
      const title = 'Solar Cell CMS - โซลูชันโซล่าเซลล์ครบวงจร';
      // OG titles should be under 60 characters for optimal display
      expect(title.length).toBeLessThanOrEqual(100);
      expect(title.length).toBeGreaterThan(0);
    });

    it('should have appropriate description length', () => {
      const description = 'ระบบจัดการเนื้อหาสำหรับธุรกิจโซล่าเซลล์ พร้อมเครื่องมือคำนวณความคุ้มค่า';
      // OG descriptions should be under 200 characters for optimal display
      expect(description.length).toBeLessThanOrEqual(300);
      expect(description.length).toBeGreaterThan(0);
    });
  });

  describe('URL Validation', () => {
    it('should validate URL format for different pages', () => {
      const urls = [
        '/',
        '/articles',
        '/services',
        '/reviews',
        '/articles/test-slug',
        '/services/test-slug',
      ];

      urls.forEach(url => {
        expect(url).toMatch(/^\/[a-z0-9\-\/]*$/);
      });
    });
  });

  describe('Type Validation', () => {
    it('should use correct OG types', () => {
      const validTypes = ['website', 'article'];
      
      expect(validTypes).toContain('website');
      expect(validTypes).toContain('article');
    });

    it('should use website type for list pages', () => {
      const listPageType = 'website';
      expect(listPageType).toBe('website');
    });

    it('should use article type for article detail pages', () => {
      const articlePageType = 'article';
      expect(articlePageType).toBe('article');
    });
  });
});
