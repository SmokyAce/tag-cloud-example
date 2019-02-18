/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';
import TagCloud from '../components/TagCloud';

describe('<TagCloud />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TagCloud />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  const testRenderer = TestRenderer.create(<TagCloud />);

  it('renders correctly', () => {
    const snapshot = testRenderer.toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});
