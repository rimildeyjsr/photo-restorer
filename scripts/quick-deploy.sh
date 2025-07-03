#!/bin/bash

echo "🚀 Quick Cloudflare Deployment"

# Check if we're ready
if [ ! -f ".dev.vars" ]; then
  echo "❌ Create .dev.vars file first with your environment variables"
  exit 1
fi

# Install dependencies if needed
if [ ! -d "node_modules/@opennextjs/cloudflare" ]; then
  echo "📦 Installing Cloudflare dependencies..."
  npm install @opennextjs/cloudflare@latest
  npm install --save-dev wrangler@latest
fi

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Build and deploy
echo "🏗️ Building for Cloudflare..."
npm run build-open

echo "🚀 Deploying to Cloudflare..."
npm run deploy

echo ""
echo "✅ Deployment complete!"
echo "🌐 Your app should be live at: https://photo-restorer-yourname.workers.dev"