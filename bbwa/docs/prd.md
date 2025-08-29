# Bayside Builders WA - Product Requirements Document (PRD)

## Goals and Background Context

### Goals

- Build a high-functioning website that serves as a professional public face and a private tool for managing site logistics.
- Ensure legal compliance and safety protocols are met through a digital induction and attendance system.
- Provide a seamless and intuitive user experience for both builders and on-site workers.
- Create a scalable and templated solution that can be leveraged for future business opportunities.

### Background Context

The construction industry is facing new government regulations regarding on-site worker qualifications, creating a significant legal and administrative burden for builders. The manual processes currently in place are inefficient and consume 8-12 hours per week of administrative time, with compliance checks taking 15-20 minutes per worker. The risk of non-compliance includes fines of up to $50,000 per violation and potential project shutdowns. Manual certificate tracking has resulted in 3 expired certifications going unnoticed in the past 6 months, creating direct legal liability. This project aims to solve this by providing a digital platform that streamlines worker induction, automates compliance checks, and presents the company as a modern, well-structured business.

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|---------|
| 2025-08-11 | 1.0 | Initial PRD draft. | John |
| 2025-08-11 | 1.1 | Updated epic and stories based on user feedback. | John |
| 25-08-11 | 1.2 | Revised Projects page structure to reflect new content model. | John |
| 2025-08-11 | 1.3 | Removed the QR code generation story. | John |
| 2025-08-11 | 1.4 | Refined automated certificate expiry workflow. | John |
| 2025-08-11 | 1.5 | Updated Airtable integration to use wrappers and Edge Functions. | John |
| 2025-08-11 | 1.6 | Added quantified metrics, baselines, and competitive analysis. | John |
| 2025-08-11 | 1.7 | Addressed critical deficiencies related to API requirements, risk assessment, and project timeline. | John |
| 2025-08-21 | 1.8 | Updated Worker Induction stories (3.1, 3.2) and database schema to reflect comprehensive safety compliance implementation with 14 safety acknowledgement fields, enhanced personal details collection, and proper audit trail. | Analyst |

## Requirements

### Functional Requirements

- The system must provide public-facing pages for the Homepage, Projects, About, Contact, and Service Area.
- The Homepage must feature a hero section with a rotating image carousel, a testimonials section, and a section for services and company values.
- All public-facing pages must share a single, continuously rotating hero image carousel that is configurable from the admin dashboard.
- The Projects page must display a dynamic list of projects with photos and descriptions uploaded from the admin dashboard and include a breadcrumb trail for navigation.
- The system must include a multi-step Worker Induction form for workers and visitors to provide personal details and upload certifications.
- The system must use a single, generic QR code for all job sites that, upon scanning, determines the site's location via geolocation and records the check-in.
- Workers and visitors must be able to scan a site-specific QR code to check in. The system must immediately verify the status of their certifications and block access if a white card is expired. If access is blocked, a pop-up message must appear on the screen stating: "Sorry, your white card is out of date. Do not enter the site. Please fill out a new form to upload your new white card." A link to the form should be provided.
- The system must provide a secure, password-protected admin dashboard for the builder.
- The admin dashboard must allow the builder to add, edit, and delete projects, including uploading photos and descriptions.
- The admin dashboard must allow the builder to view and manage registered workers and their certification statuses.
- The system must use a Gemini API integration to assist the builder in writing project descriptions and summaries.
- The system must include an automated email and SMS notification system for certificate expiry and on-site access denial.
- The system must support integration with Airtable for data management of the FAQ and contact form submissions via Supabase wrappers.
- The system must provide a contact form on the Contact page.
- The system must include a dynamic FAQ section with content managed through Airtable.

### Non-Functional Requirements

- **NFR1**: The website must be fully responsive and work seamlessly on desktop, tablet, and mobile devices.
- **NFR2**: The website's public-facing pages must be optimized for search engines (SEO) to improve visibility.
- **NFR3**: All forms and user interactions must be intuitive and user-friendly, particularly for a non-tech-savvy audience.
- **NFR4**: The system must have a robust and scalable architecture to support multiple projects and a growing number of workers and visitors.
- **NFR5**: The platform must ensure security through JWT authentication, input validation, and secure handling of sensitive data like worker certifications.
- **NFR6**: The website must load quickly, with a focus on image optimization and efficient data fetching.
- **NFR7**: All automated processes, such as email reminders and compliance checks, must be reliable and timely.

