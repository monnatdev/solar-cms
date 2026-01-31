/**
 * Tests for Articles List Page
 * 
 * Validates Requirements: 5.3
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ArticlesPage from './page';
import { getAllPublishedArticles } from '@/lib/api/articles';
import { Article } from '@/types/article';

// Mock the API function
vi.mock('@/lib/api/articles', () => ({
  getAllPublishedArticles: vi.fn(),
}));

// Mock Next.js Image component
vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

describe('ArticlesPage', () => {
  const mockArticles: Article[] = [
    {
      id: '1',
      title: 'ประโยชน์ของโซล่าเซลล์',
      header: 'ความรู้ทั่วไป',
      slug: 'benefits-of-solar-cells',
      excerpt: 'เรียนรู้เกี่ยวกับประโยชน์ของการใช้พลังงานแสงอาทิตย์',
      content: [
        {
          type: 'paragraph',
          children: [{ text: 'เนื้อหาบทความ' }],
        },
      ],
      featuredImage: {
        id: 'img1',
        url: '/images/article1.jpg',
        alt: 'Article 1',
        filename: 'article1.jpg',
        mimeType: 'image/jpeg',
        filesize: 100000,
        width: 800,
        height: 600,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
      publishedDate: '2024-01-15T00:00:00.000Z',
      status: 'published',
      seo: {
        metaTitle: 'ประโยชน์ของโซล่าเซลล์',
        metaDescription: 'เรียนรู้เกี่ยวกับประโยชน์ของการใช้พลังงานแสงอาทิตย์',
        keywords: 'โซล่าเซลล์, ประโยชน์',
      },
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
    },
    {
      id: '2',
      title: 'วิธีเลือกโซล่าเซลล์ที่เหมาะสม',
      header: 'คู่มือการเลือกซื้อ',
      slug: 'how-to-choose-solar-panels',
      excerpt: 'คำแนะนำในการเลือกซื้อแผงโซล่าเซลล์ที่เหมาะกับความต้องการ',
      content: [
        {
          type: 'paragraph',
          children: [{ text: 'เนื้อหาบทความ' }],
        },
      ],
      featuredImage: {
        id: 'img2',
        url: '/images/article2.jpg',
        alt: 'Article 2',
        filename: 'article2.jpg',
        mimeType: 'image/jpeg',
        filesize: 100000,
        width: 800,
        height: 600,
        createdAt: '2024-01-02T00:00:00.000Z',
        updatedAt: '2024-01-02T00:00:00.000Z',
      },
      publishedDate: '2024-01-20T00:00:00.000Z',
      status: 'published',
      seo: {
        metaTitle: 'วิธีเลือกโซล่าเซลล์',
        metaDescription: 'คำแนะนำในการเลือกซื้อแผงโซล่าเซลล์',
        keywords: 'โซล่าเซลล์, คู่มือ',
      },
      createdAt: '2024-01-02T00:00:00.000Z',
      updatedAt: '2024-01-02T00:00:00.000Z',
    },
    {
      id: '3',
      title: 'การบำรุงรักษาระบบโซล่าเซลล์',
      header: 'การดูแลรักษา',
      slug: 'solar-panel-maintenance',
      excerpt: 'เทคนิคการดูแลและบำรุงรักษาระบบโซล่าเซลล์ให้ใช้งานได้นาน',
      content: [
        {
          type: 'paragraph',
          children: [{ text: 'เนื้อหาบทความ' }],
        },
      ],
      featuredImage: {
        id: 'img3',
        url: '/images/article3.jpg',
        alt: 'Article 3',
        filename: 'article3.jpg',
        mimeType: 'image/jpeg',
        filesize: 100000,
        width: 800,
        height: 600,
        createdAt: '2024-01-03T00:00:00.000Z',
        updatedAt: '2024-01-03T00:00:00.000Z',
      },
      publishedDate: '2024-01-25T00:00:00.000Z',
      status: 'published',
      createdAt: '2024-01-03T00:00:00.000Z',
      updatedAt: '2024-01-03T00:00:00.000Z',
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render page header with title and description', async () => {
    vi.mocked(getAllPublishedArticles).mockResolvedValue(mockArticles);

    const page = await ArticlesPage();
    render(page);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('บทความและความรู้');
    expect(screen.getByText(/เรียนรู้เกี่ยวกับระบบโซล่าเซลล์/)).toBeInTheDocument();
  });

  it('should display articles count when articles are available', async () => {
    vi.mocked(getAllPublishedArticles).mockResolvedValue(mockArticles);

    const page = await ArticlesPage();
    render(page);

    // Check for the count text
    const countElements = screen.getAllByText((content, element) => {
      return element?.textContent === 'พบ 3 บทความ';
    });
    expect(countElements.length).toBeGreaterThan(0);
  });

  it('should render ArticleCard for each article', async () => {
    vi.mocked(getAllPublishedArticles).mockResolvedValue(mockArticles);

    const page = await ArticlesPage();
    render(page);

    expect(screen.getByText('ประโยชน์ของโซล่าเซลล์')).toBeInTheDocument();
    expect(screen.getByText('วิธีเลือกโซล่าเซลล์ที่เหมาะสม')).toBeInTheDocument();
    expect(screen.getByText('การบำรุงรักษาระบบโซล่าเซลล์')).toBeInTheDocument();
    expect(screen.getByText('ความรู้ทั่วไป')).toBeInTheDocument();
    expect(screen.getByText('คู่มือการเลือกซื้อ')).toBeInTheDocument();
    expect(screen.getByText('การดูแลรักษา')).toBeInTheDocument();
  });

  it('should display article excerpts', async () => {
    vi.mocked(getAllPublishedArticles).mockResolvedValue(mockArticles);

    const page = await ArticlesPage();
    render(page);

    expect(screen.getByText('เรียนรู้เกี่ยวกับประโยชน์ของการใช้พลังงานแสงอาทิตย์')).toBeInTheDocument();
    expect(screen.getByText('คำแนะนำในการเลือกซื้อแผงโซล่าเซลล์ที่เหมาะกับความต้องการ')).toBeInTheDocument();
    expect(screen.getByText('เทคนิคการดูแลและบำรุงรักษาระบบโซล่าเซลล์ให้ใช้งานได้นาน')).toBeInTheDocument();
  });

  it('should display published dates in Thai format', async () => {
    vi.mocked(getAllPublishedArticles).mockResolvedValue(mockArticles);

    const page = await ArticlesPage();
    render(page);

    // Check for Thai formatted dates (Buddhist Era)
    expect(screen.getByText('15 มกราคม 2567')).toBeInTheDocument();
    expect(screen.getByText('20 มกราคม 2567')).toBeInTheDocument();
    expect(screen.getByText('25 มกราคม 2567')).toBeInTheDocument();
  });

  it('should render links to article detail pages', async () => {
    vi.mocked(getAllPublishedArticles).mockResolvedValue(mockArticles);

    const page = await ArticlesPage();
    render(page);

    const articleLinks = screen.getAllByRole('link', { name: /Read article:/i });
    expect(articleLinks).toHaveLength(3);
    expect(articleLinks[0]).toHaveAttribute('href', '/articles/benefits-of-solar-cells');
    expect(articleLinks[1]).toHaveAttribute('href', '/articles/how-to-choose-solar-panels');
    expect(articleLinks[2]).toHaveAttribute('href', '/articles/solar-panel-maintenance');
  });

  it('should display empty state when no articles are available', async () => {
    vi.mocked(getAllPublishedArticles).mockResolvedValue([]);

    const page = await ArticlesPage();
    render(page);

    expect(screen.getByText('ยังไม่มีบทความ')).toBeInTheDocument();
    expect(screen.getByText(/ขณะนี้ยังไม่มีบทความที่เผยแพร่/)).toBeInTheDocument();
  });

  it('should display error message when API call fails', async () => {
    vi.mocked(getAllPublishedArticles).mockRejectedValue(new Error('API Error'));

    const page = await ArticlesPage();
    render(page);

    expect(screen.getByText('เกิดข้อผิดพลาด')).toBeInTheDocument();
    expect(screen.getByText('ไม่สามารถโหลดข้อมูลบทความได้ กรุณาลองใหม่อีกครั้ง')).toBeInTheDocument();
  });

  it('should display call-to-action section when articles are available', async () => {
    vi.mocked(getAllPublishedArticles).mockResolvedValue(mockArticles);

    const page = await ArticlesPage();
    render(page);

    expect(screen.getByText('สนใจติดตั้งระบบโซล่าเซลล์?')).toBeInTheDocument();
    expect(screen.getByText(/ติดต่อเราวันนี้เพื่อรับคำปรึกษาฟรี/)).toBeInTheDocument();
    
    const ctaButton = screen.getByRole('link', { name: 'ติดต่อเรา' });
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveAttribute('href', '/#contact');
  });

  it('should not display call-to-action section when there is an error', async () => {
    vi.mocked(getAllPublishedArticles).mockRejectedValue(new Error('API Error'));

    const page = await ArticlesPage();
    render(page);

    expect(screen.queryByText('สนใจติดตั้งระบบโซล่าเซลล์?')).not.toBeInTheDocument();
  });

  it('should not display call-to-action section when no articles are available', async () => {
    vi.mocked(getAllPublishedArticles).mockResolvedValue([]);

    const page = await ArticlesPage();
    render(page);

    expect(screen.queryByText('สนใจติดตั้งระบบโซล่าเซลล์?')).not.toBeInTheDocument();
  });

  it('should use semantic HTML structure', async () => {
    vi.mocked(getAllPublishedArticles).mockResolvedValue(mockArticles);

    const page = await ArticlesPage();
    const { container } = render(page);

    // Check for semantic HTML elements
    expect(container.querySelector('header')).toBeInTheDocument();
    expect(container.querySelector('main')).toBeInTheDocument();
    expect(container.querySelector('section')).toBeInTheDocument();
    expect(container.querySelectorAll('article')).toHaveLength(3);
  });

  it('should handle articles with string featuredImage', async () => {
    const articlesWithStringImage: Article[] = [
      {
        ...mockArticles[0],
        featuredImage: '/images/article-string.jpg',
      },
    ];

    vi.mocked(getAllPublishedArticles).mockResolvedValue(articlesWithStringImage);

    const page = await ArticlesPage();
    render(page);

    expect(screen.getByText('ประโยชน์ของโซล่าเซลล์')).toBeInTheDocument();
  });

  it('should prioritize loading first 2 images', async () => {
    vi.mocked(getAllPublishedArticles).mockResolvedValue(mockArticles);

    const page = await ArticlesPage();
    const { container } = render(page);

    const images = container.querySelectorAll('img');
    expect(images.length).toBeGreaterThan(0);
    
    // First 2 images should have priority loading
    expect(images[0]).toHaveAttribute('loading', 'eager');
    expect(images[1]).toHaveAttribute('loading', 'eager');
    
    // Third image should have lazy loading
    if (images[2]) {
      expect(images[2]).toHaveAttribute('loading', 'lazy');
    }
  });

  it('should display reading time indicator', async () => {
    vi.mocked(getAllPublishedArticles).mockResolvedValue(mockArticles);

    const page = await ArticlesPage();
    render(page);

    // Check for reading time indicators (5 นาที appears for each article)
    const readingTimes = screen.getAllByText('5 นาที');
    expect(readingTimes.length).toBe(3);
  });

  it('should display "อ่านบทความ" call-to-action on each card', async () => {
    vi.mocked(getAllPublishedArticles).mockResolvedValue(mockArticles);

    const page = await ArticlesPage();
    render(page);

    const readButtons = screen.getAllByText('อ่านบทความ');
    expect(readButtons.length).toBe(3);
  });

  it('should handle articles without SEO metadata', async () => {
    const articlesWithoutSEO: Article[] = [
      {
        ...mockArticles[0],
        seo: undefined,
      },
    ];

    vi.mocked(getAllPublishedArticles).mockResolvedValue(articlesWithoutSEO);

    const page = await ArticlesPage();
    render(page);

    expect(screen.getByText('ประโยชน์ของโซล่าเซลล์')).toBeInTheDocument();
  });

  it('should render articles in single column grid layout', async () => {
    vi.mocked(getAllPublishedArticles).mockResolvedValue(mockArticles);

    const page = await ArticlesPage();
    const { container } = render(page);

    // Check for grid layout with single column
    const gridContainer = container.querySelector('.grid.grid-cols-1');
    expect(gridContainer).toBeInTheDocument();
  });

  it('should display article cards with magazine-style design', async () => {
    vi.mocked(getAllPublishedArticles).mockResolvedValue(mockArticles);

    const page = await ArticlesPage();
    const { container } = render(page);

    // Check for amber accent color (border-amber-500)
    const cards = container.querySelectorAll('.border-l-4.border-amber-500');
    expect(cards.length).toBe(3);
  });
});
