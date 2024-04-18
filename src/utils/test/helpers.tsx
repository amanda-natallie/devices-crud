import { expect } from 'vitest';

import { fireEvent, screen } from '@testing-library/react';

const expectText = (text: string) => {
  const expectedText = screen.getByText(text);
  expect(expectedText).toBeTruthy();
};

const expectTestIdToBeInDocument = (testId: string) => {
  const element = screen.queryByTestId(testId);
  expect(element).toBeInTheDocument();
};

const expectRoleToHaveClasses = (role: string, className: string[]) => {
  const element = screen.getByRole(role);
  className.forEach((c: string) => {
    expect(element).toHaveClass(c);
  });
};
const expectRoleToHaveAttrs = (role: string, attrs: string[]) => {
  const element = screen.getByRole(role);
  attrs.forEach((c: string) => {
    expect(element).toHaveAttribute(c);
  });
};

const clickOnButton = (buttonName: string | RegExp) => {
  const selectedButton = screen.getByRole('button', {
    name: new RegExp(buttonName, 'i'),
  });
  fireEvent.click(selectedButton);
};

export const Helpers = {
  expectText,
  expectRoleToHaveClasses,
  expectRoleToHaveAttrs,
  expectTestIdToBeInDocument,
  clickOnButton,
};