## User Interface Design Goals

### Overall UX Vision

**Overall UX Vision**: To create a website that feels professional and trustworthy to potential clients, and is effortless for the builder and workers to use. The design should feel modern and clean, reflecting a well-structured company.

**Key Interaction Paradigms**: The public-facing site will use a simple, clear navigation pattern. The worker induction form and site attendance will be designed for speed and clarity on mobile devices. The admin dashboard will use an intuitive, visual interface with simple forms and clear data displays to minimize the learning curve for non-tech-savvy users.

### Core Screens and Views

- **Public Site**: Homepage, Projects Page, About Us, Contact, and a dynamic FAQ.
- **Worker/Visitor Flow**: Induction form and site check-in.
- **Admin Dashboard**: Project management view, worker management view, and compliance reports.

### Design Requirements

- **Accessibility**: All components must adhere to WCAG AA accessibility standards to ensure the site is usable by all.
- **Branding**: Use a clean, professional aesthetic that is visually appealing and consistent across the site. The branding should be aligned with the construction industry but feel modern and premium.
- **Target Device and Platforms**: The website must be fully responsive and optimized for both desktop and mobile devices, as both the public and workers will access the site on a range of devices.

## Technical Assumptions

### Platform Requirements

- **Target Platforms**: Next.js (Web Responsive)
- **Browser/OS Support**: Modern browsers
- **Performance Requirements**: Fast loading times for both public and administrative interfaces

### Technology Preferences

- **Frontend**: Next.js with TypeScript, Tailwind CSS, Shadcn/ui for components, and React Hook Form for validation.
- **Backend**: Supabase for authentication, database, and real-time features.
- **Database**: PostgreSQL (via Supabase) with a normalized schema.
- **Hosting/Infrastructure**: Netlify for frontend hosting and deployment. Supabase for backend services.

### Architecture Considerations

- **Repository Structure**: Monorepo to house the Next.js frontend and API routes.
- **Service Architecture**: A Monolith approach using Next.js API routes, with Supabase acting as the primary data layer.
- **Security/Compliance**: JWT authentication, Row Level Security in Supabase, input validation, and secure file uploads.
- **Performance**: A focus on image optimization, lazy loading, and efficient database queries.
- **Integrations**: A library for QR code generation, email notifications via Supabase, and potential integration for SMS notifications.

### Constraints & Assumptions

- **Timeline**: TBD
- **Resources**: TBD

## Epic List

1. **Epic 1: Foundation & Core Infrastructure**: Establish the project's foundation, including Next.js setup, Supabase integration, authentication, and core database schemas.

2. **Epic 2: Public Website Pages**: Implement all public-facing pages, including the Homepage, Projects, About, Contact, Service Area, and FAQ content.

3. **Epic 3: Worker Induction & Compliance**: Build the multi-step worker induction form and the automated data extraction and compliance check workflows.

4. **Epic 4: Site Attendance & QR Codes**: Develop the QR code-based check-in system, including geolocation, real-time status checks, and builder notifications.

5. **Epic 5: Admin Dashboard & Content Management**: Implement the secure admin dashboard, allowing the builder to manage projects and workers, and integrate the Gemini API for content creation.

6. **Epic 6: Automation & Notifications**: Finalize the automated workflows for certificate expiry reminders and on-site access denial notifications.

## Epic 1: Foundation & Core Infrastructure

**Epic Goal**: To lay the technical groundwork for the entire project. This epic will deliver a functional Next.js application integrated with Supabase, a secure authentication system for the builder, and a structured database schema that supports all future functionality.

### Story 1.1: Project Setup & Monorepo Configuration

**As a developer**, I want to set up the Next.js monorepo so that the project has a solid and scalable foundation for both the frontend and API routes.

**Acceptance Criteria**:
- The monorepo structure is established with a package.json that includes workspaces.
- A Next.js application is created within the monorepo, including a pages directory for routing.
- All core dependencies like Tailwind CSS, TypeScript, and Shadcn/ui are installed and configured.
- The development environment is fully functional and can be launched with a single command (e.g., npm run dev).

