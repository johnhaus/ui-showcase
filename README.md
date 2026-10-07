# UI Showcase Single Page Application

This application serves both as a showcase of my development skills and as a space to experiment with new ideas and technologies. It has evolved over time as I’ve added new pages, refined existing features, and improved the underlying codebase, making it a useful representation of my current approach to software development.

The project is now in a solid state as a demo application, while still providing opportunities for further improvement. My current priority is migrating the project to TypeScript. I’m also considering several future additions, including data visualization for the budget dashboard, nested data such as comments for the posts explorer, and support for additional languages. There is also potential to introduce backend services as the project continues to evolve. 

---

## 🔗 Live Demo

[https://johnhaus.github.io/ui-showcase/#/]

---

# 🧠 Overview

UI Showcase is a Single Page Application built with React 19 and Vite.

It demonstrates:

- Async state management using reducers
- Infinite scrolling using IntersectionObserver
- Controlled search with query-based pagination reset
- Extracted business logic for improved testability
- Feature flag-driven UI
- Reusable component abstraction
- Light/Dark theme switching
- Accessibility-conscious UI implementation
- Form-driven data management
- Responsive dashboard layouts

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

## 🔁 Posts Explorer - Fetches data from an API and allows for a user to search within that data

- Infinite scrolling via IntersectionObserver (no scroll listeners)
- Controlled search with separated input and applied query state
- Reducer-based state transitions
- Explicit loading, error, and retry handling
- Accessible status messaging (`role="status"`, `aria-live`)

## 💰 Budget Dashboard - Provides a small financial tracking tool to manage income and expenses

- Feature flag-controlled dashboard
- Separate income and expense lists with derived totals for income, expenses, and remaining budget
- Modal-based entry form
- Extracted budget state and business logic through useBudget
- Centralized entry type constants

## ✅ Todo List - A todo list that allows users to create tasks and group by priority

- Add, delete, and complete tasks
- Priority flagging with logical grouping
- Extracted pure utility functions (`todoUtils`)
- Unit tests using Vitest

## 🔐 Demo Authentication (Frontend Only) - Shows a login flow with create, update, and delete accounts.

> ⚠️ This authentication flow is intentionally frontend-only and not production-safe.  
> It exists to demonstrate UI state transitions and form validation patterns.

- Account creation, login, update, and deletion flows
- UI state-driven authentication transitions
- Credentials stored in `localStorage` (intentionally insecure for demo)

## 🎨 UI & Theming

- Light/Dark mode switching using theme tokens
- Styled-components for co-located styling
- Reusable components, including Button, RoundButton, Card, Modal, and ToggleSwitch
- Focus-visible styles and semantic HTML
- Responsive layouts

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

## 💰 Domain Logic with useBudget
The Budget Dashboard keeps state and business logic separate from the main dashboard component through a dedicated useBudget hook.
The hook is responsible for managing:

- Income entries
- Expense entries
- Adding entries
- Updating entries
- Removing entries
- Derived totals
This keeps BudgetDashboard primarily responsible for composition and presentation rather than managing the underlying domain logic. The approach also makes the budget functionality easier to test independently and provides a clear boundary for future enhancements such as persistence or API integration.

---

## 🚩 Feature Flag Architecture
The Budget Dashboard uses a feature flag to control whether the feature is available. The feature flag abstraction keeps feature availability separate from the feature's implementation. It allows code for the feature to be pushed to production incrementally without affecting the user's experience.
This pattern provides a simple foundation for:

- Incremental feature releases
- Experimental features
- Feature previews
- Conditional UI
- Future integration with a remote feature-flag service
- For this project, the feature flag is intentionally frontend-only and lightweight.


## 🚨 Error Handling Strategy

The Posts Explorer models explicit error transitions in the reducer.

The application:

- Displays user-facing error messages
- Blocks additional fetches while in an error state
- Prevents duplicate requests while loading
- Provides a retry mechanism

This avoids invalid async state combinations and ensures predictable behavior.  

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

Feature-specific business logic is extracted from presentation components where appropriate. The Todo feature uses standalone utility functions for business logic, while the Budget Dashboard uses the useBudget hook to encapsulate domain state and operations.

This approach:

- Keeps components declarative
- Improves unit testability
- Encourages predictable state transitions
- Reduces UI–logic coupling
- Makes feature-specific behavior easier to evolve

## 🧱 Component Abstraction

The application uses reusable UI primitives across features, including:
- Buttons
- Round buttons
- Cards
- Modals
- Toggle switches
- Summary cards
- Entry lists
Feature components compose these primitives rather than duplicating common UI behavior.
This demonstrates a balance between reusable abstractions and feature-specific components.

---

## 🎨 Styling Strategy

Styled-components were selected to:

- Co-locate styles with components
- Leverage theme-based design tokens
- Support dynamic theming
- Maintain scalable styling patterns
- Keep feature-specific styles close to the components they belong to

Responsive layouts are implemented using media queries within the component styles.

---

# ♿ Accessibility Considerations

- Loading states use `aria-live` and `role="status"`
- Inputs include accessible labels
- Buttons are keyboard accessible
- Semantic HTML used for interactive elements
- Focus-visible styling implemented
- Modal interactions provide a dedicated UI context for forms
- Feature-toggle controls include accessible labels

Accessibility was treated as a first-class concern during development.

---

# 🧪 Testing

Testing is implemented with Vitest.

Testing features include:

- Unit tests for utility logic
- Browser tests for infinite scroll
- Edge case validation (e.g., empty input handling)

The application is structured to make additional feature-level testing straightforward.

# 🔮 Technical Debt & Future Improvements

Current priorities

- Migrate the app from JavaScript to TypeScript
- Add improvements or fixes as needed in order to accomodate Typescript migration

Future work

Some ideas for future feature work include
- Data visualization for the budget dashboard
- Adding nested comments for the posts in the posts explorer

Future improvements

Future improvements to existing code that I am considering
- Adding test cases where none currently exist
- Adding visual regression tests
- Adding backend services to make a more complete application
- Integrate application monitoring and observability

Known lower priority improvements

There is code that could be improved, but is lower priority. Some examples include
- Internationalization - The preferences model includes a language setting (en), but the application currently supports English only.
- Budget calculations - useBudget currently uses multiple filter and reduce operations to derive income, expenses, and totals. These could potentially be optimized, but they are fully functional for the current use case.
- SSR considerations: localStorage.js contain defensive checks that are not currently required. They may become relevent in the future.

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

 📁 Project Structure
src/
 ├── components/        # Reusable UI components (e.g., Card)
 ├── config/            # JSON data for feature flags
 ├── context/           # Shared application context and feature flags logic
 ├── hooks/             # Custom hooks (e.g., useBreakpoint)
 ├── pages/             # Feature modules
 │   ├── budget-dashboard/
 │   ├── login/
 │   ├── posts-explorer/
 │   ├── settings/
 │   └── todo/
 ├── preferences/       # User preference context & provider
 ├── shared/            # Shared UI primitives (buttons, modal, navbar, etc.)
 ├── styles/            # Shared style utilities
 ├── theme/             # Theme configuration & design tokens
 ├── utils/             # Utility functions (formatCurrency and localStorage)
 ├── globalstyles.js    # Global styled-components styles
 ├── Home.js
 ├── Layout.js          # Layout wrapper
 ├── main.js            # Application entry point
 └── ThemedRouter.jsx   # Router abstraction with theme support

```

The project follows a hybrid structure combining:

- Feature-based grouping (`pages/`)
- Shared UI abstraction (`shared/`)
- App-level architecture (`preferences/`, `theme/`, `Layout`, routing)
- Reusable custom hooks (`hooks/`)
- Domain-specific business logic within individual features

This organization keeps concerns separated while remaining scalable as features expand.

---

# 🚀 Getting Started

Clone the repository:

```bash
git clone https://github.com/johnhaus/ui-showcase.git
cd ui-showcase
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
