/**
 * Service types for business offerings
 */

import { PayloadDocument, SEOMetadata, ContentStatus } from './payload';
import { MediaReference } from './media';

/**
 * Rich text content structure from Payload
 */
export interface RichTextContent {
  [key: string]: any; // Payload's rich text format
}

/**
 * Gallery item in service
 */
export interface GalleryItem {
  image: MediaReference;
  id?: string;
}

/**
 * Service document from Payload CMS
 */
export interface Service extends PayloadDocument {
  title: string;
  header: string;
  slug: string;
  description: RichTextContent;
  featuredImage: MediaReference;
  gallery?: GalleryItem[];
  status: ContentStatus;
  seo?: SEOMetadata;
}

/**
 * Service card props for displaying in lists
 */
export interface ServiceCardProps {
  id: string;
  image: string;
  header: string;
  title: string;
  slug: string;
}

/**
 * Service query parameters
 */
export interface ServiceQueryParams {
  status?: ContentStatus;
  limit?: number;
  page?: number;
  sort?: string;
}

/**
 * Service reference (can be string ID or full Service object)
 */
export type ServiceReference = string | Service;
