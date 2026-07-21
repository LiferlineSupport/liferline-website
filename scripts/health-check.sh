#!/usr/bin/env bash
# Site Health Check for liferline.com
# Usage: ./scripts/health-check.sh [domain]
# Checks critical site functionality and reports status

set -euo pipefail

DOMAIN="${1:-https://liferline.com}"
ERRORS=0

echo "🔍 Checking site health for: $DOMAIN"
echo ""

# Test 1: Homepage loads with 200 status
echo "✓ Checking homepage..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$DOMAIN" || echo "000")
if [ "$HTTP_CODE" != "200" ]; then
  echo "  ❌ Homepage returned $HTTP_CODE (expected 200)"
  ERRORS=$((ERRORS + 1))
else
  echo "  ✓ Homepage: 200 OK"
fi

# Test 2: Homepage contains correct title
echo "✓ Checking page title..."
TITLE=$(curl -s "$DOMAIN" | grep -o '<title>[^<]*</title>' | sed 's/<[^>]*>//g' || echo "")
if [[ "$TITLE" == *"Forever Cables"* ]] && [[ "$TITLE" == *"Liferline"* ]]; then
  echo "  ✓ Title correct: $TITLE"
else
  echo "  ⚠️  Title may be outdated: $TITLE"
  echo "     Expected: Contains 'Forever Cables' and 'Liferline'"
  ERRORS=$((ERRORS + 1))
fi

# Test 3: Products page loads
echo "✓ Checking /products..."
PRODUCTS_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$DOMAIN/products" || echo "000")
if [ "$PRODUCTS_CODE" != "200" ]; then
  echo "  ❌ /products returned $PRODUCTS_CODE"
  ERRORS=$((ERRORS + 1))
else
  echo "  ✓ /products: 200 OK"
fi

# Test 4: Example product page loads
echo "✓ Checking /products/the-workhorse..."
PRODUCT_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$DOMAIN/products/the-workhorse" || echo "000")
if [ "$PRODUCT_CODE" != "200" ]; then
  echo "  ❌ /products/the-workhorse returned $PRODUCT_CODE"
  ERRORS=$((ERRORS + 1))
else
  echo "  ✓ Product page: 200 OK"
fi

# Test 5: Blog page loads
echo "✓ Checking /blog..."
BLOG_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$DOMAIN/blog" || echo "000")
if [ "$BLOG_CODE" != "200" ]; then
  echo "  ❌ /blog returned $BLOG_CODE"
  ERRORS=$((ERRORS + 1))
else
  echo "  ✓ /blog: 200 OK"
fi

# Test 6: Sitemap exists
echo "✓ Checking /sitemap.xml..."
SITEMAP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$DOMAIN/sitemap.xml" || echo "000")
if [ "$SITEMAP_CODE" != "200" ]; then
  echo "  ❌ /sitemap.xml returned $SITEMAP_CODE"
  ERRORS=$((ERRORS + 1))
else
  echo "  ✓ Sitemap: 200 OK"
fi

# Test 7: Robots.txt exists
echo "✓ Checking /robots.txt..."
ROBOTS_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$DOMAIN/robots.txt" || echo "000")
if [ "$ROBOTS_CODE" != "200" ]; then
  echo "  ❌ /robots.txt returned $ROBOTS_CODE"
  ERRORS=$((ERRORS + 1))
else
  echo "  ✓ Robots.txt: 200 OK"
fi

# Test 8: Check for Next.js powered header
echo "✓ Checking X-Powered-By header..."
POWERED_BY=$(curl -s -I "$DOMAIN" | grep -i "x-powered-by" | cut -d' ' -f2- | tr -d '\r\n' || echo "")
if [[ "$POWERED_BY" == *"Next.js"* ]]; then
  echo "  ✓ X-Powered-By: $POWERED_BY"
else
  echo "  ⚠️  X-Powered-By header missing or incorrect: '$POWERED_BY'"
fi

# Test 9: SSL certificate valid
echo "✓ Checking SSL certificate..."
if curl -s --head "$DOMAIN" | grep -q "HTTP/2 200"; then
  echo "  ✓ SSL certificate valid (HTTPS working)"
else
  echo "  ❌ SSL/HTTPS issue detected"
  ERRORS=$((ERRORS + 1))
fi

echo ""
echo "════════════════════════════════════════"
if [ $ERRORS -eq 0 ]; then
  echo "✅ All checks passed! Site is healthy."
  exit 0
else
  echo "⚠️  $ERRORS check(s) failed. Review output above."
  exit 1
fi
