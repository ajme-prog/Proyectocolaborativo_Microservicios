import React, { useEffect, useState } from "react";

// components

export default function CardProductoCarrito(props) {

  console.log(props.objeto)
  const [producto, setProducto] = useState(props.objeto);
  const [agregar, setAgregado] = useState(false);
  const [showAlert, setShowAlert] = React.useState(false);

  const agregarCarrito = (i) => {

    if(agregar){

      setShowAlert(true)

      setTimeout(() => {
        setShowAlert(false)
      }, 1000)
      return;
    }

    var js = {
      ...producto,
      cantidad:{S: 1},
      subtotal:{S: 1*producto.precio.S}
    };

    console.log("aaaaaaaaaaa",js)

    var lista = JSON.parse(localStorage.getItem("Carrito"));
    
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

      {showAlert ? (
        <div
          className="text-white px-6 py-4 border-0 rounded relative mb-4 bg-red-500"
        >
          
          <span className="inline-block align-middle mr-8">
            <b className="capitalize">Error!</b> El producto ya esta agregado al carrito
          </span>
         
        </div>
      ) : null}
    
    </>
  );
}
