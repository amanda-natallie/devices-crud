import { expect } from 'vitest';

import { fireEvent, screen } from '@testing-library/react';

const expectParagraphText = (text: string) => {
  const paragraphText = screen.getByText(text);
  expect(paragraphText).toBeTruthy();
};

const clickOnButton = (buttonName: string | RegExp) => {
  const selectedButton = screen.getByRole('button', {
    name: new RegExp(buttonName, 'i'),
  });
  fireEvent.click(selectedButton);
};

export const Helpers = { expectParagraphText, clickOnButton };
