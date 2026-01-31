/**
 * API Client exports
 * Central export point for all Payload CMS API functions
 */

// Base API utilities
export {
  getPayloadAPIURL,
  PayloadAPIError,
  payloadFetch,
  buildQueryString,
} from './payload';

// Articles API
export {
  getArticles,
  getArticleById,
  getArticleBySlug,
  getPublishedArticles,
  getRecentArticles,
} from './articles';

// Services API
export {
  getServices,
  getServiceById,
  getServiceBySlug,
  getPublishedServices,
  getAllPublishedServices,
} from './services';

// Reviews API
export {
  getReviews,
  getReviewById,
  getPublishedReviews,
  getAllPublishedReviews,
  getReviewsByService,
  getPublishedReviewsByService,
  getRecentReviews,
} from './reviews';

// Leads API
export {
  submitLead,
  getLeadById,
} from './leads';
