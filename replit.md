# Mujeeb Lawal Portfolio Website

## Overview

This is a personal portfolio website for Mujeeb Lawal, a Senior Project Manager with 17+ years of international experience. The site showcases professional experience, skills, achievements, and career highlights through an interactive, dashboard-style interface inspired by Figma's aesthetic. Built with React, TypeScript, and modern web technologies, the portfolio emphasizes visual storytelling through metrics, geographic data visualization, and glassmorphic design elements.

## Recent Updates (October 2024)

**Latest Changes (October 13, 2024):**
- **Added Section Navigation** - Creative navigation system for easy jumping between sections:
  - Desktop: Floating navigation dots on the right side with glassmorphic design
  - Active section highlighted with gradient (cyan to blue)
  - Hover tooltips show section name and icon
  - Mobile: Floating Action Button (FAB) with compass icon in bottom-left corner (ChatBot on right)
  - Opens bottom sheet menu with all sections
  - Smooth scroll to sections with Intersection Observer for active detection
  - Fixed scroll offset (80px) to account for navigation bar, ensuring section headers are visible
  - Timing fix: menu/sheet closes first (300ms delay), then scrolls to prevent calculation errors
  - Applied to both hamburger menu and FAB navigation systems
  - Verified with e2e tests on desktop (1280x720) and mobile (iPhone 12 Pro)

- **Comprehensive Mobile Optimization** - Fully optimized the entire portfolio for mobile devices with focus on usability and accessibility:
  - Mobile Navigation: Added hamburger menu with Sheet drawer component for mobile, smooth slide-in navigation
  - Hero Section: Reduced padding (py-12 vs py-20), responsive typography (text-4xl sm:text-5xl md:text-6xl), stacked CTAs on mobile
  - Career Timeline: Changed from horizontal carousel to vertical single-column stack on mobile (lg:hidden) with full-width cards
  - Career Timeline Dialog: Mobile-optimized with max-w-[95vw] width, max-h-[90vh] height, single-column grids, flex-col header layout
  - Industry Toggle Buttons: Fixed touch targets with h-12 (48px height), flex layout with proper padding for mobile accessibility
  - All Dialogs: Optimized for mobile with proper width constraints, responsive typography, single-column layouts below md breakpoint
  - Touch Targets: All interactive elements meet 48px minimum height requirement for mobile usability
  - Responsive Typography: Consistent scaling pattern (text-base sm:text-lg md:text-xl) throughout all sections
  - Layout Pattern: Single-column stacking below md breakpoint (grid-cols-1 md:grid-cols-2) for cards and content
  - Verified with e2e Playwright tests on mobile viewport (iPhone 12 Pro: 390x844)

**Previous Changes (October 10, 2024):**
- **Rewrote all achievements with conversational, professional tone** - Replaced generic role descriptions with specific projects, named clients, and tangible outcomes:
  - Novocycle: "Built the PMO function from the ground up" + 36% efficiency gain
  - Simply Business: £1.2M product delivery, 10-year anniversary Global Hackathon, FCA compliance programmes
  - GSMA: UN partnership, named operators (Vodafone/Verizon/China Telecom), 35% energy reduction
  - Alfa Laval: Landmark projects (The Shard, Olympic Aquatic Centre, 20 Fenchurch Street)
  - BSS Industrial: The Hilton Brighton, Offplan developments
- **View Impact dialogs now showcase actual projects** instead of repeating card content - focuses on key achievements, specific clients, and delivered results
- Natural language throughout ("Built", "Shipped", "Ran", "Led") - removed robotic AI-sounding phrases

**Previous Changes (October 8, 2024):**
- **Added "View Impact" feature** - Interactive dialogs in both Recent Impact (hero section) and Career Journey sections showing full achievements, technologies, budget, and team size details
- **Completed Career Journey section** - Added 4 missing career entries from PDF resume:
  - Project Delivery Manager at Best Future Education Centre (Mar 2020 - Dec 2020) - Nigeria, Education sector
  - Senior Implementation Consultant at Dictate.IT (Sep 2014 - May 2016) - Healthcare sector, NHS implementations
  - Technical Project Manager at BSS Industrial (Nov 2013 - Aug 2014) - Engineering/Construction, hospitality projects
  - Project Support Engineer at Alfa Laval (Sep 2008 - Nov 2013) - Engineering, landmark UK infrastructure
- **Reworded BSS Industrial and Alfa Laval achievements** to match professional tone of other entries - clearer, more action-oriented language
- Fixed region assignment for Best Future Education Centre (Nigeria) from 'europe' to 'mena' for accurate geographic representation

**Previous Changes (October 6, 2024):**
- Streamlined portfolio by removing redundant sections (Impact Metrics, Case Studies, Project Dashboard)
- **Moved Insights & Thought Leadership to dedicated blog page** at `/insights` route with interactive filtering, featured article spotlight, and article detail modals
- Updated navigation to include: Journey, Industries, Insights, Contact
- **Integrated Vertical Career Timeline directly into Hero Section** - Removed separate horizontal timeline section and integrated a compact vertical timeline carousel into the hero (desktop: 3 positions with up/down navigation arrows; mobile: 3 most recent positions stacked)

**Key Features:**
1. **Hero Section with Integrated Career Timeline** - The hero section (#journey) now features a vertical career timeline carousel showing 3 positions at a time on desktop with arrow navigation, and 3 most recent positions on mobile. Displays all 12 career positions from 2008-2024 with company, role, location, industry, and project type

2. **Industry Experience Map** - 7 sectors with expandable project cards showing global delivery experience

3. **Certifications Wall of Fame** - Interactive expandable cards showcasing PRINCE2, Scrum Master, Six Sigma, and Agile certifications with detailed descriptions, validation links, and skills mapping

4. **Insights & Thought Leadership Page** - Dedicated blog-style page at `/insights` featuring:
   - Hero section with glassmorphic design
   - Category filtering (PMO Leadership, Compliance, Innovation, Methodology)
   - Featured article spotlight
   - Interactive article grid with detail modals
   - 4 blog posts covering PMO leadership, FCA compliance, AI integration, and global delivery methodologies

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