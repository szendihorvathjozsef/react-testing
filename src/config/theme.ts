import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  props: {
    MuiTextField: {
      variant: "filled",
      margin: "normal",
    },
    MuiButton: {
      variant: "contained",
      color: "primary",
    },
  },
});

export default theme;
