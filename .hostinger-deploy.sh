#!/bin/bash
# Hostinger deployment script
# This script runs on Hostinger's server after pulling from GitHub

set -e

echo "Installing dependencies..."
npm ci --production=false

echo "Building Next.js application..."
npm run build

echo "Deployment complete!"
