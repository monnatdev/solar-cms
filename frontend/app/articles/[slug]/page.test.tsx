/**
 * Article Detail Page Tests
 * 
 * Tests for the Article Detail Page component including:
 * - Rendering article content
 * - SEO metadata generation
 * - Semantic HTML structure
 * - 404 handling
 * 
 * Validates Requirements: 5.1, 5.2, 5.4, 5.5
 */

import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { notFound } from 'next/navigation';
import ArticleDetailPage, { generateMetadata, generateStaticParams } from './page';
import { getArticleBySlug, getAllPublishedArticles } from '@/lib/api/articles';
import { Article } from '@/types/article';

// Mock dependencies
vi.mock('next/navigation', () => ({
  notFound: vi.fn(),
}));

vi.mock('@/lib/api/articles', () => ({
  getArticleBySlug: vi.fn(),
  getAllPublishedArticles: vi.fn(),
}));

vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

vi.mock('@/components/services/RichTextRenderer', () => ({
  __esModule: true,
  default: ({ content }: any) => <div data-testid="rich-text-content">{JSON.stringify(content)}</div>,
}));

// Mock article data
const mockArticle: Article = {
  id: '1',
  title: 'ประโยชน์ของโซล่าเซลล์',
  header: 'บทความ',
  slug: 'benefits-of-solar-cells',
  excerpt: 'เรียนรู้เกี่ยวกับประโยชน์ของการติดตั้งโซล่าเซลล์',
  content: [
    {
      type: 'paragraph',
      children: [{ text: 'โซล่าเซลล์เป็นแหล่งพลังงานสะอาด' }],
    },
  ],
  featuredImage: {
    id: 'img1',
    url: 'https://example.com/image.jpg',
    alt: 'Solar panels',
    filename: 'image.jpg',
    mimeType: 'image/jpeg',
    filesize: 100000,
    width: 1200,
    height: 800,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  publishedDate: '2024-01-15T00:00:00.000Z',
  status: 'published',
  seo: {
    metaTitle: 'ประโยชน์ของโซล่าเซลล์ - คู่มือฉบับสมบูรณ์',
    metaDescription: 'ค้นพบประโยชน์ทั้งหมดของการติดตั้งโซล่าเซลล์',
    keywords: 'โซล่าเซลล์, พลังงานแสงอาทิตย์, ประหยัดพลังงาน',
  },
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
};

describe('ArticleDetailPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render article with title and content', async () => {
      vi.mocked(getArticleBySlug).mockResolvedValue(mockArticle);

      const page = await ArticleDetailPage({
        params: { slug: 'benefits-of-solar-cells' },
      });

      render(page as React.ReactElement);

      // Check title (use heading role to be specific)
      expect(screen.getByRole('heading', { level: 1, name: 'ประโยชน์ของโซล่าเซลล์' })).toBeInTheDocument();

      // Check excerpt
      expect(screen.getByText('เรียนรู้เกี่ยวกับประโยชน์ของการติดตั้งโซล่าเซลล์')).toBeInTheDocument();

      // Check published date (Thai format)
      expect(screen.getByText(/15 มกราคม 2567/)).toBeInTheDocument();

      // Check that content section exists (either loading state or actual content)
      // Since RichTextRenderer is dynamically loaded, we check for the section container
      const contentSection = screen.getByRole('article').querySelector('section');
      expect(contentSection).toBeInTheDocument();
    });

    it('should render featured image with correct attributes', async () => {
      vi.mocked(getArticleBySlug).mockResolvedValue(mockArticle);

      const page = await ArticleDetailPage({
        params: { slug: 'benefits-of-solar-cells' },
      });

      render(page as React.ReactElement);

      const images = screen.getAllByRole('img');
      const featuredImage = images.find(img => 
        img.getAttribute('src')?.includes('image.jpg')
      );

      expect(featuredImage).toBeInTheDocument();
      expect(featuredImage).toHaveAttribute('alt', 'Solar panels');
    });

    it('should render breadcrumb navigation', async () => {
      vi.mocked(getArticleBySlug).mockResolvedValue(mockArticle);

      const page = await ArticleDetailPage({
        params: { slug: 'benefits-of-solar-cells' },
      });

      render(page as React.ReactElement);

      // Check breadcrumb links - use getAllByRole and filter
      const links = screen.getAllByRole('link');
      const homeLink = links.find(link => link.textContent === 'หน้าแรก');
      expect(homeLink).toHaveAttribute('href', '/');

      const articlesLink = links.find(link => link.textContent === 'บทความ' && link.getAttribute('href') === '/articles');
      expect(articlesLink).toHaveAttribute('href', '/articles');
    });

    it('should render call-to-action section', async () => {
      vi.mocked(getArticleBySlug).mockResolvedValue(mockArticle);

      const page = await ArticleDetailPage({
        params: { slug: 'benefits-of-solar-cells' },
      });

      render(page as React.ReactElement);

      expect(screen.getByText(/สนใจติดตั้งโซล่าเซลล์/i)).toBeInTheDocument();
      
      // Use getAllByRole and filter for specific links
      const links = screen.getAllByRole('link');
      const contactLink = links.find(link => link.textContent === 'ติดต่อเรา');
      expect(contactLink).toBeInTheDocument();
      
      const servicesLink = links.find(link => link.textContent === 'ดูบริการของเรา');
      expect(servicesLink).toBeInTheDocument();
    });
  });

  describe('Semantic HTML', () => {
    it('should use semantic article element for main content', async () => {
      vi.mocked(getArticleBySlug).mockResolvedValue(mockArticle);

      const page = await ArticleDetailPage({
        params: { slug: 'benefits-of-solar-cells' },
      });

      const { container } = render(page as React.ReactElement);

      // Check for article element
      const article = container.querySelector('article');
      expect(article).toBeInTheDocument();
    });

    it('should use semantic header element', async () => {
      vi.mocked(getArticleBySlug).mockResolvedValue(mockArticle);

      const page = await ArticleDetailPage({
        params: { slug: 'benefits-of-solar-cells' },
      });

      const { container } = render(page as React.ReactElement);

      // Check for header element within article
      const article = container.querySelector('article');
      const header = article?.querySelector('header');
      expect(header).toBeInTheDocument();
    });

    it('should use semantic section elements', async () => {
      vi.mocked(getArticleBySlug).mockResolvedValue(mockArticle);

      const page = await ArticleDetailPage({
        params: { slug: 'benefits-of-solar-cells' },
      });

      const { container } = render(page as React.ReactElement);

      // Check for section elements
      const sections = container.querySelectorAll('section');
      expect(sections.length).toBeGreaterThan(0);
    });

    it('should use semantic time element for published date', async () => {
      vi.mocked(getArticleBySlug).mockResolvedValue(mockArticle);

      const page = await ArticleDetailPage({
        params: { slug: 'benefits-of-solar-cells' },
      });

      const { container } = render(page as React.ReactElement);

      // Check for time element with datetime attribute
      const timeElement = container.querySelector('time');
      expect(timeElement).toBeInTheDocument();
      expect(timeElement).toHaveAttribute('dateTime', '2024-01-15T00:00:00.000Z');
    });
  });

  describe('404 Handling', () => {
    it('should call notFound when article does not exist', async () => {
      vi.mocked(getArticleBySlug).mockResolvedValue(null);
      
      // Mock notFound to throw an error to stop execution
      vi.mocked(notFound).mockImplementation(() => {
        throw new Error('NEXT_NOT_FOUND');
      });

      await expect(async () => {
        await ArticleDetailPage({
          params: { slug: 'non-existent-article' },
        });
      }).rejects.toThrow('NEXT_NOT_FOUND');

      expect(notFound).toHaveBeenCalled();
    });
  });
});

