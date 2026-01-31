/**
 * Integration Test: Lead Form Flow
 * 
 * Tests the end-to-end flow of submitting a lead form:
 * 1. User fills out the lead form
 * 2. Form data is validated
 * 3. Data is submitted to Payload CMS API
 * 4. Success message is displayed
 * 5. Lead appears in admin panel (simulated)
 * 
 * Validates Requirements: 6.1, 6.2, 6.3, 6.4, 10.1-10.5
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LeadForm from '@/components/forms/LeadForm';
import { submitLead } from '@/lib/api/leads';

// Mock the API module
vi.mock('@/lib/api/leads');

const mockSubmitLead = submitLead as ReturnType<typeof vi.fn>;

describe('Integration Test: Lead Form Flow', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should complete full lead submission flow successfully', async () => {
    // Mock successful API response
    const mockLeadData = {
      id: 'lead-123',
      fullName: 'สมชาย ใจดี',
      phone: '0812345678',
      email: 'somchai@example.com',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockSubmitLead.mockResolvedValue({
      success: true,
      data: mockLeadData,
    });

    // Step 1: Render the form
    render(<LeadForm />);

    // Verify form is rendered
    expect(screen.getByLabelText(/ชื่อ-นามสกุล/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/เบอร์โทรศัพท์/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/อีเมล/i)).toBeInTheDocument();

    // Step 2: Fill out the form
    const fullNameInput = screen.getByLabelText(/ชื่อ-นามสกุล/i);
    const phoneInput = screen.getByLabelText(/เบอร์โทรศัพท์/i);
    const emailInput = screen.getByLabelText(/อีเมล/i);

    fireEvent.change(fullNameInput, { target: { value: 'สมชาย ใจดี' } });
    fireEvent.change(phoneInput, { target: { value: '081-234-5678' } });
    fireEvent.change(emailInput, { target: { value: 'somchai@example.com' } });

    // Verify form data is entered
    expect(fullNameInput).toHaveValue('สมชาย ใจดี');
    expect(phoneInput).toHaveValue('081-234-5678');
    expect(emailInput).toHaveValue('somchai@example.com');

    // Step 3: Submit the form
    const submitButton = screen.getByRole('button', { name: /ส่งข้อมูล/i });
    fireEvent.click(submitButton);

    // Step 4: Verify loading state
    await waitFor(() => {
      expect(screen.getByText(/กำลังส่งข้อมูล/i)).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
    });

    // Step 5: Verify API was called with correct data (phone sanitized)
    await waitFor(() => {
      expect(mockSubmitLead).toHaveBeenCalledWith({
        fullName: 'สมชาย ใจดี',
        phone: '0812345678', // Sanitized (no dashes)
        email: 'somchai@example.com',
      });
    });

    // Step 6: Verify success message is displayed
    await waitFor(() => {
      expect(screen.getByText(/ส่งข้อมูลสำเร็จ/i)).toBeInTheDocument();
    });

    // Step 7: Verify form is reset
    await waitFor(() => {
      expect(fullNameInput).toHaveValue('');
      expect(phoneInput).toHaveValue('');
      expect(emailInput).toHaveValue('');
    });

    // Step 8: Verify submit button is re-enabled
    expect(submitButton).not.toBeDisabled();
  });

  it('should handle validation errors before submission', async () => {
    render(<LeadForm />);

    // Step 1: Try to submit empty form
    const submitButton = screen.getByRole('button', { name: /ส่งข้อมูล/i });
    fireEvent.click(submitButton);

    // Step 2: Verify validation errors are displayed
    await waitFor(() => {
      expect(screen.getByText(/กรุณากรอกชื่อ-นามสกุล/i)).toBeInTheDocument();
      expect(screen.getByText(/กรุณากรอกเบอร์โทรศัพท์/i)).toBeInTheDocument();
      expect(screen.getByText(/กรุณากรอกอีเมล/i)).toBeInTheDocument();
    });

    // Step 3: Verify API was NOT called
    expect(mockSubmitLead).not.toHaveBeenCalled();

    // Step 4: Fill in valid data
    fireEvent.change(screen.getByLabelText(/ชื่อ-นามสกุล/i), {
      target: { value: 'สมชาย ใจดี' },
    });
    fireEvent.change(screen.getByLabelText(/เบอร์โทรศัพท์/i), {
      target: { value: '0812345678' },
    });
    fireEvent.change(screen.getByLabelText(/อีเมล/i), {
      target: { value: 'somchai@example.com' },
    });

    // Step 5: Verify errors are cleared
    await waitFor(() => {
      expect(screen.queryByText(/กรุณากรอกชื่อ-นามสกุล/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/กรุณากรอกเบอร์โทรศัพท์/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/กรุณากรอกอีเมล/i)).not.toBeInTheDocument();
    });
  });

  it('should handle API errors gracefully', async () => {
    // Mock API error
    mockSubmitLead.mockResolvedValue({
      success: false,
      error: 'เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์',
    });

    render(<LeadForm />);

    // Step 1: Fill out the form
    fireEvent.change(screen.getByLabelText(/ชื่อ-นามสกุล/i), {
      target: { value: 'สมชาย ใจดี' },
    });
    fireEvent.change(screen.getByLabelText(/เบอร์โทรศัพท์/i), {
      target: { value: '0812345678' },
    });
    fireEvent.change(screen.getByLabelText(/อีเมล/i), {
      target: { value: 'somchai@example.com' },
    });

    // Step 2: Submit the form
    fireEvent.click(screen.getByRole('button', { name: /ส่งข้อมูล/i }));

    // Step 3: Verify error message is displayed
    await waitFor(() => {
      expect(screen.getByText(/เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์/i)).toBeInTheDocument();
    });

    // Step 4: Verify form data is NOT reset (user can retry)
    expect(screen.getByLabelText(/ชื่อ-นามสกุล/i)).toHaveValue('สมชาย ใจดี');
    expect(screen.getByLabelText(/เบอร์โทรศัพท์/i)).toHaveValue('0812345678');
    expect(screen.getByLabelText(/อีเมล/i)).toHaveValue('somchai@example.com');
  });

  it('should handle network errors', async () => {
    // Mock network error
    mockSubmitLead.mockRejectedValue(new Error('Network error'));

    render(<LeadForm />);

    // Fill out and submit form
    fireEvent.change(screen.getByLabelText(/ชื่อ-นามสกุล/i), {
      target: { value: 'สมชาย ใจดี' },
    });
    fireEvent.change(screen.getByLabelText(/เบอร์โทรศัพท์/i), {
      target: { value: '0812345678' },
    });
    fireEvent.change(screen.getByLabelText(/อีเมล/i), {
      target: { value: 'somchai@example.com' },
    });

    fireEvent.click(screen.getByRole('button', { name: /ส่งข้อมูล/i }));

    // Verify error message is displayed
    await waitFor(() => {
      expect(screen.getByText(/เกิดข้อผิดพลาดที่ไม่คาดคิด/i)).toBeInTheDocument();
    });
  });

  it('should sanitize phone numbers with various formats', async () => {
    const testCases = [
      { input: '081-234-5678', expected: '0812345678' },
      { input: '081 234 5678', expected: '0812345678' },
      { input: '0812345678', expected: '0812345678' },
    ];

    for (const testCase of testCases) {
      vi.clearAllMocks();
      mockSubmitLead.mockResolvedValue({
        success: true,
        data: {
          id: 'lead-123',
          fullName: 'Test User',
          phone: testCase.expected,
          email: 'test@example.com',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      });

      const { unmount } = render(<LeadForm />);

      // Fill out form with formatted phone number
      fireEvent.change(screen.getByLabelText(/ชื่อ-นามสกุล/i), {
        target: { value: 'Test User' },
      });
      fireEvent.change(screen.getByLabelText(/เบอร์โทรศัพท์/i), {
        target: { value: testCase.input },
      });
      fireEvent.change(screen.getByLabelText(/อีเมล/i), {
        target: { value: 'test@example.com' },
      });

      // Submit form
      fireEvent.click(screen.getByRole('button', { name: /ส่งข้อมูล/i }));

      // Verify API was called with sanitized phone number
      await waitFor(() => {
        expect(mockSubmitLead).toHaveBeenCalledWith({
          fullName: 'Test User',
          phone: testCase.expected,
          email: 'test@example.com',
        });
      });

      unmount();
    }
  });

  it('should prevent multiple simultaneous submissions', async () => {
    mockSubmitLead.mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                success: true,
                data: {
                  id: 'lead-123',
                  fullName: 'Test User',
                  phone: '0812345678',
                  email: 'test@example.com',
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                },
              }),
            100
          )
        )
    );

    render(<LeadForm />);

    // Fill out form
    fireEvent.change(screen.getByLabelText(/ชื่อ-นามสกุล/i), {
      target: { value: 'Test User' },
    });
    fireEvent.change(screen.getByLabelText(/เบอร์โทรศัพท์/i), {
      target: { value: '0812345678' },
    });
    fireEvent.change(screen.getByLabelText(/อีเมล/i), {
      target: { value: 'test@example.com' },
    });

    const submitButton = screen.getByRole('button', { name: /ส่งข้อมูล/i });

    // Click submit button multiple times
    fireEvent.click(submitButton);
    fireEvent.click(submitButton);
    fireEvent.click(submitButton);

    // Verify button is disabled
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });

    // Verify API was called only once
    await waitFor(() => {
      expect(mockSubmitLead).toHaveBeenCalledTimes(1);
    });
  });
});
