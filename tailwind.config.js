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


// primary-100:#892CDC;
// primary-200:#BC6FF1;
// primary-300:#fdf6fd;
// accent-100:#D9ACF5;
// accent-200:#fff4ff;
// text-100:#EEEEEE;
// text-200:#FDEBED;
// bg-100:#222831;
// bg-200:#393E46;
// bg-300:#454e59;
  


// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
//     './src/components/**/*.{js,ts,jsx,tsx,mdx}',
//     './src/app/**/*.{js,ts,jsx,tsx,mdx}',
//   ],
//   theme: {
//     extend: {
//       colors: {
//         'primary-100': '#6c35de',
//         'primary-200': '#a364ff',
//         'primary-300': '#ffc7ff',
//         'accent-100': '#cb80ff',
//         'accent-200': '#373737',
//         'text-100': '#ffffff',
//         'text-200': '#e0e0e0',
//         'bg-100': '#241b35',
//         'bg-200': '#240046',
//         'bg-300': '#4d425f',
//       },
//       backgroundColor: {
//         'primary-100': 'theme.colors.primary-100',
//         'primary-200': 'theme.colors.primary-200',
//         'primary-300': 'theme.colors.primary-300',
//         'accent-100': 'theme.colors.accent-100',
//         'accent-200': 'theme.colors.accent-200',
//         'custom-100': 'theme.colors.bg-100',
//         'custom-200': 'theme.colors.bg-200',
//         'custom-300': 'theme.colors.bg-300',
//       },
//       color: {
//         'primary-100': 'theme.colors.primary-100',
//         'primary-200': 'theme.colors.primary-200',
//         'primary-300': 'theme.colors.primary-300',
//         'accent-100': 'theme.colors.accent-100',
//         'accent-200': 'theme.colors.accent-200',
//         'custin-100': 'theme.colors.text-100',
//         'custin-200': 'theme.colors.text-200',
//       },
//       gradientColorStops: {
//         'primary-100': 'theme.colors.primary-100',
//         'primary-200': 'theme.colors.primary-200',
//         'primary-300': 'theme.colors.primary-300',
//         'accent-100': 'theme.colors.accent-100',
//         'accent-200': 'theme.colors.accent-200',
//       }
//     },
//   },
//   plugins: [],
// }


// --primary-100:#7B4F8E;
// --primary-200:#563763;
// --primary-300:#D7C5DF;
// --accent-100:#B794C0;
// --accent-200:#895896;
// --text-100:#FFFFFF;
// --text-200:#909090;
// --bg-100:#3B2D4D;
// --bg-200:#382B49;
// --bg-300:#4D3B64;
  

// --primary-100:#892CDC;
// --primary-200:#BC6FF1;
// --primary-300:#fdf6fd;
// --accent-100:#D9ACF5;
// --accent-200:#fff4ff;
// --text-100:#EEEEEE;
// --text-200:#FDEBED;
// --bg-100:#222831;
// --bg-200:#393E46;
// --bg-300:#454e59;
  

// --primary-100:#6B3E8F;
// --primary-200:#9b6ac0;
// --primary-300:#ffcbff;
// --accent-100:#9C6ADE;
// --accent-200:#fffeff;
// --text-100:#FFFFFF;
// --text-200:#e0e0e0;
// --bg-100:#2E1E3D;
// --bg-200:#3e2d4e;
// --bg-300:#584668;
  