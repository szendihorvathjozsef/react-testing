import React from "react";
import ReactDOM from "react-dom";
import { SnackbarProvider } from "notistack";
import { BrowserRouter as Router } from "react-router-dom";
import { CssBaseline, Container, ThemeProvider } from "@material-ui/core";
import "./index.css";
import "./i18n";
import App from "./App";
import theme from "./config/theme";

ReactDOM.render(
  <React.StrictMode>
    <Router basename="/">
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <CssBaseline />
          <Container maxWidth="md">
            <App />
          </Container>
        </SnackbarProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
