import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views

import { TiendaESB } from "views/carrito_ESB/TiendaESB";
import { CarritoESB } from "views/carrito_ESB/CarritoESB";
import { ComprasESB } from "views/carrito_ESB/ComprasESB";
import ClienteSidebarESB from "components/Sidebar/ClienteSidebarESB";

export default function ClienteESB() {
  return (
    <>
      <ClienteSidebarESB />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        {/* <HeaderStats /> */}
        <div className="relative bg-amber-600 md:pt-32 pb-32 pt-12"></div>
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route path="/cliente_esb/tienda" exact component={TiendaESB} />
            <Route path="/cliente_esb/carrito" exact component={CarritoESB} />
            <Route path="/cliente_esb/compras" exact component={ComprasESB} />
            <Redirect from="/cliente_esb" to="/cliente_esb/tienda" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
