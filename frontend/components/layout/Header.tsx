'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Sun } from 'lucide-react';

interface NavigationItem {
  label: string;
  href: string;
}

const navigationItems: NavigationItem[] = [
  { label: 'หน้าแรก', href: '/' },
  { label: 'บริการ', href: '/services' },
  { label: 'ผลงาน', href: '/reviews' },
  { label: 'บทความ', href: '/articles' },
  { label: 'ติดต่อเรา', href: '/#contact' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand with gradient */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 p-2 rounded-lg shadow-md">
              <Sun className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">SolarPro</span>
              <span className="text-xs text-gray-600">โซลูชั่นพลังงานแสงอาทิตย์</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-8">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-gray-700 hover:text-orange-500 transition-colors font-medium text-[15px] hover:underline decoration-2 decoration-orange-400 underline-offset-4"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 space-y-1.5 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span
              className={`block w-6 h-0.5 bg-gray-700 transition-transform duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-gray-700 transition-opacity duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-gray-700 transition-transform duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <ul className="flex flex-col space-y-4 pb-4">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block text-gray-700 hover:text-orange-500 transition-colors font-medium py-2 px-4 hover:bg-gray-50 rounded"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
