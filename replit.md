# Mujeeb Lawal Portfolio Website

## Overview

This is a personal portfolio website for Mujeeb Lawal, a Senior Project Manager with 17+ years of international experience. The site showcases professional experience, skills, achievements, and career highlights through an interactive, dashboard-style interface inspired by Figma's aesthetic. Built with React, TypeScript, and modern web technologies, the portfolio emphasizes visual storytelling through metrics, geographic data visualization, and glassmorphic design elements. Key capabilities include:

-   **Hero Section with Recent Impact**: Displays 3 most recent roles with role descriptions, period, company, industry badges, and employment type indicators (Contract/Permanent). "View Impact" buttons open dialogs showing role description followed by "Full Impact" section with detailed achievements.
-   **Career Journey Timeline**: Comprehensive view of all 12 career positions from 2008-2024 with role descriptions, location, industry, project type, and employment type badges (blue for Permanent roles, orange for Contract/Freelance positions). Each position includes a description field separate from the detailed impact information shown in expandable dialogs.
-   **Industry Experience Map**: 7 sectors with expandable project cards showing global delivery experience.
-   **Certifications Wall of Fame**: Interactive expandable cards showcasing professional certifications with detailed descriptions and validation links.
-   **Self-Managed Blog System with Rich Content**: A complete CMS for thought leadership featuring ReactQuill WYSIWYG editor with cyan-to-blue gradient toolbar, rich text formatting, hero image support for visual storytelling, DOMPurify HTML sanitization for security, and database-backed storage with admin panel.
-   **CV Download with Contact Capture**: Visitors can download the CV by providing their name, email, and optional phone number through a form modal. CV downloads trigger immediately upon form submission.
-   **Admin Dashboard with CV Management**: Tab-based admin interface for managing blog posts and CV downloads. Features include CV file upload (PDF, DOC, DOCX), viewing all contact submissions with download timestamps, and CSV export of contact data for lead management.

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