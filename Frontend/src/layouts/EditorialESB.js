import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import AdminNavbar from "components/Navbars/AdminNavbar";
import EditorialSidebarEsb from "components/Sidebar/EditorialSidebarEsb";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views

import Dashboard from "views/editorial/Dashboard.js";
import Settings from "views/editorial/Settings.js";
//import Libros from "views/editorial/Libros.js"
import LibrosEsb from "views/editorial/EsbCrearlibro.js"
import VerLibros from "views/editorial/Verlibros.js"

export default function EditorialESB() {
  return (
    <>
      <EditorialSidebarEsb />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        {/* <HeaderStats /> */}
        <div className="relative bg-amber-600 md:pt-32 pb-32 pt-12"></div>
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
           
          
            <Route path="/editorial/esb/Crearlibro" exact component={LibrosEsb} />
            <Route path="/editorial/esb/Verlibro" exact component={VerLibros} />
           
        
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
