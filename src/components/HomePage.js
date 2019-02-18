import React from 'react';
import Header from './Header';
import TagCloud from './TagCloud';

const HomePage = props => {
  return (
    <React.Fragment>
      <Header>Tag Cloud</Header>
      <TagCloud {...props} />
    </React.Fragment>
  );
};

export default HomePage;
