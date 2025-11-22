#!/bin/bash

# CallMetric AI - Production Deployment Script
# This script helps deploy the application to Vercel

set -e

echo "🚀 CallMetric AI - Production Deployment"
echo "========================================"
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI is not installed."
    echo "📦 Installing Vercel CLI..."
    npm i -g vercel
    echo "✅ Vercel CLI installed successfully!"
fi

echo ""
echo "📋 Pre-deployment checklist:"
echo "1. Environment variables configured in Vercel Dashboard?"
echo "2. Domain settings configured?"
echo "3. Database (Supabase) ready?"
echo ""

read -p "Continue with deployment? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Deployment cancelled."
    exit 1
fi

echo ""
echo "🔨 Deploying App (app.callmetricai.com)..."
cd callmetricai/apps/app
vercel --prod

echo ""
echo "🔨 Deploying Web (callmetricai.com)..."
cd ../web
vercel --prod

echo ""
echo "✅ Deployment completed successfully!"
echo ""
echo "📝 Post-deployment checklist:"
echo "[ ] Test authentication flow"
echo "[ ] Test database connections"
echo "[ ] Verify API endpoints"
echo "[ ] Check SSL certificate"
echo "[ ] Monitor logs for errors"
echo ""
echo "🎉 Production deployment complete!"

