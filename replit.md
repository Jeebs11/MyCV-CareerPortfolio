# Mujeeb Lawal Portfolio Website

## Overview

This is a professional portfolio website for Mujeeb Lawal, a Senior Project Manager with 17+ years of international experience, **optimized specifically to target recruiters and maximize employment opportunities**. Built with React, TypeScript, and modern web technologies, the portfolio follows a recruiter-first information architecture with reduced scroll weight, immediate credibility signals, and scannable value propositions. Recent redesign (Nov 2025) pivoted from dashboard aesthetic to executive-focused presentation. Key capabilities include:

-   **Recruiter-Focused Hero Section**: Centered single-column layout with powerful headline "Senior Project Manager | £50M+ Delivery | 17+ Years", company logo trust bar (Mercer, GSMA, Simply Business, 6Connex), dual CTAs (Download CV + Contact), and immediate contact access (Email, LinkedIn, WhatsApp: +971 509082234).
-   **Sticky Contact Bar**: Appears after 600px scroll with always-visible Email, WhatsApp, LinkedIn, and CV download buttons for friction-free engagement.
-   **Top 3 Flagship Achievements**: Challenge → Impact cards showcasing signature wins: (1) PMO build with 36% efficiency gain, (2) £1.2M FCA-regulated programme with 34-person team, (3) 35% energy reduction for UN SDGs.
-   **Skills & Certifications Grid**: Scannable 5-card layout displaying Methodologies (Agile, Waterfall, SAFe, Prince2), Tools (Jira, Confluence, PowerBI, Tableau), Professional Certifications (Prince2 Practitioner, Scrum Master), Scale & Complexity metrics (team sizes, budget authority, compliance), and Industry Experience across 7 sectors.
-   **Collapsible Career Journey**: Accordion-based component showing all 12 roles (2008-2024) collapsed by default with company logos (via Clearbit Logo API), role title, period, and employment type badges (blue for Permanent, orange for Contract). Expandable on click to reveal full role description, key achievements, metrics, and technologies. Significantly reduces scroll weight while maintaining comprehensive career detail.
-   **Self-Managed Blog System with Rich Content**: A complete CMS for thought leadership featuring ReactQuill WYSIWYG editor with cyan-to-blue gradient toolbar, rich text formatting, hero image support for visual storytelling, DOMPurify HTML sanitization for security, and database-backed storage with admin panel.
-   **CV Download with Contact Capture**: Visitors can download the CV by providing their name, email, and optional phone number through a form modal. CV downloads trigger immediately upon form submission.
-   **Admin Dashboard with CV Management**: Tab-based admin interface for managing blog posts and CV downloads. Features include CV file upload (PDF, DOC, DOCX), viewing all contact submissions with download timestamps, and CSV export of contact data for lead management.

## Recent Changes (Apr 2026)

### Admin-Managed Site Content
All visible site content (hero copy, contact details, flagship wins, skills, career roles, section headings) is now stored in the database and editable from the admin dashboard. Public read endpoints under `/api/site/*` feed the home page; admin CRUD/reorder/upsert endpoints (Bearer-auth protected) live alongside. Logo uploads use `/api/site/upload-logo` (Multer). The home page now hydrates Hero, Flagship Achievements, Skills Grid, Collapsible Career Journey, and Contact section from the API with sensible fallbacks while loading.

## Recent Changes (Nov 2025)

### Recruiter-First Redesign
Streamlined page structure to prioritize recruiter engagement and reduce cognitive load:
- **Removed sections**: MetricsDashboard, IndustryExperienceMap, GeographicMap, CertificationsWall (consolidated into Skills Grid)
- **New structure**: Hero → Flagship Wins → Skills → Collapsible Career Journey → Contact → Footer
- **Reduced scroll weight**: From ~8 full-page sections to 4 focused sections
- **Company logos**: Integrated Clearbit Logo API for visual company recognition in career journey
- **Contact optimization**: WhatsApp (+971 509082234) added across all contact points for global reach

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend

The frontend is built with **React 18** and **TypeScript**, using **Vite** for tooling and **Wouter** for routing. **TailwindCSS** provides utility-first styling, complemented by **shadcn/ui** for accessible components. The design system features a custom color palette, glassmorphic elements, Inter/Space Grotesk/JetBrains Mono typography, and a dark mode, mobile-first approach. **TanStack React Query** manages server state.

### Backend

The backend utilizes **Express.js** with **TypeScript** on a Node.js runtime. It's structured for API routes and server-side logic, with development and production environments configured differently (Vite middleware for HMR in dev, static asset serving in prod).

### Data Storage

The portfolio uses **PostgreSQL** database via **Neon Database serverless driver** managed through **Drizzle ORM**. Database tables include:
-   **blogPostsTable**: Stores blog articles with rich content, metadata, and featured status
-   **cvContactsTable**: Captures contact information from CV downloads (name, email, phone, timestamp)
-   **cvFileTable**: Manages uploaded CV files with metadata and timestamps
-   **projectsTable**: Portfolio case studies (title, client, sector, year, metric, challenge, impact, role, logo, heroImage, externalUrl, featured, sortOrder)

File uploads are handled using **Multer** middleware and stored in the `uploads/` directory. Static portfolio content (career history, certifications) uses in-memory constants for fast access.

### Authentication and Authorization

The admin dashboard uses **Bearer token authentication** with the `ADMIN_PASSWORD` environment secret. Admin routes (`/api/blog-posts`, `/api/cv/*`) validate the Authorization header against the stored password to protect administrative operations.

### Build and Deployment

The build process involves Vite for the frontend (output to `dist/public`) and esbuild for the backend (output to `dist/index.js`). Development uses `npm run dev` for an Express server with Vite HMR. Static assets and Google Fonts are managed through Vite aliases and CDN loading.

## External Dependencies

### UI/UX & Styling

-   **Radix UI**: Accessible, unstyled React components.
-   **shadcn/ui**: Pre-styled components built on Radix UI.
-   **Lucide React**: Icon library.
-   **TailwindCSS**: Utility-first CSS framework.
-   **class-variance-authority**, **clsx**, **tailwind-merge**: Styling utilities.

### Data Management

-   **TanStack React Query v5**: Server state management and caching.
-   **Drizzle ORM**: TypeScript ORM for PostgreSQL.
-   **Neon Database Serverless**: Serverless PostgreSQL driver.
-   **drizzle-zod**: Zod schema generation from Drizzle schemas.

### Forms & Validation

-   **React Hook Form**: Form state management.
-   **@hookform/resolvers**: Validation resolver for form libraries.
-   **Zod**: TypeScript-first schema validation.

### Development & Utilities

-   **Replit Plugins**: Replit environment enhancements.
-   **tsx**: TypeScript execution for development.
-   **esbuild**: Fast JavaScript bundler.
-   **date-fns**: Date utility library.
-   **nanoid**: Unique ID generation.
-   **cmdk**: Command menu component.
-   **embla-carousel-react**: Carousel component.
-   **Multer**: Multipart/form-data file upload handling.
-   **DOMPurify**: HTML sanitization for blog content security.
-   **ReactQuill**: WYSIWYG rich text editor for blog posts.

### SEO

-   Structured data (JSON-LD), OpenGraph, and Twitter Card meta tags are used for search engines and social media.