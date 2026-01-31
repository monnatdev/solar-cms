/**
 * Tests for Solar Calculator API Route
 * 
 * Requirements: 2.5
 */

import { POST, GET } from './route';
import { NextRequest } from 'next/server';

// Helper function to create a mock NextRequest
function createMockRequest(body: any): NextRequest {
  const request = new NextRequest('http://localhost:3000/api/calculator', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return request;
}

describe('Calculator API Route', () => {
  describe('POST /api/calculator', () => {
    it('should return calculation results for valid input', async () => {
      const input = {
        locationType: 'residential',
        monthlyBill: 3000,
        electricSystem: 'single-phase',
        dayNightRatio: 60,
      };

      const request = createMockRequest(input);
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toHaveProperty('recommendedCapacity');
      expect(data.data).toHaveProperty('estimatedCost');
      expect(data.data).toHaveProperty('paybackPeriod');
      expect(data.data).toHaveProperty('monthlySavings');
      expect(data.data.recommendedCapacity).toBeGreaterThan(0);
      expect(data.data.estimatedCost).toBeGreaterThan(0);
      expect(data.data.paybackPeriod).toBeGreaterThan(0);
      expect(data.data.monthlySavings).toBeGreaterThan(0);
    });

    it('should return 400 for missing required fields', async () => {
      const input = {
        locationType: 'residential',
        // Missing monthlyBill, electricSystem, dayNightRatio
      };

      const request = createMockRequest(input);
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Missing required fields');
      expect(data.details.required).toContain('monthlyBill');
      expect(data.details.required).toContain('electricSystem');
      expect(data.details.required).toContain('dayNightRatio');
    });

    it('should return 400 for negative monthly bill', async () => {
      const input = {
        locationType: 'residential',
        monthlyBill: -100,
        electricSystem: 'single-phase',
        dayNightRatio: 60,
      };

      const request = createMockRequest(input);
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Validation failed');
      expect(data.details).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            field: 'monthlyBill',
            message: expect.stringContaining('มากกว่า 0'),
          }),
        ])
      );
    });

    it('should return 400 for day/night ratio out of range', async () => {
      const input = {
        locationType: 'residential',
        monthlyBill: 3000,
        electricSystem: 'single-phase',
        dayNightRatio: 150,
      };

      const request = createMockRequest(input);
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Validation failed');
      expect(data.details).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            field: 'dayNightRatio',
            message: expect.stringContaining('0-100'),
          }),
        ])
      );
    });

    it('should return 400 for invalid location type', async () => {
      const input = {
        locationType: 'invalid-type',
        monthlyBill: 3000,
        electricSystem: 'single-phase',
        dayNightRatio: 60,
      };

      const request = createMockRequest(input);
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Validation failed');
      expect(data.details).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            field: 'locationType',
          }),
        ])
      );
    });

    it('should return 400 for invalid electric system', async () => {
      const input = {
        locationType: 'residential',
        monthlyBill: 3000,
        electricSystem: 'invalid-system',
        dayNightRatio: 60,
      };

      const request = createMockRequest(input);
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Validation failed');
      expect(data.details).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            field: 'electricSystem',
          }),
        ])
      );
    });

    it('should handle commercial location type', async () => {
      const input = {
        locationType: 'commercial',
        monthlyBill: 10000,
        electricSystem: 'three-phase',
        dayNightRatio: 80,
      };

      const request = createMockRequest(input);
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data.recommendedCapacity).toBeGreaterThan(0);
    });

    it('should handle industrial location type', async () => {
      const input = {
        locationType: 'industrial',
        monthlyBill: 50000,
        electricSystem: 'three-phase',
        dayNightRatio: 90,
      };

      const request = createMockRequest(input);
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data.recommendedCapacity).toBeGreaterThan(0);
    });

    it('should handle edge case: 0% day usage', async () => {
      const input = {
        locationType: 'residential',
        monthlyBill: 3000,
        electricSystem: 'single-phase',
        dayNightRatio: 0,
      };

      const request = createMockRequest(input);
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      // With 0% day usage, capacity should be minimal or 0
      expect(data.data.recommendedCapacity).toBeGreaterThanOrEqual(0);
    });

    it('should handle edge case: 100% day usage', async () => {
      const input = {
        locationType: 'residential',
        monthlyBill: 3000,
        electricSystem: 'single-phase',
        dayNightRatio: 100,
      };

      const request = createMockRequest(input);
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data.recommendedCapacity).toBeGreaterThan(0);
    });
  });

  describe('GET /api/calculator', () => {
    it('should return API information', async () => {
      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.message).toBe('Solar Calculator API');
      expect(data.method).toBe('POST');
      expect(data.requiredFields).toBeDefined();
      expect(data.responseFields).toBeDefined();
    });
  });
});
