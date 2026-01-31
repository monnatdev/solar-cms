/**
 * API Client Verification Script
 * Verifies that all API client functions are properly exported and typed
 */

import {
  // Base utilities
  getPayloadAPIURL,
  PayloadAPIError,
  payloadFetch,
  buildQueryString,
  
  // Articles
  getArticles,
  getArticleById,
  getArticleBySlug,
  getPublishedArticles,
  getRecentArticles,
  
  // Services
  getServices,
  getServiceById,
  getServiceBySlug,
  getPublishedServices,
  getAllPublishedServices,
  
  // Reviews
  getReviews,
  getReviewById,
  getPublishedReviews,
  getReviewsByService,
  getPublishedReviewsByService,
  getRecentReviews,
  
  // Leads
  submitLead,
  getLeadById,
} from './index';

/**
 * Verification results
 */
interface VerificationResult {
  category: string;
  functions: string[];
  status: 'OK' | 'ERROR';
  error?: string;
}

/**
 * Verify that all functions are properly exported
 */
function verifyExports(): VerificationResult[] {
  const results: VerificationResult[] = [];
  
  // Base utilities
  results.push({
    category: 'Base Utilities',
    functions: [
      'getPayloadAPIURL',
      'PayloadAPIError',
      'payloadFetch',
      'buildQueryString',
    ],
    status: typeof getPayloadAPIURL === 'function' &&
            typeof PayloadAPIError === 'function' &&
            typeof payloadFetch === 'function' &&
            typeof buildQueryString === 'function'
      ? 'OK'
      : 'ERROR',
  });
  
  // Articles API
  results.push({
    category: 'Articles API',
    functions: [
      'getArticles',
      'getArticleById',
      'getArticleBySlug',
      'getPublishedArticles',
      'getRecentArticles',
    ],
    status: typeof getArticles === 'function' &&
            typeof getArticleById === 'function' &&
            typeof getArticleBySlug === 'function' &&
            typeof getPublishedArticles === 'function' &&
            typeof getRecentArticles === 'function'
      ? 'OK'
      : 'ERROR',
  });
  
  // Services API
  results.push({
    category: 'Services API',
    functions: [
      'getServices',
      'getServiceById',
      'getServiceBySlug',
      'getPublishedServices',
      'getAllPublishedServices',
    ],
    status: typeof getServices === 'function' &&
            typeof getServiceById === 'function' &&
            typeof getServiceBySlug === 'function' &&
            typeof getPublishedServices === 'function' &&
            typeof getAllPublishedServices === 'function'
      ? 'OK'
      : 'ERROR',
  });
  
  // Reviews API
  results.push({
    category: 'Reviews API',
    functions: [
      'getReviews',
      'getReviewById',
      'getPublishedReviews',
      'getReviewsByService',
      'getPublishedReviewsByService',
      'getRecentReviews',
    ],
    status: typeof getReviews === 'function' &&
            typeof getReviewById === 'function' &&
            typeof getPublishedReviews === 'function' &&
            typeof getReviewsByService === 'function' &&
            typeof getPublishedReviewsByService === 'function' &&
            typeof getRecentReviews === 'function'
      ? 'OK'
      : 'ERROR',
  });
  
  // Leads API
  results.push({
    category: 'Leads API',
    functions: [
      'submitLead',
      'getLeadById',
    ],
    status: typeof submitLead === 'function' &&
            typeof getLeadById === 'function'
      ? 'OK'
      : 'ERROR',
  });
  
  return results;
}

/**
 * Test basic functionality
 */
function testBasicFunctionality(): VerificationResult[] {
  const results: VerificationResult[] = [];
  
  // Test buildQueryString
  try {
    const queryString = buildQueryString({
      status: 'published',
      limit: 10,
      page: 1,
    });
    
    results.push({
      category: 'buildQueryString',
      functions: ['buildQueryString'],
      status: queryString === '?status=published&limit=10&page=1' ? 'OK' : 'ERROR',
      error: queryString !== '?status=published&limit=10&page=1'
        ? `Expected "?status=published&limit=10&page=1", got "${queryString}"`
        : undefined,
    });
  } catch (error) {
    results.push({
      category: 'buildQueryString',
      functions: ['buildQueryString'],
      status: 'ERROR',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
  
  // Test PayloadAPIError
  try {
    const error = new PayloadAPIError('Test error', 404, [
      { message: 'Not found', field: 'id' },
    ]);
    
    results.push({
      category: 'PayloadAPIError',
      functions: ['PayloadAPIError'],
      status: error.message === 'Test error' &&
              error.statusCode === 404 &&
              error.errors?.length === 1
        ? 'OK'
        : 'ERROR',
    });
  } catch (error) {
    results.push({
      category: 'PayloadAPIError',
      functions: ['PayloadAPIError'],
      status: 'ERROR',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
  
  return results;
}

/**
 * Print verification results
 */
function printResults(results: VerificationResult[]): void {
  console.log('\n=== API Client Verification Results ===\n');
  
  let allPassed = true;
  
  results.forEach((result) => {
    const statusIcon = result.status === 'OK' ? '✓' : '✗';
    const statusColor = result.status === 'OK' ? '\x1b[32m' : '\x1b[31m';
    const resetColor = '\x1b[0m';
    
    console.log(`${statusColor}${statusIcon}${resetColor} ${result.category}`);
    console.log(`  Functions: ${result.functions.join(', ')}`);
    
    if (result.error) {
      console.log(`  Error: ${result.error}`);
      allPassed = false;
    }
    
    console.log('');
  });
  
  console.log('=== Summary ===');
  console.log(`Total categories: ${results.length}`);
  console.log(`Passed: ${results.filter(r => r.status === 'OK').length}`);
  console.log(`Failed: ${results.filter(r => r.status === 'ERROR').length}`);
  
  if (allPassed) {
    console.log('\n✓ All verifications passed!\n');
  } else {
    console.log('\n✗ Some verifications failed!\n');
    process.exit(1);
  }
}

/**
 * Run verification
 */
function runVerification(): void {
  console.log('Starting API Client verification...\n');
  
  const exportResults = verifyExports();
  const functionalityResults = testBasicFunctionality();
  
  const allResults = [...exportResults, ...functionalityResults];
  
  printResults(allResults);
}

// Run verification if this file is executed directly
if (require.main === module) {
  runVerification();
}

export { verifyExports, testBasicFunctionality, printResults, runVerification };
