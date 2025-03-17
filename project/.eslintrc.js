module.exports = {
    plugins: ['import'],
    extends: [
      'eslint:recommended',
      'plugin:react/recommended'
    ],
    rules: {
      'import/no-unresolved': 'error'
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx']
        }
      },
      'react': {
        'version': 'detect'
      }
    },
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true
      }
    },
    env: {
      browser: true,
      es2020: true,
      node: true
    }
  }