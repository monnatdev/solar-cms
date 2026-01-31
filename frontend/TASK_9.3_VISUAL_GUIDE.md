# Service Detail Page - Visual Guide

## Page Structure

```
┌─────────────────────────────────────────────────────────────┐
│                     BREADCRUMB NAVIGATION                    │
│  Home > Services > Solar Installation                       │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                      PAGE HEADER                             │
│  ┌──────┐                                                    │
│  │ ⚡  │  INSTALLATION SERVICE                              │
│  └──────┘                                                    │
│                                                              │
│  Professional Solar Installation                            │
│  ════════════════════════════════                           │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │                                                     │    │
│  │         FEATURED IMAGE (16:9)                      │    │
│  │                                                     │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                   SERVICE DESCRIPTION                        │
│  รายละเอียดบริการ                                           │
│  ─────────────────                                          │
│                                                              │
│  Rich text content with formatting:                         │
│  • Headings (H1-H6)                                         │
│  • Paragraphs                                               │
│  • Lists (ordered/unordered)                                │
│  • Links                                                    │
│  • Blockquotes                                              │
│  • Text formatting (bold, italic, etc.)                     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                      IMAGE GALLERY                           │
│  แกลเลอรี่                                                  │
│  ─────────                                                  │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                 │
│  │          │  │          │  │          │                 │
│  │  Image 1 │  │  Image 2 │  │  Image 3 │                 │
│  │          │  │          │  │          │                 │
│  └──────────┘  └──────────┘  └──────────┘                 │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                 │
│  │          │  │          │  │          │                 │
│  │  Image 4 │  │  Image 5 │  │  Image 6 │                 │
│  │          │  │          │  │          │                 │
│  └──────────┘  └──────────┘  └──────────┘                 │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                   CALL TO ACTION                             │
│  ════════════════════════════════════════                   │
│                                                              │
│              สนใจบริการนี้?                                 │
│                                                              │
│  ติดต่อเราวันนี้เพื่อรับคำปรึกษาฟรีและใบเสนอราคา          │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐                        │
│  │  ติดต่อเรา   │  │ ดูบริการอื่นๆ │                        │
│  └──────────────┘  └──────────────┘                        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                   RELATED SERVICES                           │
│  บริการอื่นๆ ที่น่าสนใจ                                    │
│  ─────────────────────                                      │
│                                                              │
│  → ดูบริการทั้งหมด                                         │
└─────────────────────────────────────────────────────────────┘
```

## Responsive Breakpoints

### Desktop (1920px+)
```
Gallery: 3 columns
Padding: Large (lg:px-8)
Typography: Large headings
```

### Tablet (768px - 1919px)
```
Gallery: 2 columns
Padding: Medium (md:px-6)
Typography: Medium headings
```

### Mobile (320px - 767px)
```
Gallery: 1 column
Padding: Small (px-4)
Typography: Smaller headings
Stacked buttons
```

## Component Hierarchy

```
ServiceDetailPage
├── Breadcrumb Navigation
│   ├── Home Link
│   ├── Services Link
│   └── Current Service
│
├── Article (Semantic HTML)
│   ├── Header
│   │   ├── Service Icon
│   │   ├── Service Header Label
│   │   ├── Service Title (H1)
│   │   └── Featured Image
│   │
│   ├── Description Section
│   │   ├── Section Title (H2)
│   │   └── RichTextRenderer
│   │       ├── Headings
│   │       ├── Paragraphs
│   │       ├── Lists
│   │       ├── Links
│   │       └── Blockquotes
│   │
│   ├── Gallery Section
│   │   ├── Section Title (H2)
│   │   └── Image Grid
│   │       └── Gallery Images (lazy loaded)
│   │
│   └── Call to Action Section
│       ├── CTA Title (H2)
│       ├── CTA Description
│       └── Action Buttons
│           ├── Contact Button
│           └── View Services Button
│
└── Related Services Aside
    ├── Section Title (H2)
    └── View All Link
```

## SEO Structure

