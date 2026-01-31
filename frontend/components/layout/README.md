# Layout Components

This directory contains layout components that are used across the application.

## Header Component

The Header component provides the main navigation for the Solar Cell CMS application.

### Features

- **Desktop Navigation**: Horizontal menu with all navigation items
- **Mobile Navigation**: Hamburger menu with slide-down animation
- **Responsive Design**: Adapts to Desktop (1920px+), Tablet (768px-1919px), and Mobile (320px-767px)
- **Sticky Positioning**: Stays at the top of the viewport when scrolling
- **Accessibility**: Includes proper ARIA labels and keyboard navigation support
- **Smooth Animations**: Transitions for menu open/close and hover states

### Navigation Items

- **Home** (`/`) - Homepage
- **Services** (`/services`) - Services listing page
- **Reviews** (`/reviews`) - Reviews listing page
- **Articles** (`/articles`) - Articles listing page
- **Contact** (`/#contact`) - Contact section (anchor link)

### Usage

The Header component is automatically included in the root layout (`app/layout.tsx`):

```tsx
import Header from "@/components/layout/Header";

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
```

### Styling

The component uses Tailwind CSS for styling with the following key classes:

- `sticky top-0 z-50` - Sticky positioning at the top
- `md:hidden` / `hidden md:flex` - Responsive visibility
- `transition-all duration-300` - Smooth animations

### Testing

Unit tests are located in `__tests__/Header.test.tsx` and cover:

- Desktop navigation rendering
- Mobile menu toggle functionality
- Navigation link correctness
- Accessibility attributes
- Responsive design classes

Run tests with:

```bash
npm test components/layout/__tests__/Header.test.tsx
```

### Requirements Validation

This component validates the following requirements:

- **14.1**: Desktop display support (1920px+)
- **14.2**: Tablet display support (768px-1919px)
- **14.3**: Mobile display support (320px-767px)
- **14.4**: Automatic layout adjustment on screen size change
