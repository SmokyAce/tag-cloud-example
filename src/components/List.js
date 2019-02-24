import React from 'react';
import PropTypes from 'prop-types';

const List = ({ children, ...props }) => {
  return (
    <ul id='list' {...props}>
      {children}
    </ul>
  );
};

List.propTypes = {
  children: PropTypes.any.isRequired
};

export default List;
