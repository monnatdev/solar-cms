/**
 * Application Configuration Constants
 * 
 * Central configuration file for the Solar Cell CMS application.
 * Contains API endpoints, feature flags, and application settings.
 * 
 * Validates Requirements: 13.2, 13.4
 */

/**
 * API Configuration
 */
export const API_CONFIG = {
  /**
   * Base URL for Payload CMS API
   * Defaults to localhost in development
   */
  baseUrl: process.env.NEXT_PUBLIC_PAYLOAD_API_URL || 'http://localhost:3001',

  /**
   * API endpoints
   */
  endpoints: {
    articles: '/api/articles',
    services: '/api/services',
    reviews: '/api/reviews',
    leads: '/api/leads',
    media: '/api/media',
  },

  /**
   * API request timeout in milliseconds
   */
  timeout: 10000,

  /**
   * Number of retries for failed requests
   */
  retries: 3,
} as const;

/**
 * Solar Calculator Configuration
 * 
 * Constants used in solar system calculations
 * These values are static and cannot be modified through CMS
 */
export const CALCULATOR_CONFIG = {
  /**
   * Average electricity rate in THB per kWh
   */
  electricityRate: 4.5,

  /**
   * Installation cost per kW in THB
   */
  costPerKw: 45000,

  /**
   * Average peak sun hours per day in Thailand
   */
  peakSunHours: 4.5,

  /**
   * System efficiency factor (85%)
   */
  systemEfficiency: 0.85,

  /**
   * Location type multipliers
   */
  locationMultipliers: {
    residential: 1.0,
    commercial: 1.2,
    industrial: 1.5,
  },

  /**
   * Minimum and maximum values for inputs
   */
  limits: {
    monthlyBill: {
      min: 0,
      max: 100000,
    },
    dayNightRatio: {
      min: 0,
      max: 100,
    },
  },
} as const;

/**
 * Image Optimization Configuration
 */
export const IMAGE_CONFIG = {
  /**
   * Image quality for optimization (1-100)
   */
  quality: 85,

  /**
   * Image formats to support
   */
  formats: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'] as const,

  /**
   * Maximum file size in bytes (5MB)
   */
  maxFileSize: 5 * 1024 * 1024,

  /**
   * Lazy loading threshold (number of images to load immediately)
   */
  lazyLoadThreshold: 2,

  /**
   * Placeholder blur data URL
   */
  placeholderDataUrl:
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZTVlN2ViIi8+PC9zdmc+',
} as const;

/**
 * Responsive Design Breakpoints
 * Matches Tailwind CSS default breakpoints
 */
export const BREAKPOINTS = {
  mobile: {
    min: 320,
    max: 767,
  },
  tablet: {
    min: 768,
    max: 1919,
  },
  desktop: {
    min: 1920,
    max: Infinity,
  },
} as const;

/**
 * SEO Configuration
 */
export const SEO_CONFIG = {
  /**
   * Default site metadata
   */
  defaultMetadata: {
    title: 'Solar Cell CMS - ระบบโซล่าเซลล์',
    description:
      'ระบบจัดการเนื้อหาสำหรับธุรกิจโซล่าเซลล์ พร้อมเครื่องมือคำนวณความคุ้มค่า',
    keywords: 'โซล่าเซลล์, solar cell, พลังงานแสงอาทิตย์, renewable energy',
    author: 'Solar Cell CMS',
    language: 'th',
  },

  /**
   * Open Graph default image
   */
  ogImage: '/images/og-default.jpg',

  /**
   * Site URL (should be set in environment variables)
   */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',

  /**
   * Twitter card type
   */
  twitterCard: 'summary_large_image',
} as const;

/**
 * Pagination Configuration
 */
export const PAGINATION_CONFIG = {
  /**
   * Default page size for lists
   */
  defaultPageSize: 12,

  /**
   * Page size options
   */
  pageSizeOptions: [6, 12, 24, 48] as const,

  /**
   * Maximum page size allowed
   */
  maxPageSize: 100,
} as const;

/**
 * Form Configuration
 */
export const FORM_CONFIG = {
  /**
   * Lead form field limits
   */
  leadForm: {
    fullName: {
      minLength: 2,
      maxLength: 100,
    },
    phone: {
      minLength: 9,
      maxLength: 10,
    },
    email: {
      maxLength: 255,
    },
  },

  /**
   * Form submission debounce time in milliseconds
   */
  debounceTime: 300,

  /**
   * Show success message duration in milliseconds
   */
  successMessageDuration: 3000,
} as const;

/**
 * Cache Configuration
 */
