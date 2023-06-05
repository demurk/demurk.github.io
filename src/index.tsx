import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { useAppStore } from "redux/store";

import App from "./App";

import "styles/main.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={useAppStore}>
      <App />
    </Provider>
  </React.StrictMode>
);
