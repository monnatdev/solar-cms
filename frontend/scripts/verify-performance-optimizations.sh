#!/bin/bash

# Performance Optimization Verification Script
# Verifies that all performance optimizations are in place

echo "🔍 Verifying Performance Optimizations..."
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counter for checks
PASSED=0
FAILED=0

# Function to check and report
check() {
  local description=$1
  local command=$2
  
  if eval "$command" > /dev/null 2>&1; then
    echo -e "${GREEN}✅${NC} $description"
    ((PASSED++))
  else
    echo -e "${RED}❌${NC} $description"
    ((FAILED++))
  fi
}

echo "📦 Requirement 13.2: Image Optimization"
echo "----------------------------------------"

# Check for Next.js Image imports
check "Next.js Image component used in HeroSection" \
  "grep -q \"from 'next/image'\" components/home/HeroSection.tsx"

check "Next.js Image component used in ServiceCard" \
  "grep -q \"from 'next/image'\" components/services/ServiceCard.tsx"

check "Next.js Image component used in ReviewCard" \
  "grep -q \"from 'next/image'\" components/reviews/ReviewCard.tsx"

check "Next.js Image component used in ArticleCard" \
  "grep -q \"from 'next/image'\" components/articles/ArticleCard.tsx"

# Check for lazy loading attributes
check "Images have lazy loading in ServiceCard" \
  "grep -q 'loading=\"lazy\"' components/services/ServiceCard.tsx || grep -q '<Image' components/services/ServiceCard.tsx"

echo ""
echo "🔀 Requirement 13.3: Code Splitting"
echo "----------------------------------------"

# Check for dynamic imports
check "Dynamic imports used in home page" \
  "grep -q \"from 'next/dynamic'\" app/page.tsx"

check "SolarCalculator dynamically imported" \
  "grep -q 'dynamic.*SolarCalculator' app/page.tsx"

check "LeadForm dynamically imported" \
  "grep -q 'dynamic.*LeadForm' app/page.tsx"

# Check for loading states
check "Loading states provided for dynamic components" \
  "grep -q 'loading:' app/page.tsx"

echo ""
echo "⚡ Requirement 13.4: Lazy Loading"
echo "----------------------------------------"

# Check for lazy loading implementation
check "Lazy loading in images (Next.js Image default)" \
  "grep -q '<Image' components/home/HeroSection.tsx"

check "Dynamic imports for below-the-fold content" \
  "grep -q 'dynamic(' app/page.tsx"

echo ""
echo "🏗️  Additional Optimizations"
echo "----------------------------------------"

# Check for font optimization
check "Next.js font optimization used" \
  "grep -q 'next/font' app/layout.tsx"

# Check for metadata
check "SEO metadata configured" \
  "grep -q 'export const metadata' app/layout.tsx"

# Check for sitemap
check "Sitemap generation implemented" \
  "test -f app/sitemap.ts"

# Check build configuration
check "Next.js config exists" \
  "test -f next.config.ts"

echo ""
echo "📊 Build Analysis"
echo "----------------------------------------"

# Check if build exists
if [ -d ".next" ]; then
  echo -e "${GREEN}✅${NC} Production build exists"
  ((PASSED++))
  
  # Try to get bundle size info
  if [ -f ".next/build-manifest.json" ]; then
    echo -e "${GREEN}✅${NC} Build manifest found"
    ((PASSED++))
  else
    echo -e "${YELLOW}⚠️${NC}  Build manifest not found (run 'npm run build')"
  fi
else
  echo -e "${RED}❌${NC} No production build found"
  echo "   Run 'npm run build' to create a production build"
  ((FAILED++))
fi

echo ""
echo "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "="
echo "📈 VERIFICATION SUMMARY"
echo "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "="
echo ""
echo "Checks Passed: ${GREEN}${PASSED}${NC}"
echo "Checks Failed: ${RED}${FAILED}${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
  echo -e "${GREEN}✅ All performance optimizations are in place!${NC}"
  echo ""
  echo "Next steps:"
  echo "1. Run 'npm run build' to create production build"
  echo "2. Run 'npm run start' to start production server"
  echo "3. Test with Chrome DevTools Lighthouse"
  exit 0
else
  echo -e "${RED}❌ Some optimizations are missing or need attention${NC}"
  echo ""
  echo "Please review the failed checks above and implement missing optimizations."
  exit 1
fi
