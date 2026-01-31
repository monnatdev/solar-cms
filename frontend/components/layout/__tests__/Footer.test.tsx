import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from '../Footer';

describe('Footer Component', () => {
  it('should render company name', () => {
    render(<Footer />);
    expect(screen.getByText('Solar Cell CMS')).toBeInTheDocument();
  });

  it('should render contact information section', () => {
    render(<Footer />);
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
  });

  it('should render phone number', () => {
    render(<Footer />);
    expect(screen.getByText(/\+66 \(0\) 2-XXX-XXXX/)).toBeInTheDocument();
  });

  it('should render email address', () => {
    render(<Footer />);
    expect(screen.getByText('info@solarcell.com')).toBeInTheDocument();
  });

  it('should render physical address', () => {
    render(<Footer />);
    expect(screen.getByText(/123 Solar Street, Bangkok 10110, Thailand/)).toBeInTheDocument();
  });

  it('should render social media section', () => {
    render(<Footer />);
    expect(screen.getByText('Follow Us')).toBeInTheDocument();
  });

  it('should render all social media links', () => {
    render(<Footer />);
    const facebookLink = screen.getByLabelText('Follow us on Facebook');
    const lineLink = screen.getByLabelText('Follow us on Line');
    const instagramLink = screen.getByLabelText('Follow us on Instagram');

    expect(facebookLink).toBeInTheDocument();
    expect(lineLink).toBeInTheDocument();
    expect(instagramLink).toBeInTheDocument();
  });

  it('should have correct social media link URLs', () => {
    render(<Footer />);
    const facebookLink = screen.getByLabelText('Follow us on Facebook');
    const lineLink = screen.getByLabelText('Follow us on Line');
    const instagramLink = screen.getByLabelText('Follow us on Instagram');

    expect(facebookLink).toHaveAttribute('href', 'https://facebook.com/solarcell');
    expect(lineLink).toHaveAttribute('href', 'https://line.me/ti/p/@solarcell');
    expect(instagramLink).toHaveAttribute('href', 'https://instagram.com/solarcell');
  });

  it('should have target="_blank" and rel="noopener noreferrer" on social links', () => {
    render(<Footer />);
    const facebookLink = screen.getByLabelText('Follow us on Facebook');

    expect(facebookLink).toHaveAttribute('target', '_blank');
    expect(facebookLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should render quick links section', () => {
    render(<Footer />);
    expect(screen.getByText('Quick Links')).toBeInTheDocument();
    expect(screen.getByText('Our Services')).toBeInTheDocument();
    expect(screen.getByText('Customer Reviews')).toBeInTheDocument();
    expect(screen.getByText('Articles & News')).toBeInTheDocument();
  });

  it('should render copyright notice with current year', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`© ${currentYear} Solar Cell CMS`))).toBeInTheDocument();
  });

  it('should have proper semantic HTML structure', () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector('footer');
    const address = container.querySelector('address');

    expect(footer).toBeInTheDocument();
    expect(address).toBeInTheDocument();
  });

  it('should have responsive grid layout classes', () => {
    const { container } = render(<Footer />);
    const gridContainer = container.querySelector('.grid');

    expect(gridContainer).toHaveClass('grid-cols-1');
    expect(gridContainer).toHaveClass('md:grid-cols-2');
    expect(gridContainer).toHaveClass('lg:grid-cols-3');
  });
});
