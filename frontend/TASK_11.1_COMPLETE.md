# Task 11.1 Complete: ArticleCard Component

## Summary

Successfully created the ArticleCard component with a unique amber/orange theme design that is distinct from ServiceCard (blue/hexagonal) and ReviewCard (emerald/rounded).

## Files Created

### 1. `components/articles/ArticleCard.tsx`
- **Design Theme**: Amber/orange color scheme (knowledge/learning theme)
- **Layout**: Rectangular magazine-style design with sharp corners
- **Features**:
  - Side-by-side image and content layout on larger screens
  - Prominent date display with calendar icon in Thai format (Buddhist Era)
  - Excerpt preview for content teaser
  - Left border accent (border-l-4) in amber color
  - Top gradient bar animation on hover
  - Lazy loading support for images
  - Responsive design (mobile-first)
  - Semantic HTML with `<article>` and `<time>` elements
  - Accessibility features (aria-labels, proper alt text)

### 2. `components/articles/ArticleCard.test.tsx`
- **27 comprehensive tests** covering:
  - Content rendering (header, title, excerpt, image, date)
  - Lazy loading behavior (eager vs lazy based on index)
  - Date formatting in Thai (Buddhist Era conversion)
  - Content truncation (line-clamp for title and excerpt)
  - Accessibility (aria-labels, semantic HTML, time element)
  - Visual design (amber theme, border accent, rectangular shape)
  - Edge cases (empty excerpt, special characters, short titles)
  - Image configuration (sizes, quality, responsive)

## Design Comparison

### ServiceCard (Blue Theme)
- Hexagonal-inspired design with clip-path
- Blue accent colors (#3B82F6, #2563EB)
- Lightning bolt icon
- Decorative corner accent
- Bottom gradient bar

### ReviewCard (Emerald Theme)
- Rounded corners (rounded-3xl)
- Emerald/green accent colors (#10B981, #059669)
- Checkmark icon
- Overlay content on image
- Related service badge
- Decorative circular elements

### ArticleCard (Amber Theme) ⭐ NEW
- Rectangular magazine-style design
- Amber/orange accent colors (#F59E0B, #D97706)
- Document icon
- Left border accent (border-l-4)
- Date badge overlay on image
- Side-by-side layout on desktop
- Top gradient bar
- Reading time indicator

## Key Features

### 1. Thai Date Formatting
```typescript
function formatThaiDate(dateString: string): string {
  const date = new Date(dateString);
  const thaiMonths = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', ...];
  const day = date.getDate();
  const month = thaiMonths[date.getMonth()];
  const year = date.getFullYear() + 543; // Buddhist Era
  return `${day} ${month} ${year}`;
}
```

### 2. Lazy Loading
- Images with `index < 3` use eager loading
- Images with `index >= 3` use lazy loading
- Priority prop overrides default behavior

### 3. Responsive Layout
- Mobile: Stacked layout (image on top, content below)
- Desktop: Side-by-side layout (image 40%, content 60%)
- Aspect ratio: 16:10 on mobile, auto on desktop

### 4. Content Truncation
- Title: `line-clamp-2` (2 lines max)
- Excerpt: `line-clamp-3` (3 lines max)

## Test Results

```
✓ components/articles/ArticleCard.test.tsx (27 tests) 74ms
  ✓ ArticleCard (27)
    ✓ Content Rendering (4)
    ✓ Lazy Loading (3)
    ✓ Date Formatting (4)
    ✓ Content Truncation (2)
    ✓ Accessibility (4)
    ✓ Visual Design (3)
    ✓ Edge Cases (4)
    ✓ Image Configuration (3)

Test Files  1 passed (1)
Tests  27 passed (27)
```

## Requirements Validated

- ✅ **Requirement 5.6**: Article Card Layout with distinct design
- ✅ **Requirement 13.4**: Lazy loading for images

## Usage Example

```tsx
import ArticleCard from '@/components/articles/ArticleCard';

<ArticleCard
  id="1"
  image="https://example.com/article.jpg"
  header="บทความ"
  title="การติดตั้งโซล่าเซลล์บนหลังคาบ้าน"
  excerpt="เรียนรู้วิธีการติดตั้งโซล่าเซลล์..."
  slug="solar-installation-guide"
  publishedDate="2024-01-15T00:00:00.000Z"
  index={0}
  priority={false}
/>
```

## Next Steps

The ArticleCard component is ready to be used in:
- Task 11.2: Articles List Page (`app/articles/page.tsx`)
- Task 11.3: Article Detail Page (`app/articles/[slug]/page.tsx`)

## Notes

- The component follows the same patterns as ServiceCard and ReviewCard
- All utility functions (getImageAlt, getLoadingAttribute) are reused
- The design is intentionally distinct to help users differentiate content types
- Thai date formatting includes Buddhist Era conversion (+543 years)
- The component is fully accessible and SEO-friendly
