import i18n from "i18next";
import * as React from "react";
import { SnackbarProvider } from "notistack";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter as Router } from "react-router-dom";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { render, RenderOptions } from "@testing-library/react";
import theme from "../config/theme";
import { ThemeProvider } from "@material-ui/core";

i18n.use(initReactI18next).init({
  react: {
    useSuspense: false,
  },
});

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "queries">
) => {
  return render(ui, {
    wrapper: ({ children }) => (
      <React.StrictMode>
        <Router basename="/">
          <ThemeProvider theme={theme}>
            <I18nextProvider i18n={i18n}>
              <CssBaseline />
              <SnackbarProvider>{children}</SnackbarProvider>
            </I18nextProvider>
          </ThemeProvider>
        </Router>
      </React.StrictMode>
    ),
    ...options,
  });
};

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";

export { customRender as render };
