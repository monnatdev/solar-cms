#!/bin/bash

# Image Optimization Verification Script
# Validates that all images use Next.js Image component with proper optimization

echo "🔍 Verifying Image Optimization Implementation..."
echo ""

# Check for plain img tags (excluding test files)
echo "1. Checking for plain <img> tags..."
PLAIN_IMG_COUNT=$(grep -r "<img" components app --include="*.tsx" --include="*.ts" 2>/dev/null | grep -v "test" | grep -v "mock" | wc -l)
if [ "$PLAIN_IMG_COUNT" -eq 0 ]; then
  echo "   ✅ No plain <img> tags found"
else
  echo "   ❌ Found $PLAIN_IMG_COUNT plain <img> tags"
  grep -r "<img" components app --include="*.tsx" --include="*.ts" | grep -v "test" | grep -v "mock"
fi
echo ""

# Check for Next.js Image imports
echo "2. Checking Next.js Image component usage..."
IMAGE_IMPORT_COUNT=$(grep -r "from 'next/image'" components app --include="*.tsx" 2>/dev/null | wc -l)
echo "   ✅ Found $IMAGE_IMPORT_COUNT components using Next.js Image"
echo ""

# Check for sizes attribute
echo "3. Checking for responsive sizes attribute..."
SIZES_COUNT=$(grep -r 'sizes=' components app --include="*.tsx" 2>/dev/null | grep -v "test" | wc -l)
echo "   ✅ Found $SIZES_COUNT images with sizes attribute"
echo ""

# Check for lazy loading
echo "4. Checking for lazy loading implementation..."
LAZY_COUNT=$(grep -r 'loading=' components app --include="*.tsx" 2>/dev/null | grep -v "test" | wc -l)
echo "   ✅ Found $LAZY_COUNT images with loading attribute"
echo ""

# Check for priority loading
echo "5. Checking for priority loading..."
PRIORITY_COUNT=$(grep -r 'priority' components app --include="*.tsx" 2>/dev/null | grep -v "test" | grep -v "//" | wc -l)
echo "   ✅ Found $PRIORITY_COUNT images with priority loading"
echo ""

# Check for quality settings
echo "6. Checking for quality configuration..."
QUALITY_COUNT=$(grep -r 'quality=' components app --include="*.tsx" 2>/dev/null | grep -v "test" | wc -l)
echo "   ✅ Found $QUALITY_COUNT images with quality settings"
echo ""

# Check Next.js config
echo "7. Checking Next.js image configuration..."
if grep -q "images:" next.config.ts 2>/dev/null; then
  echo "   ✅ Next.js image configuration found"
else
  echo "   ❌ Next.js image configuration missing"
fi
echo ""

# Summary
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 Summary:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "   Components using Next.js Image: $IMAGE_IMPORT_COUNT"
echo "   Images with responsive sizes: $SIZES_COUNT"
echo "   Images with lazy loading: $LAZY_COUNT"
echo "   Images with priority loading: $PRIORITY_COUNT"
echo "   Images with quality settings: $QUALITY_COUNT"
echo "   Plain <img> tags found: $PLAIN_IMG_COUNT"
echo ""

if [ "$PLAIN_IMG_COUNT" -eq 0 ] && [ "$IMAGE_IMPORT_COUNT" -gt 0 ]; then
  echo "✅ Image optimization is properly implemented!"
  exit 0
else
  echo "⚠️  Some issues found. Please review the output above."
  exit 1
fi