### Meta Tags
```html
<head>
  <!-- Basic Meta -->
  <title>Professional Solar Installation | Solar Cell CMS</title>
  <meta name="description" content="Expert solar panel installation..." />
  <meta name="keywords" content="solar, installation, renewable energy" />
  
  <!-- Open Graph -->
  <meta property="og:title" content="Professional Solar Installation" />
  <meta property="og:description" content="Expert solar panel installation..." />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="/images/service.jpg" />
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Professional Solar Installation" />
  <meta name="twitter:description" content="Expert solar panel installation..." />
  <meta name="twitter:image" content="/images/service.jpg" />
</head>
```

### Semantic HTML
```html
<article>
  <header>
    <h1>Service Title</h1>
  </header>
  
  <section>
    <h2>รายละเอียดบริการ</h2>
    <!-- Rich text content -->
  </section>
  
  <section>
    <h2>แกลเลอรี่</h2>
    <!-- Gallery images -->
  </section>
  
  <section>
    <h2>สนใจบริการนี้?</h2>
    <!-- Call to action -->
  </section>
</article>

<aside>
  <h2>บริการอื่นๆ ที่น่าสนใจ</h2>
  <!-- Related services -->
</aside>
```

## Color Scheme

### Primary Colors
- **Blue 600**: `#2563eb` - Primary buttons, links
- **Blue 700**: `#1d4ed8` - Hover states
- **Blue 800**: `#1e40af` - Dark backgrounds
- **Blue 100**: `#dbeafe` - Light backgrounds, icons

### Text Colors
- **Gray 900**: `#111827` - Headings
- **Gray 700**: `#374151` - Body text
- **Gray 600**: `#4b5563` - Secondary text
- **Gray 500**: `#6b7280` - Muted text

### Background Colors
- **White**: `#ffffff` - Main background
- **Gray 50**: `#f9fafb` - Section backgrounds
- **Gray 100**: `#f3f4f6` - Code blocks

## Typography

### Headings
```css
h1: text-4xl md:text-5xl font-bold (36px/48px)
h2: text-3xl font-bold (30px)
h3: text-2xl font-bold (24px)
h4: text-xl font-bold (20px)
h5: text-lg font-bold (18px)
h6: text-base font-bold (16px)
```

### Body Text
```css
Paragraph: text-gray-700 leading-relaxed (16px, 1.625 line-height)
Small: text-sm (14px)
Large: text-lg md:text-xl (18px/20px)
```

## Interactions

### Hover Effects
- **Gallery Images**: Scale 1.05, shadow increase
- **Buttons**: Background color change, slight lift
- **Links**: Color change, underline

### Loading States
- **Featured Image**: Priority loading (eager)
- **Gallery Images**: Lazy loading (loading="lazy")
- **Content**: Server-side rendered

### Transitions
- **Duration**: 200-500ms
- **Easing**: Default ease
- **Properties**: transform, opacity, colors, shadows

## Accessibility

### ARIA Labels
```html
<nav aria-label="Breadcrumb">
<article> (implicit role)
<section> (implicit role)
```

### Keyboard Navigation
- All links and buttons are keyboard accessible
- Proper focus states
- Logical tab order

### Screen Readers
- Semantic HTML for proper structure
- Alt text on all images
- Descriptive link text

## Performance Optimizations

### Image Optimization
- Next.js Image component
- Responsive sizes
- WebP format (automatic)
- Lazy loading for gallery
- Priority loading for featured image

### Static Generation
- Pre-rendered at build time
- Fast initial page load
- SEO-friendly

### Code Splitting
- Automatic by Next.js
- Component-level splitting
- Route-based splitting

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## File Structure

```
frontend/
├── app/
│   └── services/
│       ├── page.tsx (Services List)
│       └── [slug]/
│           ├── page.tsx (Service Detail) ← NEW
│           ├── not-found.tsx ← NEW
│           └── page.test.tsx ← NEW
│
├── components/
│   └── services/
│       ├── ServiceCard.tsx
│       └── RichTextRenderer.tsx ← NEW
│
├── lib/
│   └── api/
│       └── services.ts (API client)
│
└── types/
    └── service.ts (TypeScript types)
```

## Example URLs

```
Production:
https://example.com/services/solar-installation
https://example.com/services/solar-maintenance
https://example.com/services/solar-consultation

Development:
http://localhost:3000/services/solar-installation
http://localhost:3000/services/solar-maintenance
http://localhost:3000/services/solar-consultation
```
