# Frontend Setup Inicial

## Ambiente e Dependências

1. Setup Node.js e PNPM
```bash
nvm install 20
nvm use 20
npm install -g pnpm
```

2. Instalação de Dependências Base
```bash
pnpm install next@latest react@latest react-dom@latest
pnpm install -D typescript @types/react @types/node
pnpm install -D tailwindcss postcss autoprefixer
```

3. Configuração do TypeScript
```typescript
// tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

4. Configuração do ESLint
```json
// .eslintrc.json
{
  "extends": ["next/core-web-vitals", "prettier"],
  "rules": {
    "no-unused-vars": "error",
    "no-console": "warn"
  }
}
```

5. Configuração do Prettier
```json
// .prettierrc
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```