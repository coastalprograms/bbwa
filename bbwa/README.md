# Bayside Builders WA - Construction Compliance & Marketing Platform

A comprehensive digital solution for construction companies combining a professional public website with sophisticated worker safety compliance and site management systems.

## 🏗️ What This Application Does

**Bayside Builders WA** is a real-world construction industry application that solves critical regulatory and business challenges:

### The Construction Industry Problem
- **New Australian Government Regulations** require strict on-site worker qualification tracking
- **Manual compliance processes** consume 8-12 hours per week of administrative time  
- **$50,000 fines per violation** for non-compliant workers on construction sites
- **Manual certificate tracking** led to 3 expired certifications going unnoticed (direct legal liability)
- **15-20 minutes per worker** for manual compliance checks

### What This Platform Delivers

#### 🌐 Professional Public Website
- **Homepage**: Rotating hero carousel showcasing construction projects, client testimonials, company values
- **Dynamic Projects Portfolio**: Categorized photo galleries (Inside/Outside/Kitchen/Bathroom) with AI-assisted descriptions
- **Service Areas**: Interactive Google Maps integration showing coverage zones across Perth WA
- **Contact System**: Integrated contact forms with Airtable backend and dynamic FAQ management
- **SEO Optimized**: Full meta tags, structured data, responsive design for client acquisition

#### 👷 Worker Safety Compliance System
- **Digital Induction Process**: Multi-step form capturing personal details, emergency contacts, safety acknowledgements
- **14-Point Safety Compliance**: Comprehensive digital acknowledgement system covering site rules, employer requirements, documentation
- **White Card Management**: Digital upload, OCR processing, expiry tracking with automated reminders
- **Real-time Certification Verification**: Instant validation preventing expired card holders from site access

#### 📱 QR Code Site Check-in System
- **Geolocation-Based Attendance**: Single QR code for all sites, automatically detects location
- **Real-time Compliance Blocking**: Immediate denial and notifications for expired certifications
- **Automated Builder Alerts**: SMS + Email notifications for compliance violations
- **Audit Trail**: Complete attendance records with timestamps and location data

#### 🎯 Builder Admin Dashboard
- **Live Compliance Overview**: Active workers, recent check-ins, upcoming expirations
- **Project Management**: CRUD operations with Gemini AI-assisted content generation
- **Worker Management**: Certification status tracking, manual overrides, compliance reports
- **Automated Workflows**: 30-day expiry reminders, compliance alert management

## 📁 Complete Project Structure

