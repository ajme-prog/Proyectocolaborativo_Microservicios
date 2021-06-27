import React, { useState } from "react";

// components

export default function CardCarritoESB(props) {
  const [carrito, setCarrito] = useState(props.lista);

  const sumar = (i, id) => {
    //setCantidad(cantidad + 1);
    modificar_cantidad(0, i, id);
  };

  const restar = (i, id) => {
    //setCantidad(cantidad - 1);
    modificar_cantidad(1, i, id);
  };

  const modificar_cantidad = (tipo, i, id) => {
    let nueva_cantidad = 0,
      nuevo_precio = 0;

    for (let j = 0; j < carrito.length; j++) {
      if (carrito[j].id === id) {
        if (tipo === 0) {
          carrito[j].cantidad.N += 1;
        } else {
          carrito[j].cantidad.N -= 1;
        }
        nueva_cantidad = carrito[j].cantidad.N;
        nuevo_precio = carrito[j].cantidad.N * parseFloat(carrito[j].precio.N);
        carrito[j].subtotal = nuevo_precio;

        break;
      }
    }

    document.getElementById("input" + i).value = nueva_cantidad;

    localStorage.setItem("Carrito", JSON.stringify(carrito));

    document.getElementById(
      "subtotal" + i
    ).innerHTML = `<p>Q ${nuevo_precio}</p>`;
  };

  const eliminar_producto = (id) => {
    //setCantidad(cantidad - 1);
    let arreglo_tmp=carrito.filter((producto)=>producto.id.S!==id)
    setCarrito(arreglo_tmp)
    localStorage.setItem("Carrito", JSON.stringify(arreglo_tmp));

  };

  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (props.color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (props.color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Producto
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (props.color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Cantidad
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (props.color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Precio Unitario
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (props.color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Subtotal
                </th>

                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (props.color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  X
                </th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((producto, index) => {
                return (
                  <>
                    <tr key={index}>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                        <img
                          src={producto.foto.S}
                          className="h-12 w-12 bg-white rounded-full border"
                          alt="..."
                        ></img>{" "}
                        <span
                          className={
                            "ml-3 font-bold " +
                            +(props.color === "light"
                              ? "text-blueGray-600"
                              : "text-white")
                          }
                        >
                          {producto.nombre.S}
                        </span>
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <i
                          className="text-blueGray-400 fas fa-minus-circle text-lg leading-lg "
                          onClick={() => restar(index, producto.id)}
                        />

                        <input
                          type="text"
                          className="border-0 px-1 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          value={producto.cantidad.N}
                          id={"input" + index}
                        />

                        <i
                          className="text-blueGray-400 fas fa-plus-circle text-lg leading-lg "
                          onClick={() => sumar(index, producto.id)}
                        />
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        Q {producto.precio.N}
                      </td>
                      <td
                        className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                        id={"subtotal" + index}
                      >
                        <p>
                          Q {producto.cantidad.N * producto.precio.N}
                        </p>
                      </td>

                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <button
                          className="bg-orange-500 text-white active:bg-orange-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={()=>eliminar_producto(producto.id.S)}
                        >
                          <i className="fas fa-minus-circle"></i>
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
