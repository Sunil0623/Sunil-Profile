module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'apple-black': '#000000',
        'apple-gray': '#111111',
        'muted': '#6b7280'
      },
      fontFamily: {
        sans: ['"SF Pro Display"', 'Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}
