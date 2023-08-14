import React from 'react';
import { Route, Navigate, useParams } from 'react-router-dom';

const PrivateRouteWithDynamicParam = ({ element: Element, user, ...rest }) => {
  const { mobile_Number } = useParams();

  return user ? <Element user={user} mobileNumber={mobile_Number} /> : <Navigate to="/login" />;
};

export default PrivateRouteWithDynamicParam;