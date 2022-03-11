import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import { AuthProvider } from "./context/auth-context";
import i18n from "./i18nextConf";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);