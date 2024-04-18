import { Helpers, render } from 'utils/test';

import App from './App';

const { expectParagraphText } = Helpers;

it('should render the App component', () => {
  render(<App />);

  expectParagraphText('Devices');
});
