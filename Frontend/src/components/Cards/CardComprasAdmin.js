import React, { useState } from "react";
import { createPopper } from "@popperjs/core";
import Swal from "sweetalert2";
import { couldStartTrivia } from "typescript";
import {useHistory} from 'react-router-dom';

// components

export default function CardComprasAdmin(props) {
  const [detalle, setDetalle] = useState([]);

  const [showModal, setShowModal] = React.useState(false);

  const [showModal2, setShowModal2] = React.useState(false);

  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const [estado_drop, setEstado] = useState("Metodo de Pago");
  const [compra_estado, setCompra] = useState({});
  const history=useHistory();


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

  /*
1. Estado Inicial
2. Procesado
3. En Camino
4. Cancelado
5. Entregado
*/

  const [modificado, setModificado] = React.useState(false);

  const [arreglo_estados, setArregloEstados] = useState([
    "Estado Inicial",
    "Procesado",
    "En Camino",
    "Entregado",
  ]);

  const [arreglo_estados_drop, setArregloEstados_drop] = useState([]);

  const obtener_detalle = (compra) => {
    let detalle_tmp = JSON.parse(compra.detalle.S);
    console.log(detalle_tmp);
    setDetalle(detalle_tmp);
    setShowModal(true);
  };

  const obtener_estado = (compra) => {
    let est = arreglo_estados.filter((estado) => estado === compra.estado.S);
    let arr = arreglo_estados.filter((estado) => estado !== compra.estado.S);

    setCompra(compra)
    console.log(est);
    setEstado(est[0]);
    setArregloEstados_drop(arr);
    setModificado(false);
    setShowModal2(true);
  };

  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const cambiar_estado_drop = (pago) => {
    setEstado(pago);
    setModificado(true);
    console.log("Estado al modificar",modificado)

    closeDropdownPopover();
  };

  const cerrar=()=>{
    setShowModal2(false)
    closeDropdownPopover();
    setModificado(false);
  }

  const modificar_estado = () => {
    console.log(modificado)
    if (modificado) {
      fetch("http://localhost:9000/carrito/modificar_estado_compra", {
        method: "POST",
        body: JSON.stringify({
          id_compra: compra_estado.id.S,
          id_usuario: compra_estado.id_usuario.S,
          nuevo_estado: estado_drop,
        }),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
      })
        .then(async function (response) {
          history.push("/admin/")
          Toast.fire({
            icon: "success",
            text: `Estado actualizado correctamente`,
          });
        })
        .catch((error) => {
          console.log(error)
          Toast.fire({
            icon: "warning",
            text: `Error al actualizar el estado`,
          });
        });
    } else {
      Toast.fire({
        icon: "warning",
        text: `Debe cambiar el estado`,
      });
    }
  };

  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (props.color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (props.color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Fecha
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (props.color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Método de Pago
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (props.color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Método Envío
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (props.color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Estado
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (props.color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Detalle Compra
                </th>
              </tr>
            </thead>
            <tbody>
              {props.lista.map((compra, index) => {
                return (
                  <>
                    <tr>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                        <p>{compra.fecha.S}</p>
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <p> {compra.tipo_pago.S}</p>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <p> {compra.tipo_envio.S}</p>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <button
                          className="bg-yellow-500 text-white active:bg-yellow-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => obtener_estado(compra)}
                        >
                          Ver Estado
                        </button>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <button
                          className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => obtener_detalle(compra)}
                        >
                          Ver Detalle
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            onClick={() => setShowModal(false)}
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Detalle Compra</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}

                <div
                  className={
                    "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
                    (props.color2 === "light"
                      ? "bg-white"
                      : "bg-lightBlue-900 text-white")
                  }
                >
                  <div className="block w-full overflow-x-auto">
                    <table className="items-center w-full bg-transparent border-collapse">
                      <thead>
                        <tr>
                          <th
                            className={
                              "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                              (props.color2 === "light"
                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                            }
                          >
                            Producto
                          </th>
                          <th
                            className={
                              "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                              (props.color2 === "light"
                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                            }
                          >
                            Cantidad
                          </th>
                          <th
                            className={
                              "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                              (props.color2 === "light"
                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                            }
                          >
                            Precio Unitario
                          </th>
                          <th
                            className={
                              "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                              (props.color2 === "light"
                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                            }
                          >
                            Subtotal
                          </th>

                          <th
                            className={
                              "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                              (props.color2 === "light"
                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                            }
                          ></th>
                        </tr>
                      </thead>
                      <tbody>
                        {detalle.map((producto, index) => {
                          return (
                            <>
                              <tr>
                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                                  <img
                                    src={producto.imagen.S}
                                    className="h-12 w-12 bg-white rounded-full border"
                                    alt="..."
                                  ></img>{" "}
                                  <span
                                    className={
                                      "ml-3 font-bold " +
                                      +(props.color === "light"
                                        ? "text-blueGray-600"
                                        : "text-white")
                                    }
                                  >
                                    {producto.nombre.S}
                                  </span>
                                </th>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  {producto.cantidad.S}
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  {producto.precio.S}
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  <p>
                                    Q{" "}
                                    {producto.cantidad.S *
                                      parseInt(producto.precio.S)}
                                  </p>
                                </td>
                              </tr>
                            </>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      {showModal2 ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Estado Compra</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal2(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}

                <div className="w-full sm:w-12/12 md:w-12/12 px-4">
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
                      {estado_drop}
                    </button>
                    <div
                      ref={popoverDropdownRef}
                      className={
                        (dropdownPopoverShow ? "block " : "hidden ") +
                        "bg-emerald-500 text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1 min-w-48"
                      }
                    >
                      {arreglo_estados_drop.map((estado, index) => {
                        return (
                          <>
                            <a
                              className="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-white"
                              onClick={(e) => cambiar_estado_drop(estado)}
                              key={index}
                            >
                              {estado}
                            </a>
                          </>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="bg-green-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => modificar_estado()}
                  >
                    Modificar Estado
                  </button>
                  <button
                    className="text-orange-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal2(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
