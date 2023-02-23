module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  globals: {
    layui: true,
    layer: true,
    form: true,
    laypage: true,
    $: true,
    jquery: true,
    jQuery: true,
    template: true,
    tinymce: true,
    initEditor: true
  },
  rules: {
    'no-useless-escape': 0,
    'no-unused-vars': 0,
    'no-unreachable': 0
  },
  plugins: ['html'],
  extends: ['eslint:recommended', 'plugin:prettier/recommended']
};
