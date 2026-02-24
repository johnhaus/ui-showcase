# UI Showcase SPA

A single-page application built with React 19 to showcase reusable components, scalable architecture, and state management.

This project is intentionally structured as a portfolio piece to showcase practical engineering decisions — not just UI features.

---

## 🔗 Live Demo

[https://johnhaus.github.io/ui-showcase/#/]

---

# 🧠 Overview

UI Showcase is a SPA built with React and Vite.

It demonstrates:

- Async state management using reducers
- Infinite scrolling using IntersectionObserver
- Controlled search with query-based pagination reset
- Extracted business logic for improved testability
- Reusable component abstraction
- Light/Dark theme switching
- Accessibility-conscious UI implementation

The Posts Explorer feature fetches data from the JSONPlaceholder API and supports infinite scroll loading with loading, success, error, and retry states.

---

# 🛠 Tech Stack

## Core
- React 19
- Vite
- React Router
- Axios
- Styled Components

## Testing
- Vitest

## Tooling
- ESLint
- Prettier

---

# ✨ Features

## 🔁 Posts Explorer

- Infinite scrolling via IntersectionObserver (no scroll listeners)
- Controlled search with separated input and applied query state
- Reducer-based state transitions
- Explicit loading, error, and retry handling
- Accessible status messaging (`role="status"`, `aria-live`)

## ✅ Todo List

- Add, delete, and complete tasks
- Priority flagging with logical grouping
- Extracted pure utility functions (`todoUtils`)
- Unit and interaction tests using Vitest

## 🔐 Demo Authentication (Frontend Only)

- Account creation, login, update, and deletion flows
- UI state-driven authentication transitions
- Credentials stored in `localStorage` (intentionally insecure for demo)

> ⚠️ This authentication flow is intentionally frontend-only and not production-safe.  
> It exists to demonstrate UI state transitions and form validation patterns.

## 🎨 UI & Theming

- Light/Dark mode switching using theme tokens
- Styled-components for co-located styling
- Reusable Button, RoundButton, and Card components
- Focus-visible styles and semantic HTML

---

# 🏗 Architecture Decisions

## Reducer-Driven State (Posts Explorer)

`useReducer` was chosen over multiple `useState` hooks to:

- Centralize state transitions
- Make pagination and search resets explicit
- Prevent inconsistent async state combinations
- Improve maintainability as complexity grows

The reducer models explicit transitions for:

- Loading
- Success
- Error
- Pagination
- Query reset

This keeps data flow predictable and easier to extend.

---

## 🔎 Search State Modeling

Search state is intentionally separated into:

- `searchInput` — controlled input state  
- `activeQuery` — applied query used for fetching  

This prevents unnecessary API calls on every keystroke, ensures pagination resets cleanly when a new query is submitted, and keeps fetch logic deterministic.

---

## 🚨 Error Handling Strategy

The Posts Explorer models explicit error transitions in the reducer.

The application:

- Displays user-facing error messages
- Blocks additional fetches while in an error state
- Prevents duplicate requests while loading
- Provides a retry mechanism

This avoids invalid async state combinations and ensures predictable behavior.  
In a production environment, errors would integrate with monitoring or observability tooling.

---

## ♾ Infinite Scroll Implementation

The native `IntersectionObserver` API is used instead of scroll event listeners.

Benefits:

- Avoids manual scroll calculations
- Improves performance
- Simplifies cleanup
- Scales cleanly for long lists

A sentinel element at the bottom of the list triggers pagination when it enters the viewport.

---

## 🧩 Separation of Logic and UI

The Todo feature extracts business logic into standalone utility functions.

This:

- Keeps components declarative
- Improves unit testability
- Encourages predictable state transitions
- Reduces UI–logic coupling

---

## 🎨 Styling Strategy

Styled-components were selected to:

- Co-locate styles with components
- Leverage theme-based design tokens
- Support dynamic theming
- Maintain scalable styling patterns

---

# ♿ Accessibility Considerations

- Loading states use `aria-live` and `role="status"`
- Inputs include accessible labels
- Buttons are keyboard accessible
- Semantic HTML used for interactive elements
- Focus-visible styling implemented

Accessibility was treated as a first-class concern during development.

---

# 🧪 Testing

Testing is implemented with Vitest.

The Todo feature includes:

- Unit tests for utility logic
- Interaction tests for task creation, deletion, completion, and priority toggling
- Edge case validation (e.g., empty input handling)

### Planned Improvements

- Reducer unit tests for Posts Explorer
- Mocked API tests for async flows
- Integration tests for infinite scroll behavior
- Visual regression testing

---

# 🔮 Tradeoffs & Future Improvements

If evolving this into a production-ready application, I would:

- Extract API logic into a dedicated data layer
- Implement request cancellation with `AbortController`
- Persist Todo data beyond in-memory state
- Expand reducer and async test coverage
- Add API response validation
- Remove credentials stored in `localStorage` and configure secure login

---

🤖 AI-Assisted Development Workflow

This project was developed using an AI-assisted workflow, including the use of ChatGPT for:

- Brainstorming architectural tradeoffs
- Exploring alternative state modeling approaches
- Refactoring iterations
- Improving documentation clarity

All architectural decisions, implementation choices, and tradeoff evaluations were reviewed and validated manually.

# 📁 Project Structure

```
src/
 ├── components/        # Reusable UI components (e.g., Card)
 ├── hooks/             # Custom hooks (e.g., useBreakpoint)
 ├── pages/             # Feature modules (login, posts-explorer, todo)
 ├── preferences/       # User preference context & provider
 ├── shared/            # Shared UI primitives (buttons, navbar, etc.)
 ├── styles/            # Shared style utilities
 ├── theme/             # Theme configuration & design tokens
 ├── globalstyles.js    # Global styled-components styles
 ├── Home.js
 ├── Layout.js          # Layout wrapper
 ├── main.js            # Application entry point
 ├── Settings.jsx
 └── ThemedRouter.jsx   # Router abstraction with theme support
```

The project follows a hybrid structure combining:

- Feature-based grouping (`pages/`)
- Shared UI abstraction (`shared/`)
- App-level architecture (`preferences/`, `theme/`, `Layout`, routing)
- Reusable custom hooks (`hooks/`)

This organization keeps concerns separated while remaining scalable as features expand.

---

# 🚀 Getting Started

Clone the repository:

```bash
git clone https://github.com/johnhaus/ui-showcase.git
cd posts-explorer
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Run tests:

```bash
npm run test
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```
---

## Author

John Haus

This project was built as part of a focused effort to strengthen modern React development skills and demonstrate production-aware frontend architecture decisions suitable for real-world applications.
