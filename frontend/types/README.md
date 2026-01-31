# TypeScript Types Documentation

This directory contains all TypeScript type definitions for the Solar Cell CMS frontend application.

## File Structure

- **`payload.ts`** - Base Payload CMS types (PayloadDocument, SEOMetadata, ContentStatus, etc.)
- **`media.ts`** - Media/upload types for images and videos
- **`article.ts`** - Article/blog post types
- **`service.ts`** - Service offering types
- **`review.ts`** - Installation review types
- **`lead.ts`** - Contact form lead types
- **`calculator.ts`** - Solar calculator types
- **`index.ts`** - Central export file for all types

## Usage

Import types from the central index file:

```typescript
import type {
  Article,
  Service,
  Review,
  Lead,
  CalculatorFormData,
  CalculatorResult,
} from '@/types';
```

Or import from specific files:

```typescript
import type { Article } from '@/types/article';
import type { Service } from '@/types/service';
```

## Type Categories

### Base Types (payload.ts)

- `PayloadDocument` - Base interface for all Payload collections
- `SEOMetadata` - SEO metadata structure
- `ContentStatus` - Content status enum ('draft' | 'published')
- `PaginatedResponse<T>` - Paginated API response wrapper
- `PayloadError` - API error response structure

### Media Types (media.ts)

- `Media` - Media document from Payload CMS
- `ImageSize` - Image size variant information
- `ImageSizeName` - Available image sizes ('thumbnail' | 'card' | 'hero')
- `MediaReference` - Media reference (ID or full object)

### Content Types

#### Articles (article.ts)
- `Article` - Full article document
- `ArticleCardProps` - Props for article card component
- `ArticleQueryParams` - Query parameters for fetching articles
- `RichTextContent` - Rich text content structure

#### Services (service.ts)
- `Service` - Full service document
- `ServiceCardProps` - Props for service card component
- `ServiceQueryParams` - Query parameters for fetching services
- `ServiceReference` - Service reference (ID or full object)
- `GalleryItem` - Gallery image item

#### Reviews (review.ts)
- `Review` - Full review document
- `ReviewCardProps` - Props for review card component
- `ReviewQueryParams` - Query parameters for fetching reviews
- `GalleryItem` - Gallery image item

### Form Types

#### Leads (lead.ts)
- `Lead` - Full lead document
- `LeadFormData` - Form data before submission
- `LeadFormValidationError` - Validation error structure
- `LeadFormValidation` - Validation rules
- `LeadSubmissionResponse` - API response after submission

#### Calculator (calculator.ts)
- `CalculatorFormData` - Calculator input data
- `CalculatorResult` - Calculator output data
- `LocationType` - Installation location type
- `ElectricSystem` - Electric system type
- `CalculatorConstants` - Calculation constants
- `LocationMultipliers` - Location-based multipliers
- `CalculatorValidationError` - Validation error structure

## Type Safety Best Practices

1. **Always use type imports** when importing types only:
   ```typescript
   import type { Article } from '@/types';
   ```

2. **Use strict typing** for component props:
   ```typescript
   interface MyComponentProps {
     article: Article;
     onSubmit: (data: LeadFormData) => void;
   }
   ```

3. **Leverage union types** for status and enums:
   ```typescript
   const status: ContentStatus = 'published'; // Type-safe!
   ```

4. **Use generic types** for paginated responses:
   ```typescript
   const response: PaginatedResponse<Article> = await fetchArticles();
   ```

## Requirements Mapping

These types satisfy the following requirements:

- **Requirements 7.6** - Article API integration types
- **Requirements 8.6** - Service API integration types
- **Requirements 9.6** - Review API integration types
- **Requirements 10.5** - Lead API integration types

## Notes

- All types are based on the Payload CMS schema defined in the backend
- Types include both API response structures and component prop interfaces
- Rich text content uses Payload's rich text format (flexible structure)
- Media references can be either string IDs or full Media objects (populated)
