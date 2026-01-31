# Task 12: Visual Testing Guide for Content Pages

This guide helps you manually verify that all Content Pages are displaying correctly.

## 🌐 Development Server

The development server is running at: **http://localhost:3001**

---

## 📋 Testing Checklist

### 1. Services Page (`/services`)

**URL:** http://localhost:3001/services

#### ✅ What to Check:

**Page Header:**
- [ ] Title: "บริการของเรา" is displayed prominently
- [ ] Description text is visible and readable
- [ ] Header has white background with border

**Content Area:**
- [ ] If no services: Blue info box with "ยังไม่มีบริการ" message
- [ ] If services exist: Grid layout with service cards
- [ ] Services count is displayed (e.g., "พบ X บริการ")

**Service Cards (if data exists):**
- [ ] Each card shows an image
- [ ] Header text (small, blue, uppercase)
- [ ] Title text (large, bold)
- [ ] Blue lightning bolt icon
- [ ] Hover effect: Card lifts up, shows "ดูรายละเอียด" link
- [ ] Cards are in 3-column grid on desktop

**Call-to-Action Section:**
- [ ] Blue gradient background
- [ ] "สนใจบริการของเรา?" heading
- [ ] "ติดต่อเรา" button (white with blue text)

**Responsive Design:**
- [ ] Desktop (>1920px): 3 columns
- [ ] Tablet (768-1919px): 2 columns
- [ ] Mobile (<768px): 1 column, stacked layout

---

### 2. Service Detail Page (`/services/[slug]`)

**URL:** http://localhost:3001/services/[any-service-slug]

#### ✅ What to Check:

**Breadcrumb Navigation:**
- [ ] Shows: หน้าแรก > บริการ > [Service Name]
- [ ] Links are clickable and work

**Page Header:**
- [ ] Blue icon with lightning bolt
- [ ] Header label (small, blue, uppercase)
- [ ] Large title
- [ ] Featured image (16:9 aspect ratio)

**Content Section:**
- [ ] "รายละเอียดบริการ" heading
- [ ] Rich text content is rendered properly
- [ ] Text formatting (bold, italic, lists) works

**Gallery Section (if images exist):**
- [ ] "แกลเลอรี่" heading
- [ ] Images in 3-column grid
- [ ] Images have hover effect (scale up)
- [ ] Images load with lazy loading

**Call-to-Action:**
- [ ] Blue gradient box
- [ ] "สนใจบริการนี้?" heading
- [ ] Two buttons: "ติดต่อเรา" and "ดูบริการอื่นๆ"

**Related Services:**
- [ ] Gray background section at bottom
- [ ] "บริการอื่นๆ ที่น่าสนใจ" heading
- [ ] Link to services page

---

### 3. Reviews Page (`/reviews`)

**URL:** http://localhost:3001/reviews

#### ✅ What to Check:

**Page Header:**
- [ ] Title: "ผลงานการติดตั้ง" is displayed
- [ ] Description text is visible
- [ ] Header has white background with border

**Content Area:**
- [ ] If no reviews: Blue info box with "ยังไม่มีผลงาน" message
- [ ] If reviews exist: Grid layout with review cards
- [ ] Reviews count is displayed

**Review Cards (if data exists):**
- [ ] Each card shows an image with gradient overlay
- [ ] Header text (small, emerald, uppercase)
- [ ] Title text (white, on image)
- [ ] Green checkmark icon
- [ ] Related service badge (if linked to service)
- [ ] Circular decorative elements in corner
- [ ] Hover effect: Card scales up slightly
- [ ] Cards are in 3-column grid on desktop

**Call-to-Action Section:**
- [ ] Emerald/green gradient background
- [ ] "ต้องการผลงานคุณภาพเช่นนี้?" heading
- [ ] "ติดต่อเรา" button (white with green text)

**Responsive Design:**
- [ ] Desktop: 3 columns
- [ ] Tablet: 2 columns
- [ ] Mobile: 1 column

---

### 4. Articles Page (`/articles`)

**URL:** http://localhost:3001/articles

#### ✅ What to Check:

**Page Header:**
- [ ] Title: "บทความและความรู้" is displayed
- [ ] Description text is visible
- [ ] Header has white background with border

**Content Area:**
- [ ] If no articles: Amber info box with "ยังไม่มีบทความ" message
- [ ] If articles exist: Single-column layout
- [ ] Articles count is displayed

