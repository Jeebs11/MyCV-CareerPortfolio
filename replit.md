# Mujeeb Lawal Portfolio Website

## Overview

Professional portfolio for Mujeeb Lawal, Senior Programme Director with 17+ years of international experience. Built with React, TypeScript, and modern web technologies. **May 2026: Full site redesigned to Variant E "Contrast Split"** — dark 340px sticky left panel, light scrollable right panel — using Cormorant Garamond (headings) + Inter (body) and a brass/ink/paper brand palette.

### Site Structure (post-May 2026 redesign)
- **`/`** — Home: split-panel profile, Selected Mandates, Capability grid, Career accordion, Contact strip. All content DB-driven via `/api/site/*`.
- **`/case-studies`** — Case Studies: sidebar scrollspy list of career mandates with Challenge / Approach / Outcome detail panels (feeds from `projectsTable` with fallback seed data).
- **`/projects`** — Built Projects: image-hover-to-text-reveal card grid of Replit-built apps, type filter sidebar (feeds from `builtProjectsTable` with fallback seed data).
- **`/insights`** — Insights: article list with tag filter, read modal (feeds from `blogPostsTable`).
- **`/admin`** — Admin dashboard: unchanged tab-based interface; "Portfolio Projects" tab renamed to "Case Studies"; new "Built Projects" tab added with full CRUD.

### Key Features
-   **Variant E Layout**: 340px dark sticky left panel (ink `hsl(220,25%,14%)`) + full-height scrollable light right panel (paper `hsl(40,20%,97%)`). Brass accent `hsl(35,45%,45%)`. Scrollspy nav highlights active section.
-   **Self-Managed Blog / Insights**: ReactQuill WYSIWYG editor, DOMPurify sanitization, hero image support, admin-managed.
-   **CV Download with Contact Capture**: Name/email/phone modal → immediate blob download + DB lead capture.
-   **Admin Dashboard**: Bearer-auth protected. Tabs: Blog, Case Studies, Built Projects, CV Management, Career, Skills, Certifications, Education, Settings, Appearance.
-   **Admin-Managed Site Content**: All hero copy, flagship wins, skills, certifications, education, career roles editable from admin.
-   **Theme/Appearance**: CSS variable tokens (`--brand-primary`, `--brand-accent`, `--background`, `--font-sans`, `--font-display`) served via `/api/theme.css` with admin colour/font picker and live preview.

## Recent Changes (Apr 2026)

### Theme & Style Customization
Brand colors, page backgrounds, and typography are CSS variable-driven and admin-editable. The base tokens (`--brand-primary`, `--brand-accent`, `--background`, `--font-sans`, `--font-display`) are defined in `client/src/index.css` for both `:root` and `.dark`, plus auto-derived soft/strong variants (`--brand-primary-soft`, `--brand-primary-strong`, `--brand-accent-soft`) computed via modern `hsl(from ...)` syntax so all hover/badge tints track the base. The server exposes `GET /api/theme.css` (no-cache) which reads `theme.*` keys (`brandPrimary`, `brandAccent`, `brandPrimaryDark`, `brandAccentDark`, `backgroundLight`, `backgroundDark`, `fontHeading`, `fontBody`) from `site_settings` and emits CSS overrides plus a Google Fonts `@import`. `client/index.html` references it via `<link rel="stylesheet" href="/api/theme.css">` so the browser blocks paint until the theme is applied (no FOUC). All previously hard-coded `hsl(190,85%,55/65/70/45%)` / `hsl(220,90%,60/70%)` references across home, admin, insights, ChatBot, SectionNavigation, SiteContentTabs and App were refactored to `hsl(var(--brand-...))` tokens. The admin "Appearance" tab (`AppearanceAdmin`) provides three sections: Brand Colors (4 light/dark pickers), Page Backgrounds (light/dark pickers), and Typography (heading + body font dropdowns from a curated Google Fonts allowlist), plus a multi-zone live preview, Save (PUT `/api/site/settings`) and Restore Defaults; on save the theme `<link>` is hot-reloaded with a cache-busting query param. Server-side validation rejects invalid HSL (range-checked H 0-360, S/L 0-100) and unknown fonts with HTTP 400, mirrored client-side to disable Save until inputs are valid.

### Admin-Managed Site Content
All visible site content (hero copy, contact details, flagship wins, skills, certifications, education, career roles, section headings, footer copyright) is now stored in the database and editable from the admin dashboard. Public read endpoints under `/api/site/*` feed the home page; admin CRUD/reorder/upsert endpoints (Bearer-auth protected) live alongside. Image uploads (company logos, certification badges) use `/api/site/upload-image` (Multer) via a reusable `ImageUploadField` admin widget. The home page now hydrates Hero, Flagship Achievements, Skills Grid, Collapsible Career Journey, Certifications, Education, Contact section, sticky contact bar, and Footer from the API with sensible fallbacks while loading.

Rich Certifications include issuer, date obtained, valid-until, credential ID, verification URL, badge image, description, and skills. Education entries include degree, institution, location, period, field of study, and achievement bullets.

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