import { render, screen } from 'utils/test';

import Icon from './icon';

describe('Icon', () => {
  it('renders correctly with chevronDown name', () => {
    render(<Icon name="chevronDown" color="black" height={24} width={24} />);
    const svgElement = screen.getByTestId('icon-svg-chevronDown');
    const svgElementPath = screen.getByTestId('icon-svg-path-chevronDown');
    expect(svgElementPath).toHaveAttribute('fill', 'black');
    expect(svgElement).toHaveAttribute('height', '24');
    expect(svgElement).toHaveAttribute('width', '24');
  });

  it('renders with 16px width and height by default', () => {
    render(<Icon name="chevronDown" />);
    const svgElement = screen.getByTestId('icon-svg-chevronDown');
    expect(svgElement).toHaveAttribute('height', '16');
    expect(svgElement).toHaveAttribute('width', '16');
  });
  it('renders with #6E6D7A fill color by default', () => {
    render(<Icon name="chevronDown" />);
    const svgElementPath = screen.getByTestId('icon-svg-path-chevronDown');
    expect(svgElementPath).toHaveAttribute('fill', '#6E6D7A');
  });
});
