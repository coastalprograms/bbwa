# Source Tree

Recommended feature-oriented structure for Next.js 14+ App Router in a monorepo.

```
/ (repo root)
├─ package.json               # npm workspaces; scripts delegating to apps/web
├─ netlify.toml               # Next.js adapter plugin config
├─ apps/
│  └─ web/
│     ├─ package.json
│     ├─ tsconfig.json        # strict: true
│     ├─ src/
│     │  ├─ app/              # App Router entrypoints
│     │  │  ├─ layout.tsx
│     │  │  ├─ page.tsx       # Home
│     │  │  └─ health/
│     │  │     └─ page.tsx
│     │  ├─ components/
│     │  │  ├─ ui/            # shadcn components
│     │  │  └─ shared/        # project components
│     │  ├─ lib/
│     │  │  ├─ supabase/
│     │  │  │  └─ server.ts   # createClient() server pattern
│     │  │  ├─ utils/
│     │  │  └─ types/
│     │  ├─ styles/
│     │  │  └─ globals.css
│     │  └─ hooks/
│     ├─ public/
│     ├─ tailwind.config.(ts|js)
│     ├─ postcss.config.js
│     └─ .eslintrc.json
└─ docs/
   └─ architecture/
      ├─ tech-stack.md
      ├─ coding-standards.md
      └─ source-tree.md
```

- **Files and naming**: kebab-case for files, PascalCase for React components, `useXxx.ts` for hooks.
- **Barrel exports**: Provide `index.ts` within feature folders when it simplifies imports.
- **Client vs Server Components**: Default to Server Components; mark Client components explicitly and avoid leaking secrets.
- **Supabase**: Use server-only `createClient()` under `src/lib/supabase/server.ts`.
- **Styles**: Tailwind utilities in `globals.css`; avoid custom CSS where possible.
- **Testing**: Co-locate tests near sources or under `__tests__` folders.
