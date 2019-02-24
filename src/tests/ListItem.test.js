/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';
import ListItem from '../components/ListItem';

const mockProps = {
  content: 'ListItem'
};

describe('<ListItem />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ListItem {...mockProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders correctly', () => {
    const snapshot = TestRenderer.create(<ListItem {...mockProps} />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});
