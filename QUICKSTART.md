# Quick Start Guide

Get your portfolio up and running in 5 minutes!

## Prerequisites

Ensure you have installed:
- **Node.js 18+** from [nodejs.org](https://nodejs.org)
- **npm** (comes with Node.js) or **yarn**
- **Git** from [git-scm.com](https://git-scm.com)

## Step 1: Installation

```bash
# Navigate to project directory
cd advportfolio

# Install dependencies
npm install
```

## Step 2: Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The site auto-refreshes as you edit files.

## Step 3: Customize Content

### Update Your Information

**Edit `lib/constants.ts`:**

```typescript
export const CONTACT_EMAIL = 'your.email@example.com';
export const LOCATION = 'Your City, Country';
```

### Add Your Projects

**Edit `lib/constants.ts`:**

```typescript
export const PROJECTS = [
  {
    id: 1,
    title: 'Your Amazing Project',
    description: 'What this project does',
    image: '📱', // Use emoji or image path
    tags: ['React', 'Node.js'],
    features: ['Feature 1', 'Feature 2'],
  },
  // Add more projects...
];
```

### Update Skills

**Edit `lib/constants.ts`:**

```typescript
export const SKILLS_BY_CATEGORY = {
  languages: ['Java', 'Python', 'JavaScript'],
  web: ['React', 'Vue'],
  tools: ['Git', 'Docker'],
  concepts: ['OOP', 'Design Patterns'],
};
```

### Update Education

**Edit `lib/constants.ts`:**

```typescript
export const EDUCATION = [
  {
    level: 'Bachelor of Science',
    school: 'Your University',
    duration: '2021 - 2025',
    cgpa: '8.5',
  },
];
```

## Step 4: Customize Colors

**Edit `tailwind.config.js`:**

```javascript
colors: {
  primary: '#0a0e27',      // Dark background
  accent: '#ff6b35',       // Orange accent
  'accent-blue': '#00a8ff', // Blue accent
}
```

## Step 5: Build & Deploy

### Build for Production

```bash
npm run build
npm run start
```

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

Or connect your GitHub repo to [vercel.com](https://vercel.com) for automatic deployments.

## File Structure Guide

```
advportfolio/
├── app/
│   ├── layout.tsx         ← Main layout
│   ├── page.tsx           ← Home page  
│   └── globals.css        ← Global styles
├── components/
│   ├── Hero.tsx           ← Hero section
│   ├── About.tsx          ← About section
│   ├── Skills.tsx         ← Skills section
│   └── ...                ← Other sections
├── lib/
│   ├── constants.ts       ← Edit YOUR content here
│   └── types.ts           ← TypeScript types
├── public/
│   ├── robots.txt
│   └── sitemap.xml
└── package.json           ← Dependencies
```

## Common Tasks

### Change Primary Color

Edit `tailwind.config.js` line:
```javascript
primary: '#0a0e27', // Change this color
```

### Add New Section

1. Create `components/NewSection.tsx`
2. Add to `app/page.tsx`
3. Style with Tailwind CSS

### Update Social Links

Edit `lib/constants.ts`:
```typescript
export const SOCIAL_LINKS = [
  { name: 'GitHub', url: 'https://github.com/yourprofile' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/yourprofile' },
];
```

### Change Font

Edit `app/layout.tsx`:
```typescript
import { YourFont } from 'next/font/google';
```

## Troubleshooting

### Port Already in Use
```bash
npm run dev -- -p 3001
```

### Dependencies Error
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Fails
```bash
npm run build -- --debug
```

### Animations Not Smooth
Reduce animation load by disabling particles in `app/page.tsx`:
```typescript
// <ParticlesBackground />
```

## Next Steps

- [ ] Install dependencies: `npm install`
- [ ] Start dev server: `npm run dev`
- [ ] Update `lib/constants.ts` with your info
- [ ] Customize colors in `tailwind.config.js`
- [ ] Test everything works: `npm run build`
- [ ] Deploy to Vercel or your host
- [ ] Configure custom domain
- [ ] Set up Google Analytics (optional)

## Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Framer Motion**: https://www.framer.com/motion/
- **TypeScript**: https://www.typescriptlang.org/docs/

## Need Help?

- Check [CUSTOMIZATION.md](./CUSTOMIZATION.md) for detailed guides
- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment help
- Review component files - they have comments!
- Check console errors: Press `Ctrl+Shift+K` in browser

## Performance Tips

1. **Images**: Compress images first
2. **Fonts**: Use system fonts or Google Fonts
3. **Animations**: Test on slow devices
4. **Bundle**: Run `npm run build` to check size

## Security Checklist

- [ ] Remove any sensitive information
- [ ] Use environment variables for API keys
- [ ] Enable HTTPS (auto on Vercel)
- [ ] Check for npm vulnerabilities: `npm audit`

---

**You're all set! Start customizing and make it yours.** 🚀
