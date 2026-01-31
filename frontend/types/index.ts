/**
 * Central export file for all TypeScript types
 * Import types from this file in your components and utilities
 */

// Base Payload types
export type {
  PayloadDocument,
  SEOMetadata,
  ContentStatus,
  PaginatedResponse,
  PayloadError,
} from './payload';

// Media types
export type {
  ImageSize,
  ImageSizeName,
  Media,
  MediaReference,
} from './media';

// Article types
export type {
  RichTextContent as ArticleRichTextContent,
  Article,
  ArticleCardProps,
  ArticleQueryParams,
} from './article';

// Service types
export type {
  RichTextContent as ServiceRichTextContent,
  GalleryItem as ServiceGalleryItem,
  Service,
  ServiceCardProps,
  ServiceQueryParams,
  ServiceReference,
} from './service';

// Review types
export type {
  GalleryItem as ReviewGalleryItem,
  Review,
  ReviewCardProps,
  ReviewQueryParams,
} from './review';

// Lead types
export type {
  Lead,
  LeadFormData,
  LeadFormValidationError,
  LeadFormValidation,
  LeadSubmissionResponse,
} from './lead';

// Calculator types
export type {
  LocationType,
  ElectricSystem,
  CalculatorFormData,
  CalculatorResult,
  CalculatorConstants,
  LocationMultipliers,
  CalculatorValidationError,
} from './calculator';
