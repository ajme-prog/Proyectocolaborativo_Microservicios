import React, { useState } from "react";
import Swal from "sweetalert2";

// components

export default function CardProductoTiendaESB(props) {
  const [producto, setProducto] = useState(props.objeto);
  const [generos, setGeneros] = useState(props.objeto.generos);

  console.log(producto)

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

  const agregarCarrito = (i) => {
    var lista = JSON.parse(localStorage.getItem("Carrito"));
    console.log("Carrito",lista)
    let tmp_carrito = lista.filter(
      (producto_tmp) => producto_tmp.id_libro == producto.id_libro
    );

    if (tmp_carrito.length != 0) {
      Toast.fire({
        icon: "warning",
        text: `El producto ya está agregado al carrito`,
      });
      return;
    }

    var tmp = {
      ...producto,
      cantidad: { S: 1 },
      subtotal: { S: producto.precio },
    };

    lista.push(tmp);
    localStorage.setItem("Carrito", JSON.stringify(lista));
  };

  return (
    <>
      <div
        className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
        key={props.index}
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <button
                className="bg-yellow-500 text-white active:bg-blueGray-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => agregarCarrito(props.index)}
                id={"boton" + props.index}
              >
                Agregar a Carrito
              </button>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}

          <div>
            <div className="flex flex-wrap justify-center">
              <div className="w-full px-4 flex justify-center">
                <div className="relative">
                  <img
                    alt="..."
                    src={producto.foto}
                    className="shadow-xl rounded-full h-auto align-middle border-none "
                  />
                </div>
              </div>
            </div>
            <div className="text-center mt-10">
              <h1 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                {producto.nombre}
              </h1>
              <div className="text-l leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                <i className="fas fa-user-edit mr-2 text-lg text-blueGray-400"></i>{" "}
                {producto.autor}
              </div>
              
              
              
              {generos.map((genero) => {
                return (
                  <>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-red-600 bg-red-200 uppercase last:mr-0 mr-1">
                      {genero}
                    </span>
                  </>
                );
              })}
          

              <div className="text-blueGray-600 uppercase">
                <i className="fas fa-sort-numeric-up-alt mr-2 text-lg text-blueGray-400 "></i>
                Stock: {producto.stock}
              </div>
              {/* <div className="text-blueGray-600 uppercase">
                <i className="fas fa-newspaper mr-2 text-lg text-blueGray-400 "></i>
                Editorial: {producto.editorial.S}
              </div> 
              <div className="text-blueGray-600 uppercase">
                <i className="fas fa-calendar-alt mr-2 text-lg text-blueGray-400 "></i>
                Fecha de Publicación: {producto.fechapublicacion.S}
              </div>*/}

              <div className="text-blueGray-600 uppercase">
                <i className="fas fa-money-bill-alt mr-2 text-lg text-blueGray-400"></i>
                Q {producto.precio}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
