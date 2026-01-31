/**
 * ReviewCard Component Tests
 * 
 * Unit tests for ReviewCard component
 * Validates Requirements: 4.1, 4.2, 4.5, 13.4
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ReviewCard from './ReviewCard';
import { ReviewCardProps } from '@/types/review';

describe('ReviewCard', () => {
  const mockReviewProps: ReviewCardProps = {
    id: '1',
    image: '/test-image.jpg',
    header: 'บ้านพักอาศัย',
    title: 'ติดตั้งโซล่าเซลล์ 5kW บ้านเดี่ยว 2 ชั้น',
  };

  it('should render review card with image, header, and title', () => {
    render(<ReviewCard {...mockReviewProps} />);

    // Check header is displayed
    expect(screen.getByText('บ้านพักอาศัย')).toBeDefined();

    // Check title is displayed
    expect(screen.getByText('ติดตั้งโซล่าเซลล์ 5kW บ้านเดี่ยว 2 ชั้น')).toBeDefined();

    // Check image is rendered
    const image = screen.getByRole('img');
    expect(image).toBeDefined();
    expect(image.getAttribute('alt')).toBe('ติดตั้งโซล่าเซลล์ 5kW บ้านเดี่ยว 2 ชั้น');
  });

  it('should render related service link when provided', () => {
    const propsWithService: ReviewCardProps = {
      ...mockReviewProps,
      relatedService: {
        id: 'service-1',
        title: 'ติดตั้งระบบโซล่าเซลล์บ้านพักอาศัย',
        slug: 'residential-solar-installation',
      },
    };

    render(<ReviewCard {...propsWithService} />);

    // Check related service link is displayed
    const serviceLink = screen.getByText('ติดตั้งระบบโซล่าเซลล์บ้านพักอาศัย');
    expect(serviceLink).toBeDefined();

    // Check link has correct href
    const linkElement = serviceLink.closest('a');
    expect(linkElement?.getAttribute('href')).toBe('/services/residential-solar-installation');
  });

  it('should not render related service link when not provided', () => {
    render(<ReviewCard {...mockReviewProps} />);

    // Check no service link is rendered
    const links = screen.queryAllByRole('link');
    expect(links).toHaveLength(0);
  });

  it('should apply lazy loading for images beyond threshold', () => {
    render(<ReviewCard {...mockReviewProps} index={5} />);

    const image = screen.getByRole('img');
    expect(image.getAttribute('loading')).toBe('lazy');
  });

  it('should apply eager loading for images within threshold', () => {
    render(<ReviewCard {...mockReviewProps} index={0} />);

    const image = screen.getByRole('img');
    expect(image.getAttribute('loading')).toBe('eager');
  });

  it('should prioritize loading when priority prop is true', () => {
    render(<ReviewCard {...mockReviewProps} priority={true} />);

    const image = screen.getByRole('img');
    expect(image.getAttribute('loading')).toBe('eager');
  });

  it('should use semantic HTML with article element', () => {
    const { container } = render(<ReviewCard {...mockReviewProps} />);

    const article = container.querySelector('article');
    expect(article).toBeDefined();
  });

  it('should render checkmark icon for success indicator', () => {
    const { container } = render(<ReviewCard {...mockReviewProps} />);

    // Check for checkmark SVG
    const checkmarkIcon = container.querySelector('svg path[d="M5 13l4 4L19 7"]');
    expect(checkmarkIcon).toBeDefined();
  });

  it('should handle long titles with line clamp', () => {
    const longTitleProps: ReviewCardProps = {
      ...mockReviewProps,
      title: 'ติดตั้งโซล่าเซลล์ขนาดใหญ่ 10kW พร้อมระบบสำรองไฟฟ้าและระบบติดตามแสงอาทิตย์อัตโนมัติสำหรับบ้านเดี่ยว 3 ชั้น',
    };

    const { container } = render(<ReviewCard {...longTitleProps} />);

    const title = container.querySelector('h3');
    expect(title?.classList.contains('line-clamp-2')).toBe(true);
  });
});
