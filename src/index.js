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

//-----------------------|| REACT DOM RENDER  ||-----------------------//

ReactDOM.render(
    <I18nextProvider i18n={i18n}>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persister}>
                <BrowserRouter basename={config.basename}>
                    <App />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </I18nextProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
