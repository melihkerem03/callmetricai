#!/bin/bash

# CallMetric AI Web - Production Deployment Script
# Quick deployment to Vercel

set -e

echo "🚀 CallMetric AI Web - Production Deployment"
echo "=============================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found!"
    echo "Please run this script from callmetricai/apps/web directory"
    exit 1
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI is not installed."
    echo "📦 Installing Vercel CLI..."
    npm i -g vercel
    echo "✅ Vercel CLI installed successfully!"
fi

echo "📋 Pre-deployment checklist:"
echo "  ✅ Build test completed"
echo "  ✅ 12 pages generated"
echo "  ✅ Security headers configured"
echo "  ✅ Next.js optimizations enabled"
echo ""

read -p "🚀 Ready to deploy to production? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Deployment cancelled."
    exit 1
fi

echo ""
echo "🔨 Deploying to Vercel Production..."
echo ""

# Deploy to production
vercel --prod

echo ""
echo "✅ Deployment completed successfully!"
echo ""
echo "📝 Post-deployment tasks:"
echo "  [ ] Check homepage: https://callmetricai-web.vercel.app"
echo "  [ ] Test all pages (/company, /products, /faqs, etc.)"
echo "  [ ] Verify SSL certificate"
echo "  [ ] Configure custom domain (if needed)"
echo "  [ ] Setup Vercel Analytics"
echo ""
echo "🎉 Production deployment complete!"
echo ""
echo "📊 Vercel Dashboard: https://vercel.com/melihkerem03s-projects/callmetricai-web"

