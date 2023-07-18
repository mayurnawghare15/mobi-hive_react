import React from 'react';
import { useSelector } from 'react-redux';
import './app.css';

import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline, StyledEngineProvider } from '@material-ui/core';

// for Translation
import { I18nextProvider } from 'react-i18next';
import './i18nextInit';

// routing
import AllRoutes from './routes';


// defaultTheme
import theme from './themes';
import { ChoiceListProvider } from './context/ChoiceListContext';
import { BussinessSectorProvider } from './context/BussinessSectorContext';



//-----------------------|| APP ||-----------------------//

const App = () => {
    const customization = useSelector((state) => state.customization);

    return (
        <>
            <ChoiceListProvider>
                <BussinessSectorProvider>
                    <StyledEngineProvider injectFirst>
                        <ThemeProvider theme={theme(customization)}>
                            <CssBaseline />
                            <AllRoutes />
                        </ThemeProvider>
                    </StyledEngineProvider>
                </BussinessSectorProvider>
            </ChoiceListProvider>
        </>
    );
};

export default App;
