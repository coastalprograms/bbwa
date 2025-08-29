# Data Models

## Users
- **Purpose**: Stores builder authentication information and user roles.
- **Attributes**: id (UUID), email (Text), created_at (Timestamp)
- **Relationships**: One-to-one with the auth.users table in Supabase.

## Projects
- **Purpose**: Stores information about the builder's projects for the public website.
- **Attributes**: id (UUID), name (Text), description (Text), photo_urls (JSONB)
- **Relationships**: One-to-many with hero_images.

## Hero Images
- **Purpose**: Stores image URLs for the rotating homepage carousel.
- **Attributes**: id (UUID), url (Text), project_id (UUID), created_at (Timestamp)
- **Relationships**: Many-to-one with projects.

## Workers
- **Purpose**: Stores personal details and contact information for workers.
- **Attributes**: id (UUID), full_name (Text), email (Text), company (Text), trade (Text)
- **Relationships**: One-to-many with certifications and site_attendances.

## Certifications
- **Purpose**: Stores details of uploaded certifications, including expiry dates.
- **Attributes**: id (UUID), worker_id (UUID), image_url (Text), expiry_date (Date)
- **Relationships**: Many-to-one with workers.

## Site Attendances
- **Purpose**: Records when a worker checks in to a job site.
- **Attributes**: id (UUID), worker_id (UUID), site_location (Text), timestamp (Timestamp)
- **Relationships**: Many-to-one with workers.
