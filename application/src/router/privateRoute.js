import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = (props) => {
  const auth = useSelector(state => state.auth);

  if (!auth.token) {
    return <Redirect to="/login" />
  }

  return <Route { ...props } />
}

export default PrivateRoute;
