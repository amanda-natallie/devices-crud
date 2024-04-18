import { Helpers, render } from 'utils/test';

import App from './App';

it('should render the App component', () => {
  render(<App />);

  Helpers.expectTestIdToBeInDocument('app-wrapper');
});
