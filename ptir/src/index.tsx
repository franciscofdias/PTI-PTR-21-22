import React from 'react';
import ReactDOM from "react-dom/client";
import './index.css';
import App from './App.tsx';
import reportWebVitals from './reportWebVitals.ts';
import './i18nextConf.ts';
import { CookiesProvider } from "react-cookie";
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <App />
      <ToastContainer />
    </CookiesProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

