/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';
import TagProperties from '../components/TagProperties';

const mockProps = {
  tagId: '1751295897__Odessa'
};

describe('<TagProperties />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TagProperties {...mockProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  const testRenderer = TestRenderer.create(<TagProperties {...mockProps} />);

  it('renders correctly', () => {
    const snapshot = testRenderer.toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});
