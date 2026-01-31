/**
 * Form Validation Utilities
 * 
 * Provides validation functions for forms including lead form,
 * calculator input, and general input validation.
 * 
 * Validates Requirements: 13.2, 13.4
 */

/**
 * Validation error interface
 */
export interface ValidationError {
  field: string;
  message: string;
}

/**
 * Lead form data interface
 */
export interface LeadFormData {
  fullName: string;
  phone: string;
  email: string;
}

/**
 * Validation patterns
 */
export const VALIDATION_PATTERNS = {
  // Thai phone number: 9-10 digits
  phone: /^[0-9]{9,10}$/,
  // Email pattern
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  // Thai name pattern (allows Thai and English characters, spaces, and hyphens)
  thaiName: /^[\u0E00-\u0E7Fa-zA-Z\s\-]{2,}$/,
  // General name pattern (at least 2 characters)
  name: /^.{2,}$/,
} as const;

/**
 * Validation messages in Thai
 */
export const VALIDATION_MESSAGES = {
  required: 'กรุณากรอกข้อมูล',
  fullName: {
    required: 'กรุณากรอกชื่อ-นามสกุล',
    minLength: 'กรุณากรอกชื่อ-นามสกุล (อย่างน้อย 2 ตัวอักษร)',
    invalid: 'กรุณากรอกชื่อ-นามสกุลที่ถูกต้อง',
  },
  phone: {
    required: 'กรุณากรอกเบอร์โทรศัพท์',
    invalid: 'กรุณากรอกเบอร์โทรศัพท์ที่ถูกต้อง (9-10 หลัก)',
  },
  email: {
    required: 'กรุณากรอกอีเมล',
    invalid: 'กรุณากรอกอีเมลที่ถูกต้อง',
  },
  calculator: {
    monthlyBill: 'กรุณากรอกค่าไฟฟ้าที่มากกว่า 0',
    dayNightRatio: 'สัดส่วนการใช้ไฟต้องอยู่ระหว่าง 0-100%',
    locationType: 'กรุณาเลือกประเภทสถานที่ติดตั้ง',
    electricSystem: 'กรุณาเลือกระบบไฟฟ้า',
  },
} as const;

/**
 * Validate full name
 * 
 * @param fullName - Full name to validate
 * @returns Validation error or null if valid
 */
export function validateFullName(fullName: string): ValidationError | null {
  if (!fullName || fullName.trim() === '') {
    return {
      field: 'fullName',
      message: VALIDATION_MESSAGES.fullName.required,
    };
  }

  if (fullName.trim().length < 2) {
    return {
      field: 'fullName',
      message: VALIDATION_MESSAGES.fullName.minLength,
    };
  }

  return null;
}

/**
 * Validate phone number
 * 
 * @param phone - Phone number to validate
 * @returns Validation error or null if valid
 */
export function validatePhone(phone: string): ValidationError | null {
  if (!phone || phone.trim() === '') {
    return {
      field: 'phone',
      message: VALIDATION_MESSAGES.phone.required,
    };
  }

  // Remove spaces and dashes for validation
  const cleanPhone = phone.replace(/[\s-]/g, '');

  if (!VALIDATION_PATTERNS.phone.test(cleanPhone)) {
    return {
      field: 'phone',
      message: VALIDATION_MESSAGES.phone.invalid,
    };
  }

  return null;
}

/**
 * Validate email address
 * 
 * @param email - Email address to validate
 * @returns Validation error or null if valid
 */
export function validateEmail(email: string): ValidationError | null {
  if (!email || email.trim() === '') {
    return {
      field: 'email',
      message: VALIDATION_MESSAGES.email.required,
    };
  }

  if (!VALIDATION_PATTERNS.email.test(email.trim())) {
    return {
      field: 'email',
      message: VALIDATION_MESSAGES.email.invalid,
    };
  }

  return null;
}

/**
 * Validate lead form data
 * 
 * @param data - Lead form data to validate
 * @returns Array of validation errors (empty if valid)
 * 
 * @example
 * ```ts
 * const errors = validateLeadForm({
 *   fullName: 'John Doe',
 *   phone: '0812345678',
 *   email: 'john@example.com'
 * });
 * // Returns: []
 * ```
 */
