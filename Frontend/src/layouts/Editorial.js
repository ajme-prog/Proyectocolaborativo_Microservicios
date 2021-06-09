import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import AdminNavbar from "components/Navbars/AdminNavbar";
import EditorialSidebar from "components/Sidebar/EditorialSidebar";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views

import Dashboard from "views/editorial/Dashboard.js";
import Settings from "views/editorial/Settings.js";

export default function Editorial() {
  return (
    <>
      <EditorialSidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        {/* <HeaderStats /> */}
        <div className="relative bg-amber-600 md:pt-32 pb-32 pt-12"></div>
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route path="/editorial/dashboard" exact component={Dashboard} />
            <Route path="/editorial/perfil" exact component={Settings} />
            <Redirect from="/editorial" to="/editorial/dashboard" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
