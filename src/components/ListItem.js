import React from 'react';
import PropTypes from 'prop-types';
import './ListItem.css';

const ListItem = ({ content, ...props }) => {
  return (
    <li id='list-item' {...props}>
      {content}
    </li>
  );
};

ListItem.propTypes = {
  content: PropTypes.any.isRequired
};

export default ListItem;
