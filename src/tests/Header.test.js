/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';
import Header from '../components/Header';

describe('<Header />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Header />, div);
    ReactDOM.render(<Header title='This is a Header'>Test</Header>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders correctly', () => {
    const snapshot = TestRenderer.create(<Header>Test</Header>).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});
