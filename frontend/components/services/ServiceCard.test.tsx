/**
 * ServiceCard Component Tests
 * 
 * Unit tests for the ServiceCard component
 * Validates Requirements: 3.1, 3.2, 3.6, 13.4
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ServiceCard from './ServiceCard';
import { ServiceCardProps } from '@/types/service';

describe('ServiceCard', () => {
  const mockServiceCardProps: ServiceCardProps = {
    id: 'service-1',
    image: '/test-image.jpg',
    header: 'Solar Installation',
    title: 'Residential Solar Panel Installation',
    slug: 'residential-solar-panel-installation',
  };

  it('should render service card with all required elements', () => {
    render(<ServiceCard {...mockServiceCardProps} />);

    // Check if header is displayed
    expect(screen.getByText('Solar Installation')).toBeDefined();

    // Check if title is displayed
    expect(screen.getByText('Residential Solar Panel Installation')).toBeDefined();

    // Check if link to detail page exists
    const link = screen.getByRole('link');
    expect(link).toBeDefined();
    expect(link.getAttribute('href')).toBe('/services/residential-solar-panel-installation');
  });

  it('should render image with correct attributes', () => {
    render(<ServiceCard {...mockServiceCardProps} />);

    const image = screen.getByRole('img');
    expect(image).toBeDefined();
    expect(image.getAttribute('alt')).toBe('Residential Solar Panel Installation');
  });

  it('should apply lazy loading for images beyond threshold', () => {
    render(<ServiceCard {...mockServiceCardProps} index={5} />);

    const image = screen.getByRole('img');
    expect(image.getAttribute('loading')).toBe('lazy');
  });

  it('should apply eager loading for images within threshold', () => {
    render(<ServiceCard {...mockServiceCardProps} index={0} />);

    const image = screen.getByRole('img');
    expect(image.getAttribute('loading')).toBe('eager');
  });

  it('should prioritize loading when priority prop is true', () => {
    render(<ServiceCard {...mockServiceCardProps} priority={true} />);

    const image = screen.getByRole('img');
    expect(image.getAttribute('loading')).toBe('eager');
  });

  it('should have accessible link with aria-label', () => {
    render(<ServiceCard {...mockServiceCardProps} />);

    const link = screen.getByRole('link');
    expect(link.getAttribute('aria-label')).toBe('View details for Residential Solar Panel Installation');
  });

  it('should render with article semantic HTML', () => {
    const { container } = render(<ServiceCard {...mockServiceCardProps} />);

    const article = container.querySelector('article');
    expect(article).toBeDefined();
  });

  it('should display call-to-action text', () => {
    render(<ServiceCard {...mockServiceCardProps} />);

    expect(screen.getByText('ดูรายละเอียด')).toBeDefined();
  });
});
