import React, { useEffect, useState } from "react";
import { URL } from "./rutas";

import CardStats from "../../components/Cards/CardStats";
import CardProductoTienda from "components/Cards/CardProductoTienda";
import { parse } from "postcss";

export const Tienda = (props) => {
  const [libros, setLibros] = useState([]);
  const [libro_caro, setLibroCaro] = useState({});
  const [libro_barato, setLibroBarato] = useState({});
  const [booleano, setBooleano] = useState(false);


  


  useEffect(() => {
    localStorage.setItem("Carrito",JSON.stringify([]))
    obtenerLibros();
  }, []);

  const get_caro=(libros)=>{

    console.log("**************************",libros)
    let actual={}
    let precio=0
    libros.map((producto)=>{
      let precio_ciclo=parseInt(producto.precio.S)
      if(precio_ciclo>precio){
        actual=producto;
        precio= precio_ciclo
      }
    })
    //console.log(actual)
    setLibroCaro(actual)

  }

  const get_barato=(libros)=>{

    console.log("**************************",libros)
    let actual={}
    let precio=1111111100000
    libros.map((producto)=>{
      let precio_ciclo=parseInt(producto.precio.S)
      if(precio_ciclo<precio){
        actual=producto;
        precio= precio_ciclo
      }
    })
    //console.log(actual)
    setLibroBarato(actual)
    setBooleano(true)

  }

  const obtenerLibros = () => {

    fetch(URL.obtener_productos, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        mode: "no-cors",
      },
    })
      .then((res) => res)
      .then(async (response) => {
        let respuesta = await response.json();

        if (respuesta.status === 200) {
          setLibros(respuesta.data);
          get_caro(respuesta.data);
          get_barato(respuesta.data);
        } else {
          alert("Error al crear el producto");
        }
      })
      .catch((error) => console.log(error));
  };

  /*
  const generarCompra = () => {
    var usu = JSON.parse(localStorage.getItem("current"));
    var direc = document.getElementById("txtDireccion").value;
    var arr = this.state.ListaCarrito;
    //console.log(this.state.allowCustom);
    console.log(usu);
    console.log(direc);
    var id_usuario = 1;
    if (usu != null) {
      id_usuario = usu.id;
    }

    fetch(`${URL.pedidos}/crearOrden`, {
      method: "POST",
      body: JSON.stringify({
        pedido_usuario: id_usuario,
        enviar: this.state.allowCustom,
        direccion: direc,
      }),
      headers: {
        "Content-Type": "application/json",
        mode: "no-cors",
      },
    })
      .then(async function (response) {
        let respuesta = await response.json();
        console.log(respuesta[0].id);

        try {
          for (let i = 0; i < arr.length; i++) {
            fetch(`${URL.pedidos}/detalleOrden`, {
              method: "POST",
              body: JSON.stringify({
                id: respuesta[0].id,
                pedido_producto: arr[i].id_producto,
                pedido_usuario: id_usuario,
                cantidad: arr[i].cantidad,
              }),
              headers: {
                "Content-Type": "application/json",
                mode: "no-cors",
              },
            })
              .then(async function (response) {
                let respuesta = await response.json();
                console.log(respuesta);
                //alert("Producto agregado correctamente");
                window.location.reload();
              })
              .catch((error) => console.log(error));
          }
        } catch (error) {
          alert(error);
        }
      })
      .catch((error) => console.log(error));
  };


  };*/

  return (
    <>
      <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */console.log("************",libro_caro)}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-6/12 px-4">
                <CardStats
                  statSubtitle="LIBRO MAS CARO"
                  statTitle={booleano ?(libro_caro.nombre.S):"Cargando..."}
                  statArrow="up"
                  statPercent=""
                  statPercentColor="text-emerald-500"
                  statDescripiron={booleano ?("El precio es de Q "+libro_caro.precio.S):"Cargando..."}
                  statIconName="far fa-plus-square"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-6/12 px-4">
                <CardStats
                  statSubtitle="LIBRO MAS BARATO"
                  statTitle={booleano ?(libro_barato.nombre.S):"Cargando..."}
                  statArrow="down"
                  statPercent=""
                  statPercentColor="text-red-500"
                  statDescripiron={booleano ?("El precio es de Q "+libro_barato.precio.S):"Cargando..."}
                  statIconName="fas fa-minus-square"
                  statIconColor="bg-orange-500"
                />
              </div>
             
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap">
        {libros.map((producto, index) => {
          return (
            <>
              <div className="w-full xl:w-4/12 px-4">
                <CardProductoTienda
               
                  index={index}
                  objeto={producto}
                ></CardProductoTienda>
              </div>
            </>
          );
        })}
      </div>

    
    </>
  );
};

export default Tienda;
