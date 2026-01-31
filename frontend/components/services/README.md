# Services Components

This directory contains components related to the Services feature of the Solar Cell CMS.

## Components

### ServiceCard

A card component for displaying service information in a grid layout.

**Features:**
- Unique hexagonal-inspired design (distinct from ReviewCard and ArticleCard)
- Lazy loading support for images
- Responsive design with hover effects
- Gradient overlay animation
- Blue accent color scheme
- Accessible with proper ARIA labels
- Semantic HTML structure

**Props:**
```typescript
interface ServiceCardComponentProps {
  id: string;              // Unique service identifier
  image: string;           // Service image URL
  header: string;          // Service category/header text
  title: string;           // Service title
  slug: string;            // URL slug for detail page
  index?: number;          // Position in list (for lazy loading)
  priority?: boolean;      // Priority loading flag
}
```

**Usage:**
```tsx
import ServiceCard from '@/components/services/ServiceCard';

<ServiceCard
  id="service-1"
  image="/images/solar-installation.jpg"
  header="Solar Installation"
  title="Residential Solar Panel Installation"
  slug="residential-solar-panel-installation"
  index={0}
/>
```

**Design Features:**
- **Hexagonal clip effect**: Subtle geometric design element
- **Gradient overlay**: Blue gradient appears on hover
- **Icon indicator**: Lightning bolt icon in blue circle
- **Slide-up CTA**: "ดูรายละเอียด" text slides up on hover
- **Bottom accent bar**: Blue gradient bar scales in from left
- **Corner decoration**: Rotated square accent in top-right

**Lazy Loading:**
- Images at index 0-1 load eagerly (above the fold)
- Images at index 2+ load lazily (below the fold)
- Can be overridden with `priority` prop

**Accessibility:**
- Semantic `<article>` element
- Descriptive `aria-label` on links
- Alt text for images
- Keyboard navigable

**Requirements Validated:**
- 3.1: Services displayed in Card Layout
- 3.2: Service Card shows image, header, and title
- 3.6: Unique design different from other cards
- 13.4: Lazy loading support for images

## Testing

Run tests with:
```bash
npm test -- ServiceCard.test.tsx
```

## Styling

The component uses:
- Tailwind CSS utility classes
- Custom animations in `app/globals.css`
- Next.js Image component for optimization
- Responsive breakpoints from config

## Related Files

- `types/service.ts` - TypeScript interfaces
- `lib/utils/image.ts` - Image optimization utilities
- `lib/constants/config.ts` - Configuration constants
- `app/globals.css` - Custom CSS animations
