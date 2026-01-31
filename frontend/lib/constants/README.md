# Application Constants

This directory contains application-wide configuration constants for the Solar Cell CMS frontend.

## Files

### `config.ts`

Central configuration file containing all application constants.

## Configuration Sections

### 1. API Configuration (`API_CONFIG`)

API endpoints and request settings.

```typescript
import { API_CONFIG } from '@/lib/constants/config';

// Access API base URL
const baseUrl = API_CONFIG.baseUrl;

// Access specific endpoint
const articlesEndpoint = API_CONFIG.endpoints.articles;
```

**Properties:**
- `baseUrl` - Payload CMS API base URL
- `endpoints` - API endpoint paths
- `timeout` - Request timeout (10 seconds)
- `retries` - Number of retry attempts (3)

### 2. Solar Calculator Configuration (`CALCULATOR_CONFIG`)

Constants for solar system calculations (static, not editable via CMS).

```typescript
import { CALCULATOR_CONFIG } from '@/lib/constants/config';

// Access calculator constants
const rate = CALCULATOR_CONFIG.electricityRate; // 4.5 THB/kWh
const cost = CALCULATOR_CONFIG.costPerKw; // 45,000 THB/kW
```

**Properties:**
- `electricityRate` - Average electricity rate (4.5 THB/kWh)
- `costPerKw` - Installation cost per kW (45,000 THB)
- `peakSunHours` - Peak sun hours in Thailand (4.5 hours/day)
- `systemEfficiency` - System efficiency factor (0.85)
- `locationMultipliers` - Multipliers for different location types
- `limits` - Min/max values for inputs

### 3. Image Configuration (`IMAGE_CONFIG`)

Image optimization settings.

```typescript
import { IMAGE_CONFIG } from '@/lib/constants/config';

// Check if lazy loading should be applied
const threshold = IMAGE_CONFIG.lazyLoadThreshold; // 2
```

**Properties:**
- `quality` - Image quality (85)
- `formats` - Supported image formats
- `maxFileSize` - Maximum file size (5MB)
- `lazyLoadThreshold` - Number of images to load immediately (2)
- `placeholderDataUrl` - Default blur placeholder

### 4. Responsive Breakpoints (`BREAKPOINTS`)

Screen size breakpoints matching Tailwind CSS.

```typescript
import { BREAKPOINTS } from '@/lib/constants/config';

// Check breakpoint ranges
const mobileMax = BREAKPOINTS.mobile.max; // 767px
const tabletMin = BREAKPOINTS.tablet.min; // 768px
```

**Breakpoints:**
- Mobile: 320px - 767px
- Tablet: 768px - 1919px
- Desktop: 1920px+

### 5. SEO Configuration (`SEO_CONFIG`)

Default SEO metadata and settings.

```typescript
import { SEO_CONFIG } from '@/lib/constants/config';

// Access default metadata
const title = SEO_CONFIG.defaultMetadata.title;
const description = SEO_CONFIG.defaultMetadata.description;
```

**Properties:**
- `defaultMetadata` - Default title, description, keywords
- `ogImage` - Default Open Graph image
- `siteUrl` - Site URL (from environment)
- `twitterCard` - Twitter card type

### 6. Pagination Configuration (`PAGINATION_CONFIG`)

Pagination settings for content lists.

```typescript
import { PAGINATION_CONFIG } from '@/lib/constants/config';

// Get default page size
const pageSize = PAGINATION_CONFIG.defaultPageSize; // 12
```

**Properties:**
- `defaultPageSize` - Default items per page (12)
- `pageSizeOptions` - Available page size options
- `maxPageSize` - Maximum allowed page size (100)

### 7. Form Configuration (`FORM_CONFIG`)

Form field limits and settings.

```typescript
import { FORM_CONFIG } from '@/lib/constants/config';

// Get field limits
const nameMinLength = FORM_CONFIG.leadForm.fullName.minLength; // 2
```

**Properties:**
- `leadForm` - Field limits for lead form
- `debounceTime` - Form submission debounce (300ms)
- `successMessageDuration` - Success message display time (3s)

### 8. Cache Configuration (`CACHE_CONFIG`)

ISR revalidation and cache control settings.

```typescript
import { CACHE_CONFIG } from '@/lib/constants/config';

// Get revalidation time
const revalidate = CACHE_CONFIG.revalidate.articles; // 3600 seconds
```

