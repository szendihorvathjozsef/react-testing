import * as React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  withStyles,
  Theme,
  createStyles,
  WithStyles,
} from "@material-ui/core/styles";

type Props = {
  open: boolean;
  onAbort?: () => void;
} & WithStyles<typeof styles>;

const styles = ({ zIndex }: Theme) =>
  createStyles({
    backdrop: {
      zIndex: 2000,
      color: "#fff",
    },
  });

const Loading = ({ classes, open, onAbort }: Props) => {
  const [state, setState] = React.useState(false);

  React.useEffect(() => {
    setState(open);
  }, [open]);

  function handleClose() {
    if (onAbort) {
      onAbort();
      setState(false);
    }
  }

  return (
    <Backdrop className={classes.backdrop} open={state} onClick={handleClose}>
      <CircularProgress color="inherit" size={48} />
    </Backdrop>
  );
};

export default withStyles(styles)(Loading);
