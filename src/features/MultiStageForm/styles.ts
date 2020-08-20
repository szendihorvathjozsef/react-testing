import { Theme, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(
  ({ spacing, palette }: Theme) => ({
    appbar: {},
  }),
  { name: "MultiStageForm" }
);

const tabsStyles = makeStyles(
  ({ spacing, palette }: Theme) => ({
    root: {
      marginLeft: spacing(1),
    },
    indicator: {
      height: 3,
      borderTopLeftRadius: 3,
      borderTopRightRadius: 3,
      backgroundColor: palette.secondary.dark,
    },
  }),
  { name: "Tabs" }
);

const tabItemStyles = makeStyles(
  ({ breakpoints, spacing }: Theme) => ({
    root: {
      textTransform: "initial",
      margin: spacing(0, 2),
      minWidth: 0,
      [breakpoints.up("md")]: {
        minWidth: 0,
      },
    },
    wrapper: {
      fontWeight: "normal",
      letterSpacing: 0.5,
    },
  }),
  { name: "Tab" }
);

export { useStyles, tabItemStyles, tabsStyles };
