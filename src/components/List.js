import React from 'react';
import PropTypes from 'prop-types';
import './List.css';

export const List = ({ children, ...props }) => {
  return (
    <ul id='list' {...props}>
      {children}
    </ul>
  );
};

List.propTypes = {
  children: PropTypes.any.isRequired
};

const className = (isTrue, addClassName) => {
  return isTrue ? addClassName : ''
};

export const ListItem = ({ content, subheader = false, ...props }) => {
  return (
    <li id='list-item' className={className(subheader, 'subheader')} {...props}>
      {content}
    </li>
  );
};

ListItem.propTypes = {
  content: PropTypes.any.isRequired,
  subheader: PropTypes.bool
};
