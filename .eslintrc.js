module.exports = {
  extends: ['@sxwy/eslint-config-vue/vue3-typescript'],
  globals: {
    __APP_ENV__: true
  },
  rules: {
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off'
  }
}
