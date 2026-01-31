'use client';

/**
 * Simple Service Card for Home Page
 * Client component to handle image errors
 */

import Link from 'next/link';
import { useState } from 'react';

interface ServiceCardSimpleProps {
  slug: string;
  image: string;
  title: string;
  header: string;
}

export default function ServiceCardSimple({
  slug,
  image,
  title,
  header,
}: ServiceCardSimpleProps) {
  const [imgSrc, setImgSrc] = useState(image);

  return (
    <article className="group">
      <Link href={`/services/${slug}`} className="block">
        <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          {/* Image */}
          <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
            <img
              src={imgSrc}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={() => {
                setImgSrc('https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop');
              }}
            />
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-orange-500 transition-colors">
              {title}
            </h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {header}
            </p>
            <div className="flex items-center text-orange-500 font-medium text-sm group-hover:text-orange-600">
              ดูรายละเอียด
              <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
