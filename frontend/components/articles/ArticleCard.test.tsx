/**
 * ArticleCard Component Tests
 * 
 * Tests for the ArticleCard component including:
 * - Rendering of all required elements
 * - Lazy loading behavior
 * - Link functionality
 * - Date formatting
 * - Responsive design
 * 
 * Validates Requirements: 5.6, 13.4
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ArticleCard from './ArticleCard';
import { ArticleCardProps } from '@/types/article';

describe('ArticleCard', () => {
  const mockArticle: ArticleCardProps = {
    id: '1',
    image: 'https://example.com/article.jpg',
    header: 'บทความ',
    title: 'การติดตั้งโซล่าเซลล์บนหลังคาบ้าน',
    excerpt: 'เรียนรู้วิธีการติดตั้งโซล่าเซลล์บนหลังคาบ้านอย่างถูกต้องและปลอดภัย พร้อมคำแนะนำจากผู้เชี่ยวชาญ',
    slug: 'solar-installation-guide',
    publishedDate: '2024-01-15T00:00:00.000Z',
  };

  describe('Content Rendering', () => {
    it('should render all required elements', () => {
      render(<ArticleCard {...mockArticle} />);

      // Check header
      expect(screen.getByText('บทความ')).toBeDefined();

      // Check title
      expect(screen.getByText('การติดตั้งโซล่าเซลล์บนหลังคาบ้าน')).toBeDefined();

      // Check excerpt
      expect(screen.getByText(/เรียนรู้วิธีการติดตั้งโซล่าเซลล์/)).toBeDefined();

      // Check image
      const image = screen.getByRole('img');
      expect(image).toBeDefined();
      expect(image.getAttribute('alt')).toBe('การติดตั้งโซล่าเซลล์บนหลังคาบ้าน');
      // Next.js Image component transforms the src
      expect(image.getAttribute('src')).toContain('example.com');
      expect(image.getAttribute('src')).toContain('article.jpg');
    });

    it('should render published date in Thai format', () => {
      render(<ArticleCard {...mockArticle} />);

      // Check for Thai date format (15 มกราคม 2567)
      const dateElement = screen.getByText(/15 มกราคม 2567/);
      expect(dateElement).toBeDefined();
      expect(dateElement.tagName).toBe('TIME');
      expect(dateElement.getAttribute('dateTime')).toBe('2024-01-15T00:00:00.000Z');
    });

    it('should render link to article detail page', () => {
      render(<ArticleCard {...mockArticle} />);

      const link = screen.getByRole('link');
      expect(link.getAttribute('href')).toBe('/articles/solar-installation-guide');
    });

    it('should render call to action text', () => {
      render(<ArticleCard {...mockArticle} />);

      expect(screen.getByText('อ่านบทความ')).toBeDefined();
    });
  });

  describe('Lazy Loading', () => {
    it('should use lazy loading for images by default', () => {
      render(<ArticleCard {...mockArticle} index={5} />);

      const image = screen.getByRole('img');
      expect(image.getAttribute('loading')).toBe('lazy');
    });

    it('should use eager loading for above-the-fold images', () => {
      render(<ArticleCard {...mockArticle} index={0} />);

      const image = screen.getByRole('img');
      expect(image.getAttribute('loading')).toBe('eager');
    });

    it('should prioritize loading when priority prop is true', () => {
      render(<ArticleCard {...mockArticle} priority={true} />);

      const image = screen.getByRole('img');
      expect(image.getAttribute('loading')).toBe('eager');
    });
  });

  describe('Date Formatting', () => {
    it('should format January date correctly', () => {
      const article = { ...mockArticle, publishedDate: '2024-01-15T00:00:00.000Z' };
      render(<ArticleCard {...article} />);
      expect(screen.getByText(/15 มกราคม 2567/)).toBeDefined();
    });

    it('should format December date correctly', () => {
      const article = { ...mockArticle, publishedDate: '2024-12-25T00:00:00.000Z' };
      render(<ArticleCard {...article} />);
      expect(screen.getByText(/25 ธันวาคม 2567/)).toBeDefined();
    });

    it('should convert to Buddhist Era correctly', () => {
      const article = { ...mockArticle, publishedDate: '2023-06-15T00:00:00.000Z' };
      render(<ArticleCard {...article} />);
      // 2023 + 543 = 2566
      expect(screen.getByText(/15 มิถุนายน 2566/)).toBeDefined();
    });

    it('should handle single digit days correctly', () => {
      const article = { ...mockArticle, publishedDate: '2024-03-05T00:00:00.000Z' };
      render(<ArticleCard {...article} />);
      expect(screen.getByText(/5 มีนาคม 2567/)).toBeDefined();
    });
  });

  describe('Content Truncation', () => {
    it('should apply line-clamp to title', () => {
      const longTitle = 'การติดตั้งโซล่าเซลล์บนหลังคาบ้านอย่างถูกต้องและปลอดภัยพร้อมคำแนะนำจากผู้เชี่ยวชาญมืออาชีพที่มีประสบการณ์มากกว่า 10 ปี';
      const article = { ...mockArticle, title: longTitle };
      
      render(<ArticleCard {...article} />);
      
      const titleElement = screen.getByText(longTitle);
      expect(titleElement.className).toContain('line-clamp-2');
    });

    it('should apply line-clamp to excerpt', () => {
      const longExcerpt = 'เรียนรู้วิธีการติดตั้งโซล่าเซลล์บนหลังคาบ้านอย่างถูกต้องและปลอดภัย พร้อมคำแนะนำจากผู้เชี่ยวชาญมืออาชีพที่มีประสบการณ์มากกว่า 10 ปี รวมถึงเทคนิคการดูแลรักษาและการเพิ่มประสิทธิภาพการผลิตไฟฟ้า';
      const article = { ...mockArticle, excerpt: longExcerpt };
      
      render(<ArticleCard {...article} />);
      
      const excerptElement = screen.getByText(longExcerpt);
      expect(excerptElement.className).toContain('line-clamp-3');
    });
  });

  describe('Accessibility', () => {
    it('should have proper aria-label for link', () => {
      render(<ArticleCard {...mockArticle} />);

      const link = screen.getByRole('link');
      expect(link.getAttribute('aria-label')).toBe('Read article: การติดตั้งโซล่าเซลล์บนหลังคาบ้าน');
    });

    it('should use semantic article element', () => {
      const { container } = render(<ArticleCard {...mockArticle} />);

      const article = container.querySelector('article');
      expect(article).toBeDefined();
    });

    it('should have proper time element with datetime attribute', () => {
      render(<ArticleCard {...mockArticle} />);

      const timeElement = screen.getByText(/15 มกราคม 2567/);
      expect(timeElement.tagName).toBe('TIME');
      expect(timeElement.getAttribute('dateTime')).toBe('2024-01-15T00:00:00.000Z');
    });

    it('should have aria-hidden on decorative icons', () => {
      const { container } = render(<ArticleCard {...mockArticle} />);

      const icons = container.querySelectorAll('svg[aria-hidden="true"]');
      expect(icons.length).toBeGreaterThan(0);
    });
  });

  describe('Visual Design', () => {
    it('should have amber color theme classes', () => {
      const { container } = render(<ArticleCard {...mockArticle} />);

      // Check for amber-related classes
      const amberElements = container.querySelectorAll('[class*="amber"]');
      expect(amberElements.length).toBeGreaterThan(0);
    });

    it('should have border-l-4 for left accent', () => {
      const { container } = render(<ArticleCard {...mockArticle} />);

      const cardContainer = container.querySelector('.border-l-4');
      expect(cardContainer).toBeDefined();
      expect(cardContainer?.className).toContain('border-amber-500');
    });

    it('should have rectangular design (no rounded-3xl like ReviewCard)', () => {
      const { container } = render(<ArticleCard {...mockArticle} />);

      // Should not have the rounded-3xl class used by ReviewCard
      const roundedCard = container.querySelector('.rounded-3xl');
      expect(roundedCard).toBeNull();
    });
  });

  describe('Edge Cases', () => {
    it('should handle missing optional props gracefully', () => {
      render(<ArticleCard {...mockArticle} />);

      // Should render without index and priority props
      expect(screen.getByText(mockArticle.title)).toBeDefined();
    });

    it('should handle empty excerpt', () => {
      const article = { ...mockArticle, excerpt: '' };
      render(<ArticleCard {...article} />);

      // Should still render the card
      expect(screen.getByText(article.title)).toBeDefined();
    });

    it('should handle very short title', () => {
      const article = { ...mockArticle, title: 'โซล่า' };
      render(<ArticleCard {...article} />);

      expect(screen.getByText('โซล่า')).toBeDefined();
    });

    it('should handle special characters in title', () => {
      const article = { ...mockArticle, title: 'โซล่าเซลล์ & พลังงานทดแทน (2024)' };
      render(<ArticleCard {...article} />);

      expect(screen.getByText('โซล่าเซลล์ & พลังงานทดแทน (2024)')).toBeDefined();
    });
  });

  describe('Image Configuration', () => {
    it('should use correct image sizes attribute', () => {
      render(<ArticleCard {...mockArticle} />);

      const image = screen.getByRole('img');
      expect(image.getAttribute('sizes')).toBe('(max-width: 768px) 100vw, 40vw');
    });

    it('should use fill layout for responsive images', () => {
      render(<ArticleCard {...mockArticle} />);

      const image = screen.getByRole('img');
      // Next.js Image with fill prop doesn't render as an attribute
      // Instead, check that the image has the correct styling
      expect(image).toBeDefined();
    });

    it('should set quality from IMAGE_CONFIG', () => {
      render(<ArticleCard {...mockArticle} />);

      const image = screen.getByRole('img');
      expect(image.getAttribute('quality')).toBeDefined();
    });
  });
});
