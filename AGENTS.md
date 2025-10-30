# Contributor & Process Guidelines

## Overview
This document details project conventions for contributing to WeightyExile. Please review before making PRs or significant changes. For a high-level project description and setup, see [README.md](./README.md).

## Project Structure
- **App entry:** `src/main.tsx` mounts `src/App.tsx`
- **Components:** All UI in `src/components/`, each in own file, PascalCase
- **Services:** Domain logic, API/data adapters in `src/services/`
- **Shared helpers:** `src/utils/`
- **Global & modular styles:** `src/styles/`
- **Static datasets:** `public/data/` (updated by scheduled GitHub Action)

## Development Guidelines
- Use the provided npm scripts for dev/build/preview
- Adhere to 2-space indentation, single quotes, and semicolons
- Components, services, and major hooks: PascalCase; helpers: camelCase
- Prefer concise, functional React components with strict prop types
- Use interfaces for prop typing
- Keep code declarative and side-effect free in UI
- Do not edit `public/data/*.json` manually in PRs unless intentionally updating fixtures

## Commit & PR Process
- Keep commits atomic (<=72 characters; imperative)
- Reference issue IDs
- Summarize changes, especially UI/data-impacting PRs
- Include screenshots or output of visible changes
- Request review and wait for CI before merging

## Data Management
- Static JSON files in `public/data/` are updated by automation
- Avoid manual editing except for intentional fixture/testing changes
- Document workflow or script changes for future maintainers

## Further Reading
- Main [README.md](./README.md) for project intro, setup, and code structure
- [Vite](https://vitejs.dev/) and [React](https://react.dev/) official docs