**Article Cards (if data exists):**
- [ ] Magazine-style horizontal layout
- [ ] Image on left (desktop) or top (mobile)
- [ ] Date badge on image (white box with calendar icon)
- [ ] Amber document icon
- [ ] Header text (small, amber, uppercase)
- [ ] Title text (large, bold)
- [ ] Excerpt text (gray, 3 lines max)
- [ ] "อ่านบทความ" link with arrow
- [ ] Reading time indicator (5 นาที)
- [ ] Left border accent (amber)
- [ ] Hover effect: Shows top accent bar

**Call-to-Action Section:**
- [ ] Amber/orange gradient background
- [ ] "สนใจติดตั้งระบบโซล่าเซลล์?" heading
- [ ] "ติดต่อเรา" button (white with amber text)

**Responsive Design:**
- [ ] Desktop: Side-by-side image and content
- [ ] Mobile: Stacked layout (image on top)

---

### 5. Article Detail Page (`/articles/[slug]`)

**URL:** http://localhost:3001/articles/[any-article-slug]

#### ✅ What to Check:

**Breadcrumb Navigation:**
- [ ] Shows: หน้าแรก > บทความ > [Article Title]
- [ ] Links are clickable

**Page Header:**
- [ ] Green document icon
- [ ] Header label (small, green, uppercase)
- [ ] Published date with calendar icon (Thai format)
- [ ] Large title
- [ ] Excerpt text (if available)
- [ ] Featured image (16:9 aspect ratio)

**Content Section:**
- [ ] Rich text content is rendered properly
- [ ] Text formatting works
- [ ] Images in content are displayed
- [ ] Proper spacing and typography

**Article Footer:**
- [ ] Border separator
- [ ] Category tag with icon
- [ ] "กลับไปหน้าบทความ" link

**Call-to-Action:**
- [ ] Green gradient box
- [ ] "สนใจติดตั้งโซล่าเซลล์?" heading
- [ ] Two buttons: "ติดต่อเรา" and "ดูบริการของเรา"

**Related Articles:**
- [ ] Gray background section
- [ ] "บทความอื่นๆ ที่น่าสนใจ" heading
- [ ] Link to articles page

---

## 🧭 Navigation Testing

### Header Navigation

**From any page, check:**
- [ ] Click "Solar Cell CMS" logo → Goes to home page
- [ ] Click "Home" → Goes to home page (/)
- [ ] Click "Services" → Goes to services page (/services)
- [ ] Click "Reviews" → Goes to reviews page (/reviews)
- [ ] Click "Articles" → Goes to articles page (/articles)
- [ ] Click "Contact" → Scrolls to contact section on home

### Mobile Navigation

**On mobile (<768px):**
- [ ] Hamburger menu icon is visible
- [ ] Click hamburger → Menu slides down
- [ ] All navigation items are visible
- [ ] Click any item → Menu closes and navigates
- [ ] Click hamburger again → Menu closes

### Breadcrumb Navigation

**On detail pages:**
- [ ] Click "หน้าแรก" → Goes to home
- [ ] Click "บริการ" or "บทความ" → Goes to list page
- [ ] Current page name is not clickable

### Cross-Page Navigation

**Test these flows:**
1. [ ] Home → Services → Service Detail → Back to Services
2. [ ] Home → Reviews → Click related service badge → Service Detail
3. [ ] Home → Articles → Article Detail → Back to Articles
4. [ ] Service Detail → "ดูบริการอื่นๆ" → Services List
5. [ ] Article Detail → "ดูบทความทั้งหมด" → Articles List

---

## 🎨 Design Uniqueness Verification

### Compare Card Designs

