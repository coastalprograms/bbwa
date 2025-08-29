# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Bayside Builders WA** - A comprehensive construction compliance and marketing platform that combines a professional public website with sophisticated worker safety compliance and site management systems. This real-world application addresses critical Australian regulatory requirements for construction site worker qualification tracking, preventing $50,000 fines per violation.

## Development Commands

### Core Commands
```bash
# Development (from project root)
npm run dev              # Start Next.js dev server (port 3000)
npm run build            # Build production bundle  
npm start                # Start production server
npm run lint             # Run ESLint
npm run format           # Format code with Prettier
npm run typecheck        # TypeScript type checking (also: npm run tsc)
npm test                 # Run Jest tests
npm test:watch           # Watch mode for tests
npm test:coverage        # Generate coverage report
```

### Working with Specific Workspaces
All commands run from root and delegate to apps/web workspace:
```bash
npm run dev -w apps/web     # Run in specific workspace
npm run build -w apps/web   # Build specific workspace
```

### Database & Supabase
```bash
# Generate TypeScript types from database
npx supabase gen types typescript --project-id <project-id> > src/types/supabase.generated.ts

# Run migrations locally
npx supabase migration up

# Create new migration
npx supabase migration new <migration_name>
```

## Architecture & Code Structure

### Tech Stack
- **Frontend**: Next.js 14+ App Router, React 18, TypeScript (strict mode)
- **UI**: Shadcn/ui components, Radix UI primitives, Tailwind CSS
- **Backend**: Next.js API Routes, Supabase (PostgreSQL, Auth, Storage, Edge Functions)
- **Forms**: React Hook Form + Zod validation
- **Deployment**: Netlify

### Project Structure
```
bbwa/                           # Monorepo root
├── apps/web/                   # Next.js application
│   └── src/
│       ├── app/               # App Router pages
│       │   ├── (marketing)/   # Public website
│       │   ├── (auth)/        # Authentication
│       │   ├── admin/         # Builder dashboard
│       │   ├── check-in/      # QR code check-in
│       │   ├── induction/     # Worker induction
│       │   └── api/           # API routes
│       ├── components/        # Reusable components
│       │   ├── ui/           # Shadcn/ui components
│       │   └── forms/        # Form components
│       ├── lib/              # Utilities
│       │   └── supabase/     # Supabase clients
│       ├── types/            # TypeScript definitions
│       └── actions/          # Server actions
├── supabase/                  # Backend infrastructure
│   ├── migrations/           # Database migrations
│   └── functions/            # Edge Functions
└── docs/                     # Documentation
```

### Key Architectural Patterns

1. **Server Components by Default**: Use Client Components ('use client') only when necessary
2. **Server Actions**: Handle form submissions and data mutations with proper error handling
3. **Supabase Client Pattern**: 
   - `createClient()` for server-side operations
   - Never expose service role keys to client
4. **Type Safety**: All functions have explicit TypeScript types
5. **Error Boundaries**: Comprehensive error handling at route and component levels

## Code Conventions

### File Naming
- Components: `kebab-case.tsx` (e.g., `project-card.tsx`)
- Hooks: `use-[name].ts` (e.g., `use-mobile.ts`)
- Server Actions: `actions.ts` in route folders
- Types: `[domain].ts` (e.g., `workers.ts`, `projects.ts`)

### Import Order
1. External libraries
2. Absolute aliases (@/)
3. Internal modules
4. Relative paths
5. Remove unused imports

### Component Guidelines
- Functional components only
- Explicit props interfaces
- Files under ~300 lines
- Accessibility: WCAG 2.2 compliance (labels, focus states, keyboard nav)

### Security Requirements
- Row Level Security (RLS) on all Supabase tables
- Input validation on client AND server
- Environment variables for all secrets
- NEVER hardcode API keys or credentials
- Clean up real-time subscriptions

## Critical Features & Workflows

### 1. Worker Compliance System
- **Induction Process**: Multi-step form at `/induction`
- **White Card Management**: OCR processing via Edge Function `process-white-card`
- **Check-in System**: QR code scanning with geolocation at `/check-in`
- **Compliance Alerts**: Automated via `notify-compliance-alert` Edge Function

### 2. Builder Dashboard (`/admin`)
- **Authentication**: Supabase Auth with protected routes
- **KPI Dashboard**: Real-time compliance metrics
- **Worker Management**: Certification tracking, manual overrides
- **Project Management**: CRUD with AI-assisted content (Gemini API)

### 3. Public Website
- **Dynamic Projects**: Portfolio with categorized galleries
- **Service Areas**: Google Maps integration
- **Contact System**: Airtable integration via Edge Functions

### 4. Automated Workflows
- **30-Day Expiry Reminders**: `expiry-reminders` Edge Function
- **Compliance Violations**: Immediate alerts to builder
- **FAQ Management**: Dynamic updates from Airtable

## Environment Variables

Required in `.env.local`:
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# AI Provider (gemini or openai)
AI_PROVIDER=gemini
GEMINI_API_KEY=

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=

# Airtable (for contact forms)
AIRTABLE_API_KEY=
AIRTABLE_BASE_ID=
```

## Testing Strategy

1. **Unit Tests**: Jest + React Testing Library for components
2. **Integration Tests**: API route testing with mock Supabase
3. **E2E Critical Paths**:
   - Worker induction flow
   - QR code check-in with compliance validation
   - Admin dashboard operations

Run specific test suites:
```bash
npm test -- --testPathPattern="admin/settings"
npm test -- --testPathPattern="check-in"
```

## Deployment Notes

- **Platform**: Netlify (configured in `netlify.toml`)
- **Build Command**: `npm run build` (runs in `apps/web`)
- **Environment**: Set all env vars in Netlify dashboard
- **Edge Functions**: Deploy via Supabase CLI
- **Database Migrations**: Run via Supabase Dashboard or CLI

## Common Development Tasks

### Adding a New Admin Page
1. Create route in `app/admin/[feature]/page.tsx`
2. Add to sidebar navigation in `components/admin/AppSidebar.tsx`
3. Implement server actions in `app/admin/[feature]/actions.ts`
4. Add RLS policies in Supabase

### Creating New Database Tables
1. Create migration: `npx supabase migration new [name]`
2. Write SQL in `supabase/migrations/[timestamp]_[name].sql`
3. Apply migration: `npx supabase migration up`
4. Generate types: `npx supabase gen types typescript`
5. Implement RLS policies

### Implementing Forms
1. Define Zod schema for validation
2. Use React Hook Form with `zodResolver`
3. Create server action for processing
4. Handle errors with try/catch blocks
5. Display success/error states to user