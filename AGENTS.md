# AGENTS.md

This file defines custom agent commands for managing your Git workflow during the React workshop. These commands are intended for local development and do not involve remote repositories unless specified.

---

## Project Overview

This is a **React** application and a **monday.com app** built on top of monday's app framework.

### Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | UI framework (with TypeScript) |
| **Vite** | Build tool and dev server |
| **Tailwind CSS v4** | Utility-first CSS framework |
| **shadcn/ui** | Pre-built UI components |
| **React Router** | Client-side routing (HashRouter for iframe compatibility) |
| **Framer Motion** | Animations and transitions |
| **Zustand** | State management (with localStorage persistence) |
| **Lucide React** | Icon library |
| **monday-sdk-js** | monday.com API integration |
| **Sonner** | Toast notifications |

### UI Guidelines

- **All UI components** should be from **shadcn/ui**
- Add new components with: `npx shadcn@latest add <component>`
- **TLS Certificate Issues**: If installation fails due to self-signed certificate errors, use:
  ```bash
  NODE_TLS_REJECT_UNAUTHORIZED=0 npx shadcn@latest add <component>
  ```
- Use Tailwind CSS for custom styling
- Follow the existing component patterns

### Animations

- Use **Framer Motion** for all animations and transitions
- Import with: `import { motion } from 'framer-motion'`
- Wrap elements with `<motion.div>` (or other motion elements) to animate them
- Use `initial`, `animate`, and `transition` props for entrance animations
- Use `whileHover` and `whileTap` for interactive animations

### Routing

- Uses **React Router** with `HashRouter` (recommended for monday.com iframe embedding)
- Router is configured in `src/main.tsx`
- Define routes in `src/App.tsx` using `<Routes>` and `<Route>` components
- Use `useNavigate()` hook for programmatic navigation
- Use `<Link>` component for navigation links
- **When adding new views/pages**: Create the page component in `src/pages/` and add the route in `src/App.tsx`

### Code Quality Guidelines

Act like a **senior engineer** and follow these principles:

- **One component per file**: Each React component should live in its own dedicated file in `src/components/`
- **Separation of concerns**: Keep UI, logic, and data fetching separate (components, hooks, stores)
- **Clean code**: Write readable, self-documenting code with meaningful names
- **SOLID principles**: 
  - Single Responsibility: Each module/component should do one thing well
  - Open/Closed: Extend behavior through props/composition, not modification
  - Dependency Inversion: Depend on abstractions (hooks, stores) not concrete implementations
- **DRY (Don't Repeat Yourself)**: Extract reusable logic into hooks or utility functions
- **Keep files small**: If a file grows too large, refactor and extract components/hooks

---

## Project Structure

```
src/
├── components/
│   ├── ui/                    # shadcn/ui components (auto-generated)
│   │   ├── button.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   └── label.tsx
│   ├── FloatingSettingsButton.tsx  # Settings FAB button
│   ├── SettingsModal.tsx           # Settings configuration modal
│   ├── LoadingScreen.tsx           # Loading state component
│   ├── ErrorScreen.tsx             # Error state component
│   └── MondayLogo.tsx              # monday.com logo SVG
├── pages/
│   └── HomePage.tsx           # Home page (all route pages go here)
├── hooks/
│   └── useBoardsLoader.ts     # Hook to fetch monday.com boards on app load
├── stores/
│   ├── system-store.ts        # Zustand store with localStorage persistence
│   └── boards-store.ts        # Zustand store for monday.com boards data
├── lib/
│   └── utils.ts               # Utility functions (cn for classnames)
├── assets/                    # Static assets
├── App.tsx                    # Main application component (routing & layout)
├── App.css                    # App-specific styles
├── index.css                  # Global styles & Tailwind theme
└── main.tsx                   # Application entry point

settings-config.json           # Configuration schema for settings modal
components.json                # shadcn/ui configuration
```

### Key Files

- **`settings-config.json`**: Defines the fields shown in the settings modal. Add new configuration fields here.
- **`src/stores/system-store.ts`**: Zustand store with `persist` middleware. Config is auto-saved to localStorage.
- **`src/stores/boards-store.ts`**: Zustand store for fetched monday.com boards data.
- **`src/hooks/useBoardsLoader.ts`**: Hook that fetches boards on app load using monday-sdk-js.
- **`src/index.css`**: Contains Tailwind CSS theme variables (colors, radius, etc.)

---

## Commands

### 1. `save`
**Description:**  
Saves your current work by staging all changes and creating a local commit. This is useful to checkpoint your progress before making further changes.

**Action:**  
- Stages all changes in the repository
- Asks the user to provide a name for the checkpoint, which will be used as the commit message
- Creates a local commit with the provided message

**Git Equivalent:**
```bash
git add .
git commit -m "<checkpoint-name>"
```

**Usage Example:**
```
> save
Enter checkpoint name: Add new component
All changes staged and committed as "Add new component".
```

---

### 2. `reset`
**Description:**  
Discards all uncommitted changes and restores the working directory to the last committed state. This is useful if you want to start over from your last saved checkpoint.

**Action:**  
- Resets all tracked files to match the latest commit
- Removes all untracked files and directories
- Discards all local modifications

**Git Equivalent:**
```bash
git reset --hard
git clean -fd
```

**Usage Example:**
```
> reset
All changes discarded. Working directory restored to last commit.
```

---

### 3. `checkpoints`
**Description:**  
Displays a list of all commits as checkpoints. This is useful to view your progress and see what changes have been saved.

**Action:**  
- Shows all commits with their checkpoint names (commit messages) and dates

**Git Equivalent:**
```bash
git log --oneline
```

**Usage Example:**
```
> checkpoints
Checkpoints:
1. a1b2c3d - Add new component (2 hours ago)
2. e4f5g6h - Initial setup (yesterday)
```

---

### 4. `rollback [commit-hash]`
**Description:**  
Reverts the repository to a specific commit or the previous commit. This is helpful if a recent commit introduced unwanted changes.

**Action:**  
- If a commit hash is provided, resets to that specific commit
- If no commit hash is provided, resets to the previous commit (HEAD~1)
- All commits after the target commit will be removed

**Git Equivalent:**
```bash
# With commit hash:
git reset --hard <commit-hash>

# Without commit hash (previous commit):
git reset --hard HEAD~1
```

**Usage Examples:**
```
> rollback
Rolled back to previous commit.

> rollback a1b2c3d
Rolled back to checkpoint "Add new component" (a1b2c3d).
```

---

## Notes
- **Never commit without the user explicitly asking.** Always wait for user confirmation before running any git commit.
- These commands are **local only** and will not push changes to any remote repository.  
- Use `reset` carefully: all uncommitted changes will be permanently lost.  
- Use `rollback` carefully: it removes the most recent commit, along with its changes.  

---

## Recommended Workflow
1. Use `save` frequently to create checkpoints.  
2. Use `reset` if you want to discard recent experimental changes.  
3. Use `rollback` if a commit introduced mistakes and you need to revert.  

---

_End of AGENTS.md_

