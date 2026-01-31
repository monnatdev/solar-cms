/**
 * Base Payload CMS API client
 * Provides common functionality for all API calls
 */

import { PayloadError } from '@/types/payload';

/**
 * Get the Payload API base URL from environment variables
 */
export function getPayloadAPIURL(): string {
  const url = process.env.NEXT_PUBLIC_PAYLOAD_API_URL;
  
  if (!url) {
    throw new Error('NEXT_PUBLIC_PAYLOAD_API_URL environment variable is not set');
  }
  
  return url;
}

/**
 * API error class for better error handling
 */
export class PayloadAPIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public errors?: PayloadError['errors']
  ) {
    super(message);
    this.name = 'PayloadAPIError';
  }
}

/**
 * Base fetch wrapper with error handling
 */
export async function payloadFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const baseURL = getPayloadAPIURL();
  const url = `${baseURL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });
    
    // Handle non-OK responses
    if (!response.ok) {
      let errorMessage = `API Error: ${response.status} ${response.statusText}`;
      let errors: PayloadError['errors'] | undefined;
      
      try {
        const errorData: PayloadError = await response.json();
        if (errorData.errors && errorData.errors.length > 0) {
          errorMessage = errorData.errors.map(e => e.message).join(', ');
          errors = errorData.errors;
        }
      } catch {
        // If error response is not JSON, use default message
      }
      
      throw new PayloadAPIError(errorMessage, response.status, errors);
    }
    
    // Parse and return JSON response
    const data: T = await response.json();
    return data;
    
  } catch (error) {
    // Re-throw PayloadAPIError as-is
    if (error instanceof PayloadAPIError) {
      throw error;
    }
    
    // Handle network errors and other exceptions
    if (error instanceof Error) {
      throw new PayloadAPIError(
        `Network error: ${error.message}`,
        undefined,
        undefined
      );
    }
    
    // Unknown error
    throw new PayloadAPIError('An unknown error occurred');
  }
}

/**
 * Build query string from parameters
 */
export function buildQueryString(params: Record<string, any>): string {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });
  
  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
}
