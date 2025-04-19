// tailwind.config.js
export default {
  darkMode: 'class', // Add this line
  content: ["./index.html", "./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          800: '#1f2937',
          900: '#111827',
        }
      },
    },
  },
  plugins: [],
};