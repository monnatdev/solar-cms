'use client';

/**
 * Image with Fallback Component
 * Client component to handle image loading errors
 */

import { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
}

export default function ImageWithFallback({
  src,
  alt,
  className = '',
  fallbackSrc = 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&auto=format&fit=crop',
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
}
