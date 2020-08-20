import * as React from "react";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";

interface Props {
  children: React.ReactElement;
}

const ElevationScroll = ({ children }: Props) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
};

export default ElevationScroll;
