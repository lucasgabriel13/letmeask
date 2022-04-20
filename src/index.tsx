import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ButtonTheme } from "./components/ButtonTheme";

import "./services/firebase";

import "./styles/global.scss";

ReactDOM.render(
  <React.StrictMode>
    <App />
    <ButtonTheme />
  </React.StrictMode>,
  document.getElementById("root")
);
