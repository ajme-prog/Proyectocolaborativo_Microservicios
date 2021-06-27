import React, { useState } from "react";
import { URL } from "./rutas";
import { useCookies } from "react-cookie";

import { createPopper } from "@popperjs/core";
import { useHistory } from "react-router-dom";

import CardCarritoESB from "../../components/Cards/CardCarritoESB";

import Swal from "sweetalert2";

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

  const [arreglo_pagos, setArregloPagos] = useState([
    "Tarjeta de Credito",
    "Tarjeta de Debito",
    "Efectivo",
    "Paypal",
  ]);

  const [arreglo_envios, setArregloEnvios] = useState([
    "Avión",
    "Carro",
    "Moto",
    "Taxi",
  ]);

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
    suma += arreglo.map((compra) => {
      return compra.cantidad;
    });
    return suma;
  };

  const generarCompra = () => {
    if (metodo_pago != "Metodo de Pago") {
      if (metodo_envio != "Metodo de Envío") {
        if (libros.length != 0) {
          fetch(URL.generar_pedido, {
            method: "POST",
            body: JSON.stringify({
              id_cliente: JSON.parse(localStorage.getItem("usuario")).usuario,
              //Cambiar arreglo
              books: JSON.parse(localStorage.getItem("Carrito")),
              total: calcular_total(),
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
              setMetodoPago("Metodo de Pago");
              setMetodoEnvio("Metodo de Envío");
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
          text: `Debe elegir un método de envío`,
        });
      }
    } else {
      Toast.fire({
        icon: "warning",
        text: `Debe seleccionar un método de pago`,
      });
    }
  };

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full sm:w-6/12 md:w-4/12 px-4">
          <div className="relative inline-flex align-middle w-full">
            <button
              className="text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 bg-emerald-500 active:bg-emerald-600 ease-linear transition-all duration-150"
              type="button"
              ref={btnDropdownRef}
              onClick={() => {
                dropdownPopoverShow
                  ? closeDropdownPopover()
                  : openDropdownPopover();
              }}
            >
              {metodo_pago}
            </button>
            <div
              ref={popoverDropdownRef}
              className={
                (dropdownPopoverShow ? "block " : "hidden ") +
                "bg-emerald-500 text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1 min-w-48"
              }
            >
              {arreglo_pagos.map((pago, index) => {
                return (
                  <>
                    <a
                      className="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-white"
                      onClick={(e) => cambiar_metodo_pago(pago)}
                      key={index}
                    >
                      {pago}
                    </a>
                  </>
                );
              })}
            </div>
          </div>
        </div>

        <div className="w-full sm:w-6/12 md:w-6/12 px-4">
          <div className="relative inline-flex align-middle w-full">
            <button
              className="text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 bg-red-500 active:bg-red-600 ease-linear transition-all duration-150"
              type="button"
              ref={btnDropdownRef_2}
              onClick={() => {
                dropdownPopoverShow_2
                  ? closeDropdownPopover_2()
                  : openDropdownPopover_2();
              }}
            >
              {metodo_envio}
            </button>
            <div
              ref={popoverDropdownRef_2}
              className={
                (dropdownPopoverShow_2 ? "block " : "hidden ") +
                "bg-red-500 text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1 min-w-48"
              }
            >
              {arreglo_envios.map((envio, index) => {
                return (
                  <>
                    <a
                      className="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-white"
                      onClick={(e) => cambiar_metodo_envio(envio)}
                      key={index}
                    >
                      {envio}
                    </a>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <br />

      <div className="flex flex-wrap w-full mb-12 px-4">
        <CardCarritoESB color="dark" lista={libros}></CardCarritoESB>
      </div>

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

export default Carrito;
