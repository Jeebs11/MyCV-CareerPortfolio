# Mujeeb Lawal Portfolio Website

## Overview

This is a personal portfolio website for Mujeeb Lawal, a Senior Project Manager with 17+ years of international experience. The site showcases professional experience, skills, achievements, and career highlights through an interactive, dashboard-style interface inspired by Figma's aesthetic. Built with React, TypeScript, and modern web technologies, the portfolio emphasizes visual storytelling through metrics, geographic data visualization, and glassmorphic design elements. Key capabilities include:

-   **Hero Section with Recent Impact**: Displays 3 most recent roles with role descriptions, period, company, and industry badges. "View Impact" buttons open dialogs showing role description followed by "Full Impact" section with detailed achievements.
-   **Career Journey Timeline**: Comprehensive view of all 12 career positions from 2008-2024 with role descriptions, location, industry, and project type. Each position includes a description field separate from the detailed impact information shown in expandable dialogs.
-   **Industry Experience Map**: 7 sectors with expandable project cards showing global delivery experience.
-   **Certifications Wall of Fame**: Interactive expandable cards showcasing professional certifications with detailed descriptions and validation links.
-   **Self-Managed Blog System with Rich Content**: A complete CMS for thought leadership featuring ReactQuill WYSIWYG editor with cyan-to-blue gradient toolbar, rich text formatting, hero image support for visual storytelling, DOMPurify HTML sanitization for security, and database-backed storage with admin panel.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend

The frontend is built with **React 18** and **TypeScript**, using **Vite** for tooling and **Wouter** for routing. **TailwindCSS** provides utility-first styling, complemented by **shadcn/ui** for accessible components. The design system features a custom color palette, glassmorphic elements, Inter/Space Grotesk/JetBrains Mono typography, and a dark mode, mobile-first approach. **TanStack React Query** manages server state.

### Backend

The backend utilizes **Express.js** with **TypeScript** on a Node.js runtime. It's structured for API routes and server-side logic, with development and production environments configured differently (Vite middleware for HMR in dev, static asset serving in prod).

### Data Storage

Currently, the portfolio uses **in-memory storage** for user data and static constants for portfolio content. However, the system is pre-configured with **Drizzle ORM** for PostgreSQL, **Neon Database serverless driver**, and migration setup, ready for future database integration for features like blog posts or dynamic content.

### Authentication and Authorization

While authentication is not yet implemented, a user schema and storage interface are in place, making it ready for future session management and database-backed authentication.

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

### SEO

-   Structured data (JSON-LD), OpenGraph, and Twitter Card meta tags are used for search engines and social media.