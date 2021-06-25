import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { URL } from "./rutas";
import CardComprasESB from "components/Cards/CardComprasESB";
const { useAuth } = require("../../contexts/AuthContext");

export const ComprasESB = (props) => {
  const [compras, setCompras] = useState(
    []
  );

  const [cookies, setCookie] = useCookies(["usuario"]);



  useEffect(() => {
    console.log("Que pedo",cookies.accessToken)
    get_compras();
  }, []);

  const get_compras=()=>{
    fetch(URL.obtener_compras+JSON.parse(localStorage.getItem("usuario")).usuario, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${cookies.accessToken}`,
      },
    })
      .then((res) => res)
      .then(async (response) => {
        let respuesta = await response.json();
        if (respuesta.status === 200) {
          let arr=respuesta.data;
          console.log(respuesta.data)
          setCompras(arr);
        } else {
          alert("Error al obtener las compras");
        }
      })
      .catch((error) => console.log(error));
  }

 

  return (
    <>
      <div className="flex flex-wrap w-full mb-12 px-4">
       <CardComprasESB color="light" color2="dark" lista={compras}></CardComprasESB> 
      </div>

    </>
  );
};

export default Compras;
