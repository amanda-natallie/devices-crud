import { Helpers, render } from 'utils/test';

import TopSection from './top-section';

beforeEach(() => {
  render(<TopSection />);
});

it('should render the TopSection component', () => {
  Helpers.expectTestIdToBeInDocument('top-section-wrapper');
});
it('should render the Devices title', () => {
  Helpers.expectText('Devices');
});
it('should render the Add Device button', () => {
  Helpers.expectText('Add Device');
});
it('should render the Add Device button with a plus icon', () => {
  Helpers.expectTestIdToBeInDocument('icon-svg-plus');
});
