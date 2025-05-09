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
        'primary': '#b71c1c',
        'secondary': '#212121',
        'accent': '#f44336',
      },
    },
  },
  plugins: [],
};

export default config; 