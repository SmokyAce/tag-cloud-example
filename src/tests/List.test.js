/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';
import List from '../components/List';

describe('<List />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<List>List</List>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders correctly', () => {
    const snapshot = TestRenderer.create(<List>List</List>).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});
