module.exports = {
  root: true,
  env: {
    es6: true,
    node: true
  },
  rules: {
    'no-useless-escape': 0,
    'no-unused-vars': 0
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended']
};
