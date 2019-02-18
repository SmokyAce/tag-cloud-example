import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import TagProperties from './TagProperties';

const TagPage = ({ match: { params } }) => {
  return (
    <React.Fragment>
      <Header>Tag</Header>
      <TagProperties tagId={params.tagId} />
    </React.Fragment>
  );
};

TagPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ tagId: PropTypes.string.isRequired }).isRequired
  }).isRequired
};

export default TagPage;
