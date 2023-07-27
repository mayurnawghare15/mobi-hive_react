import React, { useState, useEffect } from 'react';
import { useNavigate, Route, Navigate } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

function PrivateRoute({ component: Component, ...rest }) {
    const navigate = useNavigate();
    const { logout } = useLogout();
    const { user } = useAuthContext();
    if (!user) {
        logout();
    }else{
       return navigate('/');
    }



    return <Route {...rest} element={<Component />} />;
}

export default PrivateRoute;
