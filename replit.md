# ValidatorAI - Startup Idea Validation Platform

## Overview

ValidatorAI is a fun, low-pressure platform for idea exploration that helps anyone validate concepts through AI-powered feedback. The platform guides users through three main steps: exploring their idea, creating free landing page mockups to share with others, and submitting their concept to a newsletter with 200,000+ idea explorers. The goal is to maximize affiliate conversions by positioning free landing page creation as the natural next step for sharing ideas.

## User Preferences

Preferred communication style: Simple, everyday language.
Design preference: Playful, fun, interesting, engaging look for idea explorers looking to role-play as founders and have fun exploring their ideas. Low pressure and interesting design approach.

## System Architecture

The application follows a modern full-stack architecture with clear separation between client, server, and shared components:

### Frontend Architecture
- **Framework**: React with TypeScript using Vite for development and building
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Query (@tanstack/react-query) for server state management
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Styling**: Tailwind CSS with CSS variables for theming
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **File Uploads**: Multer middleware for handling image uploads
- **Session Management**: Configured for PostgreSQL session storage
- **API Design**: RESTful API with JSON responses

### Data Storage
- **Database**: PostgreSQL (configured for Neon serverless)
- **ORM**: Drizzle ORM with TypeScript schema definitions
- **Migration**: Drizzle Kit for database migrations
- **Validation**: Zod schemas for runtime type checking

## Key Components

### SEO Optimization
- **Primary Target**: Idea validation, validate startup ideas, startup idea validator terms
- **Title**: "ValidatorAI - Free AI-Powered Startup Idea Validation Tool"
- **Meta Description**: Focus on instant AI feedback, free tools, and 200,000+ entrepreneur community
- **Keywords**: Comprehensive coverage of idea validation, startup validation, and entrepreneurship terms
- **Social Sharing**: Open Graph and Twitter Card implementation for better social media presence

### Database Schema
Three main entities defined in `shared/schema.ts`:
- **Users**: Basic user authentication (id, username, password)
- **Validations**: Stores idea validation requests and AI feedback
- **Submissions**: Project submissions for newsletter consideration with optional screenshot uploads

### API Endpoints
- `POST /api/validate`: Validates startup ideas and stores feedback
- `POST /api/submit`: Handles project submissions with file upload support

### Frontend Pages and Components
- **Home Page**: Single-page application with sections for validation, site builders, and newsletter submission
- **Component Structure**: 
  - Header with smooth scrolling navigation
  - Hero section with call-to-action
  - Idea validation form with AI feedback display
  - Site builder recommendations
  - Newsletter submission form with file upload
  - Testimonials and footer

### Storage Layer
Currently implements in-memory storage (`MemStorage`) with interface (`IStorage`) designed for easy database integration.

## Security Implementation

### Environment Variable Protection
- **API Keys**: All sensitive keys (OpenAI, Database) are stored as encrypted environment variables
- **JWT Secrets**: Automatically generated secure JWT secrets for session management
- **Environment Validation**: Server validates all required environment variables on startup

### User Data Isolation  
- **Database Schema**: Updated with proper user relationships and foreign keys
- **User-Specific Data**: All validations and submissions are linked to authenticated users
- **Access Control**: Users can only access their own data through scoped queries
- **Optional Authentication**: Public features work without auth, but data is isolated when users log in

### Security Middleware
- **Authentication System**: JWT-based authentication ready for Google OAuth integration
- **Route Protection**: Admin routes protected with session-based authentication
- **Input Validation**: All API endpoints use Zod schemas for input sanitization
- **File Upload Security**: Image-only uploads with size limits and secure storage

## Data Flow

1. **Idea Validation Flow**:
   - User enters idea in textarea (optionally authenticated)
   - Frontend validates input with Zod schema
   - API call to `/api/validate` creates validation record linked to user if authenticated
   - AI feedback generated using OpenAI GPT-4o and displayed securely

2. **Project Submission Flow**:
   - User fills out project details form (optionally authenticated)
   - Optional screenshot upload with security validation
   - Form validation with React Hook Form and Zod
   - Multipart form submission to `/api/submit` with user association
   - Success feedback via toast notifications

3. **User Authentication Flow** (Ready for Google OAuth):
   - JWT-based session management
   - Secure cookie storage with HttpOnly flags
   - User data isolation in database
   - Optional authentication for better user experience

## External Dependencies

### UI and Styling
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **React Icons**: Additional icon sets

### Development Tools
- **Vite**: Fast development server and build tool
- **TypeScript**: Type safety across the stack
- **ESBuild**: Fast JavaScript bundler for production

### Database and Validation
- **Drizzle ORM**: Type-safe database interactions
- **Zod**: Runtime type validation
- **Neon Database**: Serverless PostgreSQL

### File Handling
- **Multer**: Express middleware for file uploads
- **Image validation**: Restricts uploads to image files with 10MB limit

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds React app to `dist/public`
- **Backend**: ESBuild bundles server code to `dist/index.js`
- **Assets**: Static files served from build output

### Development vs Production
- **Development**: Hot reload with Vite dev server
- **Production**: Bundled server serves static assets
- **Environment**: NODE_ENV controls build behavior

### Database Setup
- **Schema**: Defined in shared schema file
- **Migrations**: Generated to `./migrations` directory
- **Connection**: Environment variable `DATABASE_URL` required

### File Upload Handling
- **Storage**: Local `uploads/` directory
- **Validation**: Image files only, 10MB limit
- **Error Handling**: Graceful file upload failures

The architecture is designed for scalability with clear separation of concerns, type safety throughout, and modern development practices. The in-memory storage can be easily replaced with the configured PostgreSQL database when needed.