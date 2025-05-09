# Landing Page Migration Guide

This document outlines the process for migrating the remaining components from the old React landing page to the Next.js 15 app directory structure.

## Directory Structure

- `/app/landing/page.tsx` - Main landing page component
- `/app/landing/layout.tsx` - Landing page layout
- `/app/landing/landing.module.scss` - Global landing page styles
- `/app/landing/components/` - Landing page components
- `/app/components/common/` - Shared components (e.g., Footer)
- `/public/images/` - Static images
- `/public/videos/` - Video assets

## Migration Process

Follow these steps for each component:

### 1. Identify Component Type

- **Client Components**: Components with state, effects, or DOM manipulation should be client components with `'use client'` directive at the top.
- **Server Components**: Static, presentational components without interactivity can be server components.

### 2. Create Component Files

For each component, create:
- `.tsx` file in the appropriate directory
- `.module.scss` file for styles

### 3. Update Component Code

- Add `'use client'` directive for client components
- Replace relative imports with proper paths
- Update import styles from `'./ComponentName.scss'` to `import styles from './ComponentName.module.scss'`
- Use CSS Module class names: `className={styles.componentName}`
- Replace `React.FC` with arrow functions
- Use Next.js components:
  - Replace `<img>` with `<Image>` from 'next/image'
  - Replace `<Link>` from react-router with Next.js `<Link>` from 'next/link'

### 4. Handle Assets

- Move images to `/public/images/`
- Move videos to `/public/videos/`
- Update asset paths in components

### 5. Update Styles

- Convert SCSS to CSS Modules
- Use camelCase for class names (e.g., `.hero-container` becomes `.heroContainer`)
- Replace CSS variables with direct values (e.g., `var(--primary-color)` becomes `#b71c1c`)

### 6. Handle Navigation

For in-page links:
```tsx
// Old (react-router-dom):
<a href="#section" onClick={(e) => {
  e.preventDefault();
  document.getElementById("section")?.scrollIntoView({ behavior: "smooth" });
}}>Link Text</a>

// New (Next.js):
<a href="#section" onClick={(e) => {
  e.preventDefault();
  document.getElementById("section")?.scrollIntoView({ behavior: "smooth" });
}}>Link Text</a>
```

For page links:
```tsx
// Old (react-router-dom):
<Link to="/dashboard">Dashboard</Link>

// New (Next.js):
import Link from 'next/link';
<Link href="/dashboard">Dashboard</Link>
```

## Component-by-Component Migration

| Component | Type | Notes |
|-----------|------|-------|
| Header | Client | Header with scroll logic and menu toggling |
| Hero | Client | Video player with autoplay logic |
| TrustBadges | Server | Static badges display |
| AssessmentForm | Client | Form with state management |
| VideoSection | Client | Video player component |
| Programs | Client | Interactive program cards |
| Instructors | Client | Carousel component |
| Testimonials | Client | Interactive slider |
| TrainingPath | Server | Static content section |
| OODASection | Server | Static content with animations |
| Pricing | Client | Pricing tables with interactive elements |
| FreeClass | Client | Form component |
| CallToAction | Server | Static CTA section |
| FAQ | Client | Accordion component |
| Location | Server | Static map and contact info |

## Testing

After migrating each component:
1. Test rendering
2. Test any interactive elements
3. Test responsive layout
4. Ensure styles are applied correctly

## Asset Migration Checklist

- [ ] Logo files
- [ ] Hero video
- [ ] Instructor images
- [ ] Program icons
- [ ] Testimonial images
- [ ] Background images
- [ ] Icons and SVGs 