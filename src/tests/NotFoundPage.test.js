/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';
import HomePage from '../components/NotFoundPage';
import Header from '../components/Header';

describe('<HomePage />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<HomePage />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  const testRenderer = TestRenderer.create(<HomePage />);

  it('renders correctly', () => {
    const snapshot = testRenderer.toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  const testInstance = testRenderer.root;

  expect(testInstance.findByType(Header).props.children).toBe(
    '404: Page not found'
  );
});
