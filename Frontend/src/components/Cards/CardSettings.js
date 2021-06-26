import React, { useState, useEffect } from "react";
const { useEsb } = require("../../contexts/EsbContext");
// components

export default function CardSettings() {
  const { esb } = useEsb();
  const [usuarioActual, setUsuarioActual] = useState()

  useEffect(() => {
    async function recuperarUsuario () {

      let usuario = localStorage.getItem("usuario")
      usuario = await JSON.parse(usuario)
      console.log(usuario)
      setUsuarioActual(usuario)
    }

    recuperarUsuario()
  }, [])

  function tipoUsuario(tipo){

    if(tipo === 0){
      return "Administrador"
    }

    if(tipo === 1){
      return "Editorial"
    }

    return "Cliente"

  }

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Mi cuenta</h6>
            <button
              className="bg-amber-500 text-white active:bg-amber-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
            >
              {usuarioActual ? tipoUsuario(usuarioActual.tipo) : "Cargando..."}
            </button>
          </div>
        </div>
        
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Datos personales
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Nombre
                  </label>
                  {
                     (usuarioActual) &&(usuarioActual.tipo===1) &&
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      value={usuarioActual ? `${usuarioActual.nombre}`  : "Cargando..."}
                      disabled
                    />
                    // <input
                    //   type="text"
                    //   className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    //   value={usuarioActual ? `${usuarioActual.nombre} ${usuarioActual.apellido}`  : "Cargando..."}
                    //   disabled
                    // />
                  }
                  {
                     (usuarioActual) &&(usuarioActual.tipo!==1) &&
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={usuarioActual ? `${usuarioActual.nombre} ${usuarioActual.apellido}`  : "Cargando..."}
                        disabled
                      />
                  }
                  
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Correo
                  </label>
                  <input
                    type="email"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    value={usuarioActual ? usuarioActual.correo : "Cargando..."}
                    disabled
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Telefono
                  </label>
                  {
                     (usuarioActual) &&(usuarioActual.tipo===1) &&
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      value=""
                      disabled
                    />
                  }
                  {
                     (usuarioActual) &&(usuarioActual.tipo!==1) &&
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={usuarioActual ? usuarioActual.telefono   : "Cargando..."}
                        disabled
                      />
                  }
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Rol
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    value={usuarioActual ? tipoUsuario(usuarioActual.tipo)  : "Cargando..."}
                    disabled
                  />
                </div>
              </div>
            
            </div>       
          
          </form>
        </div>
      </div>
    </>
  );
}
