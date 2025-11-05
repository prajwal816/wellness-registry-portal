# 🎯 Final Configuration Summary

## ✅ Your Deployment URLs

- **Frontend (Vercel)**: https://wellness-registry-portal.vercel.app
- **Backend (Render)**: https://ayushwellness-backend.onrender.com

## 🔧 Environment Variables

### Render Backend Environment Variables

Copy these exact values to your Render dashboard:

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

### Vercel Frontend Environment Variables

Add these to your Vercel dashboard:

```env
VITE_API_URL=https://ayushwellness-backend.onrender.com
VITE_NODE_ENV=production
```

## 🔐 Google OAuth Configuration

Update your Google Cloud Console with these exact URLs:

### Authorized JavaScript Origins

```
https://wellness-registry-portal.vercel.app
```

### Authorized Redirect URIs

```
https://ayushwellness-backend.onrender.com/api/auth/google/callback
```

## 📋 Deployment Checklist

- [ ] Backend deployed to Render at: https://ayushwellness-backend.onrender.com
- [ ] Environment variables configured on Render (see above)
- [ ] Environment variables updated on Vercel (see above)
- [ ] Google OAuth URLs updated in Google Cloud Console
- [ ] Test Google Sign-In functionality
- [ ] Test file upload functionality
- [ ] Verify CORS is working (no console errors)

## 🧪 Testing Your Deployment

1. **Visit your app**: https://wellness-registry-portal.vercel.app
2. **Test Google Sign-In**: Should redirect properly through your backend
3. **Test file uploads**: Should work with Cloudinary integration
4. **Check browser console**: Should show no CORS errors

## 🔍 Validation Commands

**Backend validation** (run locally):

```bash
cd backend
node scripts/validate-urls.js
```

**Frontend validation**: Check browser console for configuration logs

## 🆘 Troubleshooting

### CORS Errors

- Ensure `CLIENT_URL` on Render matches: `https://wellness-registry-portal.vercel.app`
- Redeploy backend after changing environment variables

### Google OAuth Errors

- Verify Google Cloud Console URLs match exactly (no trailing slashes)
- Wait 5-10 minutes for Google changes to propagate

### API Connection Issues

- Ensure `VITE_API_URL` on Vercel points to: `https://ayushwellness-backend.onrender.com`
- Check that backend is deployed and running

## 🎉 Success!

Once all items in the checklist are complete, your full-stack application will be live and functional with:

- ✅ User authentication via Google OAuth
- ✅ File uploads via Cloudinary
- ✅ MongoDB Atlas database
- ✅ Production-ready deployment on Vercel + Render

Your users can access the app at: **https://wellness-registry-portal.vercel.app**
