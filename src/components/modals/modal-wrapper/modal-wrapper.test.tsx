import { vi } from 'vitest';

import { fireEvent, render } from '@testing-library/react';

import ModalWrapper from './modal-wrapper';

describe('ModalWrapper', () => {
  it('renders correctly and responds to button clicks', () => {
    const primaryOnClick = vi.fn();
    const secondaryOnClick = vi.fn();

    const { getByText } = render(
      <ModalWrapper
        title="Test Modal"
        actions={{
          primary: { onClick: primaryOnClick },
          secondary: { label: 'Confirm', onClick: secondaryOnClick },
        }}
      >
        <p>Modal content</p>
      </ModalWrapper>,
    );

    expect(getByText('Test Modal')).toBeInTheDocument();
    expect(getByText('Modal content')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
    expect(getByText('Confirm')).toBeInTheDocument();

    fireEvent.click(getByText('Cancel'));
    expect(primaryOnClick).toHaveBeenCalled();

    fireEvent.click(getByText('Confirm'));
    expect(secondaryOnClick).toHaveBeenCalled();
  });
});
