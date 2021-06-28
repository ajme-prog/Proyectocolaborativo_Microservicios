import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { URL } from "./rutas";
import CardCompras from "components/Cards/CardCompras";
import CardComprasAdmin from "components/Cards/CardComprasAdmin";
const { useAuth } = require("../../contexts/AuthContext");

export const ComprasAdmin = (props) => {
  const [compras, setCompras] = useState(
    []
  );

  const [cookies, setCookie] = useCookies(["usuario"]);



  useEffect(() => {
    get_compras();
  }, []);

  const get_compras=()=>{
    fetch("http://localhost:9000/carrito/obtener_compras_admin", {
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
       <CardComprasAdmin color="light" color2="dark" lista={compras}></CardComprasAdmin> 
      </div>

    </>
  );
};

export default ComprasAdmin;
