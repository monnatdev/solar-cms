# ReviewCard Visual Design Guide

## Design Philosophy

The ReviewCard component showcases completed installation projects with a design that emphasizes **success, quality, and visual impact**.

## Visual Characteristics

### Color Palette
```
Primary: Emerald/Green (#10b981, #059669, #047857)
- Represents: Success, completion, eco-friendly
- Usage: Icons, badges, accents, hover states

Background: Gray-900 with gradient
- Provides: High contrast for white text
- Creates: Dramatic, professional look
```

### Shape & Structure
```
Aspect Ratio: 3:4 (Portrait)
- Why: Emphasizes vertical installations (buildings, rooftops)
- Effect: Creates visual variety in grid layouts

Border Radius: rounded-3xl (24px)
- Why: Soft, approachable, premium feel
- Effect: Contrasts with ServiceCard's angular hexagonal design
```

### Layout Pattern
```
┌─────────────────────────┐
│                         │ ← Decorative circles (top-right)
│                         │
│      IMAGE              │
│    (Full Height)        │
│                         │
│  ┌──────────────────┐   │
│  │ Gradient Overlay │   │ ← Always visible, intensifies on hover
│  │                  │   │
│  │ ✓ Header         │   │ ← Checkmark icon + header text
│  │ Title Text       │   │ ← Bold white title
│  │ [Service Badge]  │   │ ← Optional related service link
│  └──────────────────┘   │
└─────────────────────────┘
         ▔▔▔▔▔▔▔           ← Emerald accent bar (scales from center)
```

## Component Anatomy

### 1. Image Container
- **Full height**: Covers entire card
- **Aspect ratio**: 3:4 portrait
- **Hover effect**: Scale 1.05 (subtle zoom)
- **Optimization**: Lazy loading, responsive sizes

### 2. Gradient Overlay
- **Color**: Gray-900 (90% → 60% → transparent)
- **Direction**: Bottom to top
- **Behavior**: Always visible, opacity increases on hover
- **Purpose**: Ensures text readability

### 3. Content Overlay (Bottom)
- **Position**: Absolute, bottom of card
- **Padding**: 24px (p-6)
- **Background**: Transparent (relies on gradient)

### 4. Header Section
```tsx
┌──────────────────────┐
│ ✓  HEADER TEXT       │
└──────────────────────┘
 ↑   ↑
 │   └─ Uppercase, tracking-widest, emerald-400
 └─ Checkmark in emerald-500 circle
```

### 5. Title
- **Font**: Bold, 18px (text-lg)
- **Color**: White, changes to emerald-300 on hover
- **Lines**: Max 2 lines (line-clamp-2)
- **Leading**: Tight line height

### 6. Related Service Badge
```tsx
┌────────────────────────────┐
│ ⚡ Service Name →          │
└────────────────────────────┘
 ↑   ↑             ↑
 │   │             └─ Arrow icon
 │   └─ Service title
 └─ Lightning icon (emerald-400)

Background: white/10 with backdrop-blur
Border: white/20
Hover: emerald-500/90 background
```

### 7. Decorative Elements

**Concentric Circles (Top-Right)**
```
  ○ ← Outer circle (w-12 h-12, border-2)
 ○  ← Inner circle (w-8 h-8, border-2)
```
- Color: emerald-400 with opacity
- Effect: Scale up on hover
- Purpose: Visual interest, brand consistency

**Accent Bar (Bottom)**
```
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
Gradient: emerald-400 → emerald-500 → emerald-600
Transform: scale-x-0 → scale-x-100
Origin: center
```

## Hover Interactions

### Card Level
```
Default → Hover
─────────────────
scale(1) → scale(1.02)
shadow-md → shadow-2xl
```

### Image
```
Default → Hover
─────────────────
scale(1) → scale(1.05)
```

### Gradient Overlay
```
Default → Hover
─────────────────
opacity-90 → opacity-100
```

### Title
```
Default → Hover
─────────────────
text-white → text-emerald-300
```

### Checkmark Circle
```
Default → Hover
─────────────────
scale(1) → scale(1.1)
```

