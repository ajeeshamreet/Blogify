# Render Deployment Fix

## Issue
Render is running `npm run dev` instead of `npm start`, causing "nodemon: not found" error.

## Solution

Go to your Render dashboard: https://dashboard.render.com

### 1. Find Your Service
- Click on `blogify-9ljq` service

### 2. Update Build & Deploy Settings
Click "Settings" tab, then scroll to "Build & Deploy"

**Build Command:**
```
npm install && npx prisma generate && npx prisma migrate deploy
```

**Start Command:**
```
npm start
```

### 3. Save Changes
Click "Save Changes" button

### 4. Manual Deploy
- Go to "Manual Deploy" section
- Click "Deploy latest commit"

## After Deployment

Once deployment succeeds, open Shell and run:
```bash
npm run seed
```

## Verify Deployment

Test the endpoint:
```
https://blogify-9ljq.onrender.com/ping
```

Should return: "Server is running .. SUCCESSFULLY"
