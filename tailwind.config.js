/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'Certificate-red':'#FFA09B',
        'Certificate-yellow':'#F9CB43',
        'Certificate-purple':'#FEC5F6',
        'Certificate-green':'#B2CD9C',
      }
    },
  },
  plugins: [],
}

