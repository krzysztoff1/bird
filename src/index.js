import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import { AuthContext } from "./context/auth-context";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);