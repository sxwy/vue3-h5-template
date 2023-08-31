module.exports = {
  plugins: {
    'postcss-px-to-viewport-8-plugin': {
      viewportWidth: (file) => {
        return file.includes('vant') ? 375 : 750
      }
    }
  }
}
