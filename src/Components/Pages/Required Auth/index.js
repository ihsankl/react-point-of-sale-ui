import React from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';

const RequiredAuth = ({children}) => {
  const AuthState = useSelector((state) => state.Authentication);
  const auth = AuthState.token;
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
