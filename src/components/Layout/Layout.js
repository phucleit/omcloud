import React from "react";
import {
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";
import { Box } from '@material-ui/core'

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Dashboard from "../../pages/dashboard";
import Users from '../../pages/management/users';
import NewUser from '../../pages/management/newUser';
import EditUser from '../../pages/management/editUser';
import Roles from '../../pages/management/roles';
import NewRole from '../../pages/management/newRole';
import Services from "../../pages/services";
import NewService from "../../pages/newService";
import EditService from "../../pages/editService";
import Constructions from "../../pages/constructions";
import NewConstruction from "../../pages/newConstruction";
import EditConstruction from "../../pages/editConstruction";
import Status from "../../pages/status";
import NewStatus from "../../pages/newStatus";
import NewReport from "../../pages/report/newReport";
import TasksPage from '../../pages/report/task/data';
import NewTask from '../../pages/report/task/new';

import { useTranslation } from 'react-i18next';
// context
import { useLayoutState } from "../../context/LayoutContext";

function Layout(props) {
  const { t } = useTranslation()
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
            <Route path="/app/status" component={Status} />
            <Route path="/app/new-status" component={NewStatus} />
            <Route path="/app/new-report" component={NewReport} />
            <Route path="/app/task" component={TasksPage} />
            <Route path="/app/new-task" component={NewTask} />
          </Switch>
          <Box
            mt={5}
            width={"100%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent="space-between"
          >
            <div>
              {t('Copyright')}
            </div>
          </Box>
        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);
