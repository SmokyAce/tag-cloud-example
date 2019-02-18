/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';
import Spinner from '../components/Spinner';

describe('<Spinner />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Spinner />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders correctly', () => {
    const snapshot = TestRenderer.create(<Spinner />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});
