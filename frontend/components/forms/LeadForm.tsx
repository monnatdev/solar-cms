'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { submitLead } from '@/lib/api/leads';
import {
  validateLeadForm,
  formatValidationErrors,
  sanitizePhone,
} from '@/lib/utils/validation';
import type { LeadFormData } from '@/types/lead';

/**
 * LeadForm Component
 * 
 * Contact form for collecting lead information (fullName, phone, email).
 * Includes client-side validation and error handling.
 * 
 * Features:
 * - Client-side validation for all fields
 * - Real-time error messages
 * - Form submission to Payload CMS
 * - Success/error state handling
 * - Responsive design
 * 
 * Validates Requirements: 6.1, 6.3
 */
export default function LeadForm() {
  // Form data state
  const [formData, setFormData] = useState<LeadFormData>({
    fullName: '',
    phone: '',
    email: '',
  });

  // UI state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  /**
   * Handle input field changes
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Update form data
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    // Clear submit error
    if (submitError) {
      setSubmitError(null);
    }
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset states
    setErrors({});
    setSubmitError(null);
    setSubmitSuccess(false);

    // Validate form data
    const validationErrors = validateLeadForm(formData);
    
    if (validationErrors.length > 0) {
      // Show validation errors
      setErrors(formatValidationErrors(validationErrors));
      return;
    }

    // Submit form
    setIsSubmitting(true);

    try {
      const result = await submitLead({
        ...formData,
        phone: sanitizePhone(formData.phone),
      });

      if (result.success) {
        // Success - reset form and show success message
        setSubmitSuccess(true);
        setFormData({
          fullName: '',
          phone: '',
          email: '',
        });

        // Hide success message after 5 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      } else {
        // Error from API
        setSubmitError(result.error || 'ไม่สามารถส่งข้อมูลได้ กรุณาลองใหม่อีกครั้ง');
      }
    } catch (error) {
      // Unexpected error
      console.error('Form submission error:', error);
      setSubmitError('เกิดข้อผิดพลาดที่ไม่คาดคิด กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              เริ่มต้นวันนี้
            </h2>
            <p className="text-lg text-gray-600">
              กรอกแบบฟอร์มและผู้เชี่ยวชาญของเราจะติดต่อกลับภายใน 24 ชั่วโมง
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
            {/* Success Message */}
            {submitSuccess && (
              <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-green-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-green-800">
                      ส่งข้อมูลสำเร็จ! เราจะติดต่อกลับเร็วๆ นี้
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {submitError && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-red-800">{submitError}</p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              {/* Full Name Field */}
              <div className="mb-5">
                <label
                  htmlFor="fullName"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  ชื่อ-นามสกุล <span className="text-red-500">*</span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg outline-none transition-all bg-gray-50 ${
                    errors.fullName
                      ? 'border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-200'
                      : 'border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 focus:bg-white'
                  }`}
                  placeholder="สมชาย ใจดี"
                  disabled={isSubmitting}
                  aria-invalid={!!errors.fullName}
                  aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                />
                {errors.fullName && (
                  <p id="fullName-error" className="mt-2 text-sm text-red-600">
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Phone Field */}
              <div className="mb-5">
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  เบอร์โทรศัพท์ <span className="text-red-500">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg outline-none transition-all bg-gray-50 ${
                    errors.phone
                      ? 'border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-200'
                      : 'border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 focus:bg-white'
                  }`}
                  placeholder="081-234-5678"
                  disabled={isSubmitting}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                />
                {errors.phone && (
                  <p id="phone-error" className="mt-2 text-sm text-red-600">
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="mb-7">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  อีเมล <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg outline-none transition-all bg-gray-50 ${
                    errors.email
                      ? 'border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-200'
                      : 'border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 focus:bg-white'
                  }`}
                  placeholder="somchai@example.com"
                  disabled={isSubmitting}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-2 text-sm text-red-600">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 text-base font-semibold text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 rounded-lg hover:from-orange-500 hover:via-orange-600 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    กำลังส่ง...
                  </span>
                ) : (
                  'ขอรับคำปรึกษาฟรี'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
