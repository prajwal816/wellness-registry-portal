# 🌐 Simple URL Configuration Guide

This guide helps you configure URLs for your deployment.

## 🎯 Quick Setup

### 1. Backend URLs (Render Environment Variables)

Add these to your Render dashboard under "Environment Variables":

```env
# Primary URLs
CLIENT_URL=https://wellness-registry-portal.vercel.app
GOOGLE_CALLBACK_URL=https://ayushwellness-backend.onrender.com/api/auth/google/callback
```

### 2. Frontend URLs (Vercel Environment Variables)

Add these to your Vercel dashboard under "Settings" → "Environment Variables":

```env
# Primary API URL
VITE_API_URL=https://ayushwellness-backend.onrender.com
VITE_NODE_ENV=production
```

## 🔧 Common URL Patterns

### Vercel URLs

```
Main: https://wellness-registry-portal.vercel.app
Branch: https://your-app-name-git-branch-name.vercel.app
Preview: https://your-app-name-git-commit-hash.vercel.app
Custom: https://your-domain.com
```

### Render URLs

```
Main: https://your-service-name.onrender.com
Custom: https://api.your-domain.com (with custom domain)
```

## 📋 Step-by-Step Configuration

### Step 1: Get Your Deployment URLs

1. **Deploy Backend to Render**

   - Note the URL: `https://ayushwellness-backend.onrender.com`

2. **Deploy Frontend to Vercel**
   - Note the URL: `https://wellness-registry-portal.vercel.app`

### Step 2: Update Backend Environment Variables

In Render dashboard, add/update:

```env
CLIENT_URL=https://wellness-registry-portal.vercel.app
GOOGLE_CALLBACK_URL=https://ayushwellness-backend.onrender.com/api/auth/google/callback
```

### Step 3: Update Frontend Environment Variables

In Vercel dashboard, add/update:

```env
VITE_API_URL=https://ayushwellness-backend.onrender.com
VITE_NODE_ENV=production
```

### Step 4: Update Google OAuth

In Google Cloud Console, add:

**Authorized JavaScript Origins:**

```
https://wellness-registry-portal.vercel.app
```

**Authorized Redirect URIs:**

```
https://ayushwellness-backend.onrender.com/api/auth/google/callback
```

## 🚀 Multiple Environment Setup

### Development

```env
# Backend
CLIENT_URL=http://localhost:8080

# Frontend
VITE_API_URL=http://localhost:5000
VITE_NODE_ENV=development
```

### Staging

```env
# Backend
CLIENT_URL=https://your-app-staging.vercel.app
VERCEL_URL_1=https://your-app-staging.vercel.app

# Frontend
VITE_API_URL=https://your-backend-staging.onrender.com
VITE_NODE_ENV=staging
```

### Production

```env
# Backend
CLIENT_URL=https://your-app.vercel.app
VERCEL_URL_1=https://your-app.vercel.app

# Frontend
VITE_API_URL=https://your-backend.onrender.com
VITE_NODE_ENV=production
```

## 🔍 Testing Your Configuration

### 1. Check CORS

```bash
curl -H "Origin: https://wellness-registry-portal.vercel.app" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: X-Requested-With" \
     -X OPTIONS \
     https://ayushwellness-backend.onrender.com/api/auth/me
```

### 2. Test API Connection

```javascript
// In browser console on your Vercel app
fetch("/api/health")
  .then((response) => response.json())
  .then((data) => console.log("API Health:", data));
```

### 3. Test Google OAuth

- Visit your Vercel app
- Click "Sign in with Google"
- Should redirect properly through your Render backend

## 🛠️ Troubleshooting

### CORS Errors

- Check that your Vercel URL is added to backend environment variables
- Ensure no trailing slashes in URLs
- Verify environment variables are deployed (redeploy if needed)

### OAuth Errors

- Check Google Cloud Console URLs match exactly
- Ensure `GOOGLE_CALLBACK_URL` points to your Render backend
- Wait 5-10 minutes for Google changes to propagate

### API Connection Issues

- Verify `VITE_API_URL` points to your Render backend
- Check that both services are deployed and running
- Test API endpoints directly in browser

## 📝 URL Checklist

### Before Deployment

- [ ] Choose your app names for Vercel and Render
- [ ] Plan your URL structure
- [ ] Prepare environment variables

### After Backend Deployment

- [ ] Note your Render URL
- [ ] Update Google OAuth redirect URI
- [ ] Test backend health endpoint

### After Frontend Deployment

- [ ] Note your Vercel URL
- [ ] Update backend `CLIENT_URL`
- [ ] Update Google OAuth origins
- [ ] Test full application flow

### Final Verification

- [ ] CORS working (no console errors)
- [ ] Google OAuth working
- [ ] File uploads working
- [ ] All API calls successful

## 🎉 Quick Copy-Paste Templates

### For Render Environment Variables

```
CLIENT_URL=https://wellness-registry-portal.vercel.app
VERCEL_URL_1=https://wellness-registry-portal.vercel.app
GOOGLE_CALLBACK_URL=https://YOUR_RENDER_SERVICE.onrender.com/api/auth/google/callback
```

### For Vercel Environment Variables

```
VITE_API_URL=https://YOUR_RENDER_SERVICE.onrender.com
VITE_NODE_ENV=production
```

### For Google Cloud Console

```
Origins: https://wellness-registry-portal.vercel.app
Redirects: https://YOUR_RENDER_SERVICE.onrender.com/api/auth/google/callback
```

Replace `YOUR_VERCEL_APP` and `YOUR_RENDER_SERVICE` with your actual service names!
