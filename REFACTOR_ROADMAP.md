# United Defense Tactical - Code Refactoring Roadmap

This document outlines our plan to improve code maintainability and performance in the United Defense Tactical website, following Next.js best practices.

## Phase 1: Style System Refactoring

- [x] **Setup Tailwind Theme**
  - [x] Audit current color usage and design patterns
  - [x] Configure Tailwind theme with brand colors in `tailwind.config.mjs`
  - [x] Create CSS variables for brand colors in `globals.scss`
  - [x] Document color system

- [x] **UI Component Library**
  - [x] Install and configure shadcn/ui approach
  - [x] Create basic UI components:
    - [x] Buttons (primary, secondary, etc.)
    - [x] Typography components (headings, paragraphs)
    - [x] Card components
    - [x] Form components (added as needed)
  - [x] Document component usage patterns

- [ ] **Component Style Migration**
  - [x] Migrate header component styles to Tailwind
  - [ ] Migrate hero section styles to Tailwind
  - [ ] Migrate navigation styles to Tailwind
  - [ ] Migrate remaining components gradually

## Phase 2: Component Reorganization

- [x] **Establish Feature-Based Directory Structure**
  - [x] Create `features` directory
  - [x] Define core features (layout, etc.)
  - [ ] Reorganize components by feature

- [ ] **Component Refactoring**
  - [ ] Split large components into smaller, focused components
  - [ ] Move shared components to common UI library
  - [ ] Ensure proper TypeScript typing for all components

- [ ] **Logic Extraction**
  - [ ] Create custom hooks for repeated logic
  - [ ] Extract business logic from UI components
  - [ ] Create utility functions for shared functionality

## Phase 3: Server/Client Optimization

- [ ] **Component Boundary Optimization**
  - [ ] Audit all components that need client-side interactivity
  - [ ] Convert static components to server components
  - [ ] Establish clear client/server boundaries

- [ ] **Data Fetching Improvements**
  - [ ] Implement server components for data fetching
  - [ ] Use React Server Components for loading states
  - [ ] Implement proper error handling

- [ ] **Form Handling**
  - [ ] Convert form submissions to use server actions
  - [ ] Implement optimistic updates for better UX
  - [ ] Add proper validation and error handling

## Phase 4: Performance Improvements

- [ ] **Image Optimization**
  - [ ] Configure proper image domains in `next.config.js`
  - [ ] Add explicit width/height to all images
  - [ ] Use priority loading for above-the-fold images

- [ ] **Code Splitting**
  - [ ] Implement dynamic imports for less critical components
  - [ ] Configure `optimizePackageImports` in next.config.js
  - [ ] Lazy load below-the-fold content

- [ ] **Performance Monitoring**
  - [ ] Add Web Vitals tracking
  - [ ] Establish performance budgets
  - [ ] Implement monitoring for client-side performance

## Progress Tracking

| Task | Status | Date | Notes |
|------|--------|------|-------|
| Create refactor roadmap | Complete | Today | Initial plan created |
| Configure Tailwind theme | Complete | Today | Updated tailwind.config.mjs with all brand colors and design tokens from globals.scss |
| Update CSS variables | Complete | Today | Reorganized globals.scss with categorized variables that match Tailwind config |
| Document design system | Complete | Today | Created `app/DESIGN_SYSTEM.md` with comprehensive documentation of colors, typography, spacing, and other design tokens |
| Create UI components | Complete | Today | Created button, card, and typography components using shadcn/ui pattern |
| Create UI demo page | Complete | Today | Added `/ui-demo` route to showcase and test new components |
| Set up features structure | Complete | Today | Created feature-based directory structure with layout as first feature |
| Migrate header component | Complete | Today | Migrated header from SCSS modules to Tailwind CSS in new features/layout structure |
| ... | ... | ... | ... |

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/) 