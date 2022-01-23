import React, {useState} from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import PropTypes from 'prop-types';

const RequiredAuth = ({children}) => {
  const [auth] = useState(false);
  const location = useLocation();
  if (!auth) {
    return <Navigate to="/login" state={{from: location}} replace />;
  }
  return children;
};

RequiredAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RequiredAuth;
