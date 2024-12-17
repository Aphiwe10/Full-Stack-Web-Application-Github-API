import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import React from 'react';
import { MemoryRouter } from 'react-router-dom'; // Add this import
import SearchPage from '../components/SearchPage';

// Mock the Axios library
jest.mock('axios');

test('renders search input and button', () => {
  render(
    <MemoryRouter>
      {' '}
      {/* Wrap with MemoryRouter */}
      <SearchPage />
    </MemoryRouter>
  );
  expect(
    screen.getByPlaceholderText('Enter a username...')
  ).toBeInTheDocument();
  expect(screen.getByText('Search')).toBeInTheDocument();
});

test('handles search and displays results', async () => {
  // Mock Axios response
  axios.get.mockResolvedValue({
    data: {
      items: [
        { id: 1, login: 'octocat', html_url: 'https://github.com/octocat' },
      ],
    },
  });

  render(
    <MemoryRouter>
      {' '}
      {/* Wrap with MemoryRouter */}
      <SearchPage />
    </MemoryRouter>
  );

  // Simulate user input and button click
  fireEvent.change(screen.getByPlaceholderText('Enter a username...'), {
    target: { value: 'octocat' },
  });
  fireEvent.click(screen.getByText('Search'));

  // Assert that the mocked result is displayed
  await waitFor(() => {
    expect(screen.getByText('octocat')).toBeInTheDocument();
  });
});
