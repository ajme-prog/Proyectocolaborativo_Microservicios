import React, { useState } from "react";
import { URL } from "./rutas";
import { useCookies } from "react-cookie";

import { createPopper } from "@popperjs/core";
import { useHistory } from "react-router-dom";

import CardCarritoESB from "../../components/Cards/CardCarritoESB";

import Swal from "sweetalert2";
import { isExpressionWithTypeArguments } from "typescript";
const { useEsb } = require("../../contexts/EsbContext");

const { useAuth } = require("../../contexts/AuthContext");


export const CarritoESB = (props) => {
  const [libros, setLibros] = useState(
    JSON.parse(localStorage.getItem("Carrito"))
  );

  const [cookies, setCookie] = useCookies(["usuario"]);

  const history = useHistory();

  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();

  const [dropdownPopoverShow_2, setDropdownPopoverShow_2] = useState(false);
  const btnDropdownRef_2 = React.createRef();
  const popoverDropdownRef_2 = React.createRef();

  const [metodo_pago, setMetodoPago] = useState("Metodo de Pago");
  const [metodo_envio, setMetodoEnvio] = useState("Metodo de Envío");

  const [direccion, setDireccion] = useState("");


  const esb =useEsb();
  console.log("IP ESB: ",localStorage.getItem("esb"))


  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const openDropdownPopover_2 = () => {
    createPopper(btnDropdownRef_2.current, popoverDropdownRef_2.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow_2(true);
  };
  const closeDropdownPopover_2 = () => {
    setDropdownPopoverShow_2(false);
  };

  const cambiar_metodo_pago = (pago) => {
    setMetodoPago(pago);
    closeDropdownPopover();
  };

  const cambiar_metodo_envio = (envio) => {
    setMetodoEnvio(envio);
    closeDropdownPopover_2();
  };

  const calcular_total = () => {
    let arreglo = JSON.parse(localStorage.getItem("Carrito"));
    let suma = 0;
    arreglo.map((compra) => {
      console.log(compra);
      suma += parseInt(compra.subtotal);
    });
    return suma;
  };

  const generarCompra = () => {
    if (direccion != "") {
      if (libros.length != 0) {
        console.log(JSON.parse(localStorage.getItem("usuario")));
        //fetch(`${localStorage.getItem("esb")}/orders/buy`, {
          fetch(`${localStorage.getItem("esb")}/orders/buy`, {
          
        method: "POST",
          body: JSON.stringify({
            id_cliente: JSON.parse(localStorage.getItem("usuario")).id,
            books: JSON.parse(localStorage.getItem("Carrito")),
            total: calcular_total(),
            direccion:direccion
          }),
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${cookies.accessToken}`,
          },
        })
          .then(async function (response) {
            let respuesta = await response.json();
            console.log(respuesta);
            localStorage.setItem("Carrito", JSON.stringify([]));
            setDireccion("")
            history.push("/cliente_esb/compras");
          })
          .catch((error) => {
            Toast.fire({
              icon: "warning",
              text: `Error al registrar la compra`,
            });
          });
      } else {
        Toast.fire({
          icon: "warning",
          text: `No hay productos agregados al carrito`,
        });
      }
    } else {
      Toast.fire({
        icon: "warning",
        text: `Debe llenar la dirección`,
      });
    }
  };

  const onChangeDireccion = (e) => {
    setDireccion(e.target.value);
  };

  return (
    <>
      <div className="flex flex-wrap w-full mb-12 px-4">
        <CardCarritoESB color="dark" lista={libros}></CardCarritoESB>
      </div>

      <input
        type="text"
        className="border-0 px-1 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
        placeholder="Direccion"
        onChange={(e) => onChangeDireccion(e)}
      />
      <br />
      <br />

      <button
        className="bg-orange-500 text-white active:bg-orange-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => generarCompra()}
      >
        <i className="fab fa-cc-visa"></i> Confirmar Compra
      </button>
    </>
  );
};

export default CarritoESB;
