import React from 'react';
import ReactDOM from 'react-dom';

// third party
import './i18nextConf';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// for Translation
import { I18nextProvider } from 'react-i18next';
import i18n from './i18nextInit';

// project imports
import { store, persister } from './store';
import * as serviceWorker from './serviceWorker';
import App from './App';
import config from './config';

// style + assets
import './assets/scss/style.scss';
import { AuthContextProvider } from './context/AuthContext';

//-----------------------|| REACT DOM RENDER  ||-----------------------//
//Toasts
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


ReactDOM.render(
    <>
        <ToastContainer
            transition={Slide}
            position="top-center"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            limit={1}
        />
        <AuthContextProvider>
            <I18nextProvider i18n={i18n}>

                <Provider store={store}>

                    <PersistGate loading={null} persistor={persister}>
                        <App />
                    </PersistGate>

                </Provider>

            </I18nextProvider>
        </AuthContextProvider>
    </>
    ,

    document.getElementById('root')

);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
