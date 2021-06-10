import React, { useEffect, useState } from "react";
import { URL } from "./rutas";
import CardCompras from "components/Cards/CardCompras";

export const Compras = (props) => {
  const [compras, setCompras] = useState(
    []
  );

  useEffect(() => {
    //localStorage.setItem("Carrito",JSON.stringify([]))
    get_compras();
  }, []);

  const get_compras=()=>{
    fetch(URL.obtener_compras+"1", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        mode: "no-cors",
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
       <CardCompras color="light" color2="dark" lista={compras}></CardCompras> 
      </div>

    </>
  );
};

export default Compras;
