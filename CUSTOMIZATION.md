# Customization Guide

Learn how to personalize the portfolio to match your style and content.

## Content Customization

### Personal Information

Edit `lib/constants.ts`:

```typescript
export const SITE_NAME = 'Your Name - Portfolio';
export const SITE_DESCRIPTION = 'Your description';
export const CONTACT_EMAIL = 'your.email@example.com';
export const CONTACT_PHONE = '+91 XXXXXXXXXX';
export const LOCATION = 'Your City, Country';
```

### About Section

Edit `components/About.tsx`:

```typescript
<p className="text-lg text-gray-300 leading-relaxed">
  Your about text here...
</p>
```

### Skills

Edit `lib/constants.ts`:

```typescript
export const SKILLS_BY_CATEGORY = {
  languages: ['Java', 'Python', 'JavaScript'],
  web: ['React', 'Vue', 'Angular'],
  tools: ['Git', 'Docker', 'Kubernetes'],
  concepts: ['OOP', 'Design Patterns', 'Microservices'],
};
```

### Projects

Edit `lib/constants.ts`:

```typescript
export const PROJECTS = [
  {
    id: 1,
    title: 'Your Project',
    description: 'Project description',
    image: '🎨',
    tags: ['Tech1', 'Tech2'],
    features: ['Feature 1', 'Feature 2'],
  },
  // Add more projects
];
```

### Education

Edit `lib/constants.ts`:

```typescript
export const EDUCATION = [
  {
    level: 'Your Degree',
    school: 'Your School',
    duration: '2021 - 2025',
    cgpa: '8.5',
  },
];
```

## Design Customization

### Color Scheme

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: '#0a0e27',      // Main background
  secondary: '#1a1f3a',    // Secondary background
  accent: '#ff6b35',       // Primary accent (orange)
  'accent-blue': '#00a8ff', // Blue accent
  'accent-purple': '#9945ff', // Purple accent
},
```

#### Popular Color Combinations

**Dark Purple Theme:**
```javascript
primary: '#0f0a1a',
accent: '#a855f7',
'accent-blue': '#6366f1',
```

**Cyan Theme:**
```javascript
primary: '#0a1425',
accent: '#06b6d4',
'accent-blue': '#0ee7b7',
```

**Red Theme:**
```javascript
primary: '#1a0f0f',
accent: '#ef4444',
'accent-blue': '#f97316',
```

### Typography

Edit `tailwind.config.js`:

```javascript
fontFamily: {
  inter: ['Inter', 'sans-serif'],
  grotesk: ['Space Grotesk', 'sans-serif'],
},
```

Change fonts in `app/layout.tsx`:

```typescript
import { YourFont } from 'next/font/google';

const yourFont = YourFont({ subsets: ['latin'] });
```

### Animations

Edit `lib/constants.ts`:

```typescript
export const ANIMATION_DURATION = 0.6; // Increase for slower animations
export const STAGGER_DELAY = 0.2;
```

Edit component animation in `components/Hero.tsx`:

```typescript
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8 }} // Adjust duration
```

### Background Effects

#### Disable Particles

Comment out in `app/page.tsx`:

```typescript
// <ParticlesBackground />
```

#### Modify Grid Background

Edit `app/globals.css`:

```css
background-size: 100px 100px; /* Adjust grid size */
rgba(255, 107, 53, 0.05); /* Adjust grid opacity */
```

## Feature Customization

### 3D Skills Globe

The 3D skills globe in `components/SkillsGlobe.tsx` can be customized:

```typescript
const skillNodes: SkillNode[] = [
  { position: [3, 0, 0], label: 'Your Skill', category: 'languages' },
  // Add your custom nodes
];
```

Change orbit radius by modifying positions.

### Disable 3D (Mobile Optimization)

The 3D globe is already disabled on mobile. To disable entirely:

Edit `components/Skills.tsx`:

```typescript
{isDesktop ? (
  <SkillsGlobe />
) : null}
```

Change to:

```typescript
{false ? (
  <SkillsGlobe />
) : null}
```

### Custom Cursor

To disable custom cursor, remove from `app/page.tsx`:

```typescript
// <CustomCursor />
```

Or modify in `components/CustomCursor.tsx`:

```typescript
<div
  className="fixed pointer-events-none z-50 w-6 h-6 border-2 border-accent rounded-full"
  style={{
    width: '12px', // Adjust size
    height: '12px',
  }}
