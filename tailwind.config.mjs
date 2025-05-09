/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // Important: Allow Tailwind utilities to be overridden by custom styles
  important: true,
  theme: {
    extend: {
      colors: {
        // Primary colors
        'primary': {
          DEFAULT: '#D10000', // from globals.scss --primary-color
          dark: '#B30000',    // from globals.scss --primary-dark
        },
        // Secondary colors
        'secondary': {
          DEFAULT: '#333',    // from globals.scss --secondary-color
          dark: '#212121',    // from header.module.scss
        },
        'accent': {
          DEFAULT: '#F0F0F0', // from globals.scss --accent-color
          red: '#f44336',     // from tailwind.config.mjs
        },
        // Grays
        'gray': {
          light: '#F5F5F5',   // from globals.scss --light-gray
          medium: '#E0E0E0',  // from globals.scss --medium-gray
          dark: '#777',       // from globals.scss --dark-gray
        },
        // Status colors
        'success': '#28a745', // from globals.scss
        'danger': '#dc3545',  // from globals.scss
        'warning': '#ffc107', // from globals.scss
        'info': '#17a2b8',    // from globals.scss
        // Base colors
        'black': '#000',
        'white': '#FFF',
      },
      fontFamily: {
        primary: ['Inter', 'sans-serif'],
        secondary: ['Montserrat', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      borderRadius: {
        'sm': '4px',    // from globals.scss --border-radius-sm
        'md': '8px',    // from globals.scss --border-radius-md
        'lg': '12px',   // from globals.scss --border-radius-lg
        'xl': '20px',   // from globals.scss --border-radius-xl
      },
      spacing: {
        'xs': '4px',    // from globals.scss --spacing-xs
        'sm': '8px',    // from globals.scss --spacing-sm
        'md': '16px',   // from globals.scss --spacing-md
        'lg': '24px',   // from globals.scss --spacing-lg
        'xl': '32px',   // from globals.scss --spacing-xl
        '2xl': '48px',  // from globals.scss --spacing-xxl
      },
      transitionDuration: {
        'fast': '200ms',      // from globals.scss --transition-fast
        'medium': '300ms',    // from globals.scss --transition-medium
        'slow': '500ms',      // from globals.scss --transition-slow
      },
      transitionTimingFunction: {
        'default': 'cubic-bezier(0.4, 0, 0.2, 1)', // from Header.module.scss
      },
      boxShadow: {
        'sm': '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',   // from globals.scss --shadow-sm
        'md': '0 4px 6px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.08)',    // from globals.scss --shadow-md
        'lg': '0 10px 25px rgba(0,0,0,0.1), 0 2px 10px rgba(0,0,0,0.04)', // from globals.scss --shadow-lg
        'xl': '0 20px 40px rgba(0,0,0,0.1)',                              // from globals.scss --shadow-xl
      },
      backdropBlur: {
        'header': '10px',  // from Header.module.scss
      },
      maxWidth: {
        'container': '1400px',  // from globals.scss .container
      },
    },
  },
  plugins: [],
};

export default config; 