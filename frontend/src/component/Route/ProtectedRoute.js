import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {

    const { isAuthenticated } = useSelector((state) => state.user);

    if (isAuthenticated === false) {
      return <Navigate to="/login" replace />;
    }
  
    return children ? children : <Outlet />;
};

export default ProtectedRoute;
