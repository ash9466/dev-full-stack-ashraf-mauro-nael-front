import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../auth/services/UserContext';

const PrivateRoute = ({ children }) => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/connexion" />;
  }
  return children;
};

export default PrivateRoute;
