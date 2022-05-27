import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./styles.css";

import App from "./App";
import Appv2 from "./Appv2";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Appv2 />
    {/* <App /> */}
  </StrictMode>,
  rootElement
);
