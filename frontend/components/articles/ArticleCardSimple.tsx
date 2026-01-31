'use client';

/**
 * Simple Article Card for Home Page and List Page
 * Client component to handle image errors
 */

import Link from 'next/link';
import { useState } from 'react';

interface ArticleCardSimpleProps {
  slug: string;
  image: string;
  title: string;
  header: string;
  excerpt: string;
  publishedDate: string;
}

export default function ArticleCardSimple({
  slug,
  image,
  title,
  header,
  excerpt,
  publishedDate,
}: ArticleCardSimpleProps) {
  const [imgSrc, setImgSrc] = useState(image);

  return (
    <article className="group">
      <Link href={`/articles/${slug}`} className="block">
        <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
          <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
            <img
              src={imgSrc}
              alt={title}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              onError={() => {
                setImgSrc('https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop');
              }}
            />
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
              <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full font-medium text-xs">
                {header}
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date(publishedDate).toLocaleDateString('th-TH', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-500 transition-colors">
              {title}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">
              {excerpt}
            </p>
            <div className="flex items-center text-orange-500 font-medium text-sm group-hover:text-orange-600">
              อ่านเพิ่มเติม
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
