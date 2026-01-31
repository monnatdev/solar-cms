/**
 * Header Component Tests
 * Tests for the Header navigation component
 * Requirements: 14.1-14.4
 */

import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../Header';

describe('Header Component', () => {
  describe('Desktop Navigation', () => {
    it('should render all navigation items', () => {
      render(<Header />);
      
      // Use getAllByText since items appear in both desktop and mobile menus
      expect(screen.getAllByText('Home').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Services').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Reviews').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Articles').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Contact').length).toBeGreaterThan(0);
    });

    it('should render brand/logo', () => {
      render(<Header />);
      
      expect(screen.getByText('Solar Cell CMS')).toBeInTheDocument();
    });

    it('should have correct navigation links', () => {
      render(<Header />);
      
      const homeLink = screen.getAllByRole('link', { name: 'Home' })[0];
      const servicesLink = screen.getAllByRole('link', { name: 'Services' })[0];
      const reviewsLink = screen.getAllByRole('link', { name: 'Reviews' })[0];
      const articlesLink = screen.getAllByRole('link', { name: 'Articles' })[0];
      const contactLink = screen.getAllByRole('link', { name: 'Contact' })[0];
      
      expect(homeLink).toHaveAttribute('href', '/');
      expect(servicesLink).toHaveAttribute('href', '/services');
      expect(reviewsLink).toHaveAttribute('href', '/reviews');
      expect(articlesLink).toHaveAttribute('href', '/articles');
      expect(contactLink).toHaveAttribute('href', '/#contact');
    });
  });

  describe('Mobile Navigation', () => {
    it('should render mobile menu button', () => {
      render(<Header />);
      
      const menuButton = screen.getByLabelText('Toggle mobile menu');
      expect(menuButton).toBeInTheDocument();
    });

    it('should toggle mobile menu on button click', () => {
      const { container } = render(<Header />);
      
      const menuButton = screen.getByLabelText('Toggle mobile menu');
      
      // Find the mobile nav div - it's a sibling of the flex container
      const mobileNav = container.querySelector('nav > div:last-child');
      expect(mobileNav).toHaveClass('opacity-0');
      
      // Click to open
      fireEvent.click(menuButton);
      expect(mobileNav).toHaveClass('opacity-100');
      
      // Click to close
      fireEvent.click(menuButton);
      expect(mobileNav).toHaveClass('opacity-0');
    });

    it('should close mobile menu when navigation item is clicked', () => {
      const { container } = render(<Header />);
      
      const menuButton = screen.getByLabelText('Toggle mobile menu');
      
      // Open mobile menu
      fireEvent.click(menuButton);
      
      const mobileNav = container.querySelector('nav > div:last-child');
      expect(mobileNav).toHaveClass('opacity-100');
      
      // Click a navigation item
      const mobileHomeLink = screen.getAllByRole('link', { name: 'Home' })[1]; // Second one is mobile
      fireEvent.click(mobileHomeLink);
      
      // Menu should close
      expect(mobileNav).toHaveClass('opacity-0');
    });

    it('should have proper aria attributes', () => {
      render(<Header />);
      
      const menuButton = screen.getByLabelText('Toggle mobile menu');
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
      
      fireEvent.click(menuButton);
      expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('Responsive Design', () => {
    it('should have sticky positioning', () => {
      const { container } = render(<Header />);
      
      const header = container.querySelector('header');
      expect(header).toHaveClass('sticky');
      expect(header).toHaveClass('top-0');
    });

    it('should have proper z-index for overlay', () => {
      const { container } = render(<Header />);
      
      const header = container.querySelector('header');
      expect(header).toHaveClass('z-50');
    });
  });
});
