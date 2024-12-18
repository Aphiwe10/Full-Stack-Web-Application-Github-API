import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';

test('renders GitHub User Search header', () => {
  render(<App />);
  const headerElement = screen.getByText(/GitHub User Search/i);
  expect(headerElement).toBeInTheDocument();
});