**ServiceCard (Blue/Hexagonal):**
- [ ] Blue color scheme (#3B82F6)
- [ ] Lightning bolt icon ⚡
- [ ] Hexagonal-inspired shape
- [ ] Bottom accent bar animation

**ReviewCard (Emerald/Rounded):**
- [ ] Emerald/green color scheme (#10B981)
- [ ] Checkmark icon ✓
- [ ] Rounded corners (very round)
- [ ] Content overlays image
- [ ] Circular decorative elements

**ArticleCard (Amber/Rectangular):**
- [ ] Amber/orange color scheme (#F59E0B)
- [ ] Document icon 📄
- [ ] Sharp rectangular shape
- [ ] Side-by-side layout
- [ ] Date badge on image
- [ ] Left border accent

**Verification:**
- [ ] All three card types look distinctly different
- [ ] Each has its own color scheme
- [ ] Each has unique layout and styling

---

## 📱 Responsive Design Testing

### Desktop (>1920px)

**Open browser to full width:**
- [ ] Services: 3-column grid
- [ ] Reviews: 3-column grid
- [ ] Articles: Single column (magazine style)
- [ ] Navigation: Horizontal menu visible
- [ ] Content max-width: 1280px (centered)

### Tablet (768px - 1919px)

**Resize browser to ~1024px:**
- [ ] Services: 2-column grid
- [ ] Reviews: 2-column grid
- [ ] Articles: Single column
- [ ] Navigation: Still horizontal
- [ ] Spacing adjusts appropriately

### Mobile (<768px)

**Resize browser to ~375px:**
- [ ] Services: 1-column (stacked)
- [ ] Reviews: 1-column (stacked)
- [ ] Articles: 1-column (image on top)
- [ ] Navigation: Hamburger menu
- [ ] Text sizes are readable
- [ ] Buttons are touch-friendly
- [ ] Images scale properly

---

## 🔍 SEO Metadata Testing

### Using Browser DevTools

**Open DevTools (F12) → Elements tab → Find `<head>` section:**

#### Services List Page

Check for these tags:
```html
<title>บริการของเรา | Solar Cell CMS</title>
<meta name="description" content="ดูบริการติดตั้งและบำรุงรักษาระบบโซล่าเซลล์ทั้งหมดของเรา">
<meta name="keywords" content="โซล่าเซลล์, บริการติดตั้ง, พลังงานแสงอาทิตย์, solar cell services">
<meta property="og:title" content="บริการของเรา | Solar Cell CMS">
<meta property="og:type" content="website">
```

#### Service Detail Page

Check for:
- [ ] Custom title from service.seo.metaTitle (or service.title)
- [ ] Custom description from service.seo.metaDescription
- [ ] Keywords from service.seo.keywords
- [ ] Open Graph image from service.featuredImage

#### Articles List Page

Check for these tags:
```html
<title>บทความ | Solar Cell CMS</title>
<meta name="description" content="อ่านบทความและความรู้เกี่ยวกับระบบโซล่าเซลล์...">
<meta property="og:title" content="บทความ | Solar Cell CMS">
```

#### Article Detail Page

Check for:
- [ ] Custom title from article.seo.metaTitle (or article.title)
- [ ] Description from article.seo.metaDescription (or excerpt)
- [ ] Keywords from article.seo.keywords
- [ ] `<meta property="og:type" content="article">`
- [ ] `<meta property="og:article:published_time" content="...">`
- [ ] Open Graph image from article.featuredImage

---

## 🖼️ Image Loading Testing

### Lazy Loading

**Scroll slowly down a page with multiple cards:**
- [ ] Images above the fold load immediately
- [ ] Images below the fold load as you scroll
- [ ] No layout shift when images load
- [ ] Loading is smooth and fast

### Priority Loading

**Check first 2-3 cards:**
- [ ] Images load immediately (priority)
- [ ] No blur-up effect delay
- [ ] Sharp images from the start

### Image Optimization

**Open DevTools → Network tab → Filter by "Img":**
- [ ] Images are served in WebP format (if supported)
- [ ] Multiple sizes available (responsive)
- [ ] Images are compressed (smaller file sizes)

---

## ⚠️ Error State Testing

### API Error Simulation

**When Payload CMS is not running:**

**Services Page:**
- [ ] Shows red error box
- [ ] Message: "ไม่สามารถโหลดข้อมูลบริการได้ กรุณาลองใหม่อีกครั้ง"
- [ ] No crash or blank page

**Reviews Page:**
- [ ] Shows red error box
- [ ] Message: "ไม่สามารถโหลดข้อมูลผลงานได้ กรุณาลองใหม่อีกครั้ง"

**Articles Page:**
- [ ] Shows red error box
- [ ] Message: "ไม่สามารถโหลดข้อมูลบทความได้ กรุณาลองใหม่อีกครั้ง"

### Empty State

**When no content exists:**
- [ ] Services: Blue box with "ยังไม่มีบริการ"
- [ ] Reviews: Blue box with "ยังไม่มีผลงาน"
- [ ] Articles: Amber box with "ยังไม่มีบทความ"

### 404 Not Found

**Try invalid URLs:**
- [ ] `/services/invalid-slug` → Shows 404 page
- [ ] `/articles/invalid-slug` → Shows 404 page

---

## ✨ Animation and Interaction Testing

### Hover Effects

**Services Cards:**
- [ ] Card lifts up on hover
- [ ] "ดูรายละเอียด" text appears
- [ ] Image scales up slightly
- [ ] Bottom accent bar animates in

**Reviews Cards:**
- [ ] Card scales up slightly
- [ ] Gradient overlay intensifies
- [ ] Decorative circles scale up

**Articles Cards:**
- [ ] Top accent bar animates in
- [ ] Image scales up slightly
- [ ] Arrow icon moves right

### Click Interactions

**All Cards:**
- [ ] Clicking anywhere on card navigates to detail page
- [ ] Cursor changes to pointer on hover
- [ ] No broken links

**Related Service Badge (Reviews):**
- [ ] Clicking badge navigates to service detail
- [ ] Badge has hover effect
- [ ] Clicking badge doesn't trigger card click

---

## 🎯 Accessibility Testing

### Keyboard Navigation

**Use Tab key to navigate:**
- [ ] Can tab through all navigation links
- [ ] Can tab through all cards
- [ ] Focus indicator is visible
- [ ] Can activate links with Enter key

### Screen Reader Testing

**Use browser's screen reader (if available):**
- [ ] Page titles are announced
- [ ] Navigation landmarks are identified
- [ ] Images have alt text
- [ ] Links have descriptive text

### Semantic HTML

**Check in DevTools:**
- [ ] `<header>` for page headers
- [ ] `<nav>` for navigation
- [ ] `<main>` for main content
- [ ] `<article>` for articles and services
- [ ] `<section>` for content sections
- [ ] `<footer>` for page footer
- [ ] `<time>` for dates (articles)

---

## 📊 Performance Testing

### Page Load Speed

**Open DevTools → Network tab:**
- [ ] Initial page load < 3 seconds
- [ ] Images load progressively
- [ ] No blocking resources
- [ ] Smooth scrolling

### Lighthouse Audit

**Run Lighthouse (DevTools → Lighthouse):**
- [ ] Performance score > 80
- [ ] Accessibility score > 90
- [ ] Best Practices score > 80
- [ ] SEO score > 90

---

## ✅ Final Verification

### All Pages Work

- [ ] Home page loads
- [ ] Services list page loads
- [ ] Service detail page loads (if data exists)
- [ ] Reviews list page loads
- [ ] Articles list page loads
- [ ] Article detail page loads (if data exists)

### Navigation Works

- [ ] Header navigation works from all pages
- [ ] Breadcrumbs work on detail pages
- [ ] Back buttons work
- [ ] Call-to-action buttons work

### Design is Consistent

- [ ] Colors match design system
- [ ] Typography is consistent
- [ ] Spacing is uniform
- [ ] Cards have unique designs

### SEO is Implemented

- [ ] Meta tags present on all pages
- [ ] Open Graph tags present
- [ ] Semantic HTML used
- [ ] Alt text on images

### Responsive Design Works

- [ ] Desktop layout correct
- [ ] Tablet layout correct
- [ ] Mobile layout correct
- [ ] No horizontal scrolling

---

## 🐛 Common Issues to Check

### If Images Don't Load:
- Check that image URLs are valid
- Check browser console for errors
- Verify Next.js Image component is used

### If Navigation Doesn't Work:
- Check that links have correct href
- Verify Next.js Link component is used
- Check for JavaScript errors

### If Styles Look Wrong:
- Clear browser cache
- Check that Tailwind CSS is loaded
- Verify class names are correct

### If API Errors Appear:
- This is expected when Payload CMS is not running
- Error messages should be user-friendly
- Pages should not crash

---

## 📝 Testing Notes

**Record any issues found:**

1. Issue: _______________
   - Page: _______________
   - Expected: _______________
   - Actual: _______________

2. Issue: _______________
   - Page: _______________
   - Expected: _______________
   - Actual: _______________

---

## ✅ Sign-Off

**Tester:** _______________
**Date:** _______________
**Status:** [ ] PASSED  [ ] FAILED  [ ] NEEDS REVIEW

**Notes:**
_______________________________________________
_______________________________________________
_______________________________________________

