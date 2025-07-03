#!/bin/bash

echo "🔐 Setting up Cloudflare secrets..."

echo "Setting DATABASE_URL..."
wrangler secret put DATABASE_URL

echo "Setting DIRECT_URL..."
wrangler secret put DIRECT_URL

echo "Setting REPLICATE_API_TOKEN..."
wrangler secret put REPLICATE_API_TOKEN

echo "Setting PADDLE_WEBHOOK_SECRET..."
wrangler secret put PADDLE_WEBHOOK_SECRET

echo "✅ All secrets set!"