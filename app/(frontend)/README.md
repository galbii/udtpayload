# United Defense Tactical Website

## Project Structure

This website is built using Next.js 15 with the App Router architecture, focusing on performance, maintainability, and SEO.

### Directory Structure

- `/app/` - Main application directory (Next.js App Router)
  - `/page.tsx` - Root page component (renders the landing page)
  - `/_home/` - Landing page components and styles (not a route due to underscore prefix)
    - `/components/` - Landing page specific components
    - `/styles/` - CSS modules for the landing page
  - `/components/` - Shared components used across the application
    - `/common/` - Common components (Footer, Header, etc.)
  - `/globals.scss` - Global styles

- `/public/` - Static assets
  - `/images/` - Image files
  - `/videos/` - Video files

## Development Approach

### Component Organization

- **Client Components**: Interactive components that use React hooks, state management, or browser APIs. These components have the `'use client'` directive at the top.
- **Server Components**: Static components that don't require client-side interactivity, rendered on the server for better performance.

### Styling Approach

We use CSS Modules for component styling, with the following conventions:
- Component styles are co-located with components (`ComponentName.module.scss`)
- Global styles are in `app/globals.scss`
- Class names use camelCase format (e.g., `heroContainer` instead of `hero-container`)

### Asset Management

Static assets are stored in the `/public` directory and referenced in components using absolute paths:
- Images: `<Image src="/images/image-name.jpg" />`
- Videos: `<source src="/videos/video-name.mp4" />`

## Adding New Features

When adding new features or pages:

1. Determine if it's a page or component
   - Pages go in the app directory with the route structure
   - Components go in the appropriate components directory

2. Follow the established patterns for:
   - CSS Modules for styling
   - Server vs. Client components
   - Image and asset optimization
   - TypeScript types

3. Ensure responsiveness and accessibility 