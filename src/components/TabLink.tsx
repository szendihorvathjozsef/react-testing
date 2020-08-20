import * as React from "react";
import Tab, { TabProps } from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { Link, LinkProps } from "react-router-dom";

type TabName = string;

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
  name: TabName;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, name, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`${name}-tabpanel-${index}`}
      aria-labelledby={`${name}-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any, name: TabName) {
  return {
    id: `${name}-tab-${index}`,
    "aria-controls": `${name}-tabpanel-${index}`,
  };
}

interface LinkTabProps extends Pick<LinkProps, "to">, TabProps<Link> {}

function LinkTab({ to, value, ...rest }: LinkTabProps) {
  const renderLink = React.useMemo(
    () =>
      React.forwardRef<any, Omit<LinkProps, "to">>((itemProps, ref) => (
        <Link to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return <Tab component={renderLink} value={value} {...rest} />;
}

export { a11yProps, LinkTab, TabPanel };
