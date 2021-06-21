import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views

import Dashboard from "views/admin/Dashboard.js";
import Settings from "views/admin/Settings.js";
import SolicitudesRegistro from "views/admin/SolicitudesRegistro";
import EliminarUsuarios from "views/admin/EliminarUsuarios";
import Tienda from "views/carrito/Tienda";
import Carrito from "views/carrito/Carrito";
import Compras from "views/carrito/Compras";
import ClienteSidebar from "components/Sidebar/ClienteSidebar";

export default function Cliente() {
  return (
    <>
      <ClienteSidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        {/* <HeaderStats /> */}
        <div className="relative bg-amber-600 md:pt-32 pb-32 pt-12"></div>
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route path="/cliente/tienda" exact component={Tienda} />
            <Route path="/cliente/carrito" exact component={Carrito} />
            <Route path="/cliente/compras" exact component={Compras} />
            <Route path="/cliente/settings" exact component={Settings} />
            <Redirect from="/cliente" to="/cliente/tienda" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
