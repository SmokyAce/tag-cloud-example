/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';
import TagPage from '../components/TagPage';
import Header from '../components/Header';

const mockProps = {
  match: {
    params: {
      tagId: '1751295897__Odessa'
    }
  }
};

describe('<TagPage />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TagPage {...mockProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  const testRenderer = TestRenderer.create(<TagPage {...mockProps} />);

  it('renders correctly', () => {
    const snapshot = testRenderer.toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  const testInstance = testRenderer.root;
  expect(testInstance.findByType(Header).props.children).toBe('Tag');
});
