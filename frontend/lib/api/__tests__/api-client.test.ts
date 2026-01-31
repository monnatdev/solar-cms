/**
 * API Client Tests
 * Tests for all API client functions
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  getPayloadAPIURL,
  PayloadAPIError,
  buildQueryString,
} from '../payload';
import {
  getArticles,
  getArticleById,
  getArticleBySlug,
  getPublishedArticles,
  getRecentArticles,
} from '../articles';
import {
  getServices,
  getServiceById,
  getServiceBySlug,
  getPublishedServices,
  getAllPublishedServices,
} from '../services';
import {
  getReviews,
  getReviewById,
  getPublishedReviews,
  getReviewsByService,
  getPublishedReviewsByService,
  getRecentReviews,
} from '../reviews';
import {
  submitLead,
  getLeadById,
} from '../leads';

// Mock fetch globally
global.fetch = vi.fn();

describe('Payload API Client', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.NEXT_PUBLIC_PAYLOAD_API_URL = 'http://localhost:3001';
  });

  describe('Base API utilities', () => {
    it('should get Payload API URL from environment', () => {
      const url = getPayloadAPIURL();
      expect(url).toBe('http://localhost:3001');
    });

    it('should throw error if API URL is not set', () => {
      delete process.env.NEXT_PUBLIC_PAYLOAD_API_URL;
      expect(() => getPayloadAPIURL()).toThrow(
        'NEXT_PUBLIC_PAYLOAD_API_URL environment variable is not set'
      );
    });

    it('should build query string from parameters', () => {
      const params = {
        status: 'published',
        limit: 10,
        page: 1,
      };
      const queryString = buildQueryString(params);
      expect(queryString).toBe('?status=published&limit=10&page=1');
    });

    it('should handle empty parameters', () => {
      const queryString = buildQueryString({});
      expect(queryString).toBe('');
    });

    it('should skip undefined and null values', () => {
      const params = {
        status: 'published',
        limit: undefined,
        page: null,
      };
      const queryString = buildQueryString(params);
      expect(queryString).toBe('?status=published');
    });
  });

  describe('PayloadAPIError', () => {
    it('should create error with message', () => {
      const error = new PayloadAPIError('Test error');
      expect(error.message).toBe('Test error');
      expect(error.name).toBe('PayloadAPIError');
    });

    it('should include status code', () => {
      const error = new PayloadAPIError('Not found', 404);
      expect(error.statusCode).toBe(404);
    });

    it('should include error details', () => {
      const errors = [{ message: 'Validation failed', field: 'email' }];
      const error = new PayloadAPIError('Validation error', 400, errors);
      expect(error.errors).toEqual(errors);
    });
  });

  describe('Articles API', () => {
    it('should fetch articles', async () => {
      const mockResponse = {
        docs: [
          { id: '1', title: 'Article 1', status: 'published' },
          { id: '2', title: 'Article 2', status: 'published' },
        ],
        totalDocs: 2,
        limit: 10,
        page: 1,
        totalPages: 1,
      };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await getArticles({ limit: 10 });
      expect(result.docs).toHaveLength(2);
      expect(result.totalDocs).toBe(2);
    });

    it('should fetch article by ID', async () => {
      const mockArticle = { id: '1', title: 'Article 1', status: 'published' };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockArticle,
      });

      const result = await getArticleById('1');
      expect(result.id).toBe('1');
      expect(result.title).toBe('Article 1');
    });

    it('should fetch article by slug', async () => {
      const mockResponse = {
        docs: [{ id: '1', title: 'Article 1', slug: 'article-1' }],
        totalDocs: 1,
      };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await getArticleBySlug('article-1');
      expect(result).not.toBeNull();
      expect(result?.slug).toBe('article-1');
    });

    it('should return null if article not found by slug', async () => {
      const mockResponse = {
        docs: [],
        totalDocs: 0,
      };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await getArticleBySlug('non-existent');
      expect(result).toBeNull();
    });

    it('should fetch published articles only', async () => {
      const mockResponse = {
        docs: [{ id: '1', title: 'Article 1', status: 'published' }],
        totalDocs: 1,
      };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await getPublishedArticles({ limit: 10 });
      expect(result.docs).toHaveLength(1);
      expect(result.docs[0].status).toBe('published');
    });

    it('should fetch recent articles', async () => {
      const mockResponse = {
        docs: [
          { id: '1', title: 'Recent Article', publishedDate: '2024-01-01' },
        ],
        totalDocs: 1,
      };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await getRecentArticles(5);
      expect(result.docs).toHaveLength(1);
    });
  });

  describe('Services API', () => {
    it('should fetch services', async () => {
      const mockResponse = {
        docs: [
          { id: '1', title: 'Service 1', status: 'published' },
          { id: '2', title: 'Service 2', status: 'published' },
        ],
        totalDocs: 2,
      };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await getServices({ limit: 10 });
      expect(result.docs).toHaveLength(2);
    });

    it('should fetch service by ID', async () => {
      const mockService = { id: '1', title: 'Service 1', status: 'published' };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockService,
      });

      const result = await getServiceById('1');
      expect(result.id).toBe('1');
    });

    it('should fetch service by slug', async () => {
      const mockResponse = {
        docs: [{ id: '1', title: 'Service 1', slug: 'service-1' }],
        totalDocs: 1,
      };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await getServiceBySlug('service-1');
      expect(result).not.toBeNull();
      expect(result?.slug).toBe('service-1');
    });

    it('should fetch all published services', async () => {
      const mockResponse = {
        docs: [
          { id: '1', title: 'Service 1', status: 'published' },
          { id: '2', title: 'Service 2', status: 'published' },
        ],
        totalDocs: 2,
      };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await getAllPublishedServices();
      expect(result).toHaveLength(2);
    });
  });

  describe('Reviews API', () => {
    it('should fetch reviews', async () => {
      const mockResponse = {
        docs: [
          { id: '1', title: 'Review 1', status: 'published' },
          { id: '2', title: 'Review 2', status: 'published' },
        ],
        totalDocs: 2,
      };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await getReviews({ limit: 10 });
      expect(result.docs).toHaveLength(2);
    });

    it('should fetch review by ID', async () => {
      const mockReview = { id: '1', title: 'Review 1', status: 'published' };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockReview,
      });

      const result = await getReviewById('1');
      expect(result.id).toBe('1');
    });

    it('should fetch reviews by service', async () => {
      const mockResponse = {
        docs: [
          { id: '1', title: 'Review 1', relatedService: 'service-1' },
        ],
        totalDocs: 1,
      };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await getReviewsByService('service-1');
      expect(result.docs).toHaveLength(1);
    });

    it('should fetch published reviews by service', async () => {
      const mockResponse = {
        docs: [
          {
            id: '1',
            title: 'Review 1',
            relatedService: 'service-1',
            status: 'published',
          },
        ],
        totalDocs: 1,
      };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await getPublishedReviewsByService('service-1');
      expect(result.docs).toHaveLength(1);
      expect(result.docs[0].status).toBe('published');
    });

    it('should fetch recent reviews', async () => {
      const mockResponse = {
        docs: [{ id: '1', title: 'Recent Review', createdAt: '2024-01-01' }],
        totalDocs: 1,
      };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await getRecentReviews(6);
      expect(result.docs).toHaveLength(1);
    });
  });

  describe('Leads API', () => {
    it('should submit lead successfully', async () => {
      const mockLead = {
        id: '1',
        fullName: 'John Doe',
        phone: '0812345678',
        email: 'john@example.com',
      };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ doc: mockLead }),
      });

      const result = await submitLead({
        fullName: 'John Doe',
        phone: '081-234-5678',
        email: 'john@example.com',
      });

      expect(result.success).toBe(true);
      expect(result.data?.id).toBe('1');
    });

    it('should sanitize phone number before submission', async () => {
      const mockLead = {
        id: '1',
        fullName: 'John Doe',
        phone: '0812345678',
        email: 'john@example.com',
      };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ doc: mockLead }),
      });

      await submitLead({
        fullName: 'John Doe',
        phone: '081-234-5678',
        email: 'john@example.com',
      });

      const fetchCall = (global.fetch as any).mock.calls[0];
      const body = JSON.parse(fetchCall[1].body);
      expect(body.phone).toBe('0812345678');
    });

    it('should handle submission error', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        json: async () => ({
          errors: [{ message: 'Invalid phone number' }],
        }),
      });

      const result = await submitLead({
        fullName: 'John Doe',
        phone: '123',
        email: 'john@example.com',
      });

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should fetch lead by ID', async () => {
      const mockLead = {
        id: '1',
        fullName: 'John Doe',
        phone: '0812345678',
        email: 'john@example.com',
      };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockLead,
      });

      const result = await getLeadById('1');
      expect(result.id).toBe('1');
    });
  });

  describe('Error handling', () => {
    it('should handle network errors', async () => {
      (global.fetch as any).mockRejectedValueOnce(
        new Error('Network error')
      );

      await expect(getArticles()).rejects.toThrow(PayloadAPIError);
    });

    it('should handle HTTP errors', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        json: async () => ({
          errors: [{ message: 'Article not found' }],
        }),
      });

      await expect(getArticleById('999')).rejects.toThrow(PayloadAPIError);
    });

    it('should handle JSON parsing errors', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: async () => {
          throw new Error('Invalid JSON');
        },
      });

      await expect(getArticles()).rejects.toThrow(PayloadAPIError);
    });
  });
});
