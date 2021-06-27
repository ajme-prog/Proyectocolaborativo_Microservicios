import React, { useEffect, useState } from "react";
import { URL } from "./rutas";

import CardStats from "../../components/Cards/CardStats";
import CardProductoTiendaESB from "components/Cards/CardProductoTiendaESB";
import { useEsb } from "contexts/EsbContext";

export const TiendaESB = (props) => {
  const [libros, setLibros] = useState([]);
  const [libro_caro, setLibroCaro] = useState({});
  const [libro_barato, setLibroBarato] = useState({});
  const [booleano, setBooleano] = useState(false);
  const [carrito] = useState(JSON.parse(localStorage.getItem("Carrito")));
  const esb =useEsb();

  console.log("QQQQQQQQQQQQQQQQQQq",esb)
  useEffect(() => {
    //localStorage.setItem("Carrito",JSON.stringify([]))

    obtenerLibros();
  }, []);

  const get_caro = (libros) => {
    let actual = {};
    let precio = 0;
    libros.map((producto) => {
      let precio_ciclo = parseInt(producto.precio.S);
      if (precio_ciclo > precio) {
        actual = producto;
        precio = precio_ciclo;
      }
    });
    setLibroCaro(actual);
  };

  const get_barato = (libros) => {
    let actual = {};
    let precio = 1111111100000;

    libros.map((producto) => {
      let precio_ciclo = parseInt(producto.precio.S);
      if (precio_ciclo < precio) {
        actual = producto;
        precio = precio_ciclo;
      }
    });
    setLibroBarato(actual);
    setBooleano(true);
  };

  const obtenerLibros = () => {
    fetch("http://localhost:9000/orders/get_books", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        mode: "no-cors",
      },
    })
      .then((res) => res)
      .then(async (response) => {
        let respuesta = await response.json();
        console.log("_REeeeeee",respuesta)
        if (respuesta.status === 200) {
          let arr = respuesta.data.filter(
            (libro) => parseInt(libro.stock.N) > 0
          );
          
          setLibros(arr);
          /*get_caro(respuesta.data);
          get_barato(respuesta.data);*/
        } else {
          alert("Error al crear el producto");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="relative  pb-20 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-6/12 px-4">
                <CardStats
                  statSubtitle="LIBRO MAS CARO"
                  statTitle={booleano ? libro_caro.nombre.S : "Cargando..."}
                  statArrow="up"tienda
                  statPercent=""
                  statPercentColor="text-emerald-500"
                  statDescripiron={
                    booleano
                      ? "El precio es de Q " + libro_caro.precio.S
                      : "Cargando..."
                  }
                  statIconName="far fa-plus-square"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-6/12 px-4">
                <CardStats
                  statSubtitle="LIBRO MAS BARATO"
                  statTitle={booleano ? libro_barato.nombre.S : "Cargando..."}
                  statArrow="down"
                  statPercent=""
                  statPercentColor="text-red-500"
                  statDescripiron={
                    booleano
                      ? "El precio es de Q " + libro_barato.precio.S
                      : "Cargando..."
                  }
                  statIconName="fas fa-minus-square"
                  statIconColor="bg-orange-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="px-4 md:px-10 mx-auto w-full -m-24"></div> */}
      <div className="flex flex-wrap">
        {libros.map((producto, index) => {
          return (
            <>
              <div className="w-full xl:w-4/12 px-4">
                <CardProductoTiendaESB
                  index={index}
                  objeto={producto}
                  lista={carrito}
                ></CardProductoTiendaESB>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default TiendaESB;
