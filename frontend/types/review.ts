/**
 * Review types for installation showcases
 */

import { PayloadDocument, ContentStatus } from './payload';
import { MediaReference } from './media';
import { ServiceReference } from './service';

/**
 * Gallery item in review
 */
export interface GalleryItem {
  image: MediaReference;
  id?: string;
}

/**
 * Review document from Payload CMS
 */
export interface Review extends PayloadDocument {
  title: string;
  slug: string;
  header: string;
  description: string;
  featuredImage: MediaReference;
  gallery?: GalleryItem[];
  relatedService?: ServiceReference;
  status: ContentStatus;
}

/**
 * Review card props for displaying in lists
 */
export interface ReviewCardProps {
  id: string;
  image: string;
  header: string;
  title: string;
  relatedService?: {
    id: string;
    title: string;
    slug: string;
  };
}

/**
 * Review query parameters
 */
export interface ReviewQueryParams {
  status?: ContentStatus;
  relatedService?: string;
  slug?: string;
  limit?: number;
  page?: number;
  sort?: string;
}
