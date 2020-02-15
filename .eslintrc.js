module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "semi": [2, "never"],
    "import/prefer-default-export": 0,
    "comma-dangle": ["error", "never"],
    "import-order": 0,
    "consistent-return": 0,
    "no-shadow": 0
  },
  "settings": {
    "import/resolver": {
      "alias": [
        ["@controllers", "./src/controllers"],
        ["@models", "./src/models"],
      ]
    }
  }
};
