import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "animate.css";

import App from "./App";
import { Provider } from "react-redux";
import store from "./stores/store";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContextProvider } from "./context/ToastContext";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Router>
      <ToastContextProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </ToastContextProvider>
    </Router>
  </StrictMode>
);
