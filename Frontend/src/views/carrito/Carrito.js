import React, { useEffect, useState } from "react";
import { URL } from "./rutas";

import CardStats from "../../components/Cards/CardStats";
import CardCarrito from "../../components/Cards/CardCarrito";

export const Carrito = (props) => {
  const [libros, setLibros] = useState(
    JSON.parse(localStorage.getItem("Carrito"))
  );

  
  const generarCompra = () => {
    var usu = JSON.parse(localStorage.getItem("current"));

    console.log(libros)

    /*fetch(URL.generar_pedido, {
      method: "POST",
      body: JSON.stringify({
        id_usuario: 1,
        pedido: libros,
      }),
      headers: {
        "Content-Type": "application/json",
        mode: "no-cors",
      },
    })
      .then(async function (response) {
        let respuesta = await response.json();
        console.log(respuesta);
        localStorage.setItem("Carrito",JSON.stringify([]))
        window.location.reload()
      })
      .catch((error) => console.log(error));*/
  };




  return (
    <>
      <div className="flex flex-wrap w-full mb-12 px-4">
        <CardCarrito color="light" lista={libros}></CardCarrito>
      </div>
      <button
        className="bg-orange-500 text-white active:bg-orange-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={()=>generarCompra()}
      >
        <i className="fab fa-cc-visa"></i> Confirmar Compra
      </button>
      
    </>
  );
};

export default Carrito;
