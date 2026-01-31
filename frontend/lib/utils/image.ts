/**
 * Image Optimization Utilities
 * 
 * Provides helper functions for image optimization, responsive images,
 * and lazy loading support.
 * 
 * Validates Requirements: 13.2, 13.4
 */

/**
 * Image size configuration for responsive breakpoints
 */
export const IMAGE_SIZES = {
  thumbnail: { width: 400, height: 300 },
  card: { width: 768, height: 576 },
  hero: { width: 1920, height: 1080 },
  full: { width: 2560, height: 1440 },
} as const;

/**
 * Responsive breakpoints matching Tailwind CSS defaults
 */
export const BREAKPOINTS = {
  mobile: 320,
  tablet: 768,
  desktop: 1920,
} as const;

/**
 * Image size type
 */
export type ImageSize = keyof typeof IMAGE_SIZES;

/**
 * Generate srcset string for responsive images
 * 
 * @param baseUrl - Base URL of the image
 * @param sizes - Array of image sizes to include
 * @returns srcset string for use in img tag
 * 
 * @example
 * ```ts
 * const srcset = generateSrcSet('/images/hero.jpg', ['thumbnail', 'card', 'hero']);
 * // Returns: '/images/hero.jpg?width=400 400w, /images/hero.jpg?width=768 768w, ...'
 * ```
 */
export function generateSrcSet(
  baseUrl: string,
  sizes: ImageSize[] = ['thumbnail', 'card', 'hero']
): string {
  return sizes
    .map((size) => {
      const { width } = IMAGE_SIZES[size];
      return `${baseUrl}?width=${width} ${width}w`;
    })
    .join(', ');
}

/**
 * Generate sizes attribute for responsive images
 * 
 * @param config - Configuration object with breakpoint sizes
 * @returns sizes string for use in img tag
 * 
 * @example
 * ```ts
 * const sizes = generateSizes({
 *   mobile: '100vw',
 *   tablet: '50vw',
 *   desktop: '33vw'
 * });
 * // Returns: '(max-width: 768px) 100vw, (max-width: 1920px) 50vw, 33vw'
 * ```
 */
export function generateSizes(config: {
  mobile?: string;
  tablet?: string;
  desktop?: string;
}): string {
  const parts: string[] = [];

  if (config.mobile) {
    parts.push(`(max-width: ${BREAKPOINTS.tablet}px) ${config.mobile}`);
  }

  if (config.tablet) {
    parts.push(`(max-width: ${BREAKPOINTS.desktop}px) ${config.tablet}`);
  }

  // Desktop is the default (no media query)
  if (config.desktop) {
    parts.push(config.desktop);
  }

  return parts.join(', ');
}

/**
 * Get optimized image URL from Payload CMS
 * 
 * @param mediaUrl - Original media URL from Payload CMS
 * @param size - Desired image size
 * @returns Optimized image URL
 * 
 * @example
 * ```ts
 * const url = getOptimizedImageUrl('/media/image.jpg', 'card');
 * // Returns: '/media/image.jpg?width=768&height=576'
 * ```
 */
export function getOptimizedImageUrl(
  mediaUrl: string,
  size: ImageSize = 'card'
): string {
  if (!mediaUrl) return '';

  const { width, height } = IMAGE_SIZES[size];
  const separator = mediaUrl.includes('?') ? '&' : '?';

  return `${mediaUrl}${separator}width=${width}&height=${height}`;
}

/**
 * Check if an image should be lazy loaded based on its position
 * 
 * @param index - Position index of the image
 * @param threshold - Number of images to load immediately (default: 2)
 * @returns true if image should be lazy loaded
 * 
 * @example
 * ```ts
 * const shouldLazy = shouldLazyLoad(5); // true
 * const shouldEager = shouldLazyLoad(0); // false
 * ```
 */
export function shouldLazyLoad(index: number, threshold: number = 2): boolean {
  return index >= threshold;
}

/**
 * Get loading attribute value for an image
 * 
 * @param index - Position index of the image
 * @param threshold - Number of images to load immediately (default: 2)
 * @returns 'lazy' or 'eager'
 * 
 * @example
 * ```ts
 * const loading = getLoadingAttribute(0); // 'eager'
 * const loading = getLoadingAttribute(5); // 'lazy'
 * ```
 */
export function getLoadingAttribute(
  index: number,
  threshold: number = 2
): 'lazy' | 'eager' {
  return shouldLazyLoad(index, threshold) ? 'lazy' : 'eager';
}

/**
 * Extract image dimensions from Payload CMS media object
 * 
 * @param media - Media object from Payload CMS
 * @returns Object with width and height, or null if not available
 */
export function getImageDimensions(media: {
  width?: number;
  height?: number;
}): { width: number; height: number } | null {
  if (media.width && media.height) {
    return {
      width: media.width,
      height: media.height,
    };
  }
  return null;
}

/**
 * Generate blur data URL for image placeholder
 * 
 * @param width - Width of the blur placeholder
 * @param height - Height of the blur placeholder
 * @returns Data URL for blur placeholder
 * 
 * @example
 * ```ts
 * const blurDataUrl = generateBlurDataUrl(10, 10);
 * // Returns: 'data:image/svg+xml;base64,...'
 * ```
 */
export function generateBlurDataUrl(width: number = 10, height: number = 10): string {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="#e5e7eb"/>
    </svg>
  `;

  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

/**
 * Validate image file type
 * 
 * @param mimeType - MIME type of the file
 * @returns true if the file is a valid image type
 */
export function isValidImageType(mimeType: string): boolean {
  const validTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/svg+xml',
  ];

  return validTypes.includes(mimeType.toLowerCase());
}

/**
 * Get image alt text with fallback
 * 
 * @param alt - Alt text from media object
 * @param fallback - Fallback text if alt is not provided
 * @returns Alt text or fallback
 */
export function getImageAlt(alt?: string, fallback: string = 'Image'): string {
  return alt && alt.trim() !== '' ? alt : fallback;
}