export function validateLeadForm(data: LeadFormData): ValidationError[] {
  const errors: ValidationError[] = [];

  const fullNameError = validateFullName(data.fullName);
  if (fullNameError) errors.push(fullNameError);

  const phoneError = validatePhone(data.phone);
  if (phoneError) errors.push(phoneError);

  const emailError = validateEmail(data.email);
  if (emailError) errors.push(emailError);

  return errors;
}

/**
 * Sanitize phone number (remove spaces and dashes)
 * 
 * @param phone - Phone number to sanitize
 * @returns Sanitized phone number
 * 
 * @example
 * ```ts
 * const clean = sanitizePhone('081-234-5678');
 * // Returns: '0812345678'
 * ```
 */
export function sanitizePhone(phone: string): string {
  return phone.replace(/[\s-]/g, '');
}

/**
 * Check if a string is empty or only whitespace
 * 
 * @param value - String to check
 * @returns true if empty or whitespace
 */
export function isEmpty(value: string): boolean {
  return !value || value.trim() === '';
}

/**
 * Validate required field
 * 
 * @param value - Value to validate
 * @param fieldName - Name of the field for error message
 * @returns Validation error or null if valid
 */
export function validateRequired(
  value: string,
  fieldName: string
): ValidationError | null {
  if (isEmpty(value)) {
    return {
      field: fieldName,
      message: VALIDATION_MESSAGES.required,
    };
  }
  return null;
}

/**
 * Validate minimum length
 * 
 * @param value - Value to validate
 * @param minLength - Minimum length required
 * @param fieldName - Name of the field for error message
 * @returns Validation error or null if valid
 */
export function validateMinLength(
  value: string,
  minLength: number,
  fieldName: string
): ValidationError | null {
  if (value.trim().length < minLength) {
    return {
      field: fieldName,
      message: `กรุณากรอก${fieldName}อย่างน้อย ${minLength} ตัวอักษร`,
    };
  }
  return null;
}

/**
 * Validate maximum length
 * 
 * @param value - Value to validate
 * @param maxLength - Maximum length allowed
 * @param fieldName - Name of the field for error message
 * @returns Validation error or null if valid
 */
export function validateMaxLength(
  value: string,
  maxLength: number,
  fieldName: string
): ValidationError | null {
  if (value.trim().length > maxLength) {
    return {
      field: fieldName,
      message: `${fieldName}ต้องไม่เกิน ${maxLength} ตัวอักษร`,
    };
  }
  return null;
}

/**
 * Validate pattern match
 * 
 * @param value - Value to validate
 * @param pattern - Regular expression pattern
 * @param fieldName - Name of the field for error message
 * @param errorMessage - Custom error message
 * @returns Validation error or null if valid
 */
export function validatePattern(
  value: string,
  pattern: RegExp,
  fieldName: string,
  errorMessage: string
): ValidationError | null {
  if (!pattern.test(value)) {
    return {
      field: fieldName,
      message: errorMessage,
    };
  }
  return null;
}

/**
 * Format validation errors for display
 * 
 * @param errors - Array of validation errors
 * @returns Object with field names as keys and error messages as values
 * 
 * @example
 * ```ts
 * const errors = [
 *   { field: 'email', message: 'Invalid email' },
 *   { field: 'phone', message: 'Invalid phone' }
 * ];
 * const formatted = formatValidationErrors(errors);
 * // Returns: { email: 'Invalid email', phone: 'Invalid phone' }
 * ```
 */
export function formatValidationErrors(
  errors: ValidationError[]
): Record<string, string> {
  return errors.reduce((acc, error) => {
    acc[error.field] = error.message;
    return acc;
  }, {} as Record<string, string>);
}

/**
 * Check if form has validation errors
 * 
 * @param errors - Array of validation errors
 * @returns true if there are errors
 */
export function hasValidationErrors(errors: ValidationError[]): boolean {
  return errors.length > 0;
}
