import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./main.css";
import App from "./App";
import store from "./redux/store";
import "./i18n/config";

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
  );
}