### Story 1.2: Supabase & Database Schema Setup

**As a developer**, I want to connect the Next.js app to Supabase and define the core database schema so that we have a persistent data store for all project information.

**Acceptance Criteria**:
- A new Supabase project is created and linked to the Next.js application via environment variables.
- A users table is created to store builder authentication information.
- A projects table is created to store project-specific data like titles, descriptions, and photo URLs.
- A hero_images table is created to store the URLs for the rotating homepage carousel.
- A workers table is created to store comprehensive worker information, including personal details (first_name, last_name, email, mobile, company, trade, position, allergies), emergency contact information (emergency_name, emergency_phone, emergency_relationship), license status (white_card, other_license, other_license_details), comprehensive safety compliance acknowledgements (14 boolean fields covering site rules, employer requirements, and safety documentation), agreement fields (agree_safety, agree_terms), and induction tracking (induction_completed, induction_completed_at).
- A certifications table is created to store details of uploaded documents, including expiry dates.
- A site_attendances table is created to record worker check-ins, including timestamps and geolocation data.
- A faq table is created to store the FAQ content that will be synced from Airtable.
- A contact_form_submissions table is created to store contact form entries.
- The database schema is normalized and includes appropriate foreign key relationships.

### Story 1.3: Builder Authentication System

**As a builder**, I want to securely log in to the admin dashboard so that I can access private project management tools and sensitive worker data.

**Acceptance Criteria**:
- A secure login page is created using Supabase Auth.
- The login process uses JWTs to authenticate the builder.
- A builder can successfully log in with an email and password.
- The builder is redirected to the admin dashboard upon successful login.
- A logout function is available to end the session securely.

## Epic 2: Public Website Pages

**Epic Goal**: To create all public-facing pages of the website, providing a professional online presence for Bayside Builders WA that showcases their work and attracts potential clients.

### Story 2.1: Homepage & Core Components

**As a website visitor**, I want to view a professionally designed homepage so that I can quickly learn about Bayside Builders WA and their services.

**Acceptance Criteria**:
- The homepage includes a hero section with a rotating image carousel of project photos.
- The homepage includes a section for client testimonials or reviews.
- The homepage includes a section that outlines the company's services.
- The homepage includes a section detailing the company's core values.
- All components on the homepage are fully responsive and work on all screen sizes.

### Story 2.2: About & Contact Page with Functional Form and FAQ

**As a website visitor**, I want to learn about the company and get in touch so that I can get a better understanding of who they are and inquire about their services.

**Acceptance Criteria**:
- An "About Us" page is created with content about the company's history, mission, and team.
- A "Contact" page is created with a functional contact form.
- The contact form uses email validation to ensure a valid email address is provided.
- Upon form submission, a success message is displayed.
- The form data is securely stored in Supabase.
- FAQ content is displayed at the bottom of the Contact page, fetched from Airtable using a Supabase wrapper.
- All content on the About and Contact pages is responsive.

### Story 2.3: Dynamic Projects Page with Breadcrumbs and FAQ

**As a website visitor**, I want to browse through the company's past projects so that I can see their quality of work and find inspiration for my own project.

**Acceptance Criteria**:
- A "Projects" page is created that dynamically fetches and displays project data from the Supabase database.
- Each project listing includes a single hero photo and a project title.
- Clicking a project listing navigates the user to a detailed project page.
- The detailed project page displays a project name and a detailed write-up.
- The detailed project page displays multiple photo sections organized by categories like 'Inside,' 'Outside,' and 'Bathroom.'
- A breadcrumb trail is implemented on the detailed project page to aid navigation back to the main projects list.
- FAQ content is displayed at the bottom of the Projects page, fetched from Airtable using a Supabase wrapper.
- All components on the Projects page are fully responsive and work on all screen sizes.

### Story 2.4: Service Area Page with Dynamic Maps

**As a website visitor**, I want to see the key areas the company services so that I can quickly determine if they are a good fit for my project's location.

**Acceptance Criteria**:
- A "Service Area" page is created that dynamically displays a list of key towns and locations.
- Each location entry includes a brief description.
- A Google Maps integration is included for each location, showing a marker for the specific area.
- The page is optimized for SEO by clearly listing all serviced locations.
- All components on the Service Area page are fully responsive and work on all screen sizes.

