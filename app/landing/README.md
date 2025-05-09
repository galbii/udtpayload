# Landing Page Migration for United Defense Tactical

## Progress Summary

We've started migrating the landing page from the old React structure to the new Next.js 15 app directory structure. This migration follows modern best practices for Next.js applications, including CSS Modules, server/client component separation, and optimized asset handling.

### Completed Components

- ✅ Landing page structure (`/app/landing/page.tsx`)
- ✅ Landing layout (`/app/landing/layout.tsx`)
- ✅ Global landing page styles (`/app/landing/landing.module.scss`)
- ✅ Header component (client component with navigation and scroll logic)
- ✅ Hero component (client component with video background)
- ✅ TrustBadges component (server component)
- ✅ Footer component (common component)

### Components Remaining to Migrate

- [ ] AssessmentForm
- [ ] VideoSection
- [ ] Programs
- [ ] Instructors
- [ ] Testimonials
- [ ] TrainingPath
- [ ] OODASection
- [ ] Pricing
- [ ] FreeClass
- [ ] CallToAction
- [ ] FAQ
- [ ] Location

### Asset Migration

- [ ] Run the asset migration script: `./scripts/migrate-assets.sh`
- [ ] Verify all assets are correctly copied to `/public` directory
- [ ] Update asset paths in components

## How to Complete the Migration

1. Follow the detailed instructions in `MIGRATION_GUIDE.md`
2. Migrate one component at a time, testing each component after migration
3. Run the asset migration script to copy static assets
4. Update the main page imports as you complete each component

## Key Benefits of the New Structure

1. **Better Performance**: Server components reduce client-side JavaScript
2. **Improved SEO**: Metadata API for better search engine optimization
3. **Optimized Images**: next/image component for automatic image optimization
4. **CSS Isolation**: CSS Modules prevent style leakage between components
5. **Maintainability**: More modular structure makes future updates easier

## Next Steps After Migration

1. Add end-to-end tests
2. Implement analytics and event tracking
3. Optimize for Core Web Vitals
4. Add internationalization if needed
5. Set up continuous integration/deployment 