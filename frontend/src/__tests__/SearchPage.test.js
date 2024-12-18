import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import React from 'react';
import { MemoryRouter } from 'react-router-dom'; // Import for routing
import SearchPage from '../components/SearchPage';

// Mock the Axios library
jest.mock('axios');

test('renders search input and button', () => {
  render(
    <MemoryRouter>
      <SearchPage />
    </MemoryRouter>
  );

  // Check if the input field and search button are rendered
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
      <SearchPage />
    </MemoryRouter>
  );

  // Simulate user input and button click
  fireEvent.change(screen.getByPlaceholderText('Enter a username...'), {
    target: { value: 'octocat' },
  });
  fireEvent.click(screen.getByText('Search'));

  // Wait for the results to be displayed
  await waitFor(() => {
    expect(screen.getByText('octocat')).toBeInTheDocument();
  });

  // Check if the "View on GitHub" link has the correct URL
  await waitFor(() => {
    expect(screen.getByText('View on GitHub')).toHaveAttribute(
      'href',
      'https://github.com/octocat'
    );
  });
});

test('displays loading spinner when search is in progress', async () => {
  // Mock Axios request before rendering
  axios.get.mockResolvedValue({
    data: { items: [] },
  });

  render(
    <MemoryRouter>
      <SearchPage />
    </MemoryRouter>
  );

  // Simulate user input and button click
  fireEvent.change(screen.getByPlaceholderText('Enter a username...'), {
    target: { value: 'octocat' },
  });
  fireEvent.click(screen.getByText('Search'));

  // Check if the loading spinner is visible
  expect(screen.getByRole('status')).toBeInTheDocument(); // Assuming the spinner has a role of "status"

  // Ensure the spinner disappears once results are fetched
  await waitFor(() => {
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});

test('handles errors properly', async () => {
  // Mock Axios to simulate an error
  axios.get.mockRejectedValue(
    new Error('Something went wrong. Please try again.')
  ); // Ensure the error message matches the component's expectation

  render(
    <MemoryRouter>
      <SearchPage />
    </MemoryRouter>
  );

  // Simulate user input and button click
  fireEvent.change(screen.getByPlaceholderText('Enter a username...'), {
    target: { value: 'octocat' },
  });
  fireEvent.click(screen.getByText('Search'));

  // Wait for the error message to appear
  await waitFor(() => {
    expect(
      screen.getByText('Something went wrong. Please try again.')
    ).toBeInTheDocument();
  });
});
