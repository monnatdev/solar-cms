/**
 * Articles API client
 * Handles all API calls related to articles/blog posts
 */

import { Article, ArticleQueryParams } from '@/types/article';
import { PaginatedResponse } from '@/types/payload';
import { payloadFetch, buildQueryString } from './payload';

/**
 * Fetch all articles with optional filtering and pagination
 * 
 * @param params - Query parameters for filtering and pagination
 * @returns Paginated list of articles
 * 
 * @example
 * ```typescript
 * const articles = await getArticles({ status: 'published', limit: 10 });
 * ```
 */
export async function getArticles(
  params?: ArticleQueryParams
): Promise<PaginatedResponse<Article>> {
  const queryString = params ? buildQueryString(params) : '';
  
  try {
    const response = await payloadFetch<PaginatedResponse<Article>>(
      `/api/articles${queryString}`
    );
    return response;
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    throw error;
  }
}

/**
 * Fetch a single article by ID
 * 
 * @param id - Article ID
 * @returns Article document
 * 
 * @example
 * ```typescript
 * const article = await getArticleById('123');
 * ```
 */
export async function getArticleById(id: string): Promise<Article> {
  try {
    const response = await payloadFetch<Article>(`/api/articles/${id}`);
    return response;
  } catch (error) {
    console.error(`Failed to fetch article ${id}:`, error);
    throw error;
  }
}

/**
 * Fetch a single article by slug
 * 
 * @param slug - Article slug
 * @returns Article document
 * 
 * @example
 * ```typescript
 * const article = await getArticleBySlug('my-article');
 * ```
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const response = await payloadFetch<PaginatedResponse<Article>>(
      `/api/articles?where[slug][equals]=${encodeURIComponent(slug)}&limit=1`
    );
    
    if (response.docs.length === 0) {
      return null;
    }
    
    return response.docs[0];
  } catch (error) {
    console.error(`Failed to fetch article by slug ${slug}:`, error);
    throw error;
  }
}

/**
 * Fetch published articles only
 * 
 * @param params - Query parameters for pagination
 * @returns Paginated list of published articles
 * 
 * @example
 * ```typescript
 * const articles = await getPublishedArticles({ limit: 10, page: 1 });
 * ```
 */
export async function getPublishedArticles(
  params?: Omit<ArticleQueryParams, 'status'>
): Promise<PaginatedResponse<Article>> {
  return getArticles({
    ...params,
    status: 'published',
  });
}

/**
 * Fetch recent articles (published, sorted by date)
 * 
 * @param limit - Number of articles to fetch (default: 5)
 * @returns Paginated list of recent articles
 * 
 * @example
 * ```typescript
 * const recentArticles = await getRecentArticles(5);
 * ```
 */
export async function getRecentArticles(
  limit: number = 5
): Promise<PaginatedResponse<Article>> {
  return getPublishedArticles({
    limit,
    sort: '-publishedDate',
  });
}

/**
 * Fetch all published articles (no pagination)
 * Useful for article listings
 * 
 * @returns List of all published articles
 * 
 * @example
 * ```typescript
 * const allArticles = await getAllPublishedArticles();
 * ```
 */
export async function getAllPublishedArticles(): Promise<Article[]> {
  const response = await getPublishedArticles({
    limit: 100, // Reasonable limit for all articles
    sort: '-publishedDate', // Sort by newest first
  });
  return response.docs;
}
