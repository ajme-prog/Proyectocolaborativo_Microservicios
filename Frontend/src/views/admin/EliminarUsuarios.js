import React from "react";

// components

import  CardEliminarUsuarios from "components/Cards/CardEliminarUsuarios";

export default function EliminarUsuarios() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardEliminarUsuarios />
        </div>
      </div>
    </>
  );
}
