# Solar Cell CMS - Frontend

Frontend application for Solar Cell CMS built with Next.js 14+, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Linting**: ESLint
- **Package Manager**: npm

## Project Structure

```
frontend/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # Reusable React components
├── lib/                   # Utility functions and API clients
├── types/                 # TypeScript type definitions
├── public/                # Static assets
└── .env.local            # Environment variables (not committed)
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Payload CMS backend running (see backend repository)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and set the Payload CMS API URL:
```
NEXT_PUBLIC_PAYLOAD_API_URL=http://localhost:3001
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Build the application for production:

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_PAYLOAD_API_URL` | URL of the Payload CMS backend API | `http://localhost:3001` |

## Features

This frontend will include:

- **Hero Section**: Static hero section with header, title, and media
- **Solar Calculator**: Interactive calculator for solar panel ROI
- **Services Page**: Display and manage solar services
- **Reviews Page**: Customer reviews and testimonials
- **Articles/Blog**: Content management for articles
- **Lead Form**: Contact form for lead generation
- **Responsive Design**: Mobile-first responsive design
- **SEO Optimized**: Meta tags and Open Graph support

## Development Guidelines

### Code Style

- Use TypeScript for type safety
- Follow ESLint rules
- Use Tailwind CSS for styling
- Keep components small and reusable
- Use Server Components by default, Client Components when needed

### Folder Organization

- **app/**: Next.js pages and layouts (App Router)
- **components/**: Reusable UI components
- **lib/**: Utility functions, API clients, helpers
- **types/**: TypeScript interfaces and types

### API Integration

All API calls to Payload CMS should go through the `lib/` directory for consistency and reusability.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Payload CMS Documentation](https://payloadcms.com/docs)

## License

This project is part of the Solar Cell CMS system.
