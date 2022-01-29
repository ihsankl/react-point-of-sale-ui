/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'handsontable/dist/handsontable.full.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import storage from './Redux/Store';
import {registerAllModules} from 'handsontable/registry';
import {registerPlugin, ExportFile, BasePlugin} from 'handsontable/plugins';

// register Handsontable's modules
registerAllModules();
registerPlugin(ExportFile, BasePlugin);

const {Store, Persistor} = storage();

ReactDOM.render(
    <React.StrictMode>
      <Provider store={Store}>
        <PersistGate loading={null} persistor={Persistor}>
          <App />
        </PersistGate>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
