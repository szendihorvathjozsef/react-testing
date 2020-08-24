import * as React from "react";
import DateFnsUtils from "@date-io/date-fns";
import { Switch, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import RouterLink from "components/Router/Link";
import FormRoutes from "features/MultiStageForm";
import Autocomplete from "features/Autocomplete";
import supportedLocales, { SupportedLocales } from "supportedLocales";
import ElevationScroll from "components/ElevationScroll";
import InfiniteScroll from "features/InfinitieScroll";
import UserProfile from "features/InfinitieScroll/UserProfile";

const useStyles = makeStyles(
  ({ spacing }: Theme) => ({
    root: {
      paddingTop: 80,
    },
    paper: {
      padding: spacing(2),
    },
    link: {
      "&:not(:last-child)": {
        paddingRight: spacing(2),
      },
    },
  }),
  { name: "App" }
);

const App = () => {
  const classes = useStyles();
  const { i18n } = useTranslation();
  const language = i18n.language as SupportedLocales;

  return (
    <MuiPickersUtilsProvider
      locale={supportedLocales[language]}
      utils={DateFnsUtils}
    >
      <ElevationScroll>
        <AppBar position="fixed">
          <Toolbar>
            <Link
              color="secondary"
              component={RouterLink}
              to="/"
              className={classes.link}
            >
              Home
            </Link>
            <Link
              color="secondary"
              component={RouterLink}
              to="/form"
              className={classes.link}
            >
              Multi stage
            </Link>
            <Link
              color="secondary"
              component={RouterLink}
              to="/autocomplete"
              className={classes.link}
            >
              Autocomplete
            </Link>
            <Link
              color="secondary"
              component={RouterLink}
              to="/infinite-scroll"
              className={classes.link}
            >
              Infinite scroll
            </Link>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Container maxWidth="md" className={classes.root}>
        <Paper className={classes.paper}>
          <Switch>
            <Route exact path="/">
              WOW
            </Route>
            <Route path="/form" component={FormRoutes} />
            <Route path="/autocomplete" component={Autocomplete} />
            <Route path="/infinite-scroll/profile" component={UserProfile} />
            <Route exact path="/infinite-scroll" component={InfiniteScroll} />
          </Switch>
        </Paper>
      </Container>
    </MuiPickersUtilsProvider>
  );
};

export default App;
