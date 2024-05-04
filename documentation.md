# Project Sources

- [Github Repository](https://github.com/amanda-natallie/devices-crud)
- [Live Demo](https://devices-manager.vallorisolutions.com/)
- [Documentation on Notion.so](https://vallori-solutions.notion.site/NinjaOne-Devices-Manager-Documentation-4d4e4a779c6a4064832f9672cfb31313)

## **Technology Choices for NinjaOne Devices Manager Project**

This section details the rationale behind the selection of various technologies for the NinjaOne Devices Manager project. Each choice is compared with alternative solutions to emphasize why the chosen technology is superior for this project's requirements.

### **React JS with React Hooks**

**Choice:** React JS with React Hooks for building a responsive and dynamic UI.
**Alternatives:** Angular, Vue.js
**Reasons for Choice:**

- **Component-based architecture** enables modular and reusable code, which is essential for a scalable application like the Devices Manager.
- **React Hooks** simplify state management and side effects in functional components, reducing complexity and increasing performance.
- Compared to Angular, React is lighter and more flexible, allowing for a more tailored approach to state management and third-party integrations.
- React’s ecosystem, including extensive libraries and tools, offers more options for development compared to Vue.js, making it ideal for this project's needs.

### **TypeScript**

**Choice:** TypeScript for static type-checking.
**Alternatives:** JavaScript, Flow
**Reasons for Choice:**

- **Enhanced code quality and readability** with static type-checking ensures that many bugs are caught at compile-time rather than at runtime.
- **Robust developer tools** and community support improve the development experience.
- TypeScript is more mature and widely adopted than Flow, providing better integration with React and other technologies used in this project.

### **PNPM**

**Choice:** PNPM for package management.
**Alternatives:** NPM, Yarn
**Reasons for Choice:**

- **Efficient storage** mechanism avoids redundancy by sharing packages between projects, which speeds up installations and saves disk space.
- **Strict linking strategy** ensures that dependencies declared in the package.json are actually present, avoiding phantom dependencies.
- PNPM’s performance and disk space efficiency are superior to NPM and Yarn, making it ideal for continuous integration/continuous deployment environments.

### **Vite with @vitejs/plugin-react-swc**

**Choice:** Vite as a build tool and SWC for transpiling.
**Alternatives:** Create React App, Webpack, Babel
**Reasons for Choice:**

- **Fast build times** with Vite, which uses esbuild and skips bundling during development, significantly speeds up the development process.
- **SWC as a transpiler** is faster than Babel, reducing build and recompile times.
- Compared to Webpack, Vite offers out-of-the-box features like hot module replacement and a development server, without extensive configuration.

### **Styling: Tailwind CSS and Shadcn-ui**

**Choice:** Tailwind CSS for utility-first CSS and Shadcn-ui for UI components.
**Alternatives:** Bootstrap, Material-UI, Styled Components, Emotion, CSS Modules, SCSS, Less, Stylus, PostCSS, CSS-in-JS, JSS, Chakra UI, Ant Design, Semantic UI, Bulma
**Reasons for Choice:**

- **Tailwind CSS** allows for rapid UI development with low-level utility classes that can be composed to build any design directly in markup.
- **Shadcn-ui** provides a rich set of pre-designed components that are easy to integrate and customize with Tailwind CSS.
- **Tailwind CSS** offers more flexibility and less overhead compared to Bootstrap, and Shadcn-ui is lighter compared to Material-UI while still being highly customizable.
  Both technologies combined provide a balance between utility-first CSS and pre-designed components for efficient and consistent styling.

### **State Management & API REST: Redux Toolkit with RTK Query**

**Choice:** Redux Toolkit for state management and RTK Query for data fetching.
**Alternatives:** Context API, Apollo Client, MobX, SWR, Recoil, Zustand, Axios, Fetch API
**Reasons for Choice:**

- **Redux Toolkit** simplifies Redux code and reduces boilerplate, which is beneficial for maintaining large-scale applications.
- **RTK Query** efficiently handles caching, background updates, and data fetching, reducing the need for manual setup of these features.
- Compared to Context API, Redux provides more powerful tools for debugging and state management in complex applications. RTK Query offers a more straightforward and integrated approach compared to Apollo Client when not using GraphQL.
- Redux Toolkit and RTK Query are well-suited for the project's requirements, providing a robust and scalable solution for state management and API interactions.
- **Axios** is a popular choice for making HTTP requests, but RTK Query offers a more integrated solution with Redux Toolkit, reducing the need for additional libraries.
- **SWR** is another alternative for data fetching, but RTK Query provides more features and tighter integration with Redux Toolkit.
- **Recoil** and **Zustand** are newer state management libraries that offer different approaches to managing state, but Redux Toolkit is more established and widely used, making it a safer choice for this project.

### **Testing: Vitest and Playwright**

**Choice:** Vitest for unit testing and Playwright for end-to-end testing.
**Alternatives:** Jest, Selenium
**Reasons for Choice:**

- **Vitest** is optimized for Vite and provides faster test execution compared to Jest. It also offers a simpler configuration and integration with Vite. Using Vitest ensures that the testing setup aligns with the project's build tool, improving efficiency and maintainability. Additionally, using V8 as the test runner provides better performance, and allows coverage reports to be generated without additional configuration, an to generate coverage reports per file while in watch mode.
- **Playwright** offers robust browser automation capabilities that cover multiple browsers without configuration hassle, unlike Selenium and Cypress, which can be more cumbersome to set up and slower in execution. Playwright also provides:
  - Running tests in parallel, which can significantly reduce the time taken for end-to-end testing.
  - A Codegen feature that can generate test scripts by recording user interactions, which can speed up the test creation process.
  - It supports multiple browsers, including Chrome, Firefox, and WebKit, which is essential for cross-browser testing.
  - Integrates more seamlessly with CI/CD pipelines, especially in headless mode.

### **Linting & Formatting: ESLint, Prettier, Husky, and Commitlint**

**Choice:** ESLint for linting, Prettier for code formatting, Husky for pre-commit hooks, and Commitlint for linting commit messages.
**Alternatives:** StandardJS, Stylelint
**Reasons for Choice:**

- **ESLint and Prettier** provide comprehensive and customizable linting and formatting, which helps maintain code quality and consistency.
- **Husky and Commitlint** ensure that all commits meet predefined standards, which is crucial for collaborative projects, ensuring a clean and consistent commit history. This project uses conventional commits, which are enforced by Commitlint. The available hooks in Husky are:
  - pre-commit: used to run ESLint and Prettier on staged files before committing, ensuring that the codebase adheres to the defined standards, and preventing linting and formatting issues from being committed.
  - commit-msg: used to lint commit messages, ensuring that they follow the conventional commit format.
  - pre-push: used to run vitest coverage and Playwright e2e tests before pushing changes to the remote repository, ensuring that the codebase is in a stable state.

These technology choices align with the project’s goals of efficiency, scalability, and maintainability, providing a solid foundation for the development and future expansion of the NinjaOne Devices Manager.

## **Project Structure**

The project structure for the NinjaOne Devices Manager is designed to be modular, scalable, and maintainable. The structure follows best practices for React applications, ensuring that components, styles, and logic are organized effectively. Below is an overview of the project structure:

### **Folder Structure**

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

### **File Naming Conventions**

- **Components:** kebab-case (e.g., `device-type-select.tsx`)
- **Custom Hooks:** kebab-case (e.g., `use-device-types.ts`)
- **Pages:** PascalCase (e.g., `Home.tsx`)
- **Redux Store:**
  - **API:** camelCase (e.g., `deviceApi.ts`)
  - **Slices:** camelCase (e.g., `deviceSlice.ts`)
- **Config Files:** camelCase (e.g., `deviceConfig.ts`)
- **Types:** camelCase, suffix with `.types.ts` (e.g., `device.types.ts`)
- **Utility Functions:** camelCase (e.g., `common.ts`)
- **End-to-End Tests:** PascalCase, suffix with `.spec.ts` (e.g., `App.spec.ts`)
- **Unit Tests:** kebab-case, suffix with `.test.[ts|tsx]` (e.g., `device-type-select.test.tsx`)
- **Github Actions:** kebab-case, suffix with `.yml` (e.g., `deploy.yml`)

### Project Features

The NinjaOne Devices Manager project includes the following features:

- **List Devices:** The application fetches a list of devices from the API and displays them in a table format. Each device row includes the device name, type, HDD capacity, and Edit and Delete options. If no filters are applied, the devices are sorted in ascending order by HDD capacity.

- **List Device Options:** The Edit option allows users to edit the details of a device, while the Delete option allows users to delete a device from the list.

- **Edit Device:** Users can edit the details of an existing device by updating the device name, type, or HDD capacity. When user opens the modal, the application fetches the device information by ID, based on the `selectedDevice` variable that is set when user clicks on `Edit`. Upon submission, the RTK Query invalidates the cache to fetch the updated list of devices.

- **Add Device:** Users can add a new device by providing the device name, type, and HDD capacity. Upon submission, the RTK Query invalidates the cache to fetch the updated list of devices, including the newly added device.

> Both forms (Add and Edit) are validated using the `react-hook-form` and `zod` libraries, which provides form validation and error handling. The form fields are required, and the HDD capacity field must be a positive number.
> Also the user cannot submit an empty form, the submit button prevents the user from submitting the form if the form is invalid, until all fields are filled correctly.

- **Delete Device:** Users can delete a device from the list by clicking the Delete option. A confirmation modal is displayed to confirm the deletion. Upon confirmation, the device is deleted from the list, and the RTK Query invalidates the cache to fetch the updated list of devices.

- **Filter Devices:** Users can filter devices by several criteria, including device type, HDD capacity, and sorting order. The default filter is sorting ascending by HDD capacity. Users can combine multiple filters to refine the list of devices. The filters are applied dynamically as the user selects different options.
  - **Search Filter:** Users can search for devices by name using a search input field. The search filter updates the list of devices in real-time as the user types in the search input. It is case-insensitive and matches the device name partially. Also the search input is debounced to avoid unnecessary lyfecicle updates.
  - **Device Type Filter:** Users can filter devices by type using a dropdown select component. The dropdown contain checkboxes for each device type, allowing users to select multiple types.
  - **Sort Filter:** Users can sort the list of devices in ascending or descending order by HDD capacity or System Name using a dropdown select component.
  - **Reset Filter:** Users can reset all filters to their default values by clicking the Reset Filters button. This action clears all selected filters and resets the list of devices to its original state. Also sorts the devices by HDD capacity in ascending order.

### **API REST**

The API REST is implemented using RTK Query, which provides a powerful and efficient way to interact with APIs. The API includes the following endpoints:

- **`/devices`**
  - **GET:** Fetches a list of devices from the API.
  - **POST:** Adds a new device to the list.
- **`/devices/{id}`**
  - **GET:** Fetches a device by ID.
  - **PUT:** Updates a device by ID.
  - **DELETE:** Deletes a device by ID.

The API endpoints are defined in the `deviceApi.ts` file, and the corresponding Redux slices are defined in the `deviceSlice.ts` file. The API endpoints are used to fetch, add, update, and delete devices from the list.

### **State Management**

The state management is handled using Redux Toolkit, which provides a powerful and efficient way to manage application state. The Redux store includes the following slices:

- **`deviceSlice`**: Manages the list of devices and handles actions related to fetching, adding, updating, and deleting devices.
- **`modalSlice`**: Manages the state of the modal component, including opening and closing the modal and setting the modal type (Add/Edit or Delete).

The Redux store is configured in the `store.ts` file, which combines the device and modal slices into a single store. The store is then wrapped with the `Provider` component in the `main.tsx` file to make it available to the entire application.
It also provices devtools for debugging and monitoring the state changes on development environment.

### **Mocking the API with Mockoon**

The API is mocked using Mockoon, a free and open-source API mocking tool. The mock server is configured to respond to the following requests:

- **GET `/devices`**: Returns a list of mock devices.
- **GET `/devices/{id}`**: Returns a single mock device by ID.
- **POST `/devices`**: Adds a new mock device to the list.
- **PUT `/devices/{id}`**: Updates a mock device by ID.
- **DELETE `/devices/{id}`**: Deletes a mock device by ID.

The mock server is used for local development and testing, allowing developers to interact with the API endpoints without relying on the actual backend server. The mock server is started using the Mockoon desktop application, which provides a user-friendly interface for configuring and running mock servers.
The mock server is configured to run on `http://localhost:7000` to avoid conflicts with the React development server.
To run the mock server, developers can start the Mockoon application and import the provided `devices-manager-mockoon.json` configuration file. Or run the following command in the terminal:

```bash
pnpm dev:standalone:mockoon
```

### **End-to-End Testing with Playwright**

End-to-end tests are implemented using Playwright, a browser automation tool that allows for testing web applications in multiple browsers. Tests the basic functionality of the application, including adding, editing, and deleting devices, as well as filtering devices by type and HDD capacity. The tests interact with the application UI to simulate user actions and verify that the expected behavior is achieved.

The end-to-end tests are defined in the `e2e` folder and are run using the Playwright test runner. The tests are executed in headless mode to ensure that the application behaves as expected in a production environment. The tests cover critical user interactions and edge cases to ensure the application's reliability and robustness.

### **Unit Testing with Vitest**

Unit tests are implemented using Vitest, a test runner optimized for Vite applications. The unit tests cover individual custom hooks and util functions to ensure that they behave as expected. The tests are defined in the `src` folder and are run using the Vitest test runner. The tests are executed in watch mode to provide real-time feedback during development. The tests cover various scenarios and edge cases to validate the correctness of the application logic. It does not cover the UI components, as they are tested through end-to-end tests. Developers can run the unit tests using the following command:

```bash
pnpm test
```

and get the coverage report by running:

```bash
pnpm coverage
```

Developers cannot push new commits to the remote repository if the tests fail. using Husky pre-push hook, the tests are run before pushing changes to the remote repository, ensuring that the codebase is in a stable state. The coverage threshold is set to 80%, and the test runner will fail if the coverage falls below this threshold.
The Github Actions workflow for Vitest runs the unit tests and generates a coverage report. If the tests fail or the coverage is below the threshold, the workflow fails.

### **Linting and Formatting with ESLint and Prettier**

Linting and formatting are implemented using ESLint and Prettier to ensure consistent code style and quality. The ESLint configuration includes rules for enforcing best practices, code consistency, and potential errors.

The Prettier configuration ensures that the code is formatted according to the defined style guidelines. The linting and formatting rules are enforced using Husky pre-commit hooks, which run ESLint and Prettier on staged files before committing.

If any linting or formatting issues are detected, the commit is prevented, and the developer must address the issues before committing the changes.

The Github Actions workflow for linting runs ESLint and Prettier on the codebase. If any linting or formatting issues are detected, the workflow fails, and the developer must address the issues.

Currently there are no linting issues in the codebase, and the code is formatted correctly according to the defined rules. The linting and formatting rules are enforced to maintain code quality and consistency throughout the project.

### **Continuous Integration and Deployment with Github Actions**

The project includes Github Actions workflows for linting, testing, and deploying the application. The workflows are defined in the `.github/workflows` folder and are triggered automatically based on specific events. The workflows include the following:

- **`linter.yml`**: Runs ESLint and Prettier on the codebase to ensure consistent code style and quality. The workflow runs on every push to the main branch.

- **`playwright.yml`**: Runs end-to-end tests with Playwright to validate the application's functionality. The workflow runs on every push to the main branch.

- **`vitest.yml`**: Runs unit tests with Vitest and generates a coverage report. The workflow runs on every push to the main branch.

- **`deploy.yml`**: Deploys the application to Amplify after the linting and testing workflows pass. The deployment workflow runs on every push to the main branch.

The Github Actions workflows ensure that the codebase is clean, the tests pass, and the application is deployed successfully. The workflows provide automated checks and feedback to maintain code quality and reliability throughout the development process.

### **VSCode Settings**

The project includes VSCode settings to enforce Prettier and ESLint on the codebase. The settings are defined in the `.vscode/settings.json` file and include the following configurations:

- **`"editor.formatOnSave": true`**: Automatically formats the code using Prettier when saving a file.
- **`"editor.codeActionsOnSave": { "source.fixAll.eslint": true }`**: Automatically fixes ESLint issues when saving a file.
- **`"editor.codeActionsOnSave": { "source.organizeImports": true }`**: Automatically organizes imports when saving a file.

These settings ensure that the code is formatted and linted correctly in the VSCode editor, providing real-time feedback to developers as they write code. The settings help maintain code quality and consistency throughout the development process.

### Sources

- [React JS](https://reactjs.org/) with [React Hooks](https://reactjs.org/docs/hooks-intro.html)
- [TypeScript](https://www.typescriptlang.org/) for better type checking
- [PNPM](https://pnpm.io/) for faster package management
- [Vite](hhttps://vitejs.dev/) for faster development
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) with [SWC](https://swc.rs/) for Fast Refresh

- [Shadcn-ui](https://ui.shadcn.com/) for the UI components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS

- [React Hook Form](https://react-hook-form.com/) for better form handling
- [ZOD](https://zod.dev/) for schema validation

- [Redux Toolkit](https://redux-toolkit.js.org/) for faster development
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) for API REST
- [Mockoon](https://mockoon.com/) for mocking API on development environment

- [Vitest](https://vitejs.dev/guide/features.html#testing) with [V8](https://v8.dev/) as provider for faster testing
- [Playwright](https://playwright.dev/) for end-to-end testing, browser automation and codegen

- [ESLint](https://eslint.org/) for linting
- [Prettier](https://prettier.io/) for formatting
- [Pretty-Quick](https://www.npmjs.com/package/pretty-quick) for running Prettier on staged files
- [Husky](https://typicode.github.io/husky/) for pre-commit hooks
- [Commitlint](https://commitlint.js.org/) for commit message linting

### **Conclusion**

The project structure, features, and technologies chosen for the NinjaOne Devices Manager provide a solid foundation for building a scalable, maintainable, and efficient application.

The project structure is organized to ensure modularity, scalability, and maintainability, while the features cover essential functionality for managing devices.

The technologies chosen, including React, TypeScript, PNPM, Vite, Tailwind CSS, Redux Toolkit, RTK Query, Vitest, Playwright, ESLint, Prettier, and Github Actions, provide a robust and efficient development environment.

The project is well-equipped for continuous integration, testing, and deployment, ensuring that the codebase is clean, reliable, and deployable.

The project structure and technologies align with best practices for React applications, providing a solid foundation for the development and future expansion of the NinjaOne Devices Manager.

Of couse, this is a small project and could be improved in many ways, but the main goal was to show the use of the technologies and the project structure. It could be created using less technologies, but the goal was to show the use of the most common ones in a real project and to show what I can do with them.

Thank you for the opportunity to participate in this challenge! I hope you like it! 😊

---

**Author:** [Amanda Natallie](https://www.linkedin.com/in/amanda-natallie/)

**Email:** [amanda@vallorisolutions.com](mailto:amanda@vallorisolutions.com)

**Date:** 2024-04-22

---
