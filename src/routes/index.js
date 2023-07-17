import React, { lazy } from 'react';
import { BrowserRouter, Routes, Rou, Navigate } from 'react-router-dom';
import Loadable from '../ui-component/Loadable';
import { useAuthContext } from '../hooks/useAuthContext';

// project imports
import PrivateRoute from './PrivateRoute';
import MinimalLayout from '../layout/MinimalLayout';
import NavMotion from '../layout/NavMotion';
import NavigationScroll from '../layout/NavigationScroll';
import MainLayout from '../layout/MainLayout';
import KYCdocument from '../views/pages/ekYC/KYCdocument';
import PublicRoute from './PublicRoute';
const RegisterLeadViaPhone = Loadable(lazy(() => import('../views/pages/leadRegister/RegisterLeadViaPhone')));
const LeadCreateForm = Loadable(lazy(() => import('../views/pages/createLead/LeadCreateForm')));
const AuthLogin = Loadable(lazy(() => import('../views/pages/login')));


// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('../views/dashboard/Default')));
//-----------------------|| ROUTING RENDER ||-----------------------//

const AllRoutes = () => {
    const {user} = useAuthContext();
    return (
        <BrowserRouter>
            <NavigationScroll>
                <Routes>
                    {/* Routes for authentication pages */}

                    <PrivateRoute
                        path="/"
                        element={user ?
                            <MinimalLayout>
                                <MainLayout>
                                    <DashboardDefault />
                                </MainLayout>
                            </MinimalLayout>
                            :
                            <Navigate to="/login" />
                        }
                    />
                    <PrivateRoute
                        path="/lead/verify-phonenumber"
                        element={user ?
                            <MinimalLayout>
                                <MainLayout>
                                    <RegisterLeadViaPhone />
                                </MainLayout>
                            </MinimalLayout>
                            :
                            <Navigate to="/login" />
                        }
                    />
                    <PrivateRoute
                        path="/lead/createlead"
                        element={
                            user ?
                                <MinimalLayout>
                                    <MainLayout>
                                        <LeadCreateForm user={user} />
                                    </MainLayout>
                                </MinimalLayout>
                                :
                                <Navigate to="/login" />
                        }
                    />
                    <PrivateRoute
                        path="/lead/kyc"
                        element={
                            user ?
                                <MinimalLayout>
                                    <MainLayout>
                                        <KYCdocument />
                                    </MainLayout>
                                </MinimalLayout>
                                :
                                <Navigate to="/login" />
                        }
                    />
                    <PublicRoute
                        path="/login"
                        element={
                            !user ?
                                <MinimalLayout>
                                    <NavMotion>
                                        <AuthLogin />
                                    </NavMotion>
                                </MinimalLayout>
                                :
                                <Navigate to="/" />
                        }
                    />
                </Routes>
            </NavigationScroll>
        </BrowserRouter>
    );
};

export default AllRoutes;
