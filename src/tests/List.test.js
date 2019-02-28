/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';
import { List, ListItem } from '../components/List';

describe('<List />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <List>
        <ListItem content='Subheader' subheader />
        <ListItem content='Item 1' />
        <ListItem content='Item 2' />
      </List>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders correctly', () => {
    const snapshot = TestRenderer.create(
      <List>
        <ListItem content='Subheader' subheader />
        <ListItem content='Item 1' />
        <ListItem content='Item 2' />
      </List>
    ).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});
