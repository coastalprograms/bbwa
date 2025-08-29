# High Level Architecture

## Technical Summary

The system will be a Next.js monorepo application. The front-end will be a React single-page application (SPA), and the back-end will be a set of Next.js API routes that interact with a Supabase PostgreSQL database. Authentication will be handled by Supabase Auth, and the front-end will be hosted on Netlify. The architecture is designed to be a simple monolith, providing all core functionality within a single repository to simplify development and deployment. This approach aligns with the project's goal of rapid, efficient development while maintaining scalability.

## High Level Overview

The system architecture is a unified monolith, where the Next.js application serves both the public-facing pages and the administrative dashboard. It also contains the API routes that handle all communication with the Supabase backend. The database will be the single source of truth for all data, including projects, worker inductions, and compliance records. User interactions will follow a standard request-response flow, with Supabase Edge Functions handling specialized, real-time tasks like compliance checks. The monorepo structure will keep the entire application together, ensuring consistency and a streamlined development workflow.

## High Level Project Diagram

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
