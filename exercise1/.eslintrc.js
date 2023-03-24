module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2018
  },
  env: {
    es6: true,
    node: true,
    mocha: true
  },
  rules: {
    'no-useless-escape': 0,
    'no-unused-vars': 0,
    'no-unreachable': 0
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended']
};
