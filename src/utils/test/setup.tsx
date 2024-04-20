import { ReactElement, ReactNode } from 'react';
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
  ui: ReactNode,
  {
    preloadedState = {
      devices: [],
      selectedDevice: null,
    },
    store = configureStore({
      reducer: rootReducer,
      preloadedState,
    }),
    ...renderOptions
  }: {
    preloadedState?: Record<string, unknown>;
    store?: ReturnType<typeof configureStore>;
  } = {},
) {
  function Wrapper({ children }: { children: ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export { customRender as render };
