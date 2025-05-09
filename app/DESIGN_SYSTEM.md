# United Defense Tactical - Design System

This document provides an overview of the design system used in the United Defense Tactical website, including colors, typography, spacing, and other design tokens.

## Color System

Our color system is designed to provide a consistent and cohesive visual experience across the website. It consists of primary, secondary, accent, and utility colors.

### Brand Colors

| Name | Hex Code | CSS Variable | Tailwind Class |
|------|----------|--------------|---------------|
| Primary | `#D10000` | `--primary-color` | `text-primary` `bg-primary` |
| Primary Dark | `#B30000` | `--primary-dark` | `text-primary-dark` `bg-primary-dark` |
| Secondary | `#333333` | `--secondary-color` | `text-secondary` `bg-secondary` |
| Secondary Dark | `#212121` | `--secondary-dark` | `text-secondary-dark` `bg-secondary-dark` |
| Accent | `#F0F0F0` | `--accent-color` | `text-accent` `bg-accent` |
| Accent Red | `#F44336` | `--accent-red` | `text-accent-red` `bg-accent-red` |

### Grayscale

| Name | Hex Code | CSS Variable | Tailwind Class |
|------|----------|--------------|---------------|
| Light Gray | `#F5F5F5` | `--light-gray` | `text-gray-light` `bg-gray-light` |
| Medium Gray | `#E0E0E0` | `--medium-gray` | `text-gray-medium` `bg-gray-medium` |
| Dark Gray | `#777777` | `--dark-gray` | `text-gray-dark` `bg-gray-dark` |
| White | `#FFFFFF` | `--white` | `text-white` `bg-white` |
| Black | `#000000` | `--black` | `text-black` `bg-black` |

### Status Colors

| Name | Hex Code | CSS Variable | Tailwind Class |
|------|----------|--------------|---------------|
| Success | `#28A745` | `--success` | `text-success` `bg-success` |
| Danger | `#DC3545` | `--danger` | `text-danger` `bg-danger` |
| Warning | `#FFC107` | `--warning` | `text-warning` `bg-warning` |
| Info | `#17A2B8` | `--info` | `text-info` `bg-info` |

## Typography

### Font Families

| Name | Font Stack | CSS Variable | Tailwind Class |
|------|------------|--------------|---------------|
| Primary | `'Inter', sans-serif` | `--font-primary` | `font-primary` |
| Secondary | `'Montserrat', sans-serif` | `--font-secondary` | `font-secondary` |
| Heading | `'Poppins', sans-serif` | `--font-heading` | `font-heading` |

### Font Sizes

Font sizes follow the Tailwind CSS default scale, with additional custom sizes as needed:

- `text-xs`: 0.75rem (12px)
- `text-sm`: 0.875rem (14px)
- `text-base`: 1rem (16px)
- `text-lg`: 1.125rem (18px)
- `text-xl`: 1.25rem (20px)
- `text-2xl`: 1.5rem (24px)
- etc.

## Spacing

Our spacing system provides consistent spacing throughout the interface.

| Name | Size | CSS Variable | Tailwind Class |
|------|------|--------------|---------------|
| Extra Small | 4px | `--spacing-xs` | `p-xs` `m-xs` |
| Small | 8px | `--spacing-sm` | `p-sm` `m-sm` |
| Medium | 16px | `--spacing-md` | `p-md` `m-md` |
| Large | 24px | `--spacing-lg` | `p-lg` `m-lg` |
| Extra Large | 32px | `--spacing-xl` | `p-xl` `m-xl` |
| 2x Extra Large | 48px | `--spacing-xxl` | `p-2xl` `m-2xl` |

## Border Radius

| Name | Size | CSS Variable | Tailwind Class |
|------|------|--------------|---------------|
| Small | 4px | `--border-radius-sm` | `rounded-sm` |
| Medium | 8px | `--border-radius-md` | `rounded-md` |
| Large | 12px | `--border-radius-lg` | `rounded-lg` |
| Extra Large | 20px | `--border-radius-xl` | `rounded-xl` |

## Shadows

| Name | Value | CSS Variable | Tailwind Class |
|------|-------|--------------|---------------|
| Small | `0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)` | `--shadow-sm` | `shadow-sm` |
| Medium | `0 4px 6px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.08)` | `--shadow-md` | `shadow-md` |
| Large | `0 10px 25px rgba(0,0,0,0.1), 0 2px 10px rgba(0,0,0,0.04)` | `--shadow-lg` | `shadow-lg` |
| Extra Large | `0 20px 40px rgba(0,0,0,0.1)` | `--shadow-xl` | `shadow-xl` |

## Transitions

| Name | Value | CSS Variable | Tailwind Class |
|------|-------|--------------|---------------|
| Fast | 200ms ease | `--transition-fast` | `duration-fast` |
| Medium | 300ms ease | `--transition-medium` | `duration-medium` |
| Slow | 500ms ease | `--transition-slow` | `duration-slow` |
| Default Timing | cubic-bezier(0.4, 0, 0.2, 1) | `--transition-default` | `ease-default` |

## Layout

| Name | Value | CSS Variable | Tailwind Class |
|------|-------|--------------|---------------|
| Container Width | 1400px | `--container-width` | `max-w-container` |
| Header Blur | 10px | `--header-blur` | `backdrop-blur-header` |

## Usage Guidelines

### Best Practices

1. **Use Tailwind classes by default** for all new components
2. **Maintain consistency** by using the predefined colors, spacing, and typography
3. **Avoid hardcoded values** - use the design tokens defined in this system
4. **Prefer composing components** from the shadcn/ui library when available

### Examples

#### Button Styles

```jsx
// Primary Button
<button className="bg-primary hover:bg-primary-dark text-white font-medium py-md px-lg rounded-md transition-all duration-medium">
  Primary Button
</button>

// Secondary Button
<button className="bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white font-medium py-md px-lg rounded-md transition-all duration-medium">
  Secondary Button
</button>
```

#### Typography Example

```jsx
<h1 className="font-heading text-3xl font-bold text-secondary">Heading 1</h1>
<h2 className="font-heading text-2xl font-bold text-secondary">Heading 2</h2>
<p className="font-primary text-base text-secondary">Regular paragraph text</p>
```

## Migration Guidelines

When migrating existing components to use Tailwind:

1. Identify the CSS properties in the component's SCSS module
2. Map each property to an equivalent Tailwind utility class
3. Replace the className reference to the SCSS module with the Tailwind classes
4. Test the component to ensure visual consistency
5. Remove the SCSS module file once all references have been replaced

By following these guidelines, we'll maintain a consistent design language across the website while improving maintainability. 