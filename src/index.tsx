import React from "react";
import ReactDOM from "react-dom";
import { SnackbarProvider } from "notistack";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import "./index.css";
import "./i18n";
import App from "./App";
import theme from "./config/theme";
import Loading from "components/Loading";
import store from "config/store";

ReactDOM.render(
  <React.StrictMode>
    <Router basename="/">
      <ThemeProvider theme={theme}>
        <ReduxProvider store={store}>
          <SnackbarProvider>
            <CssBaseline />
            <React.Suspense fallback={<Loading open />}>
              <App />
            </React.Suspense>
          </SnackbarProvider>
        </ReduxProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
