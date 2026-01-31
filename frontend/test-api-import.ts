// Quick test to verify API client imports work correctly
import {
  getPayloadAPIURL,
  PayloadAPIError,
  getArticles,
  getArticleById,
  getArticleBySlug,
  getPublishedArticles,
  getRecentArticles,
  getServices,
  getServiceById,
  getServiceBySlug,
  getPublishedServices,
  getAllPublishedServices,
  getReviews,
  getReviewById,
  getPublishedReviews,
  getReviewsByService,
  getPublishedReviewsByService,
  getRecentReviews,
  submitLead,
  getLeadById,
} from './lib/api/index';

console.log('All API functions imported successfully!');
console.log('Available functions:', {
  base: ['getPayloadAPIURL', 'PayloadAPIError'],
  articles: ['getArticles', 'getArticleById', 'getArticleBySlug', 'getPublishedArticles', 'getRecentArticles'],
  services: ['getServices', 'getServiceById', 'getServiceBySlug', 'getPublishedServices', 'getAllPublishedServices'],
  reviews: ['getReviews', 'getReviewById', 'getPublishedReviews', 'getReviewsByService', 'getPublishedReviewsByService', 'getRecentReviews'],
  leads: ['submitLead', 'getLeadById'],
});
