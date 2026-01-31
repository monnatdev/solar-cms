#!/bin/bash

# Lighthouse Performance Testing Script
# Tests all main pages and generates performance reports

echo "🚀 Starting Lighthouse Performance Testing..."
echo ""

# Build the application
echo "📦 Building application..."
npm run build

# Start the server in the background
echo "🌐 Starting production server..."
npm run start &
SERVER_PID=$!

# Wait for server to be ready
echo "⏳ Waiting for server to be ready..."
sleep 10

# Function to run lighthouse on a URL
run_lighthouse() {
  local url=$1
  local name=$2
  echo ""
  echo "🔍 Testing: $name ($url)"
  npx lighthouse "$url" \
    --output=html \
    --output=json \
    --output-path="./lighthouse-reports/$name" \
    --preset=desktop \
    --quiet \
    --chrome-flags="--headless --no-sandbox --disable-gpu"
}

# Create reports directory
mkdir -p lighthouse-reports

# Test main pages
run_lighthouse "http://localhost:3000/" "home"
run_lighthouse "http://localhost:3000/services" "services"
run_lighthouse "http://localhost:3000/reviews" "reviews"
run_lighthouse "http://localhost:3000/articles" "articles"

# Kill the server
echo ""
echo "🛑 Stopping server..."
kill $SERVER_PID

echo ""
echo "✅ Lighthouse testing complete!"
echo "📊 Reports saved in ./lighthouse-reports/"
echo ""
echo "To view reports, open the HTML files in your browser:"
echo "  - lighthouse-reports/home.report.html"
echo "  - lighthouse-reports/services.report.html"
echo "  - lighthouse-reports/reviews.report.html"
echo "  - lighthouse-reports/articles.report.html"
