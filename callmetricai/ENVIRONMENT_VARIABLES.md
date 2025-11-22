# CallMetric AI - Environment Variables Documentation

## Environment Variables Guide

### Development Environment (.env.local)

#### App (callmetricai/apps/app)
```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://igboerxkjwvyysowwwfx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_development_anon_key

# Whisper API Configuration (Modal)
NEXT_PUBLIC_WHISPER_API_URL=https://melihkerem03--callmetric-ai-api-batched-whispermodel-fastapi-app.modal.run/transcribe

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

#### Web (callmetricai/apps/web)
```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:4000

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

### Production Environment (Vercel Dashboard)

#### App (app.callmetricai.com)
```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://igboerxkjwvyysowwwfx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<production_anon_key>

# Whisper API Configuration
NEXT_PUBLIC_WHISPER_API_URL=https://melihkerem03--callmetric-ai-api-batched-whispermodel-fastapi-app.modal.run/transcribe

# App URL
NEXT_PUBLIC_APP_URL=https://app.callmetricai.com
```

#### Web (callmetricai.com)
```bash
# API Configuration
NEXT_PUBLIC_API_URL=https://api.callmetricai.com

# App URL
NEXT_PUBLIC_APP_URL=https://callmetricai.com
```

---

### How to Set Environment Variables in Vercel

1. Go to your project in Vercel Dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable:
   - **Name**: Variable name (e.g., `NEXT_PUBLIC_SUPABASE_URL`)
   - **Value**: Variable value
   - **Environment**: Select `Production`, `Preview`, or `Development`
4. Click **Save**
5. Redeploy your application for changes to take effect

---

### Security Notes

⚠️ **Important Security Guidelines:**

1. **Never commit `.env.local` or `.env.production` to git**
2. **NEXT_PUBLIC_* variables are exposed to the browser** - don't put sensitive data here
3. **Use Vercel's encrypted environment variables** for sensitive data
4. **Rotate keys regularly** (at least every 90 days)
5. **Use different keys for development and production**

---

### Testing Environment Variables

To test if your environment variables are correctly set:

```bash
# Development
npm run dev
# Check browser console: console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)

# Production (after deployment)
# Check Network tab in DevTools for API calls
```

---

### Troubleshooting

**Problem**: Environment variables not working after deployment
**Solution**: 
1. Check if variables are set in Vercel Dashboard
2. Make sure to redeploy after adding new variables
3. Clear browser cache
4. Check spelling of variable names

**Problem**: "undefined" value for environment variables
**Solution**:
1. Make sure variable names start with `NEXT_PUBLIC_` for client-side access
2. Restart development server after adding new variables
3. Check if `.env.local` file is in the correct directory

---

### Additional Resources

- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Supabase Environment Variables](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

