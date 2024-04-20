import { ReactElement } from 'react';
import { Provider } from 'react-redux';

import { rootReducer } from 'store';
import { afterEach } from 'vitest';

import { configureStore } from '@reduxjs/toolkit';
import { cleanup, render } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

const customRender = (ui: ReactElement, options = {}) =>
  render(ui, {
    wrapper: ({ children }) => children,
    ...options,
  });

export * from '@testing-library/react';

export { default as userEvent } from '@testing-library/user-event';

export function renderWithProviders(
  ui,
  {
    preloadedState = {
      devices: [],
      selectedDevice: null,
    },
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      reducer: rootReducer,
      preloadedState,
    }),
    ...renderOptions
  } = {},
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export { customRender as render };