describe('generateMetadata', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should generate metadata with custom SEO fields', async () => {
    vi.mocked(getArticleBySlug).mockResolvedValue(mockArticle);

    const metadata = await generateMetadata({
      params: { slug: 'benefits-of-solar-cells' },
    });

    expect(metadata.title).toBe('ประโยชน์ของโซล่าเซลล์ - คู่มือฉบับสมบูรณ์');
    expect(metadata.description).toBe('ค้นพบประโยชน์ทั้งหมดของการติดตั้งโซล่าเซลล์');
    expect(metadata.keywords).toEqual(['โซล่าเซลล์', 'พลังงานแสงอาทิตย์', 'ประหยัดพลังงาน']);
  });

  it('should generate Open Graph metadata', async () => {
    vi.mocked(getArticleBySlug).mockResolvedValue(mockArticle);

    const metadata = await generateMetadata({
      params: { slug: 'benefits-of-solar-cells' },
    });

    expect(metadata.openGraph).toBeDefined();
    expect(metadata.openGraph?.title).toBe('ประโยชน์ของโซล่าเซลล์ - คู่มือฉบับสมบูรณ์');
    expect(metadata.openGraph?.description).toBe('ค้นพบประโยชน์ทั้งหมดของการติดตั้งโซล่าเซลล์');
    expect(metadata.openGraph?.type).toBe('article');
    expect(metadata.openGraph?.publishedTime).toBe('2024-01-15T00:00:00.000Z');
  });

  it('should handle article not found in metadata generation', async () => {
    vi.mocked(getArticleBySlug).mockResolvedValue(null);

    const metadata = await generateMetadata({
      params: { slug: 'non-existent' },
    });

    expect(metadata.title).toBe('ไม่พบบทความ');
    expect(metadata.description).toBe('ไม่พบบทความที่คุณกำลังค้นหา');
  });
});

describe('generateStaticParams', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should generate static params for all published articles', async () => {
    const mockArticles: Article[] = [
      { ...mockArticle, slug: 'article-1' },
      { ...mockArticle, slug: 'article-2' },
      { ...mockArticle, slug: 'article-3' },
    ];

    vi.mocked(getAllPublishedArticles).mockResolvedValue(mockArticles);

    const params = await generateStaticParams();

    expect(params).toEqual([
      { slug: 'article-1' },
      { slug: 'article-2' },
      { slug: 'article-3' },
    ]);
  });

  it('should return empty array on error', async () => {
    vi.mocked(getAllPublishedArticles).mockRejectedValue(new Error('API Error'));

    const params = await generateStaticParams();

    expect(params).toEqual([]);
  });
});
