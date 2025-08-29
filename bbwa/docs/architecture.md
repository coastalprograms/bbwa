# Bayside Builders WA - Fullstack Architecture

## Introduction

This document outlines the complete fullstack architecture for the Bayside Builders WA website, including backend systems, frontend implementation, and their integration. It serves as the single source of truth for AI-driven development, ensuring consistency across the entire technology stack.

This unified approach combines what would traditionally be separate backend and frontend architecture documents, streamlining the development process for modern fullstack applications where these concerns are increasingly intertwined.

## Starter Template or Existing Project

Based on the Product Requirements Document (PRD), this is a new project being built from scratch. It will use Next.js, with Supabase as the primary backend, and is intended to be hosted on Netlify. No existing codebases or starter templates were provided, so the architecture will be designed from a greenfield perspective.

## High Level Architecture

### Technical Summary

The system will be a Next.js monorepo application. The front-end will be a React single-page application (SPA), and the back-end will be a set of Next.js API routes that interact with a Supabase PostgreSQL database. Authentication will be handled by Supabase Auth, and the front-end will be hosted on Netlify. The architecture is designed to be a simple monolith, providing all core functionality within a single repository to simplify development and deployment. This approach aligns with the project's goal of rapid, efficient development while maintaining scalability.

### High Level Overview

The system architecture is a unified monolith, where the Next.js application serves both the public-facing pages and the administrative dashboard. It also contains the API routes that handle all communication with the Supabase backend. The database will be the single source of truth for all data, including projects, worker inductions, and compliance records. User interactions will follow a standard request-response flow, with Supabase Edge Functions handling specialized, real-time tasks like compliance checks. The monorepo structure will keep the entire application together, ensuring consistency and a streamlined development workflow.

### High Level Project Diagram

```mermaid
graph TD
    A[Client (Browser)] -->|Requests Pages| B(Next.js App)
    A -->|Submits Forms| C(Next.js API Routes)
    B -->|Fetches Data| D[Supabase]
    C -->|Writes Data| D
    D -->|Data Storage| E[PostgreSQL Database]
    D -->|Real-time Events| F[Supabase Edge Functions]
    F -->|Sends Notifications| G[External Automation (Make/n8n)]
    G --> H[Builder (SMS/Email)]
```

## Architectural and Design Patterns

- **Monolith Architecture**: A single, unified application for both the front end and back end, which is ideal for an MVP to ensure simplicity and fast deployment.

- **Component-Based UI**: The front end will be built using a component-based approach with Next.js and React, promoting reusability and maintainability.

- **Serverless Functions**: Supabase Edge Functions will be used for specific tasks to provide a secure and scalable way to handle custom logic.

- **Repository Pattern**: We will abstract the data access logic from the business logic to enable testing and future database migration flexibility.

- **Event-Driven Communication**: Supabase hooks will trigger webhooks to an external automation platform (like Make.com or n8n) for tasks like sending notifications.

## Tech Stack

### Cloud Infrastructure

- **Provider**: Netlify & Supabase
- **Key Services**: Netlify for frontend hosting, Supabase for backend, database, and authentication.
- **Deployment Regions**: N/A

### Technology Stack Table

| Category | Technology | Version | Purpose | Rationale |
|----------|------------|---------|---------|-----------|
| Frontend Language | TypeScript | Latest | Primary development language for type safety. | Prevents errors and improves code quality. |
| Frontend Framework | Next.js | Latest | Full-stack framework for rendering and routing. | Server-side rendering, API routes, and a strong ecosystem. |
| UI Component Library | Shadcn/ui | Latest | Pre-built, customizable components. | Speeds up development and ensures a consistent design. |
| Styling | Tailwind CSS | Latest | Utility-first CSS framework. | Fast and responsive design without writing custom CSS. |
| Form Handling | React Hook Form | Latest | Efficient form state management and validation. | Reduces boilerplate and improves form performance. |
| Backend | Next.js API Routes | Latest | Handles backend logic and API endpoints. | Simplifies development in a monorepo structure. |
| Database | PostgreSQL | Latest | Relational database for structured data. | Supabase's core database, robust and scalable. |
| Authentication | Supabase Auth | Latest | Secure user authentication and management. | Integrated, simple, and secure authentication solution. |
| Object Storage | Supabase Storage | Latest | Stores user-uploaded files like project photos and white cards. | Integrated, secure, and scalable file storage. |
| External Integrations | Make.com / n8n | N/A | Automated workflows and notifications. | Low-code automation platform for external services. |
| AI Integration | Gemini API | N/A | AI-powered content generation. | Assists builder with professional content creation. |
| Form/FAQ Data | Airtable | N/A | Flexible spreadsheet-like database for content. | Simplifies content management for non-technical users. |

## Data Models

### Users

- **Purpose**: Stores builder authentication information and user roles.
- **Attributes**: id (UUID), email (Text), created_at (Timestamp)
- **Relationships**: One-to-one with the auth.users table in Supabase.

### Projects

