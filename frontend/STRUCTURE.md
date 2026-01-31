# Frontend Project Structure

## Directory Overview

### `/app` - Next.js App Router
The `app` directory uses Next.js 14+ App Router architecture:
- **layout.tsx**: Root layout component that wraps all pages
- **page.tsx**: Home page component
- **globals.css**: Global CSS styles including Tailwind directives

Future structure will include:
```
app/
├── layout.tsx
├── page.tsx                 # Home page with Hero Section
├── globals.css
├── services/
│   ├── page.tsx            # Services list page
│   └── [slug]/
│       └── page.tsx        # Individual service detail page
├── reviews/
│   └── page.tsx            # Reviews page
├── articles/
│   ├── page.tsx            # Articles list page
│   └── [slug]/
│       └── page.tsx        # Individual article detail page
└── api/
    └── calculator/
        └── route.ts        # Solar calculator API endpoint
```

### `/components` - Reusable Components
Shared React components used across the application:

```
components/
├── layout/
│   ├── Header.tsx          # Site header with navigation
│   └── Footer.tsx          # Site footer
├── home/
│   ├── HeroSection.tsx     # Hero section component
│   └── SolarCalculator.tsx # Solar calculator component
├── services/
│   └── ServiceCard.tsx     # Service card component
├── reviews/
│   └── ReviewCard.tsx      # Review card component
├── articles/
│   └── ArticleCard.tsx     # Article card component
└── forms/
    └── LeadForm.tsx        # Lead generation form
```

### `/lib` - Utilities and Helpers
Utility functions, API clients, and helper modules:

```
lib/
├── api/
│   ├── payload.ts          # Payload CMS API client
│   ├── articles.ts         # Articles API functions
│   ├── services.ts         # Services API functions
│   ├── reviews.ts          # Reviews API functions
│   └── leads.ts            # Leads API functions
├── utils/
│   ├── calculator.ts       # Solar calculator logic
│   ├── validation.ts       # Form validation helpers
│   └── image.ts            # Image optimization helpers
└── constants/
    └── config.ts           # App configuration constants
```

### `/types` - TypeScript Definitions
TypeScript interfaces and type definitions:

```
types/
├── payload.ts              # Payload CMS types
├── article.ts              # Article types
├── service.ts              # Service types
├── review.ts               # Review types
├── lead.ts                 # Lead types
├── calculator.ts           # Calculator types
└── index.ts                # Export all types
```

### `/public` - Static Assets
Static files served directly:

```
public/
├── images/                 # Static images
├── icons/                  # Icon files
└── fonts/                  # Custom fonts (if any)
```

## Key Files

### Configuration Files

- **next.config.ts**: Next.js configuration
- **tsconfig.json**: TypeScript configuration
- **postcss.config.mjs**: PostCSS configuration (includes Tailwind)
- **eslint.config.mjs**: ESLint configuration
- **.env.local**: Environment variables (not committed to git)
- **.env.local.example**: Example environment variables template

### Root Files

- **package.json**: Project dependencies and scripts
- **README.md**: Project documentation
- **STRUCTURE.md**: This file - project structure documentation

## Naming Conventions

### Files
- **Components**: PascalCase (e.g., `HeroSection.tsx`, `ServiceCard.tsx`)
- **Utilities**: camelCase (e.g., `calculator.ts`, `validation.ts`)
- **Types**: camelCase (e.g., `article.ts`, `service.ts`)
- **Pages**: lowercase (e.g., `page.tsx`, `layout.tsx`)

### Code
- **Components**: PascalCase (e.g., `HeroSection`, `ServiceCard`)
- **Functions**: camelCase (e.g., `calculateSolarSystem`, `validateLeadForm`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_URL`, `MAX_FILE_SIZE`)
- **Interfaces/Types**: PascalCase (e.g., `Article`, `ServiceCardProps`)

## Component Patterns

### Server Components (Default)
Use Server Components for:
- Static content
- Data fetching
- SEO-critical pages

```typescript
// app/services/page.tsx
export default async function ServicesPage() {
  const services = await getServices();
  return <div>...</div>;
}
```

### Client Components
Use Client Components for:
- Interactive features
- Forms
- State management
- Browser APIs

```typescript
'use client';

import { useState } from 'react';

export default function SolarCalculator() {
  const [result, setResult] = useState(null);
  // ...
}
```

## Styling Approach

### Tailwind CSS
- Use Tailwind utility classes for styling
- Create custom utilities in `globals.css` if needed
- Use `@theme` directive for design tokens

### Example
```tsx
<div className="container mx-auto px-4 py-8">
  <h1 className="text-4xl font-bold text-gray-900">
    Solar Cell CMS
  </h1>
</div>
```

## API Integration

### Fetching Data
```typescript
// lib/api/services.ts
export async function getServices() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_API_URL}/api/services`
  );
  return response.json();
}
```

### Using in Components
```typescript
// app/services/page.tsx
import { getServices } from '@/lib/api/services';

export default async function ServicesPage() {
  const services = await getServices();
  // ...
}
```

## Best Practices

1. **Type Safety**: Always define TypeScript types for props and data
2. **Component Size**: Keep components small and focused
3. **Reusability**: Extract common patterns into reusable components
4. **Performance**: Use Server Components by default, Client Components only when needed
5. **SEO**: Include proper metadata in page components
6. **Error Handling**: Always handle API errors gracefully
7. **Loading States**: Show loading indicators for async operations
8. **Accessibility**: Follow WCAG guidelines for accessibility

## Development Workflow

1. Create types in `/types`
2. Create API functions in `/lib/api`
3. Create reusable components in `/components`
4. Create pages in `/app`
5. Test locally with `npm run dev`
6. Build for production with `npm run build`
7. Deploy to Vercel or your preferred platform
