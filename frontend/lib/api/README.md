# Payload CMS API Client

This directory contains API client functions for interacting with the Payload CMS backend.

## Overview

The API client is organized into separate modules for each collection:

- **payload.ts** - Base API utilities and error handling
- **articles.ts** - Articles/blog posts API
- **services.ts** - Business services API
- **reviews.ts** - Installation reviews API
- **leads.ts** - Lead form submissions API

## Configuration

Set the Payload CMS API URL in your environment variables:

```bash
NEXT_PUBLIC_PAYLOAD_API_URL=http://localhost:3001
```

## Usage Examples

### Articles

```typescript
import { getArticles, getArticleBySlug, getRecentArticles } from '@/lib/api';

// Get all published articles
const articles = await getArticles({ status: 'published', limit: 10 });

// Get article by slug
const article = await getArticleBySlug('my-article-slug');

// Get recent articles
const recent = await getRecentArticles(5);
```

### Services

```typescript
import { getServices, getServiceBySlug, getAllPublishedServices } from '@/lib/api';

// Get all published services
const services = await getPublishedServices({ limit: 10 });

// Get service by slug
const service = await getServiceBySlug('solar-installation');

// Get all services (for navigation)
const allServices = await getAllPublishedServices();
```

### Reviews

```typescript
import { getReviews, getReviewsByService, getRecentReviews } from '@/lib/api';

// Get all published reviews
const reviews = await getPublishedReviews({ limit: 10 });

// Get reviews for a specific service
const serviceReviews = await getPublishedReviewsByService('service-id');

// Get recent reviews
const recent = await getRecentReviews(6);
```

### Leads

```typescript
import { submitLead } from '@/lib/api';

// Submit a lead form
const result = await submitLead({
  fullName: 'John Doe',
  phone: '0812345678',
  email: 'john@example.com'
});

if (result.success) {
  console.log('Lead submitted successfully:', result.data);
} else {
  console.error('Submission failed:', result.error);
}
```

## Error Handling

All API functions include comprehensive error handling:

```typescript
import { PayloadAPIError } from '@/lib/api';

try {
  const articles = await getArticles();
} catch (error) {
  if (error instanceof PayloadAPIError) {
    console.error('API Error:', error.message);
    console.error('Status Code:', error.statusCode);
    console.error('Errors:', error.errors);
  } else {
    console.error('Unknown error:', error);
  }
}
```

## Features

### Automatic Error Handling
- Network errors are caught and wrapped in `PayloadAPIError`
- HTTP error responses are parsed and include detailed error messages
- User-friendly error messages for common scenarios

### Type Safety
- Full TypeScript support with proper types for all functions
- Type inference for query parameters and responses
- Compile-time checking for API calls

### Query Building
- Automatic query string construction from parameters
- Support for filtering, pagination, and sorting
- URL encoding for special characters

### Data Sanitization
- Phone numbers are automatically sanitized (spaces and dashes removed)
- Input validation before API calls

## API Endpoints

The client interacts with these Payload CMS endpoints:

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

## Query Parameters

All list endpoints support these query parameters:

- `status` - Filter by status ('draft' | 'published')
- `limit` - Number of items per page (default: 10)
- `page` - Page number (default: 1)
- `sort` - Sort field (prefix with '-' for descending)

Example:
```typescript
const articles = await getArticles({
  status: 'published',
  limit: 20,
  page: 1,
  sort: '-publishedDate'
});
```

## Response Format

All list endpoints return a paginated response:

```typescript
{
  docs: T[],              // Array of documents
  totalDocs: number,      // Total number of documents
  limit: number,          // Items per page
  totalPages: number,     // Total number of pages
  page: number,           // Current page
  pagingCounter: number,  // Starting index
  hasPrevPage: boolean,   // Has previous page
  hasNextPage: boolean,   // Has next page
  prevPage: number | null,// Previous page number
  nextPage: number | null // Next page number
}
```

## Best Practices

1. **Use specific functions** - Use `getPublishedArticles()` instead of `getArticles({ status: 'published' })`
2. **Handle errors** - Always wrap API calls in try-catch blocks
3. **Cache responses** - Use Next.js caching strategies for better performance
4. **Validate input** - Validate form data before calling API functions
5. **Use TypeScript** - Leverage type safety for better development experience

## Next.js Integration

### Server Components (Recommended)

```typescript
// app/articles/page.tsx
import { getPublishedArticles } from '@/lib/api';

export default async function ArticlesPage() {
  const articles = await getPublishedArticles({ limit: 10 });
  
  return (
    <div>
      {articles.docs.map(article => (
        <ArticleCard key={article.id} {...article} />
      ))}
    </div>
  );
}
```

### Client Components

```typescript
'use client';

import { useEffect, useState } from 'react';
import { getPublishedArticles } from '@/lib/api';
import type { Article } from '@/types';

export default function ArticlesList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await getPublishedArticles({ limit: 10 });
        setArticles(response.docs);
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchArticles();
  }, []);
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      {articles.map(article => (
        <ArticleCard key={article.id} {...article} />
      ))}
    </div>
  );
}
```

### API Routes

```typescript
// app/api/contact/route.ts
import { submitLead } from '@/lib/api';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();
  const result = await submitLead(data);
  
  if (result.success) {
    return NextResponse.json(result.data, { status: 201 });
  } else {
    return NextResponse.json(
      { error: result.error },
      { status: 400 }
    );
  }
}
```

## Testing

The API client includes comprehensive error handling and can be tested with:

```typescript
import { getArticles, PayloadAPIError } from '@/lib/api';

describe('Articles API', () => {
  it('should fetch articles', async () => {
    const articles = await getArticles({ limit: 5 });
    expect(articles.docs).toHaveLength(5);
  });
  
  it('should handle errors', async () => {
    await expect(getArticleById('invalid-id')).rejects.toThrow(PayloadAPIError);
  });
});
```

## Troubleshooting

### Environment Variable Not Set
```
Error: NEXT_PUBLIC_PAYLOAD_API_URL environment variable is not set
```
**Solution:** Create a `.env.local` file with `NEXT_PUBLIC_PAYLOAD_API_URL=http://localhost:3001`

### Network Error
```
Network error: Failed to fetch
```
**Solution:** Ensure Payload CMS backend is running and accessible

### CORS Error
```
Access to fetch has been blocked by CORS policy
```
**Solution:** Configure CORS in Payload CMS to allow requests from your frontend domain

### 404 Not Found
```
API Error: 404 Not Found
```
**Solution:** Check that the endpoint exists and the ID/slug is correct
