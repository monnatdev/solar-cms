/**
 * Tests for Reviews List Page
 * 
 * Validates Requirements: 4.1, 4.4
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ReviewsPage from './page';
import { getAllPublishedReviews } from '@/lib/api/reviews';
import { Review } from '@/types/review';

// Mock the API function
vi.mock('@/lib/api/reviews', () => ({
  getAllPublishedReviews: vi.fn(),
}));

// Mock Next.js Image component
vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

describe('ReviewsPage', () => {
  const mockReviews: Review[] = [
    {
      id: '1',
      title: 'ติดตั้งโซล่าเซลล์บ้านพักอาศัย',
      header: 'โครงการที่ 1',
      description: 'ติดตั้งระบบโซล่าเซลล์ขนาด 5kW',
      featuredImage: {
        id: 'img1',
        url: '/images/review1.jpg',
        alt: 'Review 1',
        filename: 'review1.jpg',
        mimeType: 'image/jpeg',
        filesize: 100000,
        width: 800,
        height: 600,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
      gallery: [],
      status: 'published',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
    },
    {
      id: '2',
      title: 'ติดตั้งโซล่าเซลล์โรงงาน',
      header: 'โครงการที่ 2',
      description: 'ติดตั้งระบบโซล่าเซลล์ขนาด 50kW',
      featuredImage: {
        id: 'img2',
        url: '/images/review2.jpg',
        alt: 'Review 2',
        filename: 'review2.jpg',
        mimeType: 'image/jpeg',
        filesize: 100000,
        width: 800,
        height: 600,
        createdAt: '2024-01-02T00:00:00.000Z',
        updatedAt: '2024-01-02T00:00:00.000Z',
      },
      gallery: [],
      relatedService: {
        id: 'service1',
        title: 'ติดตั้งระบบโซล่าเซลล์',
        header: 'บริการติดตั้ง',
        slug: 'solar-installation',
        description: [
          {
            type: 'paragraph',
            children: [{ text: 'บริการติดตั้งระบบโซล่าเซลล์' }],
          },
        ],
        featuredImage: 'img3',
        gallery: [],
        status: 'published',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
      status: 'published',
      createdAt: '2024-01-02T00:00:00.000Z',
      updatedAt: '2024-01-02T00:00:00.000Z',
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render page header with title and description', async () => {
    vi.mocked(getAllPublishedReviews).mockResolvedValue(mockReviews);

    const page = await ReviewsPage();
    render(page);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('ผลงานการติดตั้ง');
    expect(screen.getByText(/ชมผลงานการติดตั้งระบบโซล่าเซลล์คุณภาพสูงของเรา/)).toBeInTheDocument();
  });

  it('should display reviews count when reviews are available', async () => {
    vi.mocked(getAllPublishedReviews).mockResolvedValue(mockReviews);

    const page = await ReviewsPage();
    render(page);

    // Check for the count text using getAllByText since it appears in parent and child
    const countElements = screen.getAllByText((content, element) => {
      return element?.textContent === 'พบ 2 ผลงาน';
    });
    expect(countElements.length).toBeGreaterThan(0);
  });

  it('should render ReviewCard for each review', async () => {
    vi.mocked(getAllPublishedReviews).mockResolvedValue(mockReviews);

    const page = await ReviewsPage();
    render(page);

    expect(screen.getByText('ติดตั้งโซล่าเซลล์บ้านพักอาศัย')).toBeInTheDocument();
    expect(screen.getByText('ติดตั้งโซล่าเซลล์โรงงาน')).toBeInTheDocument();
    expect(screen.getByText('โครงการที่ 1')).toBeInTheDocument();
    expect(screen.getByText('โครงการที่ 2')).toBeInTheDocument();
  });

  it('should display related service link when available', async () => {
    vi.mocked(getAllPublishedReviews).mockResolvedValue(mockReviews);

    const page = await ReviewsPage();
    render(page);

    const serviceLink = screen.getByRole('link', { name: /ติดตั้งระบบโซล่าเซลล์/i });
    expect(serviceLink).toBeInTheDocument();
    expect(serviceLink).toHaveAttribute('href', '/services/solar-installation');
  });

  it('should display empty state when no reviews are available', async () => {
    vi.mocked(getAllPublishedReviews).mockResolvedValue([]);

    const page = await ReviewsPage();
    render(page);

    expect(screen.getByText('ยังไม่มีผลงาน')).toBeInTheDocument();
    expect(screen.getByText(/ขณะนี้ยังไม่มีผลงานที่เผยแพร่/)).toBeInTheDocument();
  });

  it('should display error message when API call fails', async () => {
    vi.mocked(getAllPublishedReviews).mockRejectedValue(new Error('API Error'));

    const page = await ReviewsPage();
    render(page);

    expect(screen.getByText('เกิดข้อผิดพลาด')).toBeInTheDocument();
    expect(screen.getByText('ไม่สามารถโหลดข้อมูลผลงานได้ กรุณาลองใหม่อีกครั้ง')).toBeInTheDocument();
  });

  it('should display call-to-action section when reviews are available', async () => {
    vi.mocked(getAllPublishedReviews).mockResolvedValue(mockReviews);

    const page = await ReviewsPage();
    render(page);

    expect(screen.getByText('ต้องการผลงานคุณภาพเช่นนี้?')).toBeInTheDocument();
    expect(screen.getByText(/ติดต่อเราวันนี้เพื่อรับคำปรึกษา/)).toBeInTheDocument();
    
    const ctaButton = screen.getByRole('link', { name: 'ติดต่อเรา' });
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveAttribute('href', '/#contact');
  });

  it('should not display call-to-action section when there is an error', async () => {
    vi.mocked(getAllPublishedReviews).mockRejectedValue(new Error('API Error'));

    const page = await ReviewsPage();
    render(page);

    expect(screen.queryByText('ต้องการผลงานคุณภาพเช่นนี้?')).not.toBeInTheDocument();
  });

  it('should not display call-to-action section when no reviews are available', async () => {
    vi.mocked(getAllPublishedReviews).mockResolvedValue([]);

    const page = await ReviewsPage();
    render(page);

    expect(screen.queryByText('ต้องการผลงานคุณภาพเช่นนี้?')).not.toBeInTheDocument();
  });

  it('should use semantic HTML structure', async () => {
    vi.mocked(getAllPublishedReviews).mockResolvedValue(mockReviews);

    const page = await ReviewsPage();
    const { container } = render(page);

    // Check for semantic HTML elements
    expect(container.querySelector('header')).toBeInTheDocument();
    expect(container.querySelector('main')).toBeInTheDocument();
    expect(container.querySelector('section')).toBeInTheDocument();
  });

  it('should handle reviews with string featuredImage', async () => {
    const reviewsWithStringImage: Review[] = [
      {
        ...mockReviews[0],
        featuredImage: '/images/review-string.jpg',
      },
    ];

    vi.mocked(getAllPublishedReviews).mockResolvedValue(reviewsWithStringImage);

    const page = await ReviewsPage();
    render(page);

    expect(screen.getByText('ติดตั้งโซล่าเซลล์บ้านพักอาศัย')).toBeInTheDocument();
  });

  it('should handle reviews with string relatedService', async () => {
    const reviewsWithStringService: Review[] = [
      {
        ...mockReviews[1],
        relatedService: 'service-id-string',
      },
    ];

    vi.mocked(getAllPublishedReviews).mockResolvedValue(reviewsWithStringService);

    const page = await ReviewsPage();
    render(page);

    expect(screen.getByText('ติดตั้งโซล่าเซลล์โรงงาน')).toBeInTheDocument();
    // Should not display related service link when it's just a string ID
    expect(screen.queryByRole('link', { name: /ติดตั้งระบบโซล่าเซลล์/i })).not.toBeInTheDocument();
  });
});