## Epic 3: Worker Induction & Compliance

**Epic Goal**: To create a digital, multi-step worker induction form and the back-end logic to validate and store all necessary certification documents.

### Story 3.1: Worker Induction Form (Personal Details)

**As a worker or visitor**, I want to fill out my personal details so that I can begin the on-site induction process.

**Acceptance Criteria**:
- A multi-step form is created with fields for personal information: First Name, Last Name, Email, Mobile, Company, Trade, Position, Emergency Contact (Name, Phone, Relationship), and Allergies.
- The form uses client-side validation to ensure all required fields are filled out correctly before proceeding to the next step.
- The form is fully responsive and optimized for mobile devices with progressive disclosure.
- The form data is securely stored in a temporary session using CSRF-protected cookies until the final step is completed.
- Server-side validation and sanitisation ensures data integrity and security.

### Story 3.2: Worker Induction Form (Compliance & Uploads)

**As a worker or visitor**, I want to upload my certifications and complete comprehensive safety compliance acknowledgements so that I can prove I am compliant with all site safety regulations.

**Acceptance Criteria**:
- A form step is created to collect license information: White Card status (Yes/No), Other License status (Yes/No), and Other License Details (text field for specifics).
- Comprehensive safety compliance checkboxes are included covering:
  - **Site Rules Safety Compliance** (8 requirements): No alcohol/drugs, electrical equipment responsibility, hazardous substances understanding, PPE usage when necessary, high-risk work meeting understanding, appropriate signage display, no unauthorised visitors understanding, housekeeping responsibility
  - **Employer Safety Requirements** (4 requirements): Employer provided training, employer provided SWMS, discussed SWMS with employer, pre-start meeting understanding  
  - **Safety Documentation** (2 requirements): Read safety booklet, understand site management plan
- Agreement checkboxes for safety compliance and terms acceptance
- The form uses client-side and server-side validation to ensure all required checkboxes are selected.
- Upon form submission, all data (personal details and compliance acknowledgements) is securely stored in Supabase with proper audit trail.
- The system records induction completion timestamp and sets induction_completed flag.
- The system sends a notification to the builder that a new worker has been inducted and compliance data recorded.

### Story 3.3: Automated White Card Data Extraction

**As a developer**, I want to set up an automated workflow to extract data from uploaded white cards so that the builder doesn't have to manually enter the information.

**Acceptance Criteria**:
- A Make.com or n8n scenario is configured to receive a webhook notification when a new worker induction form is submitted.
- The automation tool uses an OCR service to extract the expiry date and other key details from the uploaded white card image.
- The extracted data is automatically pre-filled into the appropriate fields in the certifications table in Supabase.
- The automation tool sends a notification (e.g., via email or Slack) to the builder that a new certificate has been processed and is ready for review.

## Epic 4: Site Attendance & QR Codes

**Epic Goal**: To develop a QR code-based system that allows workers to check in to job sites and verifies their compliance in real-time.

### Story 4.2: Real-Time Site Check-in

**As a worker or visitor**, I want to check in to a job site using a QR code and my email so that the system knows I am on-site.

**Acceptance Criteria**:
- A check-in page is created that allows a worker to input their email address.
- The page uses geolocation to automatically detect the worker's current job site.
- The system verifies that the worker's email is in the workers table.
- The system performs a real-time check to ensure the worker's white card is valid and not expired.
- Upon successful check-in, a new entry is created in the site_attendances table with the worker's ID, the job site's ID (derived from geolocation), and a timestamp.
- A success message is displayed on the screen.

### Story 4.3: On-Site Compliance Alerts

**As a builder**, I want to be immediately notified if a worker with an expired white card tries to check in so that I can prevent non-compliant workers from entering the site.

**Acceptance Criteria**:
- If a worker attempts to check in with an expired white card, a pop-up message appears on the screen stating: "Sorry, your white card is out of date. Do not enter the site. Please fill out a new form to upload your new white card."
- The system triggers an immediate SMS and email notification to the builder.
- The notification includes the worker's name and the reason for the check-in denial.
- No entry is created in the site_attendances table for a failed check-in due to an expired card.

## Epic 5: Admin Dashboard & Content Management

