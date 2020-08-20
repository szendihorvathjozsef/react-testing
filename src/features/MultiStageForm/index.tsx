import * as React from "react";
import { useSelector } from "react-redux";
import { RouteComponentProps, Switch, Route } from "react-router-dom";
import Tabs from "@material-ui/core/Tabs";
import AppBar from "@material-ui/core/AppBar";
import { LinkTab } from "components/TabLink";
import SecondStage from "./SecondStage";
import StageFinish from "./StageFinish";
import FirstStageForm from "./FirstStage";
import { isFormValidStage } from "./formUtils/form";
import { tabsStyles, tabItemStyles, useStyles } from "./styles";

type Props = RouteComponentProps;

const PATHS: { [key: string]: number } = {
  "/form": 0,
  "/form/second": 1,
  "/form/finish": 2,
};

const FormRoutes = ({ location, match }: Props) => {
  const classes = useStyles();
  const tabsClasses = tabsStyles();
  const tabClasses = tabItemStyles();
  const isFormValid = useSelector(isFormValidStage);

  return (
    <React.Fragment>
      <AppBar position="static" className={classes.appbar}>
        <Tabs
          value={PATHS[location.pathname]}
          aria-label="form stage tabs"
          classes={tabsClasses}
        >
          <LinkTab
            label="Első lépés"
            value={0}
            to="/form"
            classes={tabClasses}
          />
          <LinkTab
            label="Második lépés"
            value={1}
            to="/form/second"
            classes={tabClasses}
            disabled={isFormValid.first}
          />
          <LinkTab
            label="Végső lépés"
            value={2}
            to="/form/finish"
            classes={tabClasses}
            disabled={isFormValid.second}
          />
        </Tabs>
      </AppBar>
      <Switch>
        <Route exact path={match.path} component={FirstStageForm} />
        <Route exact path={match.path + "/second"} component={SecondStage} />
        <Route exact path={match.path + "/finish"} component={StageFinish} />
      </Switch>
    </React.Fragment>
  );
};

export default FormRoutes;
