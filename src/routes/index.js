import React, { lazy } from 'react';
import { BrowserRouter, Routes, Rou } from 'react-router-dom';
import Loadable from '../ui-component/Loadable';

// project imports
import PrivateRoute from './PrivateRoute';
import MinimalLayout from '../layout/MinimalLayout';
import NavMotion from '../layout/NavMotion';
import NavigationScroll from '../layout/NavigationScroll';
import MainLayout from '../layout/MainLayout';
import PublicRoute from './PublicRoute';
import KYCdocument from '../views/pages/ekYC/KYCdocument';
const RegisterLeadViaPhone = Loadable(lazy(() => import('../views/utilities/RegisterLeadViaPhone')));
const LeadCreateForm = Loadable(lazy(() => import('../views/pages/authentication/leadFormEss/LeadCreateForm')));
// const UtilsColor = Loadable(lazy(() => import('../views/utilities/Color')));
// const UtilsShadow = Loadable(lazy(() => import('../views/utilities/Shadow')));
// const UtilsMaterialIcons = Loadable(lazy(() => import('../views/utilities/MaterialIcons')));
// const UtilsTablerIcons = Loadable(lazy(() => import('../views/utilities/TablerIcons')));
const AuthLogin = Loadable(lazy(() => import('../views/pages/authentication/login')));

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('../views/dashboard/Default')));
//-----------------------|| ROUTING RENDER ||-----------------------//

const AllRoutes = () => {
    return (
        <BrowserRouter>
            <NavigationScroll>
                <Routes>
                    {/* Routes for authentication pages */}

                    <PrivateRoute
                        path="/"
                        element={
                            <MinimalLayout>
                                <MainLayout>
                                    <DashboardDefault />
                                </MainLayout>
                            </MinimalLayout>
                        }
                    />
                    <PrivateRoute
                        path="/lead/verify-phonenumber"
                        element={
                            <MainLayout>
                                <RegisterLeadViaPhone />
                            </MainLayout>
                        }
                    />
                    <PrivateRoute
                        path="/lead/createlead"
                        element={
                            <MinimalLayout>
                                <MainLayout>
                                    <LeadCreateForm />
                                </MainLayout>
                            </MinimalLayout>
                        }
                    />
                    <PrivateRoute
                        path="/lead/kyc"
                        element={
                            <MinimalLayout>
                                <MainLayout>
                                    <KYCdocument />
                                </MainLayout>
                            </MinimalLayout>
                        }
                    />
                    <PublicRoute
                        path="/login"
                        element={
                            <MinimalLayout>
                                <NavMotion>
                                    <AuthLogin />
                                </NavMotion>
                            </MinimalLayout>
                        }
                    />
                </Routes>
            </NavigationScroll>
        </BrowserRouter>
    );
};

export default AllRoutes;
