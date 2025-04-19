# Horizontal List Component

A React-based horizontal scrolling list implementation with keyboard navigation, focused states, and virtualization for optimal performance. Built with TV/set-top box interfaces in mind.

## Tech Stack

- React 19.0.0
- TypeScript 5.7.2
- Vite 6.3.0
- Zustand 5.0.3
- TailwindCSS 3.4.1
- Vitest
- Cypress
- Axios

## Prerequisites

- Node.js 18+ 
- npm or yarn

## CI/CD

The project includes GitHub workflows for continuous integration:

- **PR Checks**: Runs on every pull request to the main branch
  - Linting (ESLint)
  - Format checking (Prettier)
  - Unit tests (Vitest)
  - Build verification

## Project Structure

```
src/
├── api/                  # API related code
├── components/           # React components
│   ├── common/           # Shared UI components (LoadingState, ErrorState, EmptyState)
│   ├── item/             # Item components for list items
│   ├── list/             # List container components 
│   └── spacer/           # Utility component for list spacing
├── constants/            # Application constants
├── hooks/                # Custom React hooks
│   ├── useContentFetching.ts    # Content data fetching
│   ├── useFocusManagement.ts    # Focus state management
│   ├── useKeyboardNavigation.ts # Keyboard input handling
│   └── useVisibleRange.ts       # Virtualization range calculation
├── store/                # Zustand store for state management
├── types/                # TypeScript type definitions
├── utils/                # Utility functions
│   ├── contentUtils.ts   # Content data extraction utilities
│   └── spaceUtils.ts     # Spacing calculation utilities
└── global.css            # Global styles and Tailwind imports
```

## Key Design Patterns

- **Component-Based Architecture**: UI broken down into small, reusable components
- **Custom Hooks**: Logic separated into dedicated React hooks for better reusability
- **Data Utilities**: Content processing and calculation logic extracted into pure utility functions
- **Virtualization**: Only rendering visible items for better performance
- **State Management**: Centralized content and UI state with Zustand
- **Type Safety**: Comprehensive TypeScript typing throughout the application

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the production version
- `npm run preview` - Preview the production build locally
- `npm test` - Run unit tests
- `npm run test:coverage` - Run tests with coverage report
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check formatting without changing files
- `npm run cypress` - Open Cypress tu run E2E tests
- `npm run cypress:run` - Run Cypress E2E tests