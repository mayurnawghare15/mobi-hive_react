import React, { useState, useEffect } from 'react';
import { useNavigate, Route } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

function PublicRoute({ component: Component, ...rest }) {
    const navigate = useNavigate();
    // Check if user is authenticated, e.g., based on your authentication logic
    const { logout } = useLogout();
    const { user } = useAuthContext();

    if (!user) {
        logout();
    } else {
        return navigate('/');
    }


    return <Route {...rest} element={<Component />} />;
}

export default PublicRoute;
