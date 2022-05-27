import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function PrivateRoute({  children }) {
  const auth = useSelector((state) => state.user);



  return (
    auth ? children : <Navigate to="/user/signin" />

  );
}

export default PrivateRoute;