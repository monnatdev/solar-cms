/**
 * LeadForm Component Tests
 * 
 * Tests for the LeadForm component including:
 * - Rendering of form fields
 * - Client-side validation
 * - Error message display
 * - Form submission
 * - Success/error states
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import LeadForm from './LeadForm';
import { submitLead } from '@/lib/api/leads';

// Mock the API module
vi.mock('@/lib/api/leads');

const mockSubmitLead = submitLead as ReturnType<typeof vi.fn>;

describe('LeadForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render all form fields', () => {
      render(<LeadForm />);

      // Check for form fields
      expect(screen.getByLabelText(/ชื่อ-นามสกุล/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/เบอร์โทรศัพท์/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/อีเมล/i)).toBeInTheDocument();
    });

    it('should render submit button', () => {
      render(<LeadForm />);

      const submitButton = screen.getByRole('button', { name: /ส่งข้อมูล/i });
      expect(submitButton).toBeInTheDocument();
      expect(submitButton).not.toBeDisabled();
    });

    it('should render header and description', () => {
      render(<LeadForm />);

      expect(screen.getByText(/ติดต่อเรา/i)).toBeInTheDocument();
      expect(screen.getByText(/สนใจติดตั้งโซล่าเซลล์/i)).toBeInTheDocument();
    });
  });

  describe('Validation', () => {
    it('should show error when full name is empty', async () => {
      render(<LeadForm />);

      const submitButton = screen.getByRole('button', { name: /ส่งข้อมูล/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/กรุณากรอกชื่อ-นามสกุล/i)).toBeInTheDocument();
      });
    });

    it('should show error when full name is too short', async () => {
      render(<LeadForm />);

      const fullNameInput = screen.getByLabelText(/ชื่อ-นามสกุล/i);
      fireEvent.change(fullNameInput, { target: { value: 'A' } });

      const submitButton = screen.getByRole('button', { name: /ส่งข้อมูล/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/อย่างน้อย 2 ตัวอักษร/i)).toBeInTheDocument();
      });
    });

    it('should show error when phone is empty', async () => {
      render(<LeadForm />);

      const submitButton = screen.getByRole('button', { name: /ส่งข้อมูล/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/กรุณากรอกเบอร์โทรศัพท์/i)).toBeInTheDocument();
      });
    });

    it('should show error when phone format is invalid', async () => {
      render(<LeadForm />);

      const phoneInput = screen.getByLabelText(/เบอร์โทรศัพท์/i);
      fireEvent.change(phoneInput, { target: { value: '123' } });

      const submitButton = screen.getByRole('button', { name: /ส่งข้อมูล/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/เบอร์โทรศัพท์ที่ถูกต้อง/i)).toBeInTheDocument();
      });
    });

    it('should show error when email is empty', async () => {
      render(<LeadForm />);

      const submitButton = screen.getByRole('button', { name: /ส่งข้อมูล/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/กรุณากรอกอีเมล/i)).toBeInTheDocument();
      });
    });

    it('should show error when email format is invalid', async () => {
      render(<LeadForm />);

      const emailInput = screen.getByLabelText(/อีเมล/i);
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

      const submitButton = screen.getByRole('button', { name: /ส่งข้อมูล/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/อีเมลที่ถูกต้อง/i)).toBeInTheDocument();
      });
    });

    it('should clear error when user starts typing', async () => {
      render(<LeadForm />);

      // Submit empty form to trigger errors
      const submitButton = screen.getByRole('button', { name: /ส่งข้อมูล/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/กรุณากรอกชื่อ-นามสกุล/i)).toBeInTheDocument();
      });

      // Start typing in full name field
      const fullNameInput = screen.getByLabelText(/ชื่อ-นามสกุล/i);
      fireEvent.change(fullNameInput, { target: { value: 'John' } });

      // Error should be cleared
      await waitFor(() => {
        expect(screen.queryByText(/กรุณากรอกชื่อ-นามสกุล/i)).not.toBeInTheDocument();
      });
    });
  });

  describe('Form Submission', () => {
    it('should submit form with valid data', async () => {
      mockSubmitLead.mockResolvedValue({
        success: true,
        data: {
          id: '123',
          fullName: 'John Doe',
          phone: '0812345678',
          email: 'john@example.com',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      });

      render(<LeadForm />);

      // Fill in form
      const fullNameInput = screen.getByLabelText(/ชื่อ-นามสกุล/i);
      const phoneInput = screen.getByLabelText(/เบอร์โทรศัพท์/i);
      const emailInput = screen.getByLabelText(/อีเมล/i);

      fireEvent.change(fullNameInput, { target: { value: 'John Doe' } });
      fireEvent.change(phoneInput, { target: { value: '0812345678' } });
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });

      // Submit form
      const submitButton = screen.getByRole('button', { name: /ส่งข้อมูล/i });
      fireEvent.click(submitButton);

      // Check loading state
      await waitFor(() => {
        expect(screen.getByText(/กำลังส่งข้อมูล/i)).toBeInTheDocument();
      });

      // Check success message
      await waitFor(() => {
        expect(screen.getByText(/ส่งข้อมูลสำเร็จ/i)).toBeInTheDocument();
      });

      // Check that API was called with correct data
      expect(mockSubmitLead).toHaveBeenCalledWith({
        fullName: 'John Doe',
        phone: '0812345678',
        email: 'john@example.com',
      });

      // Check that form is reset
      expect(fullNameInput).toHaveValue('');
      expect(phoneInput).toHaveValue('');
      expect(emailInput).toHaveValue('');
    });

    it('should sanitize phone number before submission', async () => {
      mockSubmitLead.mockResolvedValue({
        success: true,
        data: {
          id: '123',
          fullName: 'John Doe',
          phone: '0812345678',
          email: 'john@example.com',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      });

      render(<LeadForm />);

      // Fill in form with phone number containing spaces and dashes
      fireEvent.change(screen.getByLabelText(/ชื่อ-นามสกุล/i), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByLabelText(/เบอร์โทรศัพท์/i), { target: { value: '081-234-5678' } });
      fireEvent.change(screen.getByLabelText(/อีเมล/i), { target: { value: 'john@example.com' } });

      // Submit form
      fireEvent.click(screen.getByRole('button', { name: /ส่งข้อมูล/i }));

      // Check that API was called with sanitized phone number
      await waitFor(() => {
        expect(mockSubmitLead).toHaveBeenCalledWith({
          fullName: 'John Doe',
          phone: '0812345678', // Sanitized (no dashes)
          email: 'john@example.com',
        });
      });
    });

    it('should show error message when submission fails', async () => {
      mockSubmitLead.mockResolvedValue({
        success: false,
        error: 'เกิดข้อผิดพลาดในการส่งข้อมูล',
      });

      render(<LeadForm />);

      // Fill in form
      fireEvent.change(screen.getByLabelText(/ชื่อ-นามสกุล/i), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByLabelText(/เบอร์โทรศัพท์/i), { target: { value: '0812345678' } });
      fireEvent.change(screen.getByLabelText(/อีเมล/i), { target: { value: 'john@example.com' } });

      // Submit form
      fireEvent.click(screen.getByRole('button', { name: /ส่งข้อมูล/i }));

      // Check error message
      await waitFor(() => {
        expect(screen.getByText(/เกิดข้อผิดพลาดในการส่งข้อมูล/i)).toBeInTheDocument();
      });
    });

    it('should disable submit button while submitting', async () => {
      mockSubmitLead.mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(
              () =>
                resolve({
                  success: true,
                  data: {
                    id: '123',
                    fullName: 'John Doe',
                    phone: '0812345678',
                    email: 'john@example.com',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                  },
                }),
              100
            )
          )
      );

      render(<LeadForm />);

      // Fill in form
      fireEvent.change(screen.getByLabelText(/ชื่อ-นามสกุล/i), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByLabelText(/เบอร์โทรศัพท์/i), { target: { value: '0812345678' } });
      fireEvent.change(screen.getByLabelText(/อีเมล/i), { target: { value: 'john@example.com' } });

      // Submit form
      const submitButton = screen.getByRole('button', { name: /ส่งข้อมูล/i });
      fireEvent.click(submitButton);

      // Check that button is disabled during submission
      await waitFor(() => {
        expect(submitButton).toBeDisabled();
      });

      // Wait for submission to complete
      await waitFor(() => {
        expect(submitButton).not.toBeDisabled();
      });
    });

    it('should not submit form with invalid data', async () => {
      render(<LeadForm />);

      // Fill in form with invalid data
      fireEvent.change(screen.getByLabelText(/ชื่อ-นามสกุล/i), { target: { value: 'A' } }); // Too short
      fireEvent.change(screen.getByLabelText(/เบอร์โทรศัพท์/i), { target: { value: '123' } }); // Invalid format
      fireEvent.change(screen.getByLabelText(/อีเมล/i), { target: { value: 'invalid' } }); // Invalid format

      // Submit form
      fireEvent.click(screen.getByRole('button', { name: /ส่งข้อมูล/i }));

      // Check that API was not called
      await waitFor(() => {
        expect(mockSubmitLead).not.toHaveBeenCalled();
      });

      // Check that errors are displayed
      expect(screen.getByText(/อย่างน้อย 2 ตัวอักษร/i)).toBeInTheDocument();
      expect(screen.getByText(/เบอร์โทรศัพท์ที่ถูกต้อง/i)).toBeInTheDocument();
      expect(screen.getByText(/อีเมลที่ถูกต้อง/i)).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes for invalid fields', async () => {
      render(<LeadForm />);

      // Submit empty form to trigger errors
      fireEvent.click(screen.getByRole('button', { name: /ส่งข้อมูล/i }));

      await waitFor(() => {
        const fullNameInput = screen.getByLabelText(/ชื่อ-นามสกุล/i);
        expect(fullNameInput).toHaveAttribute('aria-invalid', 'true');
        expect(fullNameInput).toHaveAttribute('aria-describedby', 'fullName-error');
      });
    });

    it('should have proper labels for all inputs', () => {
      render(<LeadForm />);

      expect(screen.getByLabelText(/ชื่อ-นามสกุล/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/เบอร์โทรศัพท์/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/อีเมล/i)).toBeInTheDocument();
    });
  });
});
