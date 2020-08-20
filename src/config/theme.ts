import { red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#1e3d59",
      contrastText: "#fff",
    },
    secondary: {
      main: "#ff6e40",
      contrastText: "#000",
    },
  },
  overrides: {
    MuiTextField: {
      root: {
        "& .MuiFormLabel-asterisk.MuiInputLabel-asterisk": {
          color: red[500],
        },
      },
    },
  },
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
