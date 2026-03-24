# Deployment Guide

This guide covers deploying your portfolio to various platforms.

## Vercel Deployment (Recommended)

Vercel is the creator of Next.js and offers the best integration.

### Option 1: Using Git

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel auto-detects Next.js settings
6. Click "Deploy"

### Option 2: Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

## Netlify Deployment

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Set environment variables if needed
5. Deploy

## Railway

1. Sign up at [railway.app](https://railway.app)
2. Create new project
3. Connect GitHub repository
4. Configure environment
5. Deploy

## AWS Amplify

1. Sign in to AWS Console
2. Go to Amplify Hosting
3. Connect GitHub repository
4. Configure build settings:
   - Build command: `npm run build`
   - Start command: `npm run start`
5. Deploy

## Traditional Server (VPS/Dedicated)

### Build

```bash
npm run build
npm run start
```

### Using PM2 (Process Manager)

```bash
npm install -g pm2

pm2 start "npm run start" --name "portfolio"
pm2 save
pm2 startup
```

### Using Nginx

```nginx
upstream nextjs {
  server localhost:3000;
}

server {
  listen 80;
  server_name amandeepaman.dev;

  location / {
    proxy_pass http://nextjs;
  }
}
```

### Using Apache

Enable modules:
```bash
a2enmod rewrite
a2enmod proxy
a2enmod proxy_http
```

Configure `.htaccess`:
```
RewriteCond %{HTTP_HOST} ^(.*)$ [NC]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://127.0.0.1:3000/$1 [P,L]
```

## Environment Variables

Create `.env.production.local`:

```
NEXT_PUBLIC_API_URL=https://amandeepaman.dev
NEXT_PUBLIC_GA_ID=YOUR_GOOGLE_ANALYTICS_ID
```

## Domain Setup

### With Vercel
- Add custom domain in Vercel dashboard
- Update DNS records with CNAME

### With Other Hosts
Update your domain's DNS settings:

```
CNAME: www → your-deployment-url
A: @ → your-server-ip
```

## SSL/HTTPS

- **Vercel**: Automatic
- **Netlify**: Automatic
- **Traditional Server**: Use Let's Encrypt
  ```bash
  sudo apt-get install certbot python3-certbot-nginx
  sudo certbot certonly --nginx -d amandeepaman.dev
  ```

## Performance Optimization

### Build Optimization

```bash
npm run build -- --profile
```

### Image Optimization

Ensure images are optimized:
- Use WebP format where possible
- Compress with TinyPNG or similar
- Use responsive images

### Caching Headers

Set cache headers for static assets:
```
Cache-Control: public, max-age=31536000, immutable
```

## Monitoring

### Setup Analytics

#### Google Analytics
1. Create GA4 property
2. Get measurement ID
3. Add to `.env.production.local`:
   ```
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

### Error Tracking

Consider adding Sentry:
```bash
npm install @sentry/nextjs
```

### Uptime Monitoring

Services:
- UptimeRobot
- Pingdom
- StatusCake

## CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - run: npm ci
      - run: npm run build
      - run: npm run lint
      
      - name: Deploy to Vercel
        uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
```

## Troubleshooting

### Build Fails
1. Check Node version (should be 18+)
2. Clear `.next` folder: `rm -rf .next`
3. Reinstall dependencies: `rm -rf node_modules && npm install`

### Performance Issues
1. Check bundle size: `npm install -D @next/bundle-analyzer`
2. Optimize images and fonts
3. Enable compression

### SSL Certificate Issues
1. Renew certificate if expired
2. Check domain DNS records
3. Wait for DNS propagation (up to 48 hours)

## Rollback

### Vercel
Deployments tab → Select previous deployment → Click "Promote to Production"

### Git
```bash
git revert <commit-hash>
git push
```

## Post-Deployment Checklist

- [ ] Test all sections and links
- [ ] Check responsive design on mobile
- [ ] Verify contact form works
- [ ] Test animations performance
- [ ] Check Google Analytics
- [ ] Monitor error reports
- [ ] Verify SSL certificate
- [ ] Check SEO metadata
- [ ] Test on different browsers
- [ ] Performance audit with Lighthouse

## Support

For deployment issues:
- Check platform-specific documentation
- Review build logs
- Check environment variables
- Verify file permissions
- Clear browser cache

---

Need help? Check the official Next.js deployment docs:
https://nextjs.org/docs/deployment