- **Purpose**: Stores information about the builder's projects for the public website.
- **Attributes**: id (UUID), name (Text), description (Text), photo_urls (JSONB)
- **Relationships**: One-to-many with hero_images.

### Hero Images

- **Purpose**: Stores image URLs for the rotating homepage carousel.
- **Attributes**: id (UUID), url (Text), project_id (UUID), created_at (Timestamp)
- **Relationships**: Many-to-one with projects.

### Workers

- **Purpose**: Stores personal details, contact information, and safety compliance data for workers.
- **Attributes**: 
  - **Core Fields**: id (UUID), first_name (Text), last_name (Text), email (Text), mobile (Text), company (Text), trade (Text), position (Text), allergies (Text)
  - **License Fields**: white_card (Boolean), other_license (Boolean), other_license_details (Text)
  - **Emergency Contact**: emergency_name (Text), emergency_phone (Text), emergency_relationship (Text)
  - **Site Rules Safety Compliance** (8 checkboxes): no_alcohol_drugs, electrical_equipment_responsibility, hazardous_substances_understanding, use_ppe_when_necessary, high_risk_work_meeting_understanding, appropriate_signage_display, no_unauthorized_visitors_understanding, housekeeping_responsibility (all Boolean)
  - **Employer Safety Requirements** (4 checkboxes): employer_provided_training, employer_provided_swms, discussed_swms_with_employer, pre_start_meeting_understanding (all Boolean)
  - **Safety Documentation** (2 checkboxes): read_safety_booklet, understand_site_management_plan (all Boolean)
  - **Agreement Fields**: agree_safety (Boolean), agree_terms (Boolean), induction_completed (Boolean), induction_completed_at (Timestamp), created_at (Timestamp)
- **Relationships**: One-to-many with certifications and site_attendances.

### Certifications

- **Purpose**: Stores details of uploaded certifications, including expiry dates.
- **Attributes**: id (UUID), worker_id (UUID), image_url (Text), expiry_date (Date)
- **Relationships**: Many-to-one with workers.

### Site Attendances

- **Purpose**: Records when a worker checks in to a job site.
- **Attributes**: id (UUID), worker_id (UUID), site_location (Text), timestamp (Timestamp)
- **Relationships**: Many-to-one with workers.

## API Design and Data Models

### API Endpoints

#### POST /api/projects

- **Purpose**: Create a new project.
- **Request Body**: `{ "name": "string", "description": "string", "photos": [{ "url": "string", "category": "string" }] }`
- **Response**: `{ "success": boolean, "project_id": "UUID" }`
- **Security**: Requires builder authentication.

#### GET /api/projects

- **Purpose**: Retrieve a list of all projects for the public website.
- **Response**: `{ "projects": [{ "id": "UUID", "name": "string", "description": "string", "hero_image_url": "string" }] }`
- **Security**: Publicly accessible.

#### POST /api/induction

- **Purpose**: Submit a new worker induction form.
- **Request Body**: `{ "personal_details": { "name": "string", "email": "string" }, "certifications": [{ "file_url": "string", "type": "string" }] }`
- **Response**: `{ "success": boolean, "worker_id": "UUID" }`
- **Security**: Publicly accessible.

#### POST /api/check-in

- **Purpose**: Handle worker site check-ins with geolocation.
- **Request Body**: `{ "email": "string", "geolocation": { "latitude": number, "longitude": number } }`
- **Response**: `{ "success": boolean, "message": "string" }`
- **Security**: Publicly accessible.

## Project Timeline and Milestones

### Phase 1: Foundation (Month 1)

- **Epic 1**: Project Setup & Monorepo Configuration
- **Epic 2**: Public Website Pages (excluding the dynamic parts)
- **Milestone**: Functional, static website with a clean design.

### Phase 2: Core Functionality (Month 2)

- **Epic 3**: Worker Induction & Compliance
- **Epic 4**: Site Attendance & QR Codes
- **Milestone**: A fully functional public website with a complete worker compliance system.

### Phase 3: Admin & Automation (Month 3)

- **Epic 5**: Admin Dashboard & Content Management
- **Epic 6**: Automation & Notifications
- **Milestone**: A fully automated and managed website with a secure admin dashboard.

## Risk Assessment and Mitigation

### Compliance Risk

- **Risk**: A worker with an expired white card gets on-site.
- **Probability**: Medium
- **Impact**: High (legal liability, safety risk)
- **Mitigation**: Real-time compliance checks via Edge Functions, instant builder notifications via SMS.

### Technical Risk

- **Risk**: The Gemini API or Make.com/n8n integrations fail, blocking a core workflow.
- **Probability**: Medium
- **Impact**: Medium (workflow disruption, manual work needed)
- **Mitigation**: Implement robust error handling and fallbacks. Provide a manual override in the admin dashboard.

### Usability Risk

- **Risk**: The admin dashboard is too complex for the builder to use effectively.
- **Probability**: High
- **Impact**: High (system is abandoned, project fails)
- **Mitigation**: Prioritize a simple, intuitive design. Implement user testing early in Phase 2 to gather feedback.
