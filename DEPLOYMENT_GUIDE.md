# 🚀 Complete Deployment Guide

This guide will walk you through deploying your MERN stack application with:

- **Backend**: Render (Docker)
- **Frontend**: Vercel
- **Database**: MongoDB Atlas (already configured)

## 📋 Prerequisites

1. GitHub repository with your code
2. MongoDB Atlas database (already set up)
3. Cloudinary account (already configured)
4. Google Cloud Console OAuth app (needs updating)

---

## 1️⃣ Backend Deployment on Render

### Step 1: Prepare Your Repository

Ensure your backend directory contains:

- ✅ `Dockerfile` (created)
- ✅ `.dockerignore` (created)
- ✅ `healthcheck.js` (created)
- ✅ Updated `server.js` with health check and CORS

### Step 2: Create Render Web Service

1. **Go to Render Dashboard**

   - Visit [render.com](https://render.com)
   - Sign up/Login with GitHub

2. **Create New Web Service**

   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select your repository

3. **Configure Service Settings**

   ```
   Name: ayush-wellness-backend (or your preferred name)
   Region: Oregon (US West) or closest to your users
   Branch: main (or your default branch)
   Root Directory: backend
   Runtime: Docker
   ```

4. **Build & Deploy Settings**
   ```
   Build Command: (leave empty - Docker handles this)
   Start Command: (leave empty - Docker handles this)
   ```

### Step 3: Set Environment Variables on Render

In your Render service dashboard, go to "Environment" and add:

```env
MONGODB_URI=mongodb+srv://prajwalimmadi103:prajwal1@cluster0.ht47adu.mongodb.net/?appName=Cluster0
JWT_SECRET=6de6fea944f3fdfa6882d05fe931c2f8c810b8d1dd57aae3707810bb4c61e6c2
GOOGLE_CLIENT_ID=779573780867-qnr2q9j5494nq67otldmkca25i98mqno.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
CLIENT_URL=https://wellness-registry-portal.vercel.app
GOOGLE_CALLBACK_URL=https://ayushwellness-backend.onrender.com/api/auth/google/callback
CLOUDINARY_CLOUD_NAME=de59dyljj
CLOUDINARY_API_KEY=629196129572578
CLOUDINARY_API_SECRET=XRGsTKixK77I7g3yP_o61tpnew8
PORT=5000
NODE_ENV=production
```

**⚠️ Important Notes:**

- Replace `your-app-name` with your actual Vercel app name (you'll get this after frontend deployment)
- Replace `your-backend-name` with your Render service name
- Replace Cloudinary credentials with your actual values

### Step 4: Deploy

1. Click "Create Web Service"
2. Render will automatically build and deploy using Docker
3. Wait for deployment to complete (5-10 minutes)
4. Note your backend URL: `https://ayushwellness-backend.onrender.com`

---

## 2️⃣ Frontend Deployment on Vercel ✅ COMPLETED

Your frontend is already deployed at: **https://wellness-registry-portal.vercel.app**

### Update Environment Variables on Vercel

In your Vercel project dashboard, go to "Settings" → "Environment Variables" and add:

```env
VITE_API_URL=https://ayushwellness-backend.onrender.com
VITE_NODE_ENV=production
```

**Replace `your-backend-name` with your actual Render service name**

After adding these variables, redeploy your Vercel app to apply the changes.

---

## 3️⃣ Post-Deployment Configuration

### Step 1: Update Backend Environment Variables

Go back to your Render dashboard and update:

```env
CLIENT_URL=https://your-actual-vercel-url.vercel.app
```

Then redeploy your backend service.

### Step 2: Update Google Cloud Console OAuth

1. **Go to Google Cloud Console**

   - Visit [console.cloud.google.com](https://console.cloud.google.com)
   - Navigate to "APIs & Services" → "Credentials"

2. **Update OAuth 2.0 Client**

   - Click on your OAuth client ID: `779573780867-qnr2q9j5494nq67otldmkca25i98mqno.apps.googleusercontent.com`

3. **Add Authorized JavaScript Origins**

   ```
   https://wellness-registry-portal.vercel.app
   https://ayushwellness-backend.onrender.com
   ```

4. **Add Authorized Redirect URIs**

   ```
   https://ayushwellness-backend.onrender.com/api/auth/google/callback
   ```

5. **Save Changes**

### Step 3: Validate Your Configuration

Before testing, validate your URL configuration:

**Backend Validation:**

```bash
cd backend
node scripts/validate-urls.js
```

**Frontend Validation:**

- Open browser developer console on your Vercel app
- Check for configuration validation logs
- Look for any CORS or API connection errors

### Step 4: Test Your Deployment

1. **Visit your frontend URL**
2. **Test authentication**
3. **Test file uploads**
4. **Verify all functionality**

---

## 🔧 Environment Variables Summary

### Render (Backend)

```env
MONGODB_URI=mongodb+srv://prajwalimmadi103:prajwal1@cluster0.ht47adu.mongodb.net/?appName=Cluster0
JWT_SECRET=6de6fea944f3fdfa6882d05fe931c2f8c810b8d1dd57aae3707810bb4c61e6c2
GOOGLE_CLIENT_ID=779573780867-qnr2q9j5494nq67otldmkca25i98mqno.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
CLIENT_URL=https://wellness-registry-portal.vercel.app
GOOGLE_CALLBACK_URL=https://ayushwellness-backend.onrender.com/api/auth/google/callback
CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
CLOUDINARY_API_KEY=your_actual_api_key
CLOUDINARY_API_SECRET=your_actual_api_secret
PORT=5000
NODE_ENV=production
```

### Vercel (Frontend)

```env
VITE_API_URL=https://ayushwellness-backend.onrender.com
VITE_NODE_ENV=production
```

---

## 🚨 Common Issues & Solutions

### Issue 1: CORS Errors

**Solution**: Ensure `CLIENT_URL` in Render matches your Vercel URL exactly

### Issue 2: Google OAuth Not Working

**Solution**:

- Check Google Cloud Console URLs are correct
- Ensure `GOOGLE_CALLBACK_URL` matches exactly
- Wait 5-10 minutes for Google changes to propagate

### Issue 3: File Uploads Failing

**Solution**:

- Verify Cloudinary credentials in Render
- Check file size limits
- Ensure CORS allows file upload headers

### Issue 4: Environment Variables Not Working

**Solution**:

- Redeploy after adding environment variables
- Check variable names match exactly (case-sensitive)
- Verify no extra spaces in values

---

## 📱 Final URLs Structure

After successful deployment, you'll have:

```
Frontend: https://wellness-registry-portal.vercel.app
Backend:  https://ayushwellness-backend.onrender.com
Database: MongoDB Atlas (existing)
Storage:  Cloudinary (existing)
```

---

## 🎉 Deployment Checklist

- [ ] Backend deployed on Render with Docker
- [ ] Frontend deployed on Vercel
- [ ] Environment variables configured on both platforms
- [ ] Google OAuth URLs updated in Cloud Console
- [ ] CORS configured for production
- [ ] All functionality tested in production
- [ ] SSL certificates working (automatic on both platforms)

Your application is now live and ready for users! 🚀
