import { Helpers, render, waitFor } from 'utils/test';

import App from './App';

it('should render the App component', () => {
  render(<App />);

  waitFor(() => {
    Helpers.expectTestIdToBeInDocument('app-wrapper');
  });
});
