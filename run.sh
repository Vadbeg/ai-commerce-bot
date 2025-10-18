#!/bin/bash

# Kill any processes on ports 3000 and 8000
echo "Cleaning up ports 3000 and 8000..."
lsof -ti:3000 | xargs kill -9 2>/dev/null || true
lsof -ti:9000 | xargs kill -9 2>/dev/null || true
lsof -ti:8000 | xargs kill -9 2>/dev/null || true
sleep 1

# Start Docker database
echo "Starting Docker database..."
docker compose up -d

# Start backend
echo "Starting Medusa backend (localhost:9000)..."
cd my-store
npm run dev &
BACKEND_PID=$!

# Start storefront
echo "Starting storefront (localhost:8000)..."
cd ../my-store-storefront
npm run dev &
STOREFRONT_PID=$!

echo ""
echo "✅ Both servers running:"
echo "   Backend:    localhost:9000"
echo "   Storefront: localhost:8000"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for user to stop
wait
