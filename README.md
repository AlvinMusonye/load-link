# Load Link

Fast, Minimal, Powerful - Logistics Management Platform

## Overview

Load Link is a comprehensive logistics management platform built for East African operations. The frontend is a single-page application (SPA) built on React 18 with Vite, optimized for performance on mid-range Android devices on 3G/4G networks in Nairobi and other East African cities.

## Technology Stack

- **Frontend Framework**: React 18 with concurrent features and Suspense
- **Build Tool**: Vite 5 with sub-100ms HMR and code splitting
- **Routing**: React Router v6 with nested routes and lazy loading
- **State Management**: 
  - TanStack Query (React Query) v5 for server state
  - Zustand for UI state
- **UI Components**: Radix UI primitives with custom design system
- **Styling**: Tailwind CSS v3 with JIT compiler and design tokens
- **Forms**: React Hook Form v7 + Zod schema validation
- **Maps**: Mapbox GL JS v3 for real-time fleet tracking
- **Charts**: Recharts + Nivo for dashboards and analytics
- **HTTP Client**: Axios with interceptors and token refresh
- **Real-time**: Native WebSocket API with custom hooks
- **PDF Viewing**: react-pdf for in-app document viewing
- **Date/Time**: Day.js with timezone awareness
- **Internationalization**: react-i18next (English/Swahili)
- **Icons**: Lucide React
- **Testing**: Vitest + React Testing Library + Playwright (E2E)
- **Code Quality**: ESLint + Prettier + Husky pre-commit hooks

## Architecture

### State Management
- **Server State**: Managed entirely by TanStack Query with caching, background refetch, and optimistic updates
- **UI State**: Managed by Zustand stores (sidebar, modals, notifications, map state)

### Real-time Features
- WebSocket connections for live fleet positions, dashboard metrics, and notifications
- Optimistic UI updates for instant user feedback
- Offline capability with IndexedDB queue for mutations

### Performance
- Code splitting at feature level with lazy loading
- Bundle size optimization with manual chunks
- Virtualization for large lists
- Mapbox GL for performant map rendering

## Project Structure

```
src/
├── components/           # Shared UI components
│   ├── ui/              # Base UI primitives (Button, Input, etc.)
│   ├── layout/          # Layout components (AppShell, Sidebar)
│   ├── maps/            # Map components
│   └── forms/           # Form components
├── features/            # Feature modules (shipments, fleet, billing)
│   ├── shipments/       # Shipment management
│   ├── fleet/           # Fleet management
│   ├── billing/         # Invoicing and payments
│   ├── customers/       # Customer management
│   └── ...
├── hooks/               # Custom React hooks
├── services/            # API client layer
├── stores/              # Zustand stores (UI state)
├── utils/               # Utility functions (formatters, validators)
├── config/              # App configuration
└── i18n/                # Translation files (en, sw)
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_MAPBOX_ACCESS_TOKEN=your_mapbox_token
VITE_WS_URL=ws://localhost:3000
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run unit tests with Vitest
- `npm run test:e2e` - Run E2E tests with Playwright
- `npm run lint` - Run ESLint
- `npm run storybook` - Start Storybook development

### Testing

#### Unit Tests
```bash
npm run test
```

#### E2E Tests
```bash
npm run test:e2e
```

#### Coverage Report
```bash
npm run test -- --coverage
```

### Code Quality

- ESLint configuration with React and accessibility rules
- Prettier for code formatting
- Husky pre-commit hooks for quality checks
- Storybook for component development and documentation

## Design System

### Design Tokens
- Primary Navy: `#0F2A4A`
- Brand Blue: `#1D4ED8`
- Success Green: `#15803D`
- Warning Amber: `#D97706`
- Error Red: `#B91C1C`

### Status System
Consistent status badges with automatic color coding:
- Draft (Gray)
- Confirmed (Blue)
- In Transit (Blue)
- Delivered (Green)
- Exception (Red)

## Internationalization

Support for English and Swahili with lazy-loaded locale files. Language preference persists to user account.

## Performance Targets

- First Contentful Paint: < 1.5s on 4G
- Time to Interactive: < 3.5s on 4G
- Largest Contentful Paint: < 2.5s
- Bundle Size (initial): < 100KB gzipped

## Deployment

### Build Process
```bash
npm run build
```

### Preview
```bash
npm run preview
```

### PWA Features
- Service worker for offline functionality
- App manifest for installability
- Background sync for offline mutations

## Contributing

1. Follow the established code patterns and architecture
2. Write tests for new features
3. Update documentation
4. Ensure all tests pass before submitting

## License

© 2025 Load Link. All rights reserved.

---

**Load Link Frontend — Fast, Minimal, Powerful**

engineering@loadlink.co.ke | github.com/loadlink