**Properties:**
- `revalidate` - ISR revalidation times for different content types
- `cacheControl` - Cache control headers

### 9. Feature Flags (`FEATURE_FLAGS`)

Enable/disable features for testing or gradual rollout.

```typescript
import { FEATURE_FLAGS } from '@/lib/constants/config';

// Check if feature is enabled
if (FEATURE_FLAGS.enableCalculator) {
  // Show calculator
}
```

**Flags:**
- `enableCalculator` - Solar calculator feature
- `enableLeadForm` - Lead form feature
- `enableComments` - Article comments (future)
- `enableSocialSharing` - Social sharing buttons
- `enableAnalytics` - Analytics tracking
- `enableDebug` - Debug mode

### 10. Navigation Configuration (`NAVIGATION_CONFIG`)

Navigation menu items.

```typescript
import { NAVIGATION_CONFIG } from '@/lib/constants/config';

// Get main navigation items
const mainNav = NAVIGATION_CONFIG.mainNav;
```

**Properties:**
- `mainNav` - Main navigation items
- `footerNav` - Footer navigation items

### 11. Contact Information (`CONTACT_INFO`)

Business contact details.

```typescript
import { CONTACT_INFO } from '@/lib/constants/config';

// Get contact info
const phone = CONTACT_INFO.phone;
const email = CONTACT_INFO.email;
```

**Properties:**
- `phone` - Business phone number
- `email` - Business email
- `address` - Business address
- `social` - Social media links

### 12. Performance Configuration (`PERFORMANCE_CONFIG`)

Performance optimization settings.

```typescript
import { PERFORMANCE_CONFIG } from '@/lib/constants/config';

// Check if code splitting is enabled
const codeSplitting = PERFORMANCE_CONFIG.enableCodeSplitting;
```

**Properties:**
- `targetLoadTime` - Target page load time (3s)
- `enableCodeSplitting` - Code splitting flag
- `enableLazyLoading` - Lazy loading flag
- `enablePrefetch` - Link prefetch flag

### 13. Error Messages (`ERROR_MESSAGES`)

User-friendly error messages in Thai.

```typescript
import { ERROR_MESSAGES } from '@/lib/constants/config';

// Display error message
const errorMsg = ERROR_MESSAGES.api.networkError;
```

**Categories:**
- `api` - API error messages
- `form` - Form error messages
- `generic` - Generic error messages

### 14. Success Messages (`SUCCESS_MESSAGES`)

User-friendly success messages in Thai.

```typescript
import { SUCCESS_MESSAGES } from '@/lib/constants/config';

// Display success message
const successMsg = SUCCESS_MESSAGES.form.leadSubmitted;
```

## Helper Functions

### Environment Helpers

```typescript
import { 
  getEnvironment, 
  isProduction, 
  isDevelopment, 
  isTest 
} from '@/lib/constants/config';

// Check environment
if (isProduction()) {
  // Production-specific code
}

if (isDevelopment()) {
  // Development-specific code
}
```

## Environment Variables

The following environment variables are used:

- `NEXT_PUBLIC_PAYLOAD_API_URL` - Payload CMS API URL
- `NEXT_PUBLIC_SITE_URL` - Site URL for SEO
- `NODE_ENV` - Node environment (development/production/test)

## Usage Best Practices

1. **Import from constants**
   ```typescript
   import { API_CONFIG, CALCULATOR_CONFIG } from '@/lib/constants/config';
   ```

2. **Use feature flags**
   ```typescript
   if (FEATURE_FLAGS.enableCalculator) {
     // Render calculator
   }
   ```

3. **Access nested properties**
   ```typescript
   const endpoint = API_CONFIG.endpoints.articles;
   const multiplier = CALCULATOR_CONFIG.locationMultipliers.residential;
   ```

4. **Use error messages**
   ```typescript
   catch (error) {
     setError(ERROR_MESSAGES.api.networkError);
   }
   ```

## Requirements

These constants validate the following requirements:
- **Requirement 13.2**: Image Optimization configuration
- **Requirement 13.4**: Lazy Loading configuration

## Related Files

- `/lib/utils/` - Utility functions
- `/types/` - TypeScript type definitions
- `/.env.local` - Environment variables
