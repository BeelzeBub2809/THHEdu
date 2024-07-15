import React from 'react';
import { Navigate } from 'react-router-dom';

const getUserRoles = () => JSON.parse(localStorage.getItem('userRoles')) || []

const PrivateRoute = ({ element: Component, allowedRoles, ...rest }) => {
  const userRoles = getUserRoles() // Retrieve user roles from local storage

  const hasAccess = allowedRoles.some(role => userRoles.includes(role));

  return hasAccess ? Component : <Navigate to="/no-access" replace />;
};

export default PrivateRoute;
