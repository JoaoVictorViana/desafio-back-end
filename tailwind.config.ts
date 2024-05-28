import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'input-1': 'auto 1fr',
        'input-2': '1fr auto',
        'input-3': 'auto 1fr auto',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: {
          '50': '#fff0f1',
          '100': '#ffe1e4',
          '200': '#ffc8cf',
          '300': '#ff9ca8',
          '400': '#ff647a',
          '500': '#ff2e50',
          '600': '#f30b3b',
          '700': '#ce0231',
          '800': '#ac0531',
          '900': '#7e072a',
          '950': '#530015',
        },
        danger: {
          '50': '#fef2f2',
          '100': '#fee2e2',
          '200': '#FBE2DD',
          '300': '#fba6a7',
          '400': '#C5485D',
          '500': '#ec4748',
          '600': '#dc393a',
          '700': '#b71e1f',
          '800': '#C5485D',
          '900': '#7d1f20',
          '950': '#440b0b',
        },
        'dark-gray': {
          '50': '#f6f6f6',
          '100': '#e7e7e7',
          '200': '#d1d1d1',
          '300': '#b0b0b0',
          '400': '#888888',
          '500': '#8e9198',
          '600': '#747880',
          '700': '#5F6368',
          '800': '#434853',
          '900': '#2c323d',
          '950': '#1F1F1F',
        },
        'light-gray': {
          '50': '#F0F0F0',
          '100': '#ebeff4',
          '200': '#dde3ed',
          '300': '#dfdfdf',
          '400': '#aab3cf',
          '500': '#939cc1',
          '600': '#7c82af',
          '700': '#6a6f98',
          '800': '#575b7c',
          '900': '#4a4e65',
          '950': '#2b2d3b',
        },
      },
      keyframes: {
        slideDown: {
          from: { height: '0px' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        slideUp: {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0px' },
        },
      },
      animation: {
        slideDown: 'slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)',
        slideUp: 'slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)',
      },
    },
  },
  plugins: [],
}
export default config