/>
```

## Social Links

Edit `lib/constants.ts`:

```typescript
export const SOCIAL_LINKS = [
  { name: 'GitHub', url: 'https://github.com/yourprofile' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/yourprofile' },
  { name: 'Twitter', url: 'https://twitter.com/yourhandle' },
  { name: 'Portfolio', url: 'https://yourportfolio.com' },
];
```

## Meta Information

Edit `app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: 'Your Name | Your Title',
  description: 'Your description',
  keywords: 'Your, Keywords, Here',
  openGraph: {
    title: 'Your Title',
    description: 'Your description',
    type: 'website',
    url: 'https://yoursite.com',
    images: [
      {
        url: 'https://yoursite.com/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
  },
};
```

## Contact Form

The contact form sends data to console by default. To integrate with a backend:

Edit `components/Contact.tsx`:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // Send to your API
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  
  if (response.ok) {
    setSubmitted(true);
  }
};
```

## Create API Route for Contact

Create `app/api/contact/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  // Send email or save to database
  // Example with nodemailer:
  // await sendEmail(body.email, body.message);
  
  return NextResponse.json(
    { message: 'Email sent successfully' },
    { status: 200 }
  );
}
```

## Dark/Light Mode Toggle

Add theme toggle to `components/Navbar.tsx`:

```typescript
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function Navbar() {
  const [isDark, setIsDark] = useState(true);
  
  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark(!isDark);
  };
  
  return (
    // ... existing code ...
    <button onClick={toggleTheme}>
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
```

## Adding New Sections

Create `components/YourSection.tsx`:

```typescript
'use client';

import { motion } from 'framer-motion';

export default function YourSection() {
  return (
    <section className="section-padding relative">
      <div className="container-custom">
        <motion.h2 className="text-4xl font-bold">
          Your Section
        </motion.h2>
        {/* Your content */}
      </div>
    </section>
  );
}
```

Add to `app/page.tsx`:

```typescript
import YourSection from '@/components/YourSection';

export default function Home() {
  return (
    <main>
      {/* ... existing sections ... */}
      <YourSection />
    </main>
  );
}
```

## Adding Blog Section

Create `components/Blog.tsx` and add your blog content. You can use:

- Static markdown files with `next/mdx`
- Database queries
- CMS integration (Contentful, Sanity, etc.)

## Performance Customization

### Disable Animations

Set animation duration to 0 in `lib/constants.ts`:

```typescript
export const ANIMATION_DURATION = 0;
```

### Reduce Particles

Edit `components/ParticlesBackground.tsx`:

```typescript
const particleCount = 15; // Reduce from 30
```

### Lazy Load Components

Use dynamic imports in `app/page.tsx`:

```typescript
import dynamic from 'next/dynamic';

const Skills = dynamic(() => import('@/components/Skills'), {
  loading: () => <div>Loading...</div>,
});
```

## Testing Customizations

```bash
npm run dev
# Open http://localhost:3000
# Test your changes live
```

## Common Customizations Checklist

- [ ] Update name and title
- [ ] Add your contact information
- [ ] Update skills list
- [ ] Add your projects
- [ ] Update education details
- [ ] Change color scheme
- [ ] Customize fonts
- [ ] Add social links
- [ ] Update meta information
- [ ] Test on mobile
- [ ] Test animations
- [ ] Check all links
- [ ] Optimize images
- [ ] Set up analytics

## Need Help?

Refer to component files for detailed comments and structure. Each component is self-contained and can be modified independently.

---

Happy customizing! 🎨
