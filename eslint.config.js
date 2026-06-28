import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    // Two places legitimately co-export non-components, which the Fast Refresh
    // rule flags. Scoped off only here:
    //  - shadcn/Radix UI primitives co-locate their `cva` variant maps and
    //    Radix re-exports alongside the component (canonical shadcn structure).
    //  - R3F `shaderMaterial` + `extend` modules must export the material for
    //    reuse and TS module augmentation (e.g. StarsMaterial shared by Dust).
    files: ['src/components/ui/**/*.{ts,tsx}', 'src/three/**/*.{ts,tsx}'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
])
