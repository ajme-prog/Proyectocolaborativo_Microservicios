import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { URL } from "./rutas";
import CardComprasESB from "components/Cards/CardComprasESB";
const { useEsb } = require("../../contexts/EsbContext");





export const ComprasESB = () => {
  const [compras, setCompras] = useState([]);

  const [cookies, setCookie] = useCookies(["usuario"]);
  const esb =useEsb();
  console.log("IP ESB: ",esb.esb)

  useEffect(() => {
      get_compras();
  }, []);

  const get_compras = () => {
    fetch(`${esb.esb}/orders/read`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${cookies.accessToken}`,
      },
    })
      .then(async (response) => {
        let respuesta = await response.json();

        let arr = [];
        for (let i = 0; i < respuesta.length; i++) {
          if (
            respuesta[i].id_cliente ==
            JSON.parse(localStorage.getItem("usuario")).id
          ) {
            arr.push(respuesta[i]);
          }
        }
        console.log(arr);
        setCompras(arr);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="flex flex-wrap w-full mb-12 px-4">
        <CardComprasESB
          color="light"
          color2="dark"
          lista={compras}
        ></CardComprasESB>
      </div>
    </>
  );
};

export default ComprasESB;
