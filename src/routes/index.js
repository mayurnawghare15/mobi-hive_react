import React, { lazy } from 'react';
import { BrowserRouter, Routes, Navigate } from 'react-router-dom';
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
import EligibleDevices from '../views/pages/EligibleDevices';
import { BussinessSectorProvider } from '../context/BussinessSectorContext';
import { ChoiceListProvider } from '../context/ChoiceListContext';

const RegisterLeadViaPhone = Loadable(lazy(() => import('../views/pages/leadRegister/RegisterLeadViaPhone')));
const LeadCreateForm = Loadable(lazy(() => import('../views/pages/createLead/LeadCreateForm')));
const AuthLogin = Loadable(lazy(() => import('../views/pages/login')));
const Ordersummary = Loadable(lazy(() => import('../views/pages/orderSumary')));

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('../views/dashboard/Default')));
//-----------------------|| ROUTING RENDER ||-----------------------//

const AllRoutes = () => {
    const { user } = useAuthContext();
    return (
        <BrowserRouter>
            <NavigationScroll>
                <Routes>
                    {/* Routes for authentication pages */}
                    <PublicRoute
                        path="/login"
                        element={
                            !user ? (
                                <MinimalLayout>
                                    <NavMotion>
                                        <AuthLogin />
                                    </NavMotion>
                                </MinimalLayout>
                            ) : (
                                <Navigate to="/" />
                            )
                        }
                    />

                    <PrivateRoute
                        path="/"
                        element={
                            user ? (
                                <MinimalLayout>
                                    <MainLayout>
                                        <DashboardDefault />
                                    </MainLayout>
                                </MinimalLayout>
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <PrivateRoute
                        path="/lead/verify-phonenumber"
                        element={
                            user ? (
                                <MinimalLayout>
                                    <MainLayout>
                                        <RegisterLeadViaPhone />
                                    </MainLayout>
                                </MinimalLayout>
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <PrivateRoute
                        path="/lead/createlead/:mobile_Number"
                        element={
                            user ? (
                                <MinimalLayout>
                                    <MainLayout>
                                        <ChoiceListProvider>
                                            <BussinessSectorProvider>
                                                <LeadCreateForm user={user} />
                                            </BussinessSectorProvider>
                                        </ChoiceListProvider>
                                    </MainLayout>
                                </MinimalLayout>
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <PrivateRoute
                        path="/lead/kyc/:mobile_Number"
                        element={
                            user ? (
                                <MinimalLayout>
                                    <MainLayout>
                                        <KYCdocument />
                                    </MainLayout>
                                </MinimalLayout>
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <PrivateRoute
                        path="/eligibledevices/:mobile_Number"
                        element={
                            user ? (
                                <MinimalLayout>
                                    <MainLayout>
                                        <EligibleDevices />
                                    </MainLayout>
                                </MinimalLayout>
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <PrivateRoute
                        path="/ordersummary/:mobile_Number"
                        element={
                            user ? (
                                <MinimalLayout>
                                    <MainLayout>
                                        <Ordersummary />
                                    </MainLayout>
                                </MinimalLayout>
                            ) : (
                                <Navigate to="/eligibledevices/:mobile_Number" />
                            )
                        }
                    />
                </Routes>
            </NavigationScroll>
        </BrowserRouter>
    );
};

export default AllRoutes;
