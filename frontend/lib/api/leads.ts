/**
 * Leads API client
 * Handles all API calls related to lead form submissions
 */

import { Lead, LeadFormData, LeadSubmissionResponse } from '@/types/lead';
import { payloadFetch } from './payload';

/**
 * Submit a new lead form
 * 
 * @param data - Lead form data
 * @returns Submission response with created lead or error
 * 
 * @example
 * ```typescript
 * const result = await submitLead({
 *   fullName: 'John Doe',
 *   phone: '0812345678',
 *   email: 'john@example.com'
 * });
 * 
 * if (result.success) {
 *   console.log('Lead submitted:', result.data);
 * } else {
 *   console.error('Error:', result.error);
 * }
 * ```
 */
export async function submitLead(
  data: LeadFormData
): Promise<LeadSubmissionResponse> {
  try {
    // Sanitize phone number (remove spaces and dashes)
    const sanitizedData = {
      ...data,
      phone: data.phone.replace(/[\s-]/g, ''),
    };
    
    const response = await payloadFetch<{ doc: Lead }>('/api/leads', {
      method: 'POST',
      body: JSON.stringify(sanitizedData),
    });
    
    return {
      success: true,
      data: response.doc,
    };
  } catch (error) {
    console.error('Failed to submit lead:', error);
    
    // Return user-friendly error message
    let errorMessage = 'ไม่สามารถส่งข้อมูลได้ กรุณาลองใหม่อีกครั้ง';
    
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return {
      success: false,
      error: errorMessage,
    };
  }
}

/**
 * Fetch a single lead by ID (Admin only)
 * This function is for admin use only and requires authentication
 * 
 * @param id - Lead ID
 * @returns Lead document
 * 
 * @example
 * ```typescript
 * const lead = await getLeadById('123');
 * ```
 */
export async function getLeadById(id: string): Promise<Lead> {
  try {
    const response = await payloadFetch<Lead>(`/api/leads/${id}`);
    return response;
  } catch (error) {
    console.error(`Failed to fetch lead ${id}:`, error);
    throw error;
  }
}
