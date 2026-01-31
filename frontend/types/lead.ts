/**
 * Lead types for contact form submissions
 */

import { PayloadDocument } from './payload';

/**
 * Lead document from Payload CMS
 */
export interface Lead extends PayloadDocument {
  fullName: string;
  phone: string;
  email: string;
}

/**
 * Lead form data (before submission)
 */
export interface LeadFormData {
  fullName: string;
  phone: string;
  email: string;
}

/**
 * Lead form validation error
 */
export interface LeadFormValidationError {
  field: 'fullName' | 'phone' | 'email';
  message: string;
}

/**
 * Lead form validation rules
 */
export interface LeadFormValidation {
  fullName: {
    required: true;
    minLength: number;
  };
  phone: {
    required: true;
    pattern: RegExp;
  };
  email: {
    required: true;
    pattern: RegExp;
  };
}

/**
 * Lead submission response
 */
export interface LeadSubmissionResponse {
  success: boolean;
  data?: Lead;
  error?: string;
}
