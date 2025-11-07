# ⚡ Quick Fix for "Cannot Connect to Backend"

## The Problem

Your Render backend sleeps after 15 minutes of inactivity (free tier limitation). It takes 30-60 seconds to wake up.

## ✅ Immediate Solution (Do This Now)

### Step 1: Wake Up the Backend

Open this URL in a new tab and wait for it to load:

```
https://ayushwellness-backend.onrender.com/health
```

**Wait 30-60 seconds** until you see:

```json
{"status":"OK","timestamp":"...","uptime":...}
```

### Step 2: Try Registering Again

Once the health check loads:

1. Go back to your app: https://wellness-registry-portal.vercel.app
2. Fill in the registration form
3. Click "Register"
4. **It will work now!** ✨

## 🔄 Alternative: Run Wake Script

In your terminal, run:

```bash
node wake-backend.cjs
```

Wait for it to say "Backend is awake!" then try registering.

## 🛠️ Permanent Solution

### Option 1: Use UptimeRobot (Recommended - Free)

1. Go to https://uptimerobot.com
2. Sign up (free)
3. Add New Monitor:
   - Type: HTTP(s)
   - URL: `https://ayushwellness-backend.onrender.com/health`
   - Interval: 5 minutes
4. Save

This pings your backend every 5 minutes, keeping it awake 24/7!

### Option 2: Use Cron-job.org (Free)

1. Go to https://cron-job.org
2. Sign up (free)
3. Create new cron job:
   - URL: `https://ayushwellness-backend.onrender.com/health`
   - Interval: Every 10 minutes
4. Save

### Option 3: Upgrade Render (Paid)

- Upgrade to Render's paid plan ($7/month)
- Backend never sleeps
- Instant responses always

## 📝 Why This Happens

Render's free tier:

- ✅ Free hosting
- ❌ Sleeps after 15 minutes of no activity
- ❌ Takes 30-60 seconds to wake up
- ❌ First request after sleep fails

This is normal behavior for free hosting!

## 🎯 Quick Test

Right now, open these in order:

1. https://ayushwellness-backend.onrender.com/health (wait for it to load)
2. https://wellness-registry-portal.vercel.app (try registering)

That's it! Your app works perfectly once the backend is awake.
