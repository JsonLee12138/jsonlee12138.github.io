import presetWebFonts from '@unocss/preset-web-fonts'
import { defineConfig, presetWind4 } from 'unocss'

export default defineConfig({
  presets: [
    presetWind4(),
    presetWebFonts({
      provider: 'fontsource',
      fonts: {
        sans: [
          { name: 'Inter', weights: ['400', '500', '600', '700'] },
        ],
        serif: [
          { name: 'Instrument Serif', weights: ['400'] },
        ],
        mono: [
          // { name: 'JetBrains Mono', weights: ['400'] },
          { name: 'Maple Mono', weights: ['400'] },
        ],
      },
    }),
  ],
  theme: {
    colors: {
      background: '#F7F5F2',
      surface: '#FFFFFF',
      ink: '#1C1C1C',
      graphite: '#666666',
      accent: '#0047FF',
      border: '#E5E0D8',
    },
  },
  shortcuts: {
    'noise-bg': 'fixed top-0 left-0 w-screen h-screen pointer-events-none z-50 opacity-5',
  },
})
