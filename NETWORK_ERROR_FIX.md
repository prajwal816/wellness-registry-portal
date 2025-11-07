# 🔧 Network Error Troubleshooting

## Problem: "Network Error" when registering/logging in

This error occurs when the frontend cannot connect to the backend API.

## Common Causes & Solutions

### 1. Render Backend is Sleeping (Most Common)

**Cause**: Render's free tier puts your backend to sleep after 15 minutes of inactivity.

**Solution**:

- Wait 30-60 seconds for the backend to wake up
- Click the "Wake Up Backend" button that appears at the top of the page
- Try registering/logging in again after the backend shows as "online"

**How to check**:

- Visit: https://ayushwellness-backend.onrender.com/health
- If it takes a long time to load, the backend is waking up
- If it shows `{"status":"OK",...}`, the backend is online

### 2. Backend Not Deployed or Crashed

**Check Render Dashboard**:

1. Go to https://dashboard.render.com
2. Find your `ayushwellness-backend` service
3. Check if it shows "Live" status
4. Check the logs for any errors

**Common deployment issues**:

- Build failed
- Environment variables missing
- MongoDB connection failed

### 3. CORS Configuration Issue

**Symptoms**: Backend is online but requests are blocked

**Check**:

- Open browser developer tools (F12)
- Look for CORS errors in console
- Error will say "blocked by CORS policy"

**Fix**:
Ensure your Render backend has this environment variable:

```
CLIENT_URL=https://wellness-registry-portal.vercel.app
```

### 4. Wrong Backend URL

**Check**:

- Frontend is trying to connect to: `https://ayushwellness-backend.onrender.com`
- Verify this URL is correct in your Render dashboard

## Quick Diagnostic Steps

### Step 1: Check Backend Health

```bash
curl https://ayushwellness-backend.onrender.com/health
```

**Expected response**:

```json
{
  "status": "OK",
  "timestamp": "2024-...",
  "uptime": 123.456
}
```

### Step 2: Check CORS

```bash
curl -H "Origin: https://wellness-registry-portal.vercel.app" \
     -H "Access-Control-Request-Method: POST" \
     -X OPTIONS \
     https://ayushwellness-backend.onrender.com/api/auth/register
```

**Expected**: Should return 200 OK with CORS headers

### Step 3: Test Registration Endpoint

```bash
curl -X POST https://ayushwellness-backend.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"test123"}'
```

**Expected**: Should return user data and token

## Solutions

### Solution 1: Wait for Backend to Wake Up

1. Visit https://ayushwellness-backend.onrender.com/health
2. Wait for it to load (may take 30-60 seconds)
3. Once it shows the health check response, try registering again

### Solution 2: Keep Backend Awake

Use a service like UptimeRobot or Cron-job.org to ping your backend every 10 minutes:

- URL to ping: `https://ayushwellness-backend.onrender.com/health`
- Frequency: Every 10 minutes

### Solution 3: Upgrade Render Plan

- Render's paid plans don't sleep
- Costs $7/month for always-on service

## Testing After Fix

1. **Visit**: https://wellness-registry-portal.vercel.app
2. **Check**: Top banner should show "Backend is online ✓"
3. **Try**: Register with a new email
4. **Expected**: Should successfully create account and redirect to dashboard

## Still Having Issues?

### Check Browser Console

1. Open Developer Tools (F12)
2. Go to Console tab
3. Look for error messages
4. Check Network tab for failed requests

### Check Render Logs

1. Go to Render dashboard
2. Click on your backend service
3. Click "Logs" tab
4. Look for errors when you try to register

### Verify Environment Variables

Make sure these are set on Render:

- `MONGODB_URI`
- `JWT_SECRET`
- `CLIENT_URL=https://wellness-registry-portal.vercel.app`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `CLOUDINARY_*` variables

## Prevention

To avoid the "sleeping backend" issue:

1. Use a free uptime monitoring service
2. Or upgrade to Render's paid plan
3. Or accept the 30-60 second wake-up time on first request

The backend will stay awake as long as there's activity within 15 minutes.
