import React from "react";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Swal from "sweetalert2";
import {
  getGeneros,
  Crearlibro,
  getLibros,
  ModificarLibro,
  DeleteLibro,
} from "../../services/Libros";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";



export default function CardProfile({id, nombre, apellido, correo, telefono}) {
  const history = useHistory();

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
  
  // components
  async function traducirfoto2(e){
  
    var id=e.target.id;
    console.log("EL ID DEL CONTACTO ES "+id)
  }
  
  //---eliminar contacto
  async function eliminaralbum(e){
    var id_contacto=e.target.id;
    console.log("EL ID DEL CONTACTO ES "+id_contacto)
    confirmAlert({
      title: 'Confirmar operacion',
      message: 'Estás seguro de eliminar el contacto?',
      buttons: [
        {
          label: 'Si',
          onClick: () =>  llamadacrear(id_contacto)
        },
        {
          label: 'No',
          
        }
      ]
    });
  
    }
  
  
    async function llamadacrear(idlibro){
      //----llamo a crear album
      console.log("SI ENTRE A LA FUNCION")
      const borrarcontacto= await DeleteLibro (
         idlibro
            
      );
      
       const respuestaalbum=await borrarcontacto.json();
      
        if (respuestaalbum.status == 200) {
        
          Toast.fire({
            icon: "success",
            title: "Contacto eliminado correctamente",
          });
           
        } else if (respuestaalbum.status == 401) {
          Toast.fire({
            icon: "warning",
            title: "Ocurrio un error",
          });
        } else {
          Toast.fire({
            icon: "error",
            title: "Hubo un error",
          });
        }
  }
  
  async function dirigir(e){
    history.push(`/admin/contactos/${e.target.id}`)
  }

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
        <div className="px-6">
         
          <div className="text-center mt-5">
            <h3 className="text-xl font-semibold leading-normal mb-2 text-gray-800 mb-2">
            {nombre} {apellido}
            </h3>
            <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold">
              <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>{" "}
              {correo}
            </div>
            
            <div className="mb-2 text-gray-700 ">
              <i className="fas fa-briefcase mr-2 text-lg text-gray-500"></i>
             {telefono}
            </div>
            
            <div className="mb-2 text-gray-700 ">
            <button id={id}
              className={`bg-green-500 text-white active:bg-green-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150`}
              type="button"
              onClick={dirigir}
              //onClick={handleGuardar}
              //disabled={loading}
            >
        MODIFICAR
        
     
            </button>

            <button
              className={`bg-red-500 text-white active:bg-green-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150`}
              type="button"
              id={id}
              onClick={eliminaralbum}
              //disabled={loading}
            >
        ELIMINAR
            </button>
            </div>

          </div>
     
        </div>

        
      </div>
    </>
  );
}
