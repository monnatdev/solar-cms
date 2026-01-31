#!/usr/bin/env node

/**
 * Lighthouse Performance Testing Script
 * Tests all main pages and generates performance reports
 */

import { spawn } from 'child_process';
import { writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const BASE_URL = 'http://localhost:3000';
const PAGES = [
  { url: '/', name: 'home', title: 'Home Page' },
  { url: '/services', name: 'services', title: 'Services Page' },
  { url: '/reviews', name: 'reviews', title: 'Reviews Page' },
  { url: '/articles', name: 'articles', title: 'Articles Page' },
];

const PERFORMANCE_THRESHOLDS = {
  fcp: 1500, // First Contentful Paint (ms)
  lcp: 2500, // Largest Contentful Paint (ms)
  tti: 3000, // Time to Interactive (ms)
  cls: 0.1,  // Cumulative Layout Shift
  tbt: 300,  // Total Blocking Time (ms)
};

// Start the Next.js server
function startServer() {
  return new Promise((resolve, reject) => {
    console.log('🌐 Starting production server...');
    const server = spawn('npm', ['run', 'start'], {
      cwd: join(__dirname, '..'),
      stdio: 'pipe',
    });

    server.stdout.on('data', (data) => {
      const output = data.toString();
      if (output.includes('Ready') || output.includes('started server')) {
        console.log('✅ Server is ready');
        resolve(server);
      }
    });

    server.stderr.on('data', (data) => {
      // Ignore stderr for now
    });

    // Timeout after 30 seconds
    setTimeout(() => {
      console.log('⚠️  Server startup timeout, proceeding anyway...');
      resolve(server);
    }, 30000);
  });
}

// Run Lighthouse on a URL
async function runLighthouse(url, name) {
  return new Promise((resolve, reject) => {
    console.log(`\n🔍 Testing: ${name} (${url})`);
    
    const lighthouse = spawn('npx', [
      'lighthouse',
      url,
      '--output=json',
      '--output-path=stdout',
      '--preset=desktop',
      '--quiet',
      '--chrome-flags=--headless --no-sandbox --disable-gpu',
    ], {
      cwd: join(__dirname, '..'),
    });

    let output = '';
    lighthouse.stdout.on('data', (data) => {
      output += data.toString();
    });

    lighthouse.on('close', (code) => {
      if (code === 0) {
        try {
          const result = JSON.parse(output);
          resolve(result);
        } catch (error) {
          reject(new Error(`Failed to parse Lighthouse output: ${error.message}`));
        }
      } else {
        reject(new Error(`Lighthouse exited with code ${code}`));
      }
    });
  });
}

// Extract key metrics from Lighthouse result
function extractMetrics(result) {
  const audits = result.audits;
  const categories = result.categories;

  return {
    performance: Math.round(categories.performance.score * 100),
    accessibility: Math.round(categories.accessibility.score * 100),
    bestPractices: Math.round(categories['best-practices'].score * 100),
    seo: Math.round(categories.seo.score * 100),
    fcp: Math.round(audits['first-contentful-paint'].numericValue),
    lcp: Math.round(audits['largest-contentful-paint'].numericValue),
    tti: Math.round(audits['interactive'].numericValue),
    cls: parseFloat(audits['cumulative-layout-shift'].numericValue.toFixed(3)),
    tbt: Math.round(audits['total-blocking-time'].numericValue),
    speedIndex: Math.round(audits['speed-index'].numericValue),
  };
}

// Check if metrics meet thresholds
function checkThresholds(metrics) {
  const issues = [];
  
  if (metrics.fcp > PERFORMANCE_THRESHOLDS.fcp) {
    issues.push(`FCP: ${metrics.fcp}ms (threshold: ${PERFORMANCE_THRESHOLDS.fcp}ms)`);
  }
  if (metrics.lcp > PERFORMANCE_THRESHOLDS.lcp) {
    issues.push(`LCP: ${metrics.lcp}ms (threshold: ${PERFORMANCE_THRESHOLDS.lcp}ms)`);
  }
  if (metrics.tti > PERFORMANCE_THRESHOLDS.tti) {
    issues.push(`TTI: ${metrics.tti}ms (threshold: ${PERFORMANCE_THRESHOLDS.tti}ms)`);
  }
  if (metrics.cls > PERFORMANCE_THRESHOLDS.cls) {
    issues.push(`CLS: ${metrics.cls} (threshold: ${PERFORMANCE_THRESHOLDS.cls})`);
  }
  if (metrics.tbt > PERFORMANCE_THRESHOLDS.tbt) {
    issues.push(`TBT: ${metrics.tbt}ms (threshold: ${PERFORMANCE_THRESHOLDS.tbt}ms)`);
  }

  return issues;
}

// Format metrics for display
function formatMetrics(metrics) {
  return `
  Performance Score: ${metrics.performance}/100
  Accessibility Score: ${metrics.accessibility}/100
  Best Practices Score: ${metrics.bestPractices}/100
  SEO Score: ${metrics.seo}/100
  
  Core Web Vitals:
  - First Contentful Paint (FCP): ${metrics.fcp}ms
  - Largest Contentful Paint (LCP): ${metrics.lcp}ms
  - Time to Interactive (TTI): ${metrics.tti}ms
  - Cumulative Layout Shift (CLS): ${metrics.cls}
  - Total Blocking Time (TBT): ${metrics.tbt}ms
  - Speed Index: ${metrics.speedIndex}ms
  `;
}

// Main function
async function main() {
  console.log('🚀 Starting Lighthouse Performance Testing...\n');

  // Create reports directory
  const reportsDir = join(__dirname, '..', 'lighthouse-reports');
  try {
    mkdirSync(reportsDir, { recursive: true });
  } catch (error) {
    // Directory already exists
  }

  // Start server
  let server;
  try {
    server = await startServer();
    
    // Wait a bit more for server to be fully ready
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Test each page
    const results = [];
    for (const page of PAGES) {
      try {
        const result = await runLighthouse(`${BASE_URL}${page.url}`, page.title);
        const metrics = extractMetrics(result);
        const issues = checkThresholds(metrics);

        results.push({
          page: page.title,
          url: page.url,
          metrics,
          issues,
        });

        console.log(formatMetrics(metrics));
        
        if (issues.length > 0) {
          console.log('  ⚠️  Issues found:');
          issues.forEach(issue => console.log(`    - ${issue}`));
        } else {
          console.log('  ✅ All metrics within thresholds');
        }

        // Save full result
        writeFileSync(
          join(reportsDir, `${page.name}.json`),
          JSON.stringify(result, null, 2)
        );
      } catch (error) {
        console.error(`  ❌ Error testing ${page.title}: ${error.message}`);
        results.push({
          page: page.title,
          url: page.url,
          error: error.message,
        });
      }
    }

    // Generate summary report
    const summary = {
      timestamp: new Date().toISOString(),
      thresholds: PERFORMANCE_THRESHOLDS,
      results,
    };

    writeFileSync(
      join(reportsDir, 'summary.json'),
      JSON.stringify(summary, null, 2)
    );

    // Print summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 PERFORMANCE TESTING SUMMARY');
    console.log('='.repeat(60));

    results.forEach(result => {
      if (result.error) {
        console.log(`\n❌ ${result.page}: ERROR`);
        console.log(`   ${result.error}`);
      } else {
        const status = result.issues.length === 0 ? '✅' : '⚠️';
        console.log(`\n${status} ${result.page}:`);
        console.log(`   Performance: ${result.metrics.performance}/100`);
        console.log(`   FCP: ${result.metrics.fcp}ms | LCP: ${result.metrics.lcp}ms | TTI: ${result.metrics.tti}ms`);
        console.log(`   CLS: ${result.metrics.cls} | TBT: ${result.metrics.tbt}ms`);
        if (result.issues.length > 0) {
          console.log(`   Issues: ${result.issues.length}`);
        }
      }
    });

    console.log('\n' + '='.repeat(60));
    console.log(`\n✅ Testing complete! Reports saved in: ${reportsDir}`);

  } catch (error) {
    console.error(`\n❌ Error: ${error.message}`);
    process.exit(1);
  } finally {
    // Stop server
    if (server) {
      console.log('\n🛑 Stopping server...');
      server.kill();
    }
  }
}

// Run the script
main().catch(error => {
  console.error(`Fatal error: ${error.message}`);
  process.exit(1);
});
