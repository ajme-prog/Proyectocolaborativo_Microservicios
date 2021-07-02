import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { URL } from "./rutas";
import CardComprasESB from "components/Cards/CardComprasESB";
import { getESB } from "services/esb";
const { useEsb } = require("../../contexts/EsbContext");





export const ComprasESB = () => {
  const [compras, setCompras] = useState([]);

  const [cookies, setCookie] = useCookies(["usuario"]);


  useEffect(() => {
      get_compras();
  }, []);

  const get_compras = async () => {
    const esb =await getESB();
  console.log("IP ESB1: ",esb)
    fetch(`${esb}/orders/read`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${cookies.accessToken}`,
      },
    })
      .then(async (response) => {
        let respuesta = await response.json();
        console.log(respuesta)
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
