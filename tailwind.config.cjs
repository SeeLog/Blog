/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'vsc-dark': '#1E1E1E',
        'vsc-dark-content': '#858585',
      },
      fontFamily: {
        title: ['Kosugi Maru', 'sans-serif'],
      },
    },
  },
  darkMode: 'class',
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      // 'cupcake',
      {
        cupcake: {
          ...require('daisyui/src/theming/themes')['cupcake'],
          info: '#0061bf',
        },
      },
      'dracula',
    ],
  },
};
