module.exports = {
  mode: 'jit',
  purge: [
   'components/**/*.vue',
   'layouts/**/*.vue',
   'pages/**/*.vue',
   'plugins/**/*.js',
   'nuxt.config.js'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      black: '#000',
      white: '#fff',
      current: 'currentColor',
      blue: {
        DEFAULT: '#0000ff',
      },
      green: {
        DEFAULT: '#39ff14',
      },
      red: {
        DEFAULT: '#ff0000',
      },
      orange: {
        DEFAULT: '#ff4d00',
      },
    },
    fontFamily: {
      serif: ['"Times New Roman"', 'Times', 'serif'],
      sans: ['Arial', 'sans-serif'],
      'black': ['"Arial Black"', 'sans-serif'],
      'narrow': ['"Arial Narrow"', 'sans-serif'],
      'mono': ['"Courier Std"', 'Courier', 'monospace']
    },
    extend: {
      borderRadius: {
        '4xl': '2rem',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
