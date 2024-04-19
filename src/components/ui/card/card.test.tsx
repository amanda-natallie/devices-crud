import { render, screen } from 'utils/test';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';

describe('Card', () => {
  it('renders correctly', () => {
    render(<Card>Test</Card>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});

describe('CardContent', () => {
  it('renders correctly', () => {
    render(<CardContent>Test</CardContent>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});

describe('CardDescription', () => {
  it('renders correctly', () => {
    render(<CardDescription>Test</CardDescription>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});

describe('CardFooter', () => {
  it('renders correctly', () => {
    render(<CardFooter>Test</CardFooter>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});

describe('CardHeader', () => {
  it('renders correctly', () => {
    render(<CardHeader>Test</CardHeader>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});

describe('CardTitle', () => {
  it('renders correctly', () => {
    render(<CardTitle>Test</CardTitle>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
