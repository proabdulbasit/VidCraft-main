/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backgroundColor: {
        'primary-100':"#3c096c",
        'primary-200':"#4B1183",
        'primary-300':"#5a189a",
        'primary-400':"#6b22ad",
        'primary-500':"#7b2cbf",
        'accent-100':"#A85AA1",
        'accent-200':"#ffeeff",
        'custom-100':"#10002b",
        'custom-200':"#150032",
        'custom-300':"#1a0039",
        'custom-400':"#240046",
      },
      color:{
        'custom-100':"#FFFFFF",
        'custom-200':"#e0e0e0",
      },
      fill:{
        'primary-100':"#3c096c",
        'primary-200':"#4B1183",
        'primary-300':"#5a189a",
        'primary-400':"#6b22ad",
        'primary-500':"#7b2cbf",
        'accent-100':"#A85AA1",
        'accent-200':"#ffeeff",
      },
      gradientColorStops: {
        'custom-100':"#10002b",
        'custom-200':"#150032",
        'custom-300':"#1a0039",
        'custom-400':"#240046",
      },
      borderColor:{
        'primary-100':"#3c096c",
        'primary-200':"#4B1183",
        'primary-300':"#5a189a",
        'primary-400':"#6b22ad",
        'primary-500':"#7b2cbf",
        'accent-100':"#A85AA1",
        'accent-200':"#ffeeff",
      },
      outlineColor:{
        'primary-100':"#3c096c",
        'primary-200':"#4B1183",
        'primary-300':"#5a189a",
        'primary-400':"#6b22ad",
        'primary-500':"#7b2cbf",
        'accent-100':"#A85AA1",
        'accent-200':"#ffeeff",
      }
    },
  },
  plugins: [],
}
