import React, { useState, useEffect, useRef } from "react";
const { recuperarImpuestos } = require("../../services/editorial"); 
// components

export default function CardImpuestos() {
  const [loading, setLoading] = useState(false);
  const [pais, setPais] = useState(0)
  const [precio, setPrecio] = useState(0)
  const [total, setTotal] = useState(0)
  const [paises, setPaises] = useState([]);

  useEffect(() => {
    async function getImpuestos() {
      const rawReponse = await recuperarImpuestos();
      const respuesta = await rawReponse.json();

      if(rawReponse.status !== 200){
        return
      }
      console.log('respuesta', respuesta)
      setPaises(respuesta.data)
      setPais(respuesta.data[0].impuesto)
    }

    getImpuestos()
  }, []);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">
              Calculadora de Impuestos
            </h6>
            {/* <button
              className="bg-amber-500 text-white active:bg-amber-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
            >
              Calcular
            </button> */}
          </div>
        </div>

        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Datos de importación
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Precio del libro (Q)
                  </label>
                  <input
                    value={precio}
                    onChange={(event) => setPrecio(event.target.value)}                    
                    type="number"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    País de importación
                  </label>
                  <select
                    onChange={(event) => setPais(event.target.value)}
                    value={pais}
                    type="email"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  >
                    {paises.length > 0 &&
                      paises.map((pais_) => {
                        return <option key={pais_.pais} value={pais_.impuesto}>{pais_.pais}</option>;
                      })}
                  </select>
                </div>
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-amber-300" />
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Total
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Impuesto (%)
                  </label>
                  <input
                    value={pais}
                    type="number"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
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
                    Total (Q)
                  </label>
                  <input
                    value={pais !== 0 ? precio*(pais/100) : 0}
                    type="number"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
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
