import React, { useEffect, useState } from "react";

// components

export default function CardProductoCarrito(props) {

  console.log(props.objeto)
  const [producto, setProducto] = useState(props.objeto);
  const [agregar, setAgregado] = useState(false);


  const agregarCarrito = (i) => {

    console.log(agregar)
    if(agregar){
      alert("Ya está agregado al carrito")
      return;
    }

    var js = {
      id_producto: producto.id.S,
      nombre:producto.nombre.S,
      precio:parseInt(producto.precio.S),
      imagen: producto.imagen.S,
      cantidad:1
    };


    var lista = JSON.parse(localStorage.getItem("Carrito"));
    
    console.log(lista)
    lista.push(js);
    localStorage.setItem("Carrito",JSON.stringify(lista))

    setAgregado(true)
  };
  


  return (
    <>





      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              
              <button
                className="bg-yellow-500 text-white active:bg-blueGray-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button" onClick={()=>agregarCarrito(props.index)}
                id={"boton"+props.index}
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
                  src={producto.imagen.S}
                  className="shadow-xl rounded-full h-auto align-middle border-none "
                />
              </div>
            </div>
            </div>
            <div className="text-center mt-6">
              <h1 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                {producto.nombre.S}
              </h1>
              <div className="text-l leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                <i className="fas fa-user-edit mr-2 text-lg text-blueGray-400"></i>{" "}
                {producto.autor.S}
              </div>
              <div className="text-blueGray-600 mt-10 uppercase">
                <i className="fas fa-language mr-2 text-lg text-blueGray-400 "></i>
                Lenguaje: {producto.idioma.S}
              </div>
              <div className="text-blueGray-600 uppercase">
                <i className="fas fa-money-bill-alt mr-2 text-lg text-blueGray-400"></i>
                Q {producto.precio.S}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
