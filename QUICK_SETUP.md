# 🚀 Quick Setup Guide

Your Vercel app is deployed at: **https://wellness-registry-portal.vercel.app**

## 📋 Next Steps for Backend Deployment

### 1. Deploy Backend to Render

1. Go to [render.com](https://render.com) and create a new Web Service
2. Connect your GitHub repository
3. Configure:
   - **Root Directory**: `backend`
   - **Runtime**: Docker
   - **Branch**: main

### 2. Set Environment Variables on Render

Copy and paste these exact values in your Render dashboard:

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

✅ **Ready to use** - All URLs are configured!

### 3. Update Vercel Environment Variables

In your Vercel dashboard for `wellness-registry-portal`, add:

```env
VITE_API_URL=https://ayushwellness-backend.onrender.com
VITE_NODE_ENV=production
```

✅ **Ready to use** - All URLs are configured!

### 4. Update Google OAuth Settings

In Google Cloud Console, add these URLs:

**Authorized JavaScript Origins:**

```
https://wellness-registry-portal.vercel.app
```

**Authorized Redirect URIs:**

```
https://ayushwellness-backend.onrender.com/api/auth/google/callback
```

## ✅ Checklist

- [ ] Backend deployed to Render
- [ ] Environment variables set on Render
- [ ] Environment variables updated on Vercel
- [ ] Google OAuth URLs updated
- [ ] Test the application

## 🔗 Your URLs

- **Frontend**: https://wellness-registry-portal.vercel.app ✅
- **Backend**: https://ayushwellness-backend.onrender.com ✅

## 🆘 Need Help?

If you encounter issues:

1. Check the detailed `DEPLOYMENT_GUIDE.md`
2. Run `node backend/scripts/validate-urls.js` to validate configuration
3. Check browser console for CORS errors
4. Verify all environment variables are set correctly
