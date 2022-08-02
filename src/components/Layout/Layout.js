import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import classnames from "classnames";
import { Box } from "@material-ui/core";

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Dashboard from "../../pages/dashboard";

import Users from "../../pages/management/users/data";
import NewUser from "../../pages/management/users/new";
import EditUser from "../../pages/management/users/edit";

import Roles from "../../pages/management/roles/data";
import NewRole from "../../pages/management/roles/new";

import Services from "../../pages/services/data";
import NewService from "../../pages/services/new";
import EditService from "../../pages/services/edit";

import Constructions from "../../pages/constructions/data";
import NewConstruction from "../../pages/constructions/new";
import EditConstruction from "../../pages/constructions/edit";
import DetailConstruction from "../../pages/constructions/detail";

import Status from "../../pages/status/data";
import NewStatus from "../../pages/status/new";

import Report from "../../pages/report/data";
import NewReport from "../../pages/report/new";
import ExportReport from "../../pages/report/export";
import PreviewReport from "../../pages/report/export/PreviewReport";

import { useTranslation } from "react-i18next";
// context
import { useLayoutState } from "../../context/LayoutContext";

function Layout(props) {
  const { t } = useTranslation();
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
      <>
        <Header history={props.history} />
        <Sidebar />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          <Switch>
            <Route path="/app/dashboard" component={Dashboard} />
            <Route path="/app/users" component={Users} />
            <Route path="/app/new-user" component={NewUser} />
            <Route path="/app/edit-user/:id" component={EditUser} />
            <Route path="/app/roles" component={Roles} />
            <Route path="/app/new-role" component={NewRole} />
            <Route path="/app/services" component={Services} />
            <Route path="/app/new-service" component={NewService} />
            <Route path="/app/edit-service/:id" component={EditService} />
            <Route path="/app/constructions" component={Constructions} />
            <Route path="/app/new-construction" component={NewConstruction} />
            <Route path="/app/edit-construction/:id" component={EditConstruction} />
            <Route path="/app/detail-construction/:id" component={DetailConstruction} />
            <Route path="/app/status" component={Status} />
            <Route path="/app/new-status" component={NewStatus} />
            <Route path="/app/report" component={Report} />
            <Route path="/app/new-report" component={NewReport} />
            <Route path="/app/export-report/:id" component={ExportReport} />
            <Route path="/app/preview-report/:id" component={PreviewReport} />
          </Switch>
          <Box
            mt={5}
            width={"100%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent="space-between"
          >
            <div>{t("Copyright")}</div>
          </Box>
        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);
