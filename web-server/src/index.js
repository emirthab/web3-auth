import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import style from "./styles/theme.css"

import { GlobalContextProvider } from './components/contexts/GlobalContext';
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GlobalContextProvider>
  </React.StrictMode>
);
