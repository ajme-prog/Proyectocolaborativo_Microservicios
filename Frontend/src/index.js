import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";
import Editorial from "layouts/Editorial.js";
import EditorialESB from "layouts/EditorialESB.js";
// views without layouts

import Landing from "views/Landing.js";
import Profile from "views/Profile.js";
import Index from "views/Index.js";

import PrivateRoute from "components/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext";
import { EsbProvider } from "./contexts/EsbContext";

import Cliente from "layouts/Cliente";

ReactDOM.render(
  <CookiesProvider>
    <BrowserRouter>
      <AuthProvider>
      <EsbProvider>
        <Switch>
          {/* add routes with layouts */}
          <PrivateRoute path="/admin" component={Admin} />
          <PrivateRoute path="/editorial" component={Editorial} />
          <PrivateRoute path="/cliente" component={Cliente} />
          <PrivateRoute path="/editorial_esb" component={EditorialESB} />
          <Route path="/auth" component={Auth} />
          {/* add routes without layouts */}
          <Route path="/landing" exact component={Landing} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/" exact component={Index} />
          {/* add redirect for first page */}
          <Redirect from="*" to="/" />
        </Switch>
      </EsbProvider>
      </AuthProvider>
    </BrowserRouter>
  </CookiesProvider>,
  document.getElementById("root")
);
