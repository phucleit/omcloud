import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";

import Themes from "./themes";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { LayoutProvider } from "./context/LayoutContext";
import { UserProvider } from "./context/UserContext";
import './i18next'
ReactDOM.render(

  <LayoutProvider>
    <UserProvider>
      <ThemeProvider theme={Themes.default}>
        <Suspense fallback={(<div>Loading</div>)} >
          <CssBaseline />
          <App />
        </Suspense>
      </ThemeProvider>
    </UserProvider>
  </LayoutProvider>,

  document.getElementById("root"),
);

serviceWorker.unregister();