### Service Badge
```
Default → Hover
─────────────────
bg-white/10 → bg-emerald-500/90
border-white/20 → border-emerald-400
```

### Decorative Circles
```
Default → Hover
─────────────────
opacity-30 → opacity-60
scale(1) → scale(1.1)
```

### Accent Bar
```
Default → Hover
─────────────────
scale-x-0 → scale-x-100
(from center)
```

## Comparison with ServiceCard

| Aspect | ServiceCard | ReviewCard |
|--------|-------------|------------|
| **Primary Color** | Blue (#3b82f6) | Emerald (#10b981) |
| **Shape** | Hexagonal clip-path | Rounded corners |
| **Aspect Ratio** | 4:3 Landscape | 3:4 Portrait |
| **Content Position** | Below image | Overlay on image |
| **Icon** | Lightning bolt | Checkmark |
| **Icon Background** | Blue-100 circle | Emerald-500 circle |
| **Hover Transform** | translateY(-8px) | scale(1.02) |
| **Gradient** | Appears on hover | Always visible |
| **Accent Bar Origin** | Left | Center |
| **Decorative Element** | Corner square | Concentric circles |
| **Extra Feature** | Call-to-action text | Related service badge |

## Responsive Behavior

### Mobile (320px - 767px)
- Full width cards
- Single column grid
- Touch-friendly targets (min 44px)
- Reduced padding if needed

### Tablet (768px - 1919px)
- 2 column grid
- Maintains aspect ratio
- Hover effects work with touch

### Desktop (1920px+)
- 3 column grid
- Full hover interactions
- Optimal image quality

## Accessibility Features

1. **Semantic HTML**: Uses `<article>` element
2. **Alt Text**: Descriptive image alt text
3. **Color Contrast**: White text on dark gradient (WCAG AAA)
4. **Focus States**: Keyboard navigation support
5. **Screen Readers**: Proper heading hierarchy

## Performance Optimizations

1. **Lazy Loading**: Images beyond threshold (2) load lazily
2. **Priority Loading**: Option for above-the-fold content
3. **Responsive Images**: Multiple sizes for different viewports
4. **Quality**: 85% compression for optimal size/quality
5. **Transform Animations**: GPU-accelerated (transform, opacity)

## Usage Guidelines

### When to Use ReviewCard
- ✅ Displaying completed installation projects
- ✅ Showcasing customer success stories
- ✅ Portfolio/gallery sections
- ✅ Case study previews

### When NOT to Use ReviewCard
- ❌ Service offerings (use ServiceCard)
- ❌ Blog posts/articles (use ArticleCard)
- ❌ Product listings
- ❌ Team member profiles

## Design Tokens

```typescript
// Colors
const colors = {
  primary: 'emerald-500',
  primaryHover: 'emerald-600',
  accent: 'emerald-400',
  text: 'white',
  textHover: 'emerald-300',
  overlay: 'gray-900',
};

// Spacing
const spacing = {
  cardPadding: 'p-6',
  contentGap: 'space-y-3',
  iconSize: 'w-6 h-6',
  badgePadding: 'px-3 py-1.5',
};

// Border Radius
const borderRadius = {
  card: 'rounded-3xl',
  icon: 'rounded-full',
  badge: 'rounded-full',
};

// Shadows
const shadows = {
  default: 'shadow-md',
  hover: 'shadow-2xl',
};

// Transitions
const transitions = {
  default: 'duration-500',
  fast: 'duration-300',
};
```

## Future Enhancements

Potential improvements for future iterations:

1. **Video Support**: Play video on hover
2. **Gallery Preview**: Show multiple images on hover
3. **Rating Display**: Show customer rating stars
4. **Date Display**: Show installation date
5. **Location Badge**: Show installation location
6. **Capacity Badge**: Show system capacity (kW)
7. **Before/After**: Slider to show before/after images
8. **Testimonial**: Show customer quote on hover

## Conclusion

The ReviewCard design successfully creates a unique visual identity that:
- Stands apart from ServiceCard and ArticleCard
- Emphasizes success and quality through color and layout
- Provides excellent user experience with smooth interactions
- Maintains accessibility and performance standards
- Offers flexibility for future enhancements
