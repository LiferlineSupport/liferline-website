#!/bin/bash
# Verify live pricing on liferline.com matches source code
# Usage: ./scripts/verify-live-prices.sh

set -e

echo "=== Forever Cables Live Price Verification ==="
echo "Checking liferline.com/products..."
echo ""

# Fetch the products page
CONTENT=$(curl -s https://liferline.com/products)

# Expected prices from lib/products.ts
EXPECTED_WORKHORSE="22.00"
EXPECTED_RIGHT_ANGLE="25.00"
EXPECTED_PACK="95.00"
EXPECTED_STAGE="38.00"

# Check if expected prices are present in the HTML
echo "Checking for correct prices in HTML..."
echo ""

PASS=0
FAIL=0

if echo "$CONTENT" | grep -q "\$22.00" || echo "$CONTENT" | grep -q "\$22\.00"; then
  echo "✅ The Workhorse: \$22.00 found"
  ((PASS++))
else
  echo "❌ The Workhorse: \$22.00 NOT FOUND"
  ((FAIL++))
fi

if echo "$CONTENT" | grep -q "\$25.00" || echo "$CONTENT" | grep -q "\$25\.00"; then
  echo "✅ The Right Angle: \$25.00 found"
  ((PASS++))
else
  echo "❌ The Right Angle: \$25.00 NOT FOUND"
  ((FAIL++))
fi

if echo "$CONTENT" | grep -q "\$95.00" || echo "$CONTENT" | grep -q "\$95\.00"; then
  echo "✅ The Pedalboard Pack: \$95.00 found"
  ((PASS++))
else
  echo "❌ The Pedalboard Pack: \$95.00 NOT FOUND"
  ((FAIL++))
fi

if echo "$CONTENT" | grep -q "\$38.00" || echo "$CONTENT" | grep -q "\$38\.00"; then
  echo "✅ The Stage Cable: \$38.00 found"
  ((PASS++))
else
  echo "❌ The Stage Cable: \$38.00 NOT FOUND"
  ((FAIL++))
fi

echo ""
echo "=== Results ==="
echo "Passed: $PASS/4"
echo "Failed: $FAIL/4"

if [ $FAIL -eq 0 ]; then
  echo ""
  echo "🎉 All prices are correct on the live site!"
  exit 0
else
  echo ""
  echo "⚠️  Pricing mismatch detected. Deployment may still be in progress."
  exit 1
fi
