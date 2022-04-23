import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.tsx';
import reportWebVitals from './reportWebVitals.ts';
import './i18nextConf.ts';
import { CookiesProvider } from "react-cookie";


ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <App />,
    </CookiesProvider>,
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

