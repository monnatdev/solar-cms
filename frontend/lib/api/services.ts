/**
 * Services API client
 * Handles all API calls related to business services
 */

import { Service, ServiceQueryParams } from '@/types/service';
import { PaginatedResponse } from '@/types/payload';
import { payloadFetch, buildQueryString } from './payload';

/**
 * Fetch all services with optional filtering and pagination
 * 
 * @param params - Query parameters for filtering and pagination
 * @returns Paginated list of services
 * 
 * @example
 * ```typescript
 * const services = await getServices({ status: 'published', limit: 10 });
 * ```
 */
export async function getServices(
  params?: ServiceQueryParams
): Promise<PaginatedResponse<Service>> {
  const queryString = params ? buildQueryString(params) : '';
  
  try {
    const response = await payloadFetch<PaginatedResponse<Service>>(
      `/api/services${queryString}`
    );
    return response;
  } catch (error) {
    console.error('Failed to fetch services:', error);
    throw error;
  }
}

/**
 * Fetch a single service by ID
 * 
 * @param id - Service ID
 * @returns Service document
 * 
 * @example
 * ```typescript
 * const service = await getServiceById('123');
 * ```
 */
export async function getServiceById(id: string): Promise<Service> {
  try {
    const response = await payloadFetch<Service>(`/api/services/${id}`);
    return response;
  } catch (error) {
    console.error(`Failed to fetch service ${id}:`, error);
    throw error;
  }
}

/**
 * Fetch a single service by slug
 * 
 * @param slug - Service slug
 * @returns Service document or null if not found
 * 
 * @example
 * ```typescript
 * const service = await getServiceBySlug('solar-installation');
 * ```
 */
export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const response = await payloadFetch<PaginatedResponse<Service>>(
      `/api/services?where[slug][equals]=${encodeURIComponent(slug)}&limit=1`
    );
    
    if (response.docs.length === 0) {
      return null;
    }
    
    return response.docs[0];
  } catch (error) {
    console.error(`Failed to fetch service by slug ${slug}:`, error);
    throw error;
  }
}

/**
 * Fetch published services only
 * 
 * @param params - Query parameters for pagination
 * @returns Paginated list of published services
 * 
 * @example
 * ```typescript
 * const services = await getPublishedServices({ limit: 10, page: 1 });
 * ```
 */
export async function getPublishedServices(
  params?: Omit<ServiceQueryParams, 'status'>
): Promise<PaginatedResponse<Service>> {
  return getServices({
    ...params,
    status: 'published',
  });
}

/**
 * Fetch all published services (no pagination)
 * Useful for navigation menus or service listings
 * 
 * @returns List of all published services
 * 
 * @example
 * ```typescript
 * const allServices = await getAllPublishedServices();
 * ```
 */
export async function getAllPublishedServices(): Promise<Service[]> {
  const response = await getPublishedServices({
    limit: 100, // Reasonable limit for all services
  });
  return response.docs;
}
