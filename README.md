# Devices Manager - NinjaOne Challenge

This project is a challenge for the NinjaOne selection process. The goal is to create a simple device manager application using React and TypeScript.

## Features

- Responsive design
- List devices
- Add/Update/Delete devices
- Filter devices by multiple system names
- Sort devices by name, system name, ascending and descending
- Search devices by name
- Reset filters

## Requirements

- Node.js 18.x or later
- PNPM 8.x or later

## Getting Started

1. Clone the repository
2. Install the dependencies with `pnpm install`
3. Start the development server with `pnpm dev:standalone`. The application will be available at `http://localhost:5173`

> **Note:** This application supports mocked API using mockoon. You can import the `mockoon-crud.json` file to Mockoon to use the mocked API. the `pnpm dev:standalone` command starts the application on port `5173` and the mocked server on port `7000`. The REST url is `http://localhost:7000`.

 **Important**: The application uses the `REACT_APP_API_URL` environment variable to set the API URL. You can create a `.env` file in the root of the project with the following content to set the API URL:

```env
VITE_USER_REST_API_URL=http://localhost:7000
```

## Scripts

- `pnpm dev`: Start the development server without mocked API
- `pnpm dev:standalone`: Start the development server with mocked API
- `pnpm build`: Build the application
- `pnpm test`: Run the unit tests with Vitest and V8
- `pnpm test:watch`: Run the unit tests in watch mode
- `pnpm coverage`: Run the unit tests with coverage
- `pnpm test:e2e`: Run the end-to-end tests with Playwright
- `pnpm test:e2e-ui`: Run the end-to-end tests with Playwright in UI mode
- `pnpm lint`: Run the linter with ESLint
- `pnpm format`: Format the code with Prettier


> **Note**: the `pnpm dev` command needs to be run after the `pnpm dev:standalone:mockoon` command to start the development server with the mocked API. The easiest way to run both commands is to use `pnpm dev:standalone` to start the development server with the mocked API in concurrent mode.

## Technologies

### Architecture
- [React JS](https://reactjs.org/) with [React Hooks](https://reactjs.org/docs/hooks-intro.html) 
- [TypeScript](https://www.typescriptlang.org/) for better type checking
- [PNPM](https://pnpm.io/) for faster package management
- [Vite](hhttps://vitejs.dev/) for faster development
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) with [SWC](https://swc.rs/) for Fast Refresh

### Styling
- [Shadcn-ui](https://ui.shadcn.com/) for the UI components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS

### Forms
- [React Hook Form](https://react-hook-form.com/) for better form handling
- [ZOD](https://zod.dev/) for schema validation

### State Management & API REST
- [Redux Toolkit](https://redux-toolkit.js.org/) for faster development
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) for API REST
- [Mockoon](https://mockoon.com/) for mocking API on development environment

### Testing
- [Vitest](https://vitejs.dev/guide/features.html#testing) with [V8](https://v8.dev/) as provider for faster testing
- [Playwright](https://playwright.dev/) for end-to-end testing, browser automation and codegen

### Linting & Formatting
- [ESLint](https://eslint.org/) for linting
- [Prettier](https://prettier.io/) for formatting
- [Pretty-Quick](https://www.npmjs.com/package/pretty-quick) for running Prettier on staged files
- [Husky](https://typicode.github.io/husky/) for pre-commit hooks
- [Commitlint](https://commitlint.js.org/) for commit message linting


## Folder Structure

```bash
./
|-- .github
|   |-- workflows # Github Actions
|       |-- deploy.yml # Deploy to Amplify workflow. It runs after lint and test workflows pass
|       |-- linter.yml # Linter workflow with ESLint and Prettier
|       |-- playwright.yml # Playwright workflow for end-to-end tests
|       |-- vitest.yml # Vitest workflow for unit tests coverage with V8
|-- .vscode
|   |-- settings.json # VSCode settings to enforce Prettier and ESLint
|-- public # Static files
|-- src
|   |-- assets # Images
|   |-- components # Reusable components
|      |-- containers # Components that hold other components and/or uses Shadcn-ui components
|      |-- modals # Modal components
|      |-- ui # raw UI components like buttons, inputs, etc from Shadcn-ui
|   |-- config #constants for mapping select/dropdown options
|   |-- e2e # End-to-end tests with Playwright
|   |-- hooks # Custom hooks
|   |-- pages # Application pages
|   |-- store # Redux store
|      |-- api # API REST with RTK Query
|      |-- slices # Redux slices
|   |-- types # Custom types
|   |-- utils # Utility functions
```


