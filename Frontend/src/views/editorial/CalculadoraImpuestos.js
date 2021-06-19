import React from "react";

// components

import CardImpuestos from "components/Cards/CardImpuestos.js";

export default function CalculadoraImpuestos() {
  return (
    <>
      <div className="flex flex-wrap justify-center">
        <div className="w-full lg:w-8/12 px-4">
          <CardImpuestos />
        </div>
        {/* <div className="w-full lg:w-4/12 px-4">
          <CardProfile />
        </div> */}
      </div>
    </>
  );
}
