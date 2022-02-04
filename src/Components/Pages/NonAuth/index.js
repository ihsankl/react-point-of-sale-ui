import React from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';

const NonAuth = ({children}) => {
  const AuthState = useSelector((state) => state.Authentication);
  const auth = AuthState.isLoggedIn;
  const location = useLocation();

  if (auth) {
    return <Navigate to="/" state={{from: location}} replace />;
  }
  return children;
};

NonAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NonAuth;
