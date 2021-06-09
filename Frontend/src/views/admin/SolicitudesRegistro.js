import React from "react";

// components

import  CardSolicitudes from "components/Cards/CardSolicitudes.js";

export default function SolicitudesRegistro() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardSolicitudes />
        </div>
      </div>
    </>
  );
}
