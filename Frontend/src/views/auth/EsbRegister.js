import React, { useRef, useState } from "react";
import Swal from "sweetalert2";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
const { registrarUsuario } = require("../../services/autenticacion_esb");
const { setearESB } = require('../../services/esb')

export default function EsbRegister() {
  const history = useHistory();
  const esbRef = useRef();
  // Usuario tipo cliente
  const nombreRef = useRef();
  const apellidosRef = useRef();
  const telefonoRef = useRef();
  const correoRef = useRef();
  const pwdRef = useRef();
  

  //Swal
  const swalPersonalizado = Swal.mixin({
    customClass: {
      confirmButton:
        "bg-amber-500 text-white active:bg-amber-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear",
    },
    buttonsStyling: false,
  });

  // Usuario tipo editorial

  async function handleSubmit(event) {
    event.preventDefault();
    const esbSelect = esbRef.current.value;

    let usuario = {
      nombre: nombreRef.current.value,
      correo: correoRef.current.value,
      pwd: pwdRef.current.value,
      apellido: apellidosRef.current.value,
      telefono: telefonoRef.current.value,
    };

    const esbR = await setearESB(esbSelect)
    const rawResponse = await registrarUsuario(usuario, esbR);
    const respuesta = await rawResponse.json();

    if (rawResponse.status !== 200) {
      swalPersonalizado.fire({
        icon: "error",
        title: "Error",
        text: respuesta.message,
      });
      return;
    }

    swalPersonalizado.fire({
      icon: "success",
      title: "Registro",
      text: respuesta.message
    });

    localStorage.setItem("usuario", JSON.stringify(respuesta.usuario));
    history.push("/auth/esb/login");
  }



  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    BOOKSA
                  </h6>
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <small>
                    Crear una nueva cuenta de{" "}
                    <span className="text-amber-500">{"Cliente"}</span>
                  </small>
                  
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      ESB a conectar
                    </label>
                    <select ref={esbRef} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                      <option value="1">Grupo 1</option>
                      <option value="2">Grupo 2</option>
                      <option value="3">Grupo 3</option>
                      <option value="4">Grupo 4</option>
                    </select>
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Nombre
                    </label>
                    <input
                      ref={nombreRef}
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Nombre"
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Apellidos
                    </label>
                    <input
                      ref={apellidosRef}
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Apellidos"
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Telefono
                    </label>
                    <input
                      ref={telefonoRef}
                      type="number"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Telefono"
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Correo electrónico
                    </label>
                    <input
                      ref={correoRef}
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Correo electrónico"
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Contraseña
                    </label>
                    <input
                      ref={pwdRef}
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Contraseña"
                    />
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Crear cuenta
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-full text-center">
                <Link to="/auth/esb/login" className="text-blueGray-200">
                  <small>¿Ya tienes una cuenta? Iniciar sesión</small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
