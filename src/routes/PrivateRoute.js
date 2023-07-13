import { useState, useEffect } from 'react';
import { useNavigate, Route } from 'react-router-dom';

function PrivateRoute({ component: Component, ...rest }) {
  const navigate = useNavigate();


  const localStorageData = JSON.parse(JSON.stringify(localStorage.getItem("berry-account")));
  const isAuthenticated = localStorageData.token ? true : false

  if (!isAuthenticated) {
    // Redirect to the login page
        console.log(isAuthenticated,'-- Private Route')
    return navigate('/login');
  }

  return <Route {...rest} element={<Component />} />;
}

export default PrivateRoute;
