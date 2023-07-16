import { useState, useEffect } from 'react';
import { useNavigate, Route } from 'react-router-dom';

function PublicRoute({ component: Component, ...rest }) {
    const navigate = useNavigate();
    alert('Public');

    // Check if user is authenticated, e.g., based on your authentication logic

    const localStorageData = JSON.parse(JSON.stringify(localStorage.getItem('berry-account')));
    const isAuthenticated = localStorageData.token ? true : false;

    console.log(isAuthenticated, '-- Public');

    if (!isAuthenticated) {
        // Redirect to the login page
        return navigate('/login');
    }

    return <Route {...rest} element={<Component />} />;
}

export default PublicRoute;
