import React from 'react';
import renderer from 'react-test-renderer';
import UserDetails from '../components/UserDetails';

// Snapshot test for UserDetails component
test('matches snapshot', () => {
  const tree = renderer.create(<UserDetails />).toJSON();
  expect(tree).toMatchSnapshot();
});
