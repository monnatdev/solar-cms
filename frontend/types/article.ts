/**
 * Article types for blog posts and content
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
 * Article document from Payload CMS
 */
export interface Article extends PayloadDocument {
  title: string;
  header: string;
  slug: string;
  excerpt: string;
  content: RichTextContent;
  featuredImage: MediaReference;
  publishedDate: string;
  status: ContentStatus;
  seo?: SEOMetadata;
}

/**
 * Article card props for displaying in lists
 */
export interface ArticleCardProps {
  id: string;
  image: string;
  header: string;
  title: string;
  excerpt: string;
  slug: string;
  publishedDate: string;
}

/**
 * Article query parameters
 */
export interface ArticleQueryParams {
  status?: ContentStatus;
  limit?: number;
  page?: number;
  sort?: string;
}
