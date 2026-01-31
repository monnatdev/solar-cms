/**
 * Integration Test: Authentication Flow
 * 
 * Tests the authentication flow for Payload CMS:
 * 1. Login to admin panel
 * 2. Access protected resources
 * 3. Logout
 * 
 * Note: This test simulates the authentication flow since Payload CMS
 * handles authentication internally. In a real E2E test, you would use
 * Playwright or Cypress to test the actual admin panel.
 * 
 * Validates Requirements: 11.1-11.5
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock authentication state
interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string;
    email: string;
    roles: string[];
  } | null;
  token: string | null;
}

// Mock authentication service
class MockAuthService {
  private state: AuthState = {
    isAuthenticated: false,
    user: null,
    token: null,
  };

  async login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Mock validation
    if (!email || !password) {
      return {
        success: false,
        error: 'กรุณากรอกอีเมลและรหัสผ่าน',
      };
    }

    // Mock successful login
    if (email === 'admin@example.com' && password === 'correct-password') {
      this.state = {
        isAuthenticated: true,
        user: {
          id: 'admin-123',
          email: 'admin@example.com',
          roles: ['admin'],
        },
        token: 'mock-jwt-token-123',
      };
      return { success: true };
    }

    // Mock failed login
    return {
      success: false,
      error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง',
    };
  }

  async logout(): Promise<void> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 50));

    this.state = {
      isAuthenticated: false,
      user: null,
      token: null,
    };
  }

  getAuthState(): AuthState {
    return { ...this.state };
  }

  isAuthenticated(): boolean {
    return this.state.isAuthenticated;
  }

  getToken(): string | null {
    return this.state.token;
  }

  async accessProtectedResource(resource: string): Promise<{ success: boolean; data?: any; error?: string }> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 50));

    if (!this.isAuthenticated()) {
      return {
        success: false,
        error: 'Unauthorized - Please login first',
      };
    }

    // Mock successful access
    return {
      success: true,
      data: {
        resource,
        message: 'Access granted',
      },
    };
  }
}

describe('Integration Test: Authentication Flow', () => {
  let authService: MockAuthService;

  beforeEach(() => {
    authService = new MockAuthService();
  });

  describe('Login Flow', () => {
    it('should successfully login with valid credentials', async () => {
      // Step 1: Verify initial state (not authenticated)
      expect(authService.isAuthenticated()).toBe(false);
      expect(authService.getAuthState().user).toBeNull();

      // Step 2: Attempt login with valid credentials
      const result = await authService.login('admin@example.com', 'correct-password');

      // Step 3: Verify login success
      expect(result.success).toBe(true);
      expect(result.error).toBeUndefined();

      // Step 4: Verify authentication state is updated
      expect(authService.isAuthenticated()).toBe(true);

      const authState = authService.getAuthState();
      expect(authState.user).not.toBeNull();
      expect(authState.user?.email).toBe('admin@example.com');
      expect(authState.user?.roles).toContain('admin');
      expect(authState.token).toBeTruthy();
    });

    it('should fail login with invalid credentials', async () => {
      // Step 1: Attempt login with invalid credentials
      const result = await authService.login('admin@example.com', 'wrong-password');

      // Step 2: Verify login failure
      expect(result.success).toBe(false);
      expect(result.error).toBe('อีเมลหรือรหัสผ่านไม่ถูกต้อง');

      // Step 3: Verify authentication state remains unchanged
      expect(authService.isAuthenticated()).toBe(false);
      expect(authService.getAuthState().user).toBeNull();
      expect(authService.getToken()).toBeNull();
    });

    it('should fail login with empty credentials', async () => {
      // Test empty email
      const result1 = await authService.login('', 'password');
      expect(result1.success).toBe(false);
      expect(result1.error).toBe('กรุณากรอกอีเมลและรหัสผ่าน');

      // Test empty password
      const result2 = await authService.login('admin@example.com', '');
      expect(result2.success).toBe(false);
      expect(result2.error).toBe('กรุณากรอกอีเมลและรหัสผ่าน');

      // Test both empty
      const result3 = await authService.login('', '');
      expect(result3.success).toBe(false);
      expect(result3.error).toBe('กรุณากรอกอีเมลและรหัสผ่าน');
    });
  });

  describe('Access Protected Resources', () => {
    it('should allow access to protected resources when authenticated', async () => {
      // Step 1: Login first
      await authService.login('admin@example.com', 'correct-password');
      expect(authService.isAuthenticated()).toBe(true);

      // Step 2: Access protected resource (e.g., leads list)
      const leadsResult = await authService.accessProtectedResource('leads');

      // Step 3: Verify access is granted
      expect(leadsResult.success).toBe(true);
      expect(leadsResult.data).toBeDefined();
      expect(leadsResult.data.resource).toBe('leads');
      expect(leadsResult.error).toBeUndefined();

      // Step 4: Access another protected resource (e.g., articles)
      const articlesResult = await authService.accessProtectedResource('articles');

      // Step 5: Verify access is granted
      expect(articlesResult.success).toBe(true);
      expect(articlesResult.data.resource).toBe('articles');
    });

    it('should deny access to protected resources when not authenticated', async () => {
      // Step 1: Verify not authenticated
      expect(authService.isAuthenticated()).toBe(false);

      // Step 2: Attempt to access protected resource
      const result = await authService.accessProtectedResource('leads');

      // Step 3: Verify access is denied
      expect(result.success).toBe(false);
      expect(result.error).toBe('Unauthorized - Please login first');
      expect(result.data).toBeUndefined();
    });

    it('should deny access after logout', async () => {
      // Step 1: Login
      await authService.login('admin@example.com', 'correct-password');
      expect(authService.isAuthenticated()).toBe(true);

      // Step 2: Verify can access protected resource
      const beforeLogout = await authService.accessProtectedResource('leads');
      expect(beforeLogout.success).toBe(true);

      // Step 3: Logout
      await authService.logout();
      expect(authService.isAuthenticated()).toBe(false);

      // Step 4: Attempt to access protected resource after logout
      const afterLogout = await authService.accessProtectedResource('leads');

      // Step 5: Verify access is denied
      expect(afterLogout.success).toBe(false);
      expect(afterLogout.error).toBe('Unauthorized - Please login first');
    });
  });

  describe('Logout Flow', () => {
    it('should successfully logout', async () => {
      // Step 1: Login first
      await authService.login('admin@example.com', 'correct-password');
      expect(authService.isAuthenticated()).toBe(true);
      expect(authService.getAuthState().user).not.toBeNull();
      expect(authService.getToken()).toBeTruthy();

      // Step 2: Logout
      await authService.logout();

      // Step 3: Verify authentication state is cleared
      expect(authService.isAuthenticated()).toBe(false);
      expect(authService.getAuthState().user).toBeNull();
      expect(authService.getToken()).toBeNull();
    });

    it('should handle logout when not authenticated', async () => {
      // Step 1: Verify not authenticated
      expect(authService.isAuthenticated()).toBe(false);

      // Step 2: Attempt logout (should not throw error)
      await expect(authService.logout()).resolves.not.toThrow();

      // Step 3: Verify state remains unchanged
      expect(authService.isAuthenticated()).toBe(false);
    });
  });

  describe('Complete Authentication Flow', () => {
    it('should complete full authentication cycle', async () => {
      // Step 1: Initial state - not authenticated
      expect(authService.isAuthenticated()).toBe(false);

      // Step 2: Attempt to access protected resource (should fail)
      const unauthorizedAccess = await authService.accessProtectedResource('leads');
      expect(unauthorizedAccess.success).toBe(false);

      // Step 3: Login with valid credentials
      const loginResult = await authService.login('admin@example.com', 'correct-password');
      expect(loginResult.success).toBe(true);
      expect(authService.isAuthenticated()).toBe(true);

      // Step 4: Access protected resource (should succeed)
      const authorizedAccess = await authService.accessProtectedResource('leads');
      expect(authorizedAccess.success).toBe(true);

      // Step 5: Access multiple protected resources
      const articlesAccess = await authService.accessProtectedResource('articles');
      expect(articlesAccess.success).toBe(true);

      const servicesAccess = await authService.accessProtectedResource('services');
      expect(servicesAccess.success).toBe(true);

      const reviewsAccess = await authService.accessProtectedResource('reviews');
      expect(reviewsAccess.success).toBe(true);

      // Step 6: Logout
      await authService.logout();
      expect(authService.isAuthenticated()).toBe(false);

      // Step 7: Attempt to access protected resource after logout (should fail)
      const afterLogoutAccess = await authService.accessProtectedResource('leads');
      expect(afterLogoutAccess.success).toBe(false);
    });

    it('should handle multiple login attempts', async () => {
      // Step 1: First login attempt (fail)
      const firstAttempt = await authService.login('admin@example.com', 'wrong-password');
      expect(firstAttempt.success).toBe(false);
      expect(authService.isAuthenticated()).toBe(false);

      // Step 2: Second login attempt (fail)
      const secondAttempt = await authService.login('wrong@example.com', 'correct-password');
      expect(secondAttempt.success).toBe(false);
      expect(authService.isAuthenticated()).toBe(false);

      // Step 3: Third login attempt (success)
      const thirdAttempt = await authService.login('admin@example.com', 'correct-password');
      expect(thirdAttempt.success).toBe(true);
      expect(authService.isAuthenticated()).toBe(true);

      // Step 4: Verify can access protected resources
      const access = await authService.accessProtectedResource('leads');
      expect(access.success).toBe(true);
    });
  });

  describe('Session Management', () => {
    it('should maintain authentication state across multiple requests', async () => {
      // Step 1: Login
      await authService.login('admin@example.com', 'correct-password');
      const initialToken = authService.getToken();

      // Step 2: Make multiple requests
      for (let i = 0; i < 5; i++) {
        const result = await authService.accessProtectedResource(`resource-${i}`);
        expect(result.success).toBe(true);

        // Verify token remains the same
        expect(authService.getToken()).toBe(initialToken);
      }

      // Step 3: Verify still authenticated
      expect(authService.isAuthenticated()).toBe(true);
    });

    it('should clear all authentication data on logout', async () => {
      // Step 1: Login and verify all auth data is set
      await authService.login('admin@example.com', 'correct-password');

      const beforeLogout = authService.getAuthState();
      expect(beforeLogout.isAuthenticated).toBe(true);
      expect(beforeLogout.user).not.toBeNull();
      expect(beforeLogout.token).not.toBeNull();

      // Step 2: Logout
      await authService.logout();

      // Step 3: Verify all auth data is cleared
      const afterLogout = authService.getAuthState();
      expect(afterLogout.isAuthenticated).toBe(false);
      expect(afterLogout.user).toBeNull();
      expect(afterLogout.token).toBeNull();
    });
  });

  describe('Role-Based Access', () => {
    it('should verify admin role after login', async () => {
      // Step 1: Login
      await authService.login('admin@example.com', 'correct-password');

      // Step 2: Verify user has admin role
      const authState = authService.getAuthState();
      expect(authState.user?.roles).toContain('admin');

      // Step 3: Verify can access admin-only resources
      const leadsAccess = await authService.accessProtectedResource('leads');
      expect(leadsAccess.success).toBe(true);
    });
  });
});
