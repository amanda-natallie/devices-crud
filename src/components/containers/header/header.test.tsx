import { Helpers, render } from 'utils/test';

import Header from './header';

beforeEach(() => {
  render(<Header />);
});

it('should render the Header component', () => {
  Helpers.expectTestIdToBeInDocument('header-wrapper');
});
it('should render the NinjaOne brand', () => {
  Helpers.expectTestIdToBeInDocument('ninja-one-brand');
});
