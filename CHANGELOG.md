# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Release] - 2024-05-05

Bug Fixes and Other Changes

### Added

- Added error handling for API calls using try/catch/finally.
- Added `lazy` and `memo` on key components to improve performance.
- Added Virtualized Devices List using [react-window](https://react-window.vercel.app/) and [Auto Sizer](https://www.npmjs.com/package/react-virtualized-auto-sizer) to improve performance on huge lists, since the backend does not provide pagination features.
- Added `width` and `height` to images and `aria-label` to buttons to improve Accessibility.
- Added several more E2E tests using [Playwright](https://playwright.dev/) to improve test coverage for edge cases.

### Changed

- Improved `search-input`'s debounce logic.
- Moved UI logic from API layer into component's custom hooks.
- Used a different mockoon configuration for Playwright tests, because testing with 1000 device entries was too slow.
- Improved `use-filters` logic to be more readable and maintainable, to avoid unnecessary re-renders and to improve performance.

### Fixed

- Added `isNotBlankSpaces` [zod](https://zod.dev/) validation to check if a string is not blank and not only spaces on Add/Edit Device Modal Form.
- Fixed form validation trigger on modal close
- Fixed `use-filters` custom hook to correctly update filters after a device is added, updated, or deleted.
