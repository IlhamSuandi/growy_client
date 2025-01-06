import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import pluginQuery from '@tanstack/eslint-plugin-query'

export default tseslint.config(
  ...pluginQuery.configs['flat/recommended'],
  { ignores: ['dist', './src/types/growyApi/*'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    settings: {
      "import/resolver": {
        "typescript": {
          "project": "./tsconfig.json"
        },
      }
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      "no-console": "warn",
      "@typescript-eslint/naming-convention": [
        "error",
        {
          "selector": "variable",
          "format": ["camelCase", "UPPER_CASE", "PascalCase"],
          "leadingUnderscore": "allow"
        },
        {
          "selector": "typeLike",
          "format": ["PascalCase"]
        }
      ],
      "@typescript-eslint/prefer-namespace-keyword": "error",
      "@/quotes": [
        "error",
        "double",
        {
          "avoidEscape": true
        }
      ],
      "@/semi": ["error", "never"],
      "@typescript-eslint/prefer-namespace-keyword": "error",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          "vars": "all",
          "args": "all",
          "varsIgnorePattern": "^_",
          "argsIgnorePattern": "^_"
        }
      ],
      "@/brace-style": "error",
      "@typescript-eslint/no-use-before-define": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-empty-interface": "off",
      "no-null/no-null": "off",
      "no-useless-escape": "off",
      "no-trailing-spaces": "error",
      "no-var": "error",
      "prefer-const": "error",
      "spaced-comment": "error",
      "object-curly-spacing": ["error", "always"],
      "space-in-parens": ["error", "never"],
      "array-bracket-spacing": ["error", "never"],
      "space-before-function-paren": [
        "error",
        {
          "named": "never",
          "anonymous": "always",
          "asyncArrow": "always"
        }
      ],
      "@typescript-eslint/no-var-requires": "off"
    },
  },
)
