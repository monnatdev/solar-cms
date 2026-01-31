'use client';

/**
 * Simple Review Card for Home Page
 * Client component to handle image errors
 */

import { useState } from 'react';
import Link from 'next/link';

interface ReviewCardSimpleProps {
  image: string;
  title: string;
  header: string;
  slug: string;
  relatedService?: {
    title: string;
    slug: string;
  };
}

export default function ReviewCardSimple({
  image,
  title,
  header,
  slug,
  relatedService,
}: ReviewCardSimpleProps) {
  const [imgSrc, setImgSrc] = useState(image);

  return (
    <article className="group">
      <Link href={`/reviews/${slug}`} className="block">
        <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer">
          {/* Image with Badge */}
          <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100">
            <img
              src={imgSrc}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => {
                setImgSrc('https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop');
              }}
            />
            
            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full">
                {header}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
              {title}
            </h3>
            {relatedService && (
              <div className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 mr-1 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="line-clamp-1">{relatedService.title}</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
