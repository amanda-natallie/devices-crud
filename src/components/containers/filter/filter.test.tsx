import { Helpers, render } from 'utils/test';

import Filter from './filter';

it('should render the Filter component', () => {
  render(<Filter />);
  Helpers.expectTestIdToBeInDocument('filter-wrapper');
});
