# Utility Functions

This directory contains utility functions for the Solar Cell CMS frontend application.

## Files

### `image.ts`

Image optimization and responsive image utilities.

**Key Functions:**
- `generateSrcSet()` - Generate srcset for responsive images
- `generateSizes()` - Generate sizes attribute for responsive images
- `getOptimizedImageUrl()` - Get optimized image URL from Payload CMS
- `shouldLazyLoad()` - Determine if image should be lazy loaded
- `getLoadingAttribute()` - Get loading attribute value ('lazy' or 'eager')
- `getImageDimensions()` - Extract dimensions from media object
- `generateBlurDataUrl()` - Generate blur placeholder data URL
- `isValidImageType()` - Validate image MIME type
- `getImageAlt()` - Get alt text with fallback

**Usage Example:**
```typescript
import { generateSrcSet, getOptimizedImageUrl, getLoadingAttribute } from '@/lib/utils/image';

// Generate responsive srcset
const srcset = generateSrcSet('/media/hero.jpg', ['thumbnail', 'card', 'hero']);

// Get optimized image URL
const optimizedUrl = getOptimizedImageUrl('/media/image.jpg', 'card');

// Determine loading strategy
const loading = getLoadingAttribute(index); // 'lazy' or 'eager'
```

### `validation.ts`

Form validation utilities for lead forms and calculator inputs.

**Key Functions:**
- `validateLeadForm()` - Validate complete lead form data
- `validateFullName()` - Validate full name field
- `validatePhone()` - Validate phone number
- `validateEmail()` - Validate email address
- `validateCalculatorInput()` - Validate calculator form data
- `sanitizePhone()` - Remove spaces and dashes from phone number
- `formatValidationErrors()` - Format errors for display
- `hasValidationErrors()` - Check if errors exist

**Validation Patterns:**
- `VALIDATION_PATTERNS.phone` - Thai phone number (9-10 digits)
- `VALIDATION_PATTERNS.email` - Email format
- `VALIDATION_PATTERNS.name` - Name format (min 2 characters)

**Usage Example:**
```typescript
import { validateLeadForm, sanitizePhone } from '@/lib/utils/validation';

// Validate lead form
const errors = validateLeadForm({
  fullName: 'John Doe',
  phone: '081-234-5678',
  email: 'john@example.com'
});

if (errors.length > 0) {
  // Handle validation errors
  console.error('Validation failed:', errors);
}

// Sanitize phone number
const cleanPhone = sanitizePhone('081-234-5678'); // '0812345678'
```

## Constants

See `../constants/config.ts` for application-wide configuration constants.

## Requirements

These utilities validate the following requirements:
- **Requirement 13.2**: Image Optimization
- **Requirement 13.4**: Lazy Loading

## Testing

Unit tests for these utilities should be created in `__tests__/` directory:
- `__tests__/image.test.ts`
- `__tests__/validation.test.ts`

## Best Practices

1. **Image Optimization**
   - Always use `getOptimizedImageUrl()` for images from Payload CMS
   - Use `getLoadingAttribute()` to determine lazy loading strategy
   - Provide meaningful alt text using `getImageAlt()`

2. **Form Validation**
   - Validate on both client and server side
   - Use `sanitizePhone()` before submitting to API
   - Display user-friendly error messages from `VALIDATION_MESSAGES`

3. **Performance**
   - Lazy load images below the fold
   - Use responsive images with srcset
   - Implement blur placeholders for better UX

## Related Files

- `/lib/constants/config.ts` - Application configuration
- `/types/` - TypeScript type definitions
- `/lib/api/` - API client functions
