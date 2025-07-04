import React from 'react';
import { Route, RouteProps, Navigate } from 'react-router-dom';

interface ProtectedRouteProps extends Omit<RouteProps, 'element' | 'children'> {
	children: React.ReactNode;
  isAuthenticated: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, isAuthenticated }) => {
	if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
