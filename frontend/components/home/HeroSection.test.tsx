import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import HeroSection from './HeroSection';

describe('HeroSection', () => {
  const mockImageProps = {
    header: 'Power Your Future with',
    title: 'Solar Energy',
    description: 'Transform your home or business with clean, renewable energy.',
    media: {
      type: 'image' as const,
      url: 'https://example.com/hero.jpg',
      alt: 'Solar panels on roof',
    },
  };

  const mockVideoProps = {
    header: 'Power Your Future with',
    title: 'Solar Energy',
    description: 'Transform your home or business with clean, renewable energy.',
    media: {
      type: 'video' as const,
      url: 'https://example.com/hero.mp4',
      alt: 'Solar installation video',
    },
  };

  describe('Content Display', () => {
    it('should display header text', () => {
      render(<HeroSection {...mockImageProps} />);
      expect(screen.getByText('Power Your Future with')).toBeInTheDocument();
    });

    it('should display title text', () => {
      render(<HeroSection {...mockImageProps} />);
      expect(screen.getByText('Solar Energy')).toBeInTheDocument();
    });

    it('should display description when provided', () => {
      render(<HeroSection {...mockImageProps} />);
      expect(
        screen.getByText('Transform your home or business with clean, renewable energy.')
      ).toBeInTheDocument();
    });

    it('should not display description when not provided', () => {
      const propsWithoutDescription = { ...mockImageProps, description: undefined };
      render(<HeroSection {...propsWithoutDescription} />);
      expect(
        screen.queryByText('Transform your home or business with clean, renewable energy.')
      ).not.toBeInTheDocument();
    });
  });

  describe('Media Display', () => {
    it('should render image when media type is image', () => {
      render(<HeroSection {...mockImageProps} />);
      const image = screen.getByAltText('Solar panels on roof');
      expect(image).toBeInTheDocument();
      expect(image.tagName).toBe('IMG');
    });

    it('should render video when media type is video', () => {
      render(<HeroSection {...mockVideoProps} />);
      const video = screen.getByLabelText('Solar installation video');
      expect(video).toBeInTheDocument();
      expect(video.tagName).toBe('VIDEO');
    });

    it('should use title as alt text when alt is not provided', () => {
      const propsWithoutAlt = {
        ...mockImageProps,
        media: { ...mockImageProps.media, alt: undefined },
      };
      render(<HeroSection {...propsWithoutAlt} />);
      const image = screen.getByAltText('Solar Energy');
      expect(image).toBeInTheDocument();
    });
  });

  describe('Call to Action Buttons', () => {
    it('should display calculator button with correct text', () => {
      render(<HeroSection {...mockImageProps} />);
      const calculatorButton = screen.getByRole('link', { name: /คำนวณความคุ้มค่า/i });
      expect(calculatorButton).toBeInTheDocument();
      expect(calculatorButton).toHaveAttribute('href', '#calculator');
    });

    it('should display contact button with correct text', () => {
      render(<HeroSection {...mockImageProps} />);
      const contactButton = screen.getByRole('link', { name: /ติดต่อเรา/i });
      expect(contactButton).toBeInTheDocument();
      expect(contactButton).toHaveAttribute('href', '#contact');
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading structure', () => {
      render(<HeroSection {...mockImageProps} />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Power Your Future with Solar Energy');
    });

    it('should have semantic section element', () => {
      const { container } = render(<HeroSection {...mockImageProps} />);
      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });
  });
});
