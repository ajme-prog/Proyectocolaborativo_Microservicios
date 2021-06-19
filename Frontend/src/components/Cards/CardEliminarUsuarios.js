import React, { useState, useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2"
const { recuperarUsuarios, eliminarUsuario } = require("../../services/administrador");

export default function CardEliminarUsuarios() {
  const [loading, setLoading] = useState(false)
  const [cookies, setCookie] = useCookies(["usuario"]);
  const [usuarios, setUsuarios] = useState([]);

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  useEffect(() => {
    async function getUsuarios() {
      const rawResponse = await recuperarUsuarios(cookies.accessToken);
      const respuesta = await rawResponse.json();
      setUsuarios(respuesta.datos);
    }

    getUsuarios();
  }, []);

  async function handleEliminar(usuario){
    setLoading(true)
    const rawResponse = await eliminarUsuario(usuario, cookies.accessToken);
    const respuesta = await rawResponse.json();

    Toast.fire({
      icon: rawResponse.status !== 200 ? 'error' : 'success',
      title: respuesta.mensaje
    })

    if(rawResponse.status !== 200){
      setLoading(false)
      return
    }

    const nuevos_usuarios = usuarios.filter(usuarioArr => {
      return usuarioArr.usuario !== usuario
    })

    setUsuarios(nuevos_usuarios)
    setLoading(false)
  }

  function getRol(tipo) {
    if(tipo === 1) return "Editorial"
    return "Cliente"
  }

  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white"
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className={"font-semibold text-lg text-blueGray-700"}>
                Usuarios
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                  }
                >
                  Nombre
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                  }
                >
                  Correo
                </th>
                
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                  }
                >
                  Rol
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                  }
                >
                  Acción
                </th>
              </tr>
            </thead>
            <tbody>
              {usuarios.length === 0 && (
                <tr>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    Sin datos
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    Sin datos
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    Sin datos
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    Sin datos
                  </td>
                 
                </tr>
              )}
              {usuarios.map((usuario) => {
                return (
                  <tr key={usuario.usuario}>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {usuario.nombre}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {usuario.correo}
                    </td>

                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <span className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-${usuario.tipo === 1 ? "emerald" : "lightBlue"}-600 bg-${usuario.tipo === 1 ? "emerald" : "lightBlue"}-200 uppercase last:mr-0 mr-1`}>
                        {getRol(usuario.tipo)}
                      </span>
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <button
                        className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                        type="button"
                        disabled={loading}
                        onClick={() => handleEliminar(usuario.usuario)}>
                        {loading ? "Cargando..." : "Eliminar"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
