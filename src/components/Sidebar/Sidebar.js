import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import { useTranslation } from 'react-i18next';

import {
  Home as HomeIcon,
  ArrowBack as ArrowBackIcon,
  Person as PersonAddIcon,
  Settings as SettingsIcon,
  Backup as BackupIcon,
  Apps as AppsIcon,
  ListAlt as ListAltIcon
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";

// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";



function Sidebar({ location }) {
  var classes = useStyles();
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);
  const { t } = useTranslation()
  const structure = [
    { id: 0, label: t("Home"), link: "/app/dashboard", icon: <HomeIcon /> },
    {
      id: 1,
      label: t("Account"),
      link: "/app/users",
      icon: <PersonAddIcon />,
      children: [
        { label: t("Account-List"), link: "/app/users" },
        { label: t("Account-Add"), link: "/app/new-user" },
        { label: t("Account-Group"), link: "/app/roles" },
        { label: t("Account-Add-Group"), link: "/app/new-role" },
      ],
    },
    {
      id: 2,
      label: t("Services"),
      link: "/app/services",
      icon: <SettingsIcon />,
      children: [
        { label: t("Services-List"), link: "/app/services" },
        { label: t("Services-Add"), link: "/app/new-service" },
      ],
    },
    {
      id: 3,
      label: t("Constructions"),
      link: "/app/constructions",
      icon: <AppsIcon />,
      children: [
        { label: t("Constructions-List"), link: "/app/constructions" },
        { label: t("Constructions-Add"), link: "/app/new-construction" },
      ],
    },
    { id: 4, label: t("Report-Add"), link: "", icon: <ListAltIcon /> },
    { id: 5, label: t("System-config"), link: "", icon: <BackupIcon /> },
  ];
  useEffect(function () {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure.map(link => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