export const CACHE_CONFIG = {
  /**
   * Revalidation time for ISR (Incremental Static Regeneration) in seconds
   */
  revalidate: {
    articles: 3600, // 1 hour
    services: 3600, // 1 hour
    reviews: 3600, // 1 hour
    homepage: 1800, // 30 minutes
  },

  /**
   * Cache control headers
   */
  cacheControl: {
    static: 'public, max-age=31536000, immutable',
    dynamic: 'public, max-age=0, must-revalidate',
    api: 'public, max-age=60, s-maxage=60, stale-while-revalidate=30',
  },
} as const;

/**
 * Feature Flags
 * Enable/disable features for testing or gradual rollout
 */
export const FEATURE_FLAGS = {
  /**
   * Enable solar calculator
   */
  enableCalculator: true,

  /**
   * Enable lead form
   */
  enableLeadForm: true,

  /**
   * Enable article comments (future feature)
   */
  enableComments: false,

  /**
   * Enable social sharing
   */
  enableSocialSharing: true,

  /**
   * Enable analytics
   */
  enableAnalytics: process.env.NODE_ENV === 'production',

  /**
   * Enable debug mode
   */
  enableDebug: process.env.NODE_ENV === 'development',
} as const;

/**
 * Navigation Configuration
 */
export const NAVIGATION_CONFIG = {
  /**
   * Main navigation items
   */
  mainNav: [
    { label: 'หน้าแรก', href: '/' },
    { label: 'บริการ', href: '/services' },
    { label: 'ผลงาน', href: '/reviews' },
    { label: 'บทความ', href: '/articles' },
    { label: 'ติดต่อเรา', href: '#contact' },
  ],

  /**
   * Footer navigation items
   */
  footerNav: [
    { label: 'เกี่ยวกับเรา', href: '/about' },
    { label: 'นโยบายความเป็นส่วนตัว', href: '/privacy' },
    { label: 'เงื่อนไขการใช้งาน', href: '/terms' },
  ],
} as const;

/**
 * Contact Information
 */
export const CONTACT_INFO = {
  phone: '02-123-4567',
  email: 'info@solarcell.com',
  address: '123 ถนนพระราม 4 แขวงสีลม เขตบางรัก กรุงเทพฯ 10500',
  
  /**
   * Social media links
   */
  social: {
    facebook: 'https://facebook.com/solarcell',
    line: 'https://line.me/ti/p/@solarcell',
    instagram: 'https://instagram.com/solarcell',
  },
} as const;

/**
 * Performance Configuration
 */
export const PERFORMANCE_CONFIG = {
  /**
   * Target page load time in seconds
   */
  targetLoadTime: 3,

  /**
   * Enable code splitting
   */
  enableCodeSplitting: true,

  /**
   * Enable lazy loading
   */
  enableLazyLoading: true,

  /**
   * Prefetch links on hover
   */
  enablePrefetch: true,
} as const;

/**
 * Error Messages
 */
export const ERROR_MESSAGES = {
  /**
   * API error messages
   */
  api: {
    networkError: 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง',
    serverError: 'เกิดข้อผิดพลาดจากเซิร์ฟเวอร์ กรุณาลองใหม่ภายหลัง',
    notFound: 'ไม่พบข้อมูลที่ต้องการ',
    unauthorized: 'คุณไม่มีสิทธิ์เข้าถึงข้อมูลนี้',
    timeout: 'การเชื่อมต่อหมดเวลา กรุณาลองใหม่อีกครั้ง',
  },

  /**
   * Form error messages
   */
  form: {
    submitError: 'ไม่สามารถส่งข้อมูลได้ กรุณาลองใหม่อีกครั้ง',
    validationError: 'กรุณาตรวจสอบข้อมูลที่กรอกให้ถูกต้อง',
  },

  /**
   * Generic error messages
   */
  generic: {
    unknown: 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ',
    tryAgain: 'กรุณาลองใหม่อีกครั้ง',
  },
} as const;

/**
 * Success Messages
 */
export const SUCCESS_MESSAGES = {
  /**
   * Form success messages
   */
  form: {
    leadSubmitted: 'ส่งข้อมูลเรียบร้อยแล้ว เราจะติดต่อกลับโดยเร็วที่สุด',
  },
} as const;

/**
 * Get environment-specific configuration
 */
export function getEnvironment(): 'development' | 'production' | 'test' {
  return (process.env.NODE_ENV as 'development' | 'production' | 'test') || 'development';
}

/**
 * Check if running in production
 */
export function isProduction(): boolean {
  return getEnvironment() === 'production';
}

/**
 * Check if running in development
 */
export function isDevelopment(): boolean {
  return getEnvironment() === 'development';
}

/**
 * Check if running in test environment
 */
export function isTest(): boolean {
  return getEnvironment() === 'test';
}