```
bbwa/                                    # Root monorepo
├── package.json                         # Workspace configuration
├── netlify.toml                         # Deployment configuration  
├── memory-bbwa.json                     # Claude memory file
│
├── apps/web/                           # Next.js Application
│   ├── package.json                    # App dependencies
│   ├── next.config.mjs                 # Next.js configuration
│   ├── tailwind.config.ts              # Tailwind CSS setup
│   ├── components.json                 # Shadcn/UI configuration
│   ├── jest.config.js                  # Testing configuration
│   │
│   ├── public/                         # Static assets
│   │   ├── Logo.png                   # Company branding
│   │   ├── favicon.ico                # Site icons
│   │   └── robots.txt                 # SEO configuration
│   │
│   └── src/                           # Application source code
│       ├── app/                       # Next.js App Router
│       │   ├── layout.tsx            # Root layout with fonts, SEO metadata
│       │   ├── page.tsx              # Homepage
│       │   ├── providers.tsx         # React context providers
│       │   ├── globals.css           # Global styles
│       │   │
│       │   ├── (marketing)/          # Public website pages
│       │   │   ├── layout.tsx        # Marketing layout
│       │   │   ├── page.tsx          # Homepage with hero carousel
│       │   │   ├── about/page.tsx    # Company information
│       │   │   ├── contact/page.tsx  # Contact form + FAQ
│       │   │   ├── projects/         # Portfolio pages
│       │   │   │   ├── page.tsx     # Projects listing
│       │   │   │   └── [slug]/page.tsx # Individual project details
│       │   │   └── services/         # Service area pages
│       │   │       ├── page.tsx     # Services overview
│       │   │       └── [slug]/page.tsx # Individual service areas
│       │   │
│       │   ├── (auth)/              # Authentication system
│       │   │   └── login/           # Builder login
│       │   │       ├── page.tsx     # Login form
│       │   │       ├── actions.ts   # Server actions
│       │   │       ├── loading.tsx  # Loading states
│       │   │       └── error.tsx    # Error handling
│       │   │
│       │   ├── admin/               # Builder dashboard
│       │   │   ├── layout.tsx       # Admin layout with sidebar
│       │   │   ├── page.tsx         # Dashboard overview (KPIs, recent activity)
│       │   │   ├── actions.ts       # Server actions for admin
│       │   │   │
│       │   │   ├── _components/     # Dashboard components
│       │   │   │   ├── AdminDashboardClient.tsx
│       │   │   │   ├── KpiCard.tsx  # Metrics display
│       │   │   │   ├── RecentCheckIns.tsx
│       │   │   │   └── UpcomingExpirations.tsx
│       │   │   │
│       │   │   ├── projects/        # Project management
│       │   │   │   ├── page.tsx     # Projects overview
│       │   │   │   ├── actions.ts   # Project CRUD operations
│       │   │   │   ├── new/page.tsx # Create new project
│       │   │   │   ├── [id]/page.tsx # Edit project
│       │   │   │   ├── _components/ProjectForm.tsx
│       │   │   │   └── ai/          # Gemini API integration
│       │   │   │       ├── route.ts # AI content generation
│       │   │   │       ├── actions.ts
│       │   │   │       └── provider.ts
│       │   │   │
│       │   │   ├── workers/         # Worker compliance management
│       │   │   │   ├── page.tsx     # Workers overview
│       │   │   │   └── [id]/        # Individual worker management
│       │   │   │       ├── page.tsx # Worker details
│       │   │   │       ├── actions.ts
│       │   │   │       └── update-form.tsx
│       │   │   │
│       │   │   ├── job-sites/       # Site management
│       │   │   │   ├── page.tsx     # Sites overview
│       │   │   │   ├── new/page.tsx # Create site
│       │   │   │   ├── [id]/edit/page.tsx
│       │   │   │   ├── JobSiteForm.tsx
│       │   │   │   └── DeleteJobSiteButton.tsx
│       │   │   │
│       │   │   └── settings/        # System settings
│       │   │       ├── page.tsx     # Configuration
│       │   │       └── page.test.tsx
│       │   │
│       │   ├── check-in/            # QR code site check-in system
│       │   │   ├── layout.tsx       # Check-in layout
│       │   │   ├── page.tsx         # Check-in form
│       │   │   ├── actions.ts       # Check-in processing
│       │   │   ├── CheckInForm.tsx  # Check-in component
│       │   │   └── check-in.test.md # Test documentation
│       │   │
│       │   ├── induction/           # Worker induction system
│       │   │   ├── layout.tsx       # Induction layout
│       │   │   ├── page.tsx         # Multi-step induction form
│       │   │   └── worker/page.tsx  # Worker-specific induction
│       │   │
│       │   ├── portal/              # Worker portal
│       │   │   ├── layout.tsx
│       │   │   └── page.tsx         # Worker dashboard
│       │   │
│       │   ├── api/                 # API routes
│       │   │   ├── admin/           # Admin API endpoints
│       │   │   │   ├── job-sites/route.ts
│       │   │   │   └── settings/route.ts
│       │   │   ├── analytics/       # Analytics endpoints
│       │   │   │   └── web-vitals/route.ts
│       │   │   └── csrf/route.ts    # CSRF protection
│       │   │
│       │   ├── accessibility-test/  # Accessibility testing
│       │   │   ├── page.tsx
│       │   │   └── accessibility-checklist.ts
│       │   │
│       │   ├── design-tokens/page.tsx # Design system
│       │   ├── dev/components/page.tsx # Component showcase
│       │   ├── health/page.tsx      # Health check endpoint
│       │   ├── db-check/page.tsx    # Database connectivity check
│       │   ├── sitemap.ts           # SEO sitemap generation
│       │   ├── error.tsx            # Global error boundary
│       │   ├── not-found.tsx        # 404 page
│       │   └── loading.tsx          # Global loading state
│       │
│       ├── components/              # Reusable UI components
│       │   ├── ui/                  # Shadcn/UI components
│       │   │   ├── index.ts         # Component exports
│       │   │   ├── button.tsx       # Base UI components
│       │   │   ├── card.tsx
│       │   │   ├── form.tsx
│       │   │   ├── input.tsx
│       │   │   ├── dialog.tsx
│       │   │   ├── sidebar.tsx
│       │   │   └── [30+ other components]
│       │   │
│       │   ├── layout/              # Layout components
│       │   │   ├── Header.tsx       # Site navigation
│       │   │   ├── Footer.tsx       # Site footer
│       │   │   └── navigation.tsx   # Navigation logic
│       │   │
│       │   ├── admin/               # Admin-specific components
│       │   │   ├── AppSidebar.tsx   # Admin dashboard sidebar
│       │   │   └── SimpleSidebar.tsx
│       │   │
│       │   ├── forms/               # Form components
│       │   │   ├── ContactForm.tsx  # Contact form with validation
│       │   │   └── ContactForm.test.tsx
│       │   │
│       │   ├── projects/            # Project display components
│       │   │   ├── ProjectCard.tsx  # Project listing cards
│       │   │   └── ProjectGallery.tsx # Photo galleries
│       │   │
│       │   ├── services/            # Service components
│       │   │   ├── ServicesGrid.tsx
│       │   │   └── ServiceImageGallery.tsx
│       │   │
│       │   ├── hero-carousel/       # Homepage carousel
│       │   │   └── HeroCarousel.tsx
│       │   │
│       │   ├── testimonials/        # Client testimonials
│       │   │   └── Testimonials.tsx
│       │   │
│       │   ├── core-values/         # Company values
│       │   │   └── CoreValues.tsx
│       │   │
│       │   ├── accessibility/       # Accessibility tools
│       │   │   └── AccessibilityTester.tsx
│       │   │
│       │   └── analytics/           # Analytics components
│       │       ├── web-vitals.tsx   # Performance monitoring
│       │       └── web-vitals.test.tsx
│       │
│       ├── lib/                     # Utility libraries
│       │   ├── utils.ts             # General utilities
│       │   ├── alerts.ts            # Alert system
│       │   ├── geo.ts               # Geolocation utilities
│       │   ├── services-data.ts     # Service area data
│       │   └── supabase/            # Supabase configuration
│       │       ├── client.ts        # Client-side Supabase
│       │       ├── server.ts        # Server-side Supabase
│       │       └── admin.ts         # Admin Supabase client
│       │
│       ├── hooks/                   # React hooks
│       │   └── use-mobile.ts        # Responsive design hook
│       │
│       ├── types/                   # TypeScript definitions
│       │   ├── supabase.generated.ts # Auto-generated DB types
│       │   ├── supabase.ts          # Custom Supabase types
│       │   ├── workers.ts           # Worker-related types
│       │   ├── projects.ts          # Project-related types
│       │   ├── compliance.ts        # Compliance types
│       │   └── dashboard.ts         # Dashboard types
│       │
│       └── actions/                 # Server actions
│           ├── contact.ts           # Contact form processing
│           └── contact.test.ts      # Contact action tests
│
├── supabase/                       # Backend Infrastructure
│   ├── README.md                   # Comprehensive backend guide
│   ├── seed.sql                    # Database seed data
│   │
│   ├── migrations/                 # Database schema evolution
│   │   ├── 20250816021000_initial_schema.sql
│   │   ├── 20250816021500_add_users_table.sql
│   │   ├── 20250816104659_seed_projects.sql
│   │   ├── 20250817095000_add_projects_slug_and_project_photos.sql
│   │   ├── 20250819000000_update_workers_certifications_schema.sql
│   │   ├── 20250819000003_create_projects_tables.sql
│   │   ├── 20250819000004_create_compliance_alerts_table.sql
│   │   ├── 20250819120000_update_certifications_add_status.sql
│   │   ├── 20250819120200_add_ocr_fields_and_audit_table.sql
│   │   ├── 20250820000000_create_notification_tables.sql
│   │   ├── 20250821000001_add_worker_safety_fields.sql
│   │   ├── 20250825000000_create_app_settings_table.sql
│   │   └── [15+ migration files] # Complete schema evolution
│   │
│   └── functions/                  # Supabase Edge Functions
│       ├── _shared/                # Shared utilities
│       │   ├── compliance-types.ts # Type definitions
│       │   └── cors.ts             # CORS handling
│       │
│       ├── __tests__/              # Function tests
│       │   └── story-3-3-test-plan.md
│       │
│       ├── airtable-faq/           # FAQ management
│       │   └── index.ts            # Fetch FAQs from Airtable
│       │
│       ├── airtable-contact-forward/ # Contact form processing
│       │   └── index.ts            # Forward contacts to Airtable
│       │
│       ├── expiry-reminders/       # Automated compliance alerts
│       │   ├── index.ts            # 30-day expiry reminders
│       │   └── README.md           # Scheduling documentation
│       │
│       ├── process-white-card/     # OCR processing
│       │   ├── index.ts            # White card OCR workflow
│       │   ├── manual-test.ts      # Manual testing
│       │   └── test-trigger.ts     # Test automation
│       │
│       ├── notify-builder/         # Builder notifications
│       │   └── index.ts            # Email/SMS alerts to builder
│       │
│       └── notify-compliance-alert/ # Compliance violations
│           └── index.ts            # Immediate compliance alerts
│
└── docs/                           # Comprehensive Documentation
    ├── prd.md                      # Master Product Requirements Document
    ├── architecture.md             # Technical architecture overview
    │
    ├── prd/                        # Detailed requirements
    │   ├── index.md                # PRD overview
    │   ├── change-log.md           # Version history
    │   ├── goals-and-background-context.md
    │   ├── requirements.md         # Functional & non-functional requirements
    │   ├── technical-assumptions.md # Tech stack decisions
    │   ├── user-interface-design-goals.md
    │   ├── epic-list.md            # 6 major development epics
    │   ├── epic-1-foundation-core-infrastructure.md
    │   ├── epic-2-public-website-pages.md
    │   ├── epic-3-worker-induction-compliance.md
    │   ├── epic-4-site-attendance-qr-codes.md
    │   ├── epic-5-admin-dashboard-content-management.md
    │   └── epic-6-automation-notifications.md
    │
    ├── architecture/               # Technical documentation
    │   ├── index.md
    │   ├── introduction.md
    │   ├── high-level-architecture.md
    │   ├── tech-stack.md
    │   ├── data-models.md
    │   ├── api-design-and-data-models.md
    │   ├── architectural-and-design-patterns.md
    │   ├── coding-standards.md
    │   ├── source-tree.md
    │   ├── project-timeline-and-milestones.md
    │   ├── risk-assessment-and-mitigation.md
    │   └── starter-template-or-existing-project.md
    │
    ├── automation/                 # Automation documentation
    │   └── compliance-alerts-setup.md
    │
    └── stories/                    # Individual user stories (30+ files)
        ├── 1.1.story.md           # Project setup
        ├── 1.2.story.md           # Database schema
        ├── 1.3.story.md           # Authentication
        ├── 2.1.story.md           # Homepage
        ├── 2.2.story.md           # About & Contact
        ├── 2.3.story.md           # Projects page
        ├── 3.1.story.md           # Worker induction
        ├── 3.2.story.md           # Compliance forms
        ├── 4.2.story.md           # QR check-in
        ├── 4.3.story.md           # Compliance alerts
        ├── 5.1.story.md           # Admin dashboard
        ├── 5.2.story.md           # Project management
        ├── 5.3.story.md           # AI content generation
        ├── 5.4.story.md           # Worker management
        ├── 6.1.story.md           # Expiry reminders
        ├── 6.2.story.md           # Builder notifications
        ├── 6.3.story.md           # Airtable integration
        └── [20+ additional stories] # Complete feature specifications
```

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+** - JavaScript runtime
- **Supabase CLI** - Backend operations ([Install Guide](https://supabase.com/docs/guides/cli))
- **Supabase Project Access** - Linked project with authentication

### Development Setup

#### Option 1: Interactive Setup (Recommended)
```bash
# 1. Clone and install dependencies
git clone <repository-url>
cd bbwa
npm install

# 2. Link Supabase project (one-time setup)
supabase login
supabase link --project-ref <your-project-ref>

# 3. Apply database schema and migrations
supabase db push

# 4. Generate TypeScript types from database
supabase gen types typescript --linked > apps/web/src/types/supabase.generated.ts

# 5. Interactive environment setup wizard
npm run setup
# This guides you through all environment configuration

# 6. Start development (automatically validates environment first)
npm run dev
```

#### Option 2: Manual Setup
```bash
# Follow steps 1-4 above, then:

# 5. Copy environment template and configure manually
cp .env.example .env.local
# Edit .env.local with your values (see Environment Setup Guide)

# 6. Validate your configuration
npm run env:validate

# 7. Start development server
npm run dev
```

### Environment Configuration

**NEW: Unified Environment System** 🎉

The environment configuration has been completely streamlined with:
- ✅ Single `.env.example` at root level with comprehensive documentation
- ✅ Interactive setup wizard: `npm run setup`
- ✅ Built-in validation: `npm run env:validate`
- ✅ Clear variable hierarchy (Critical → Important → Optional)
- ✅ Security best practices and troubleshooting guides

**Quick Environment Setup:**
```bash
# Interactive setup (recommended for new developers)
npm run setup

# Manual validation
npm run env:validate

# Check specific configuration
npm run env:check
```

**Critical Variables** (app won't start without these):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SESSION_SECRET`

**Important Variables** (features disabled without these):
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
- `AI_PROVIDER` + corresponding API key

**Optional Variables** (graceful fallbacks):
- `AUTOMATION_WEBHOOK_*` (compliance alerts)
- `AIRTABLE_*` (CMS integration)

📖 **Detailed Setup Guide**: [docs/environment-setup.md](docs/environment-setup.md)

🔄 **Migrating from Old Setup?** See [MIGRATION.md](MIGRATION.md)

## 🏗️ Tech Stack Deep Dive

### Frontend Architecture
- **Next.js 14** - React framework with App Router architecture
- **TypeScript** - Full type safety across application
- **Tailwind CSS** - Utility-first styling with custom design system
- **Shadcn/UI** - Consistent, accessible component library
- **React Hook Form + Zod** - Form validation and schema management
- **Embla Carousel** - Image carousel functionality

### Backend Infrastructure
- **Supabase PostgreSQL** - Primary database with Row Level Security
- **Supabase Auth** - JWT-based authentication system
- **Supabase Edge Functions** - Serverless functions for automation
- **Supabase Real-time** - Live updates for admin dashboard

### External Integrations
- **Airtable** - FAQ and contact form management
- **Google Gemini AI** - Content generation assistance
- **Google Maps API** - Service area visualization
- **Make.com/n8n** - Automation workflows (configurable)
- **Email/SMS Services** - Compliance notifications

### Development Tools
- **Jest + Testing Library** - Unit and integration testing
- **ESLint + Prettier** - Code quality and formatting
- **Husky** - Git hooks for code quality
- **TypeScript Compiler** - Build-time type checking

## 📱 Detailed Feature Overview

### 🌐 Public Marketing Website

#### Homepage (`apps/web/src/app/(marketing)/page.tsx`)
- **Hero Carousel**: Rotating project photos managed via admin dashboard
- **Services Overview**: Construction service categories with descriptions  
- **Client Testimonials**: Rotating testimonials with ratings
- **Company Values**: Professional presentation of business principles
- **Call-to-Action Sections**: Strategic conversion points

#### Projects Portfolio (`apps/web/src/app/(marketing)/projects/`)
- **Dynamic Project Listing**: Database-driven project showcase
- **Categorized Photo Galleries**: Inside/Outside/Kitchen/Bathroom sections
- **AI-Generated Descriptions**: Gemini-assisted content creation
- **SEO Optimization**: Structured data and meta tags per project
- **Breadcrumb Navigation**: User-friendly navigation patterns

#### Service Areas (`apps/web/src/app/(marketing)/services/`)
- **Interactive Maps**: Google Maps integration with service zones
- **Location-based SEO**: Targeted content for each service area
- **Service Descriptions**: Detailed coverage information

### 👷‍♂️ Worker Compliance System

#### Digital Induction (`apps/web/src/app/induction/`)
- **Multi-Step Form Process**: Progressive disclosure for better UX
- **Personal Information Collection**:
  - Basic details (name, email, mobile, company)
  - Trade and position information
  - Emergency contact details
  - Allergy information
- **14-Point Safety Compliance System**:
  - Site Rules (8 requirements): No alcohol/drugs, electrical responsibility, etc.
  - Employer Requirements (4 requirements): Training, SWMS, pre-start meetings
  - Safety Documentation (2 requirements): Safety booklet, site management plan
- **Document Upload**: White card and additional certification storage
- **Validation & Storage**: Secure processing with audit trail

#### QR Code Check-in System (`apps/web/src/app/check-in/`)
- **Single QR Code**: One code for all job sites with geolocation detection
- **Real-time Verification**: Instant white card status checking
- **Compliance Blocking**: Immediate access denial for expired cards
- **Geolocation Integration**: Automatic site detection and logging
- **Notification Triggers**: Instant alerts for compliance violations

### 🎯 Builder Admin Dashboard

#### Dashboard Overview (`apps/web/src/app/admin/`)
- **Live KPI Metrics**: Active workers, recent check-ins, upcoming expirations
- **Recent Activity**: Real-time check-in monitoring
- **Compliance Alerts**: Immediate visibility into violations
- **Quick Actions**: Direct access to common management tasks

#### Project Management (`apps/web/src/app/admin/projects/`)
- **CRUD Operations**: Full project lifecycle management
- **Photo Upload & Management**: Categorized image handling
- **AI Content Generation**: Gemini-assisted descriptions
- **SEO Management**: Meta tags and structured data

#### Worker Management (`apps/web/src/app/admin/workers/`)
- **Certification Tracking**: Real-time status monitoring
- **Expiry Management**: 30-day advance notifications
- **Manual Overrides**: Builder discretion for special cases
- **Compliance Reports**: Detailed audit trails

### 🤖 Automation & Edge Functions

#### Expiry Reminder System (`supabase/functions/expiry-reminders/`)
- **Scheduled Execution**: Daily checks via pg_cron or external schedulers
- **30-Day Advance Warning**: Proactive notification system
- **Multi-channel Alerts**: Email to builders and workers
- **Deduplication Logic**: Prevents notification spam

#### OCR Processing (`supabase/functions/process-white-card/`)
- **Automated Data Extraction**: Image-to-text processing for white cards
- **Database Integration**: Direct certification record updates
- **Builder Notifications**: Processing status alerts
- **Manual Review Fallback**: Human oversight for edge cases

#### Airtable Integration (`supabase/functions/airtable-*/`)
- **FAQ Management**: Dynamic content from Airtable
- **Contact Form Processing**: Lead capture and forwarding
- **Caching Strategy**: Performance optimization with ETag support

## 🔧 Available Scripts

```bash
# Environment Setup (NEW!)
npm run setup           # Interactive environment setup wizard
npm run env:validate    # Validate environment configuration
npm run env:check       # Quick environment health check

# Development
npm run dev             # Start Next.js development server
npm run build           # Production build
npm run start           # Start production server

# Code Quality
npm run lint            # ESLint code linting
npm run format          # Prettier code formatting
npm run typecheck       # TypeScript validation
npm run tsc             # TypeScript compilation check

# Testing
npm run test            # Run Jest test suite
npm run test:watch      # Watch mode testing
npm run test:coverage   # Coverage reports

# Supabase Operations (from project root)
supabase db push        # Apply migrations
supabase functions serve <name>  # Local function development
supabase functions deploy <name> # Deploy to production
```

## 📊 Database Schema Overview

### Core Entities

#### Workers Table
```sql
workers (
  id: uuid PRIMARY KEY,
  first_name: text,
  last_name: text,
  email: text UNIQUE,
  mobile: text,
  company: text,
  trade: text,
  position: text,
  emergency_name: text,
  emergency_phone: text,
  emergency_relationship: text,
  allergies: text,
  -- 14 safety compliance boolean fields
  agree_no_alcohol_drugs: boolean,
  agree_electrical_equipment: boolean,
  -- ... additional compliance fields
  induction_completed: boolean,
  induction_completed_at: timestamptz,
  created_at: timestamptz DEFAULT now()
)
```

#### Certifications Table
```sql
certifications (
  id: uuid PRIMARY KEY,
  worker_id: uuid REFERENCES workers(id),
  type: text, -- 'White Card', 'Other License'
  status: text, -- 'Valid', 'Expired', 'Pending'
  expiry_date: date,
  file_url: text,
  created_at: timestamptz DEFAULT now()
)
```

#### Site Attendances Table
```sql
site_attendances (
  id: uuid PRIMARY KEY,
  worker_id: uuid REFERENCES workers(id),
  job_site_id: uuid REFERENCES job_sites(id),
  checked_in_at: timestamptz DEFAULT now(),
  location_lat: decimal,
  location_lng: decimal
)
```

### Content Management

#### Projects Table
```sql
projects (
  id: uuid PRIMARY KEY,
  title: text,
  description: text,
  slug: text UNIQUE,
  created_at: timestamptz DEFAULT now()
)

project_photos (
  id: uuid PRIMARY KEY,
  project_id: uuid REFERENCES projects(id),
  category: text, -- 'Inside', 'Outside', 'Kitchen', 'Bathroom'
  url: text,
  alt_text: text,
  sort_order: integer
)
```

## 🔐 Security & Compliance Implementation

### Authentication & Authorization
- **Supabase Auth** with JWT tokens for builder access
- **Row Level Security (RLS)** policies on all tables
- **CSRF Protection** on all form submissions
- **Input Validation** using Zod schemas throughout

### Data Protection
- **Secure File Upload** with type and size validation
- **Personal Information Encryption** for sensitive worker data
- **Audit Trails** for all compliance-related actions
- **Session Management** with secure cookies

### Compliance Features
- **Complete Audit Logs** for regulatory requirements
- **Data Retention Policies** aligned with construction industry standards
- **Backup & Recovery** procedures for critical compliance data

## 📚 Documentation Structure

- **[PRD (docs/prd.md)](docs/prd.md)**: Complete product requirements with 6 epics
- **[Architecture Guide](docs/architecture/)**: Technical implementation details
- **[Supabase Operations](supabase/README.md)**: Backend management comprehensive guide
- **[User Stories](docs/stories/)**: 30+ detailed feature specifications
- **Component Documentation**: Inline JSDoc comments throughout codebase

## 🚢 Production Deployment

### Netlify Frontend
```bash
# Automatic deployment from main branch
Build command: npm run build
Publish directory: apps/web/.next
Environment variables: Set in Netlify dashboard
```

### Supabase Backend
```bash
# Deploy all Edge Functions
supabase functions deploy airtable-faq --project-ref <ref>
supabase functions deploy airtable-contact-forward --project-ref <ref>
supabase functions deploy expiry-reminders --project-ref <ref>
supabase functions deploy process-white-card --project-ref <ref>
supabase functions deploy notify-builder --project-ref <ref>
supabase functions deploy notify-compliance-alert --project-ref <ref>

# Set up scheduled tasks for expiry reminders
# See supabase/functions/expiry-reminders/README.md
```

### Monitoring & Maintenance
- **Error Tracking**: Built-in error boundaries and logging
- **Performance Monitoring**: Web Vitals tracking
- **Database Monitoring**: Supabase built-in analytics
- **Uptime Monitoring**: Netlify status pages

## 🤝 Development Workflow

1. **Review Requirements**: Check [PRD](docs/prd.md) and relevant user stories
2. **Database Changes**: Create migration files in `supabase/migrations/`
3. **Type Generation**: Run type generation after schema changes
4. **Component Development**: Follow existing patterns in `src/components/`
5. **Testing**: Write tests for new functionality
6. **Code Quality**: Ensure lint and typecheck pass
7. **Documentation**: Update relevant docs for new features

## 📈 Performance Considerations

- **Image Optimization**: Next.js automatic optimization with lazy loading
- **Database Queries**: Optimized with proper indexing and RLS
- **Caching Strategy**: Edge Function caching for external API calls
- **Bundle Optimization**: Dynamic imports and code splitting
- **SEO Performance**: Server-side rendering and static generation

## 🐛 Troubleshooting Common Issues

### Development Setup
- **Supabase Connection**: Ensure project is linked with `supabase status`
- **Environment Variables**: Verify all required variables are set
- **Type Generation**: Re-run after schema changes

### Production Issues
- **Edge Function Errors**: Check Supabase logs dashboard
- **Authentication Problems**: Verify JWT configuration
- **Database Performance**: Review query performance in Supabase

---

**Project Status**: Active Development  
**Current Version**: 1.0  
**Last Updated**: August 2025  
**License**: Private project for Bayside Builders WA