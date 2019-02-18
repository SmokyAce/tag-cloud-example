import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';

const Header = ({ children, ...props }) => {
  return (
    <div className='header' {...props}>
      <h1>{children}</h1>
    </div>
  );
};

Header.propTypes = {
  children: PropTypes.any
};

export default Header;
