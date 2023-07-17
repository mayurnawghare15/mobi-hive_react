import { useState, useEffect } from 'react';
import { useNavigate, Route } from 'react-router-dom';

function PrivateRoute({ component: Component, ...rest }) {
    return <Route {...rest} element={<Component />} />;
}

export default PrivateRoute;
