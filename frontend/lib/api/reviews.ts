/**
 * Reviews API client
 * Handles all API calls related to installation reviews
 */

import { Review, ReviewQueryParams } from '@/types/review';
import { PaginatedResponse } from '@/types/payload';
import { payloadFetch, buildQueryString } from './payload';

/**
 * Fetch all reviews with optional filtering and pagination
 * 
 * @param params - Query parameters for filtering and pagination
 * @returns Paginated list of reviews
 * 
 * @example
 * ```typescript
 * const reviews = await getReviews({ status: 'published', limit: 10 });
 * ```
 */
export async function getReviews(
  params?: ReviewQueryParams
): Promise<PaginatedResponse<Review>> {
  const queryString = params ? buildQueryString(params) : '';
  
  try {
    const response = await payloadFetch<PaginatedResponse<Review>>(
      `/api/reviews${queryString}`
    );
    return response;
  } catch (error) {
    console.error('Failed to fetch reviews:', error);
    throw error;
  }
}

/**
 * Fetch a single review by ID
 * 
 * @param id - Review ID
 * @returns Review document
 * 
 * @example
 * ```typescript
 * const review = await getReviewById('123');
 * ```
 */
export async function getReviewById(id: string): Promise<Review> {
  try {
    const response = await payloadFetch<Review>(`/api/reviews/${id}`);
    return response;
  } catch (error) {
    console.error(`Failed to fetch review ${id}:`, error);
    throw error;
  }
}

/**
 * Fetch a single review by slug
 * 
 * @param slug - Review slug
 * @returns Review document or null if not found
 * 
 * @example
 * ```typescript
 * const review = await getReviewBySlug('my-review');
 * ```
 */
export async function getReviewBySlug(slug: string): Promise<Review | null> {
  try {
    const response = await getReviews({
      slug,
      limit: 1,
    });
    
    if (response.docs.length === 0) {
      return null;
    }
    
    return response.docs[0];
  } catch (error) {
    console.error(`Failed to fetch review by slug ${slug}:`, error);
    throw error;
  }
}

/**
 * Fetch published reviews only
 * 
 * @param params - Query parameters for pagination
 * @returns Paginated list of published reviews
 * 
 * @example
 * ```typescript
 * const reviews = await getPublishedReviews({ limit: 10, page: 1 });
 * ```
 */
export async function getPublishedReviews(
  params?: Omit<ReviewQueryParams, 'status'>
): Promise<PaginatedResponse<Review>> {
  return getReviews({
    ...params,
    status: 'published',
  });
}

/**
 * Fetch reviews for a specific service
 * 
 * @param serviceId - Service ID to filter by
 * @param params - Additional query parameters
 * @returns Paginated list of reviews for the service
 * 
 * @example
 * ```typescript
 * const serviceReviews = await getReviewsByService('service-123', { limit: 5 });
 * ```
 */
export async function getReviewsByService(
  serviceId: string,
  params?: Omit<ReviewQueryParams, 'relatedService'>
): Promise<PaginatedResponse<Review>> {
  return getReviews({
    ...params,
    relatedService: serviceId,
  });
}

/**
 * Fetch published reviews for a specific service
 * 
 * @param serviceId - Service ID to filter by
 * @param params - Additional query parameters
 * @returns Paginated list of published reviews for the service
 * 
 * @example
 * ```typescript
 * const serviceReviews = await getPublishedReviewsByService('service-123');
 * ```
 */
export async function getPublishedReviewsByService(
  serviceId: string,
  params?: Omit<ReviewQueryParams, 'relatedService' | 'status'>
): Promise<PaginatedResponse<Review>> {
  return getReviews({
    ...params,
    relatedService: serviceId,
    status: 'published',
  });
}

/**
 * Fetch all published reviews (convenience function)
 * 
 * @returns List of all published reviews
 * 
 * @example
 * ```typescript
 * const allReviews = await getAllPublishedReviews();
 * ```
 */
export async function getAllPublishedReviews(): Promise<Review[]> {
  const response = await getPublishedReviews({
    limit: 100, // Reasonable limit for all reviews
  });
  return response.docs;
}

/**
 * Fetch recent reviews (published, sorted by date)
 * 
 * @param limit - Number of reviews to fetch (default: 6)
 * @returns Paginated list of recent reviews
 * 
 * @example
 * ```typescript
 * const recentReviews = await getRecentReviews(6);
 * ```
 */
export async function getRecentReviews(
  limit: number = 6
): Promise<PaginatedResponse<Review>> {
  return getPublishedReviews({
    limit,
    sort: '-createdAt',
  });
}
