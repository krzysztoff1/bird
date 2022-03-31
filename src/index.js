import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./context/auth-context";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import i18n from "./i18nextConf";
import LogRocket from "logrocket";
LogRocket.init("emuuk9/socialmediaclone");

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
serviceWorkerRegistration.unregister();