**Epic Goal**: To create a secure, user-friendly dashboard for the builder to manage all public-facing content and view worker compliance.

### Story 5.1: Admin Dashboard Homepage

**As a builder**, I want to see an at-a-glance overview of key information when I log in so that I can quickly check on project statuses and compliance.

**Acceptance Criteria**:
- The dashboard homepage is the landing page after the builder logs in.
- The homepage displays key metrics like the number of active workers, a list of sites with recent check-ins, and a summary of upcoming certificate expirations.
- The design is simple, clean, and intuitive, with a focus on ease of use.
- The dashboard is fully responsive and works well on mobile and tablet devices.

### Story 5.2: Project Management Interface

**As a builder**, I want to easily add, edit, and delete projects so that I can keep the public-facing projects page up-to-date.

**Acceptance Criteria**:
- A project management page is created with a form to add new projects.
- The form allows the builder to input a project name, a detailed write-up, and upload photos categorized by "Inside," "Outside," "Kitchen," etc.
- A list of existing projects is displayed, with buttons to edit or delete each one.
- Editing a project pre-fills the form with existing data, allowing the builder to make changes.
- Deleting a project removes it from the public website and the database.

### Story 5.3: AI-Assisted Project Description

**As a builder**, I want to use AI to help me write project descriptions so that I can create professional and engaging content for the public website.

**Acceptance Criteria**:
- An API integration with Gemini is implemented.
- A button labeled "Generate Description with AI" is added to the project creation form.
- When the button is clicked, the system sends the uploaded images and a brief summary to the Gemini API.
- The API response is returned and displayed in the description field, where the builder can then edit it.
- The feature includes error handling for API failures.

### Story 5.4: Worker and Compliance Management

**As a builder**, I want to view and manage worker compliance data so that I can ensure all on-site personnel have valid certifications.

**Acceptance Criteria**:
- A worker management page is created that displays a list of all inducted workers.
- The list includes the worker's name, email, company, and a clear status of their white card (e.g., "Valid," "Expired," "Awaiting Review").
- The builder can click a worker's name to see their full details and uploaded certifications.
- The builder can manually update a worker's certification status and expiry date from this page.

## Epic 6: Automation & Notifications

**Epic Goal**: To finalize the automated workflows for certificate expiry reminders and on-site access denial notifications to ensure the system is proactive and reliable.

### Story 6.1: Automated Certificate Expiry Reminders

**As a builder**, I want to receive an automated email notification about expiring worker certifications so that I can proactively manage compliance and avoid on-site issues.

**Acceptance Criteria**:
- An Edge Function is created in Supabase to be executed on a scheduled basis (e.g., daily).
- The Edge Function queries the certifications table and identifies all white cards set to expire in the next month.
- The Edge Function triggers a webhook to a Make.com or n8n workflow.
- The automation tool sends an email to the builder with a list of expiring white cards.
- The automation tool sends a separate email to each worker whose card is expiring, with a link to the induction form to upload a new card.
- The workflow is designed to prevent duplicate email notifications to both the builder and the worker.

### Story 6.2: Builder Notifications for On-site Compliance

**As a builder**, I want to receive real-time notifications via email and SMS so that I am immediately alerted when a worker with an expired white card attempts to check in.

**Acceptance Criteria**:
- An automation workflow (e.g., in Make.com or n8n) is set up to receive a webhook notification from the site check-in function.
- The webhook is triggered only when a worker is blocked from entering a site due to an expired card.
- The workflow sends an email to the builder with the worker's name, the reason for the denial, and the timestamp.
- The workflow also sends an SMS to the builder for immediate, out-of-the-office alerts.

### Story 6.3: Airtable Integration for Content Management

**As a builder**, I want to manage dynamic content like FAQs and contact form submissions in Airtable so that I can update them easily without needing to access the admin dashboard or the codebase.

**Acceptance Criteria**:
- A Supabase wrapper is configured to allow the application to query the FAQ content directly from Airtable.
- A Supabase Edge Function is configured to receive new contact_form_submissions and send them to the Airtable base.
- The FAQ content on the public website pages is fetched from Airtable via the Supabase wrapper.
- The system gracefully handles failures in the Airtable integration, displaying a fallback message on the public website if content cannot be fetched.
