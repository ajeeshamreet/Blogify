#!/bin/bash
# Run this in Render Shell to fix the failed migration

echo "Marking failed migration as resolved..."
npx prisma migrate resolve --applied 20251205173512_init

echo "Deploying migrations..."
npx prisma migrate deploy

echo "Done! Migration should be fixed."
