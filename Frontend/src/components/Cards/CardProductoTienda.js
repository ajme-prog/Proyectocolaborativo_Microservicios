import React, { useEffect, useState } from "react";

// components

export default function CardProductoCarrito(props) {
  const [titulo, setTitulo] = useState(props.titulo);
  const [agregar, setAgregado] = useState(false);


  const agregarCarrito = (i) => {

    console.log(agregar)
    if(agregar){
      alert("Ya está agregado al carrito")
      return;
    }

    var js = {
      id_producto: props.titulo,
      nombre:props.titulo,
      cantidad:1
    };


    var lista = JSON.parse(localStorage.getItem("Carrito"));
    
    console.log(lista)
    lista.push(js);

    localStorage.setItem("Carrito",JSON.stringify(lista))

    
    //document.getElementById("boton"+props.index).disabled = true;
   
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
                <div>
                  <br />
                  <br />
                  <br />
                  <br />

                  <img
                    alt="..."
                    src={require("assets/img/team-2-800x800.jpg").default}
                    className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                  />
                </div>
              </div>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />

              {/* <div className="w-full px-4 text-center mt-20">
              <div className="flex justify-center py-4 lg:pt-4 pt-8">
                <div className="mr-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                    22
                  </span>
                  <span className="text-sm text-blueGray-400">Friends</span>
                </div>
                <div className="mr-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                    10
                  </span>
                  <span className="text-sm text-blueGray-400">Photos</span>
                </div>
                <div className="lg:mr-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                    89
                  </span>
                  <span className="text-sm text-blueGray-400">Comments</span>
                </div>
              </div>
            </div> */}
            </div>
            <div className="text-center mt-12">
              <h1 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                {titulo}
              </h1>
              <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{" "}
                Los Angeles, California
              </div>
              <div className="mb-2 text-blueGray-600 mt-10">
                <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                Solution Manager - Creative Tim Officer
              </div>
              <div className="mb-2 text-blueGray-600">
                <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                University of Computer Science
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
