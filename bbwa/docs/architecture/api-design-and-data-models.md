# API Design and Data Models

## API Endpoints

### POST /api/projects
- **Purpose**: Create a new project.
- **Request Body**: `{ "name": "string", "description": "string", "photos": [{ "url": "string", "category": "string" }] }`
- **Response**: `{ "success": boolean, "project_id": "UUID" }`
- **Security**: Requires builder authentication.

### GET /api/projects
- **Purpose**: Retrieve a list of all projects for the public website.
- **Response**: `{ "projects": [{ "id": "UUID", "name": "string", "description": "string", "hero_image_url": "string" }] }`
- **Security**: Publicly accessible.

### POST /api/induction
- **Purpose**: Submit a new worker induction form.
- **Request Body**: `{ "personal_details": { "name": "string", "email": "string" }, "certifications": [{ "file_url": "string", "type": "string" }] }`
- **Response**: `{ "success": boolean, "worker_id": "UUID" }`
- **Security**: Publicly accessible.

### POST /api/check-in
- **Purpose**: Handle worker site check-ins with geolocation.
- **Request Body**: `{ "email": "string", "geolocation": { "latitude": number, "longitude": number } }`
- **Response**: `{ "success": boolean, "message": "string" }`
- **Security**: Publicly accessible.
