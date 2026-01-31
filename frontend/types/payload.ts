/**
 * Base Payload CMS types
 * These types represent common structures used across all Payload collections
 */

/**
 * Base document interface that all Payload collections extend
 */
export interface PayloadDocument {
  id: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * SEO metadata group used in Articles and Services
 */
export interface SEOMetadata {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
}

/**
 * Status enum for content that can be drafted or published
 */
export type ContentStatus = 'draft' | 'published';

/**
 * Pagination response from Payload API
 */
export interface PaginatedResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

/**
 * API error response structure
 */
export interface PayloadError {
  errors: Array<{
    message: string;
    field?: string;
  }>;
}
