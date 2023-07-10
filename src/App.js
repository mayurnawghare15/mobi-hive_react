import React from 'react';
import { useSelector } from 'react-redux';
import './app.css';

import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline, StyledEngineProvider } from '@material-ui/core';

import MobileVerification from './views/MobileNoVerify';

// routing
import Routes from './routes';

// defaultTheme
import theme from './themes';

// project imports
import NavigationScroll from './layout/NavigationScroll';

import './i18nextInit';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//-----------------------|| APP ||-----------------------//

const App = () => {
    const customization = useSelector((state) => state.customization);

    return (
        <>
            <ToastContainer
                transition={Slide}
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                limit={1}
            />
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme(customization)}>
                    <CssBaseline />
                    <NavigationScroll>
                        <Routes />
                    </NavigationScroll>
                </ThemeProvider>
            </StyledEngineProvider>
        </>
    );
};

export default App;
