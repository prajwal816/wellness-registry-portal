# Quick Deployment Commands

## Local Testing Before Deployment

### Test Backend Docker Build

```bash
cd backend
docker build -t ayush-wellness-backend .
docker run -p 5000:5000 --env-file .env ayush-wellness-backend
```

### Test Frontend Build

```bash
cd frontend
npm run build
npm run preview
```

## Deployment Steps

### 1. Push to GitHub

```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### 2. Deploy Backend (Render)

- Go to render.com
- Create new Web Service
- Connect GitHub repo
- Set root directory to `backend`
- Set runtime to Docker
- Add environment variables from `.env.production`

### 3. Deploy Frontend (Vercel)

- Go to vercel.com
- Import GitHub project
- Set root directory to `frontend`
- Set framework to Vite
- Add environment variables:
  - `VITE_API_URL=https://your-backend.onrender.com`
  - `VITE_NODE_ENV=production`

### 4. Update URLs

After both deployments:

1. Update `CLIENT_URL` in Render with your Vercel URL
2. Update Google OAuth URLs in Google Cloud Console
3. Test the application

## Environment Variables Checklist

### Render (Backend)

- [ ] MONGODB_URI
- [ ] JWT_SECRET
- [ ] GOOGLE_CLIENT_ID
- [ ] GOOGLE_CLIENT_SECRET
- [ ] CLIENT_URL (Vercel URL)
- [ ] GOOGLE_CALLBACK_URL (Render URL + /api/auth/google/callback)
- [ ] CLOUDINARY_CLOUD_NAME
- [ ] CLOUDINARY_API_KEY
- [ ] CLOUDINARY_API_SECRET
- [ ] PORT=5000
- [ ] NODE_ENV=production

### Vercel (Frontend)

- [ ] VITE_API_URL (Render URL)
- [ ] VITE_NODE_ENV=production

### Google Cloud Console

- [ ] Authorized JavaScript Origins: Vercel URL
- [ ] Authorized Redirect URIs: Render URL + /api/auth/google/callback
