# Mujeeb Lawal Portfolio Website

## Overview

This is a personal portfolio website for Mujeeb Lawal, a Senior Project Manager with 17+ years of international experience. The site showcases professional experience, skills, achievements, and career highlights through an interactive, dashboard-style interface inspired by Figma's aesthetic. Built with React, TypeScript, and modern web technologies, the portfolio emphasizes visual storytelling through metrics, geographic data visualization, and glassmorphic design elements.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server
- **Wouter** for client-side routing (lightweight React Router alternative)
- **TailwindCSS** for utility-first styling with custom design system
- **shadcn/ui** component library (New York variant) providing pre-built, accessible UI components

**Design System:**
- Custom color palette based on deep purples, vibrant cyan, and electric blue
- Glassmorphic design pattern with transparency layers and blur effects
- Typography hierarchy using Inter (primary), Space Grotesk (display), and JetBrains Mono (monospace)
- Dark mode as the primary interface with gradient backgrounds
- Responsive design with mobile-first approach

**State Management:**
- **TanStack React Query** for server state management and data fetching
- React hooks for local component state
- No global state management library (Redux/Zustand) - keeps architecture simple

**Component Architecture:**
- Radix UI primitives for accessible, unstyled components
- Custom UI components in `client/src/components/ui/` following shadcn conventions
- Page components in `client/src/pages/`
- Shared TypeScript interfaces in `shared/schema.ts`

### Backend Architecture

**Server Framework:**
- **Express.js** with TypeScript for API routes and server-side logic
- Node.js runtime environment
- ESM module system (type: "module" in package.json)

**Server Structure:**
- `server/index.ts` - Main Express server setup with middleware
- `server/routes.ts` - API route definitions (currently minimal, ready for expansion)
- `server/storage.ts` - Data storage abstraction layer with in-memory implementation
- `server/vite.ts` - Vite development server integration for HMR

**Development vs Production:**
- Development: Vite middleware integrated with Express for hot module replacement
- Production: Pre-built static assets served from `dist/public`
- Environment-based configuration via NODE_ENV

### Data Storage Solutions

**Current Implementation:**
- **In-Memory Storage** (`MemStorage` class) for user data
- TypeScript interfaces define data schemas in `shared/schema.ts`
- Portfolio data (experiences, skills, achievements) stored as static constants

**Database Configuration (Ready but Not Implemented):**
- **Drizzle ORM** configured for PostgreSQL
- Database schema defined in `shared/schema.ts`
- Migration setup via `drizzle.config.ts` pointing to `DATABASE_URL`
- **Neon Database** serverless driver included as dependency
- Session storage configured with `connect-pg-simple` for PostgreSQL sessions

**Rationale:** The portfolio currently uses static data for experiences and skills, making a database unnecessary. However, the infrastructure is pre-configured to easily add PostgreSQL for future features like contact forms, blog posts, or dynamic content management.

### Authentication and Authorization

**Current State:**
- No authentication implemented
- User schema exists in `shared/schema.ts` with basic fields (id, username)
- Storage interface includes user CRUD methods for future implementation

**Ready for Implementation:**
- Session management middleware scaffolded
- User storage abstraction layer allows easy swap to database-backed authentication

### Build and Deployment

**Build Process:**
- Frontend: Vite builds React app to `dist/public`
- Backend: esbuild bundles server code to `dist/index.js`
- Combined build script compiles both in production

**Development Workflow:**
- `npm run dev` - Runs Express server with Vite middleware on port 5000
- Hot module replacement for frontend changes
- TypeScript type checking via `npm run check`
- Database migrations via `npm run db:push`

**Asset Management:**
- Static assets resolved via Vite alias `@assets` pointing to `attached_assets/`
- Google Fonts loaded via CDN in `client/index.html`

## External Dependencies

### UI Component Libraries
- **Radix UI** - Comprehensive suite of accessible, unstyled React components (accordion, dialog, dropdown, popover, tabs, toast, tooltip, etc.)
- **shadcn/ui** - Pre-styled components built on Radix UI with TailwindCSS
- **Lucide React** - Icon library for UI elements

### Data Fetching and State
- **TanStack React Query v5** - Server state management, caching, and data synchronization
- Custom fetch wrapper in `lib/queryClient.ts` for API requests

### Styling and Design
- **TailwindCSS** - Utility-first CSS framework
- **class-variance-authority** - Type-safe variant management for components
- **clsx** & **tailwind-merge** - Conditional className utilities

### Database and ORM
- **Drizzle ORM** - TypeScript ORM for PostgreSQL
- **Neon Database Serverless** - Serverless PostgreSQL driver
- **drizzle-zod** - Zod schema generation from Drizzle schemas

### Forms and Validation
- **React Hook Form** - Form state management
- **@hookform/resolvers** - Validation resolver integration
- **Zod** - TypeScript-first schema validation

### Development Tools
- **Replit Plugins** - Runtime error overlay, cartographer, dev banner for Replit environment
- **tsx** - TypeScript execution for development server
- **esbuild** - Fast JavaScript bundler for production builds

### Utilities
- **date-fns** - Modern date utility library
- **nanoid** - Unique ID generation
- **cmdk** - Command menu component
- **embla-carousel-react** - Carousel/slider component

### SEO and Metadata
- Structured data (JSON-LD) in HTML for schema.org Person markup
- OpenGraph and Twitter Card meta tags for social media sharing
- Comprehensive meta description and keywords for search engines