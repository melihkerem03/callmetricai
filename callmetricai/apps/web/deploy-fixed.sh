#!/bin/bash

# Vercel Deployment - Alternative Method
# Bu script web dizininden çalıştırılmalı

echo "🔧 Vercel Deployment Fix"
echo "========================"
echo ""

# Check directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Run this from callmetricai/apps/web directory"
    exit 1
fi

echo "📋 Current Directory: $(pwd)"
echo ""

# Clean old Vercel config
echo "🧹 Cleaning old Vercel configuration..."
rm -rf .vercel

echo ""
echo "🚀 Deploying to Vercel..."
echo ""
echo "When prompted:"
echo "  - Set up and deploy? → Yes"
echo "  - Which scope? → melihkerem03s-projects"
echo "  - Link to existing project? → No (create new)"
echo "  - Project name? → callmetricai-web-new"
echo "  - Directory? → ./ (current)"
echo ""

read -p "Ready to continue? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Cancelled."
    exit 1
fi

# Deploy
vercel --prod

echo ""
echo "✅ Done!"

