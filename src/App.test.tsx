import { Helpers, render } from 'utils/test';

import App from './App';

const { clickOnButton, expectParagraphText } = Helpers;

it('should render the App component', () => {
  render(<App />);

  expectParagraphText('Vite + React');
  expectParagraphText('count is 0');
  expectParagraphText('src/App.tsx');
  expectParagraphText('Click on the Vite and React logos to learn more');
});
it('should increment count when the button is clicked', () => {
  render(<App />);
  clickOnButton('count is 0');
  expectParagraphText('count is 1');
});
