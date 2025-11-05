# 🧪 Deployment Testing Guide

## ✅ Your Live Applications

- **Frontend**: https://wellness-registry-portal.vercel.app
- **Backend**: https://ayushwellness-backend.onrender.com

## 🔍 Step-by-Step Testing

### 1. Backend Health Check

Test your backend is running:

```bash
# Open in browser or use curl
https://ayushwellness-backend.onrender.com/health
```

**Expected Response:**

```json
{
  "status": "OK",
  "timestamp": "2024-XX-XXTXX:XX:XX.XXXZ",
  "uptime": 123.456
}
```

### 2. CORS Configuration Test

1. **Open your frontend**: https://wellness-registry-portal.vercel.app
2. **Open browser developer tools** (F12)
3. **Check console for errors** - should see no CORS errors
4. **Look for API configuration logs** (in development mode)

### 3. Google OAuth Test

1. **Visit your frontend**: https://wellness-registry-portal.vercel.app
2. **Click "Sign in with Google"**
3. **Should redirect to Google OAuth**
4. **After authentication, should redirect back to your app**
5. **Check that user is logged in**

**If OAuth fails, check:**

- Google Cloud Console URLs are correct
- Backend `GOOGLE_CALLBACK_URL` is set correctly
- No trailing slashes in URLs

### 4. File Upload Test

1. **Sign in to your app**
2. **Navigate to file upload section**
3. **Try uploading an image**
4. **Should upload to Cloudinary successfully**
5. **Check that file appears in your app**

### 5. API Connection Test

**In browser console on your frontend:**

```javascript
// Test API connection
fetch("/api/health")
  .then((response) => response.json())
  .then((data) => console.log("API Health:", data))
  .catch((error) => console.error("API Error:", error));
```

## 🔧 Environment Variables Verification

### Verify Render Environment Variables

Your Render service should have these exact values:

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

### Verify Vercel Environment Variables

Your Vercel project should have:

```env
VITE_API_URL=https://ayushwellness-backend.onrender.com
VITE_NODE_ENV=production
```

**After adding/updating Vercel environment variables, redeploy your frontend!**

## 🔐 Google OAuth Configuration

### Required URLs in Google Cloud Console

**Authorized JavaScript Origins:**

```
https://wellness-registry-portal.vercel.app
```

**Authorized Redirect URIs:**

```
https://ayushwellness-backend.onrender.com/api/auth/google/callback
```

### How to Update Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Navigate to "APIs & Services" → "Credentials"
3. Click on your OAuth 2.0 Client ID: `779573780867-qnr2q9j5494nq67otldmkca25i98mqno.apps.googleusercontent.com`
4. Add the URLs above
5. Save changes
6. Wait 5-10 minutes for changes to propagate

## 🚨 Common Issues & Solutions

### Issue: CORS Errors

**Symptoms:** Console shows "blocked by CORS policy"
**Solution:**

- Verify `CLIENT_URL` on Render is exactly: `https://wellness-registry-portal.vercel.app`
- Redeploy backend after changing environment variables

### Issue: Google OAuth Fails

**Symptoms:** "redirect_uri_mismatch" error
**Solution:**

- Check Google Cloud Console URLs match exactly
- Ensure no trailing slashes in URLs
- Wait for Google changes to propagate

### Issue: API Calls Fail

**Symptoms:** Network errors, 404s
**Solution:**

- Verify `VITE_API_URL` on Vercel is: `https://ayushwellness-backend.onrender.com`
- Redeploy frontend after changing environment variables
- Check backend is running at the health endpoint

### Issue: File Uploads Fail

**Symptoms:** Upload errors, Cloudinary errors
**Solution:**

- Verify Cloudinary credentials on Render
- Check file size limits (10MB max)
- Ensure user is authenticated for avatar uploads

## ✅ Final Checklist

- [ ] Backend health endpoint responds: `https://ayushwellness-backend.onrender.com/health`
- [ ] Frontend loads without errors: `https://wellness-registry-portal.vercel.app`
- [ ] No CORS errors in browser console
- [ ] Google Sign-In works end-to-end
- [ ] File uploads work (both general and avatar)
- [ ] All environment variables set correctly
- [ ] Google OAuth URLs updated in Cloud Console

## 🎉 Success Indicators

When everything is working correctly, you should see:

1. **Frontend loads** without console errors
2. **Google Sign-In** redirects properly and logs user in
3. **File uploads** work and files appear in Cloudinary
4. **API calls** succeed (check Network tab in dev tools)
5. **User data** persists in MongoDB Atlas

## 🔄 If You Need to Redeploy

### Redeploy Backend (Render)

- Changes to environment variables require redeployment
- Go to Render dashboard → Manual Deploy

### Redeploy Frontend (Vercel)

- Changes to environment variables require redeployment
- Go to Vercel dashboard → Redeploy

## 📞 Quick Test Commands

**Test backend directly:**

```bash
curl https://ayushwellness-backend.onrender.com/health
```

**Test CORS:**

```bash
curl -H "Origin: https://wellness-registry-portal.vercel.app" \
     -H "Access-Control-Request-Method: GET" \
     -X OPTIONS \
     https://ayushwellness-backend.onrender.com/api/auth/me
```

Your application should now be fully functional! 🚀
