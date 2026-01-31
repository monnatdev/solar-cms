# Task 4.2 Complete: API Client Functions

## Summary

Successfully created comprehensive API client functions for interacting with the Payload CMS backend. All API modules include proper error handling, TypeScript types, and documentation.

## Files Created

### 1. Base API Client (`lib/api/payload.ts`)
- `getPayloadAPIURL()` - Get API URL from environment variables
- `PayloadAPIError` - Custom error class for API errors
- `payloadFetch()` - Base fetch wrapper with error handling
- `buildQueryString()` - Query parameter builder

**Features:**
- Automatic error handling for network and HTTP errors
- JSON parsing with error recovery
- Environment variable validation
- Type-safe fetch wrapper

### 2. Articles API (`lib/api/articles.ts`)
- `getArticles()` - Fetch all articles with filtering/pagination
- `getArticleById()` - Fetch single article by ID
- `getArticleBySlug()` - Fetch single article by slug
- `getPublishedArticles()` - Fetch only published articles
- `getRecentArticles()` - Fetch recent articles sorted by date

**Features:**
- Full pagination support
- Status filtering (draft/published)
- Slug-based lookup
- Sorting by publish date

### 3. Services API (`lib/api/services.ts`)
- `getServices()` - Fetch all services with filtering/pagination
- `getServiceById()` - Fetch single service by ID
- `getServiceBySlug()` - Fetch single service by slug
- `getPublishedServices()` - Fetch only published services
- `getAllPublishedServices()` - Fetch all published services (no pagination)

**Features:**
- Full pagination support
- Status filtering (draft/published)
- Slug-based lookup
- Convenience function for getting all services

### 4. Reviews API (`lib/api/reviews.ts`)
- `getReviews()` - Fetch all reviews with filtering/pagination
- `getReviewById()` - Fetch single review by ID
- `getPublishedReviews()` - Fetch only published reviews
- `getReviewsByService()` - Fetch reviews for a specific service
- `getPublishedReviewsByService()` - Fetch published reviews for a service
- `getRecentReviews()` - Fetch recent reviews sorted by date

**Features:**
- Full pagination support
- Status filtering (draft/published)
- Service relationship filtering
- Sorting by creation date

### 5. Leads API (`lib/api/leads.ts`)
- `submitLead()` - Submit new lead form
- `getLeadById()` - Fetch single lead by ID (Admin only)

**Features:**
- Automatic phone number sanitization
- User-friendly error messages in Thai
- Success/error response handling
- Admin-only read access

### 6. Index Export (`lib/api/index.ts`)
Central export point for all API functions

### 7. Documentation (`lib/api/README.md`)
Comprehensive documentation including:
- Usage examples for all functions
- Error handling patterns
- Next.js integration examples
- Query parameter documentation
- Best practices
- Troubleshooting guide

## Error Handling

All API functions include comprehensive error handling:

1. **Network Errors** - Caught and wrapped in `PayloadAPIError`
2. **HTTP Errors** - Parsed from response with detailed messages
3. **JSON Parsing Errors** - Handled gracefully with fallback messages
4. **Environment Errors** - Validation of required environment variables

## Type Safety

- Full TypeScript support with proper types
- Type inference for all function parameters and returns
- Compile-time checking for API calls
- Integration with existing type definitions

## Testing

Build completed successfully with no TypeScript errors:
```
✓ Compiled successfully in 1087.9ms
✓ Running TypeScript ...
✓ Generating static pages using 9 workers (4/4) in 158.0ms
```

## Requirements Validated

This task validates the following requirements:

- **Requirement 7.6** - Frontend SHALL ดึงข้อมูล Articles จาก Payload_CMS ผ่าน API ✅
- **Requirement 8.6** - Frontend SHALL ดึงข้อมูล Services จาก Payload_CMS ผ่าน API ✅
- **Requirement 9.6** - Frontend SHALL ดึงข้อมูล Reviews จาก Payload_CMS ผ่าน API ✅
- **Requirement 10.5** - Frontend SHALL บันทึกข้อมูลลง Payload_CMS ผ่าน API ✅

## API Endpoints Supported

### Articles
- `GET /api/articles` - List articles
- `GET /api/articles/:id` - Get article by ID
- `GET /api/articles?where[slug][equals]=:slug` - Get article by slug

### Services
- `GET /api/services` - List services
- `GET /api/services/:id` - Get service by ID
- `GET /api/services?where[slug][equals]=:slug` - Get service by slug

### Reviews
- `GET /api/reviews` - List reviews
- `GET /api/reviews/:id` - Get review by ID
- `GET /api/reviews?relatedService=:id` - Get reviews by service

### Leads
- `POST /api/leads` - Submit lead form
- `GET /api/leads/:id` - Get lead by ID (Admin only)

## Usage Example

```typescript
import { 
  getPublishedArticles, 
  getServiceBySlug, 
  submitLead 
} from '@/lib/api';

// Fetch articles
const articles = await getPublishedArticles({ limit: 10 });

// Get service by slug
const service = await getServiceBySlug('solar-installation');

// Submit lead form
const result = await submitLead({
  fullName: 'John Doe',
  phone: '0812345678',
  email: 'john@example.com'
});
```

## Next Steps

The API client is now ready to be used in:
- Page components (Server Components)
- Client components (with useEffect)
- API routes
- Server actions

Next tasks should focus on:
1. Creating UI components that use these API functions
2. Implementing pages for articles, services, and reviews
3. Creating the lead form component
4. Adding proper caching strategies for API calls

## Notes

- All functions include JSDoc comments for better IDE support
- Error messages are user-friendly and in Thai where appropriate
- Phone numbers are automatically sanitized before submission
- Query parameters are properly URL-encoded
- The API client follows Next.js best practices for data fetching
