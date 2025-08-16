# Deployment Instructions

## Environment Variables Setup

Before deploying to Vercel, you need to set up the following environment variables:

### 1. Supabase Configuration
```bash
NEXT_PUBLIC_SUPABASE_URL=https://piphcrzwflnguexrlbuu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 2. Get Your Supabase Anon Key
1. Go to [supabase.com](https://supabase.com)
2. Select your project "Bakkeraandedeurbd"
3. Go to Settings > API
4. Copy the "anon public" key

### 3. Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Add the environment variables in Vercel dashboard
3. Deploy

## Local Development
1. Copy `.env.example` to `.env.local`
2. Fill in your Supabase credentials
3. Run `npm run dev`

## Common Issues
- **Build Error**: Missing environment variables
- **Runtime Error**: Supabase connection failed
- **Deployment Failed**: Check Vercel logs for environment variable errors