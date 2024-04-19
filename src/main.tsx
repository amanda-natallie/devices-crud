import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from 'store';

import { Toaster } from 'components/ui/sonner';

import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={null}>
        <App />
        <Toaster />
      </Suspense>
    </Provider>
  </React.StrictMode>,
);
