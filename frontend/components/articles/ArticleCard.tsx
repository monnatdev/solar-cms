/**
 * ArticleCard Component
 * 
 * Displays an article in card format with image, header, title, excerpt, and published date.
 * Features a unique design distinct from ServiceCard and ReviewCard.
 * Supports lazy loading for images and links to article detail page.
 * 
 * Validates Requirements: 5.6, 13.4
 */

import Image from 'next/image';
import Link from 'next/link';
import { ArticleCardProps } from '@/types/article';
import { getImageAlt, getLoadingAttribute } from '@/lib/utils/image';
import { IMAGE_CONFIG } from '@/lib/constants/config';

interface ArticleCardComponentProps extends ArticleCardProps {
  /**
   * Index of the card in the list (for lazy loading)
   */
  index?: number;
  /**
   * Priority loading for above-the-fold images
   */
  priority?: boolean;
}

/**
 * Format date to Thai format
 */
function formatThaiDate(dateString: string): string {
  const date = new Date(dateString);
  const thaiMonths = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ];
  
  const day = date.getDate();
  const month = thaiMonths[date.getMonth()];
  const year = date.getFullYear() + 543; // Convert to Buddhist Era
  
  return `${day} ${month} ${year}`;
}

/**
 * ArticleCard component with unique rectangular magazine-style design
 * 
 * Design features:
 * - Clean rectangular layout with sharp corners (magazine/newspaper style)
 * - Amber/orange accent color scheme (knowledge/learning theme)
 * - Side-by-side image and content layout on larger screens
 * - Prominent date display with calendar icon
 * - Excerpt preview for content teaser
 * - Distinct from ServiceCard (hexagonal/blue) and ReviewCard (rounded/emerald)
 */
export default function ArticleCard({
  id,
  image,
  header,
  title,
  excerpt,
  slug,
  publishedDate,
  index = 0,
  priority = false,
}: ArticleCardComponentProps) {
  // Determine loading strategy based on position
  const loading = priority ? 'eager' : getLoadingAttribute(index, IMAGE_CONFIG.lazyLoadThreshold);
  const shouldPrioritize = priority || index < IMAGE_CONFIG.lazyLoadThreshold;

  return (
    <article className="group relative">
      <Link
        href={`/articles/${slug}`}
        className="block"
        aria-label={`Read article: ${title}`}
      >
        {/* Card Container with rectangular magazine-style design */}
        <div className="relative overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-500 border-l-4 border-orange-500 hover:border-orange-600">
          <div className="flex flex-col md:flex-row">
            {/* Image Container - Fixed aspect ratio */}
            <div className="relative w-full md:w-2/5 aspect-[16/10] md:aspect-auto md:min-h-[280px] overflow-hidden bg-gray-100 flex-shrink-0">
              <Image
                src={image}
                alt={getImageAlt(undefined, title)}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                loading={loading}
                priority={shouldPrioritize}
                quality={IMAGE_CONFIG.quality}
              />

              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Date badge overlay on image */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-3 transform group-hover:scale-105 transition-transform duration-300">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-orange-600"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <time
                    dateTime={publishedDate}
                    className="text-xs font-semibold text-gray-700"
                  >
                    {formatThaiDate(publishedDate)}
                  </time>
                </div>
              </div>
            </div>

            {/* Content Container */}
            <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
              <div className="space-y-4">
                {/* Header with document icon */}
                <div className="flex items-center gap-2">
                  {/* Article icon indicator */}
                  <div className="w-8 h-8 rounded-md bg-orange-100 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500 transition-colors duration-300">
                    <svg
                      className="w-4 h-4 text-orange-600 group-hover:text-white transition-colors duration-300"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>

                  <p className="text-sm font-semibold text-orange-600 uppercase tracking-wider">
                    {header}
                  </p>
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight group-hover:text-orange-600 transition-colors duration-300 line-clamp-2">
                  {title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 leading-relaxed line-clamp-3 text-sm md:text-base">
                  {excerpt}
                </p>
              </div>

              {/* Call to Action */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-orange-600 font-semibold group-hover:text-orange-700 transition-colors duration-300">
                  <span className="text-sm">อ่านบทความ</span>
                  <svg
                    className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>

                {/* Reading time indicator (optional decoration) */}
                <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>5 นาที</span>
                </div>
              </div>
            </div>
          </div>

          {/* Top accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </div>
      </Link>
    </article>
  );
}
