🌌 SpaceQuest

SpaceQuest is a modern React + TypeScript web application that explores the Star Wars universe using the SWAPI (Star Wars API).
It demonstrates clean architecture, reusable components, client-side pagination & search, and proper testing practices.

🚀 Features

🔍 Search across Star Wars resources

📄 Client-side pagination

⚡ Fast data fetching with custom hooks

🧩 Reusable dashboard components

🧪 Unit testing with Vitest & React Testing Library

🎨 Responsive UI with Tailwind CSS

🧭 Routing using React Router

🧱 Project Structure
src/
├── components/
│   ├── dashboard/
│   │   ├── search-bar.tsx
│   │   ├── entity-card.tsx
│   │   ├── entity-detail-modal.tsx
│   │   ├── pagination-controls.tsx
│   │   ├── loading-state.tsx
│   │   ├── error-state.tsx
        ├── SearchBar.test.tsx
│   │   └── empty-state.tsx
│   └── layout/
│       └── Navbar.tsx
│
├── features/
│   ├── characters/
│   ├── films/
│   ├── planets/
│   ├── species/
│   ├── starships/
│   └── vehicles/
│
├── hooks/
│   └── use-swapi.ts
│
├── lib/
│   └── swapi.ts
│
├── tests/
    └── setup.ts
│
├── types/
│   └── swapi.ts
│
├── App.tsx
├── main.tsx
└── index.css


This structure follows feature-based architecture, making the project scalable and easy to maintain.

🧠 Custom Hook: useSwapi

The useSwapi hook is the core of data handling in the app.

Responsibilities:

Fetches data once per resource

Handles:

Loading state

Error state

Client-side search

Client-side pagination

Cancels in-flight requests using AbortController

Keeps UI stable (never returns undefined)

Why client-side pagination & search?

SWAPI has inconsistent search behavior across resources.
Fetching once and handling pagination/search on the client ensures:

Consistent UX

Better performance

Fewer API calls

This is a deliberate architectural decision, not a workaround.

🧪 Testing ⭐

This project uses Vitest and React Testing Library for unit testing.

To run tests:

npm run test


Other testing commands:

npm run test:ui       # Interactive UI
npm run test:run      # Run tests once
npm run coverage      # Coverage report

Example Tested Component

SearchBar

Covered test cases:

Renders correctly

Handles user input

Executes debounced search after delay

Cancels previous debounce when typing fast

This ensures:

Correct business logic

No unnecessary API calls

Better performance & UX
