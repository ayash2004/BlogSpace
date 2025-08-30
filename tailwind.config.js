// tailwind.config.js
import lineClamp from '@tailwindcss/line-clamp'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // Ensure this covers your components
  ],
  theme: {
    extend: {},
  },
  plugins: [lineClamp],
}
