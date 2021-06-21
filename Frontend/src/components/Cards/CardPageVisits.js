import React, { useEffect, useState } from "react";
import { CrearLibroSolicitud } from "services/Libros";
import { AceptarSolicitud } from "services/Libros";
import { getSolicitudesPendientes } from "services/Libros";
import Swal from "sweetalert2";

// components


export default function CardPageVisits() {

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    getSolicitudesPendientes()
      .then((res) => {
        res.json().then(({ data }) => {
          console.log(data);
          setRequests(data);
        });
      });
  }, []);

  const handleAceptar = (id,nombre,autor, fecha)=>{
    setLoading(true);
    AceptarSolicitud(id)
      .then(({status})=>{
        if(status!==200){
          Swal.fire('Error', 'No se pudo aprobar la solicitud.', 'error');
          setLoading(false);
        }else{
          CrearLibroSolicitud(usuarioActual.usuario,usuarioActual.nombre,nombre,autor,fecha)
          .then(({status})=>{
            if(status!==200){
              Swal.fire('Error','Se cambio el estado pero no se creó el libro','error');
              setLoading(false);
            }else{
              Swal.fire('Satisfactorio','La solicitud fue aceptada correctamente', 'success');
              setRequests((request)=>(request.filter(value=>value.id!==id)))
              setLoading(false);
            }
          });
        }
      });


  }

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
                Solicitudes pendientes
              </h3>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Accion
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Nombre
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Autor
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Fecha
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  PDF
                </th>
              </tr>
            </thead>
            <tbody>
              {
                requests.map(({ id, nombre, autor, fecha, pdf }) => (
                  <tr key={id}>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <button 
                        className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                        onClick={()=>{handleAceptar(id, nombre, autor, fecha)}}
                        disabled={loading}
                        
                      >
                        {loading ? "Aprobando..." : "Aprobar"}
                      </button>
                    </td>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                      {nombre}
                    </th >
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {autor}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {fecha}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {pdf}
                    </td>
                  </tr>
                ))
              }


            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
