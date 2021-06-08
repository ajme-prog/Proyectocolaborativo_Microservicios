/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState } from "react";
import { URL } from "./rutas";

import CardStats from "../../components/Cards/CardStats";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Form,
  Button,
  CardFooter,
  FormGroup,
  Input,
  Row,
  Col,
  CardImg,
  CardSubtitle,
  CardText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import CardProductoTienda from "components/Cards/CardProductoTienda";

export const Tienda = (props) => {
  const [libros, setLibros] = useState([]);


  useEffect(() => {
    localStorage.setItem("Carrito",JSON.stringify([]))
    obtenerLibros();
  }, []);

  const cModal = () => {
    this.setState({ abrir: !this.state.abrir });
  };

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
          console.log(respuesta.data);
          setLibros(respuesta.data);
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

  const quitarCarrito = (posicion) => {
    var lista = this.state.ListaCarrito;
    let posicion_pr = lista[posicion].posicion_producto;
    var cantidad = document.getElementById("cant" + posicion_pr);
    var boton = document.getElementById("butt" + posicion_pr);

    lista.splice(posicion, 1);
    cantidad.disabled = false;
    console.log(cantidad);
    boton.disabled = false;
    this.setState({ ListaCarrito: lista });
  };*/

  return (
    <>
      <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="TRAFFIC"
                  statTitle="350,897"
                  statArrow="up"
                  statPercent="3.48"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="NEW USERS"
                  statTitle="2,356"
                  statArrow="down"
                  statPercent="3.48"
                  statPercentColor="text-red-500"
                  statDescripiron="Since last week"
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="SALES"
                  statTitle="924"
                  statArrow="down"
                  statPercent="1.10"
                  statPercentColor="text-orange-500"
                  statDescripiron="Since yesterday"
                  statIconName="fas fa-users"
                  statIconColor="bg-pink-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="PERFORMANCE"
                  statTitle="49,65%"
                  statArrow="up"
                  statPercent="12"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName="fas fa-percent"
                  statIconColor="bg-lightBlue-500"
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
                  titulo={producto.nombre.S}
                  index={index}
                
                ></CardProductoTienda>
              </div>
            </>
          );
        })}
      </div>

      {/* <Modal isOpen={this.state.abrir}>
        <ModalHeader>Detalle del Producto</ModalHeader>
        <ModalBody>
          <Card bg="primary" text="white">
            <CardImg
              top
              width="100%"
              src={this.state.producto.foto}
              alt="Card image cap"
            />
            <CardBody>
              <CardTitle tag="h3">{this.state.producto.nombre}</CardTitle>
              <Row>
                <Col>
                  <CardSubtitle tag="h6" className="mb-2 text-muted">
                    Precio
                  </CardSubtitle>
                  <CardText style={{ color: "white" }}>
                    {this.state.producto.precio}
                  </CardText>
                </Col>
                <Col>
                  <CardSubtitle tag="h6" className="mb-2 text-muted">
                    Restaurante
                  </CardSubtitle>
                  <CardText style={{ color: "white" }}>
                    {this.state.producto.nombre_usuario}
                  </CardText>
                </Col>
              </Row>
              <br></br>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                Descripcion
              </CardSubtitle>
              <CardText style={{ color: "white" }}>
                {this.state.producto.descripcion}
              </CardText>
            </CardBody>
          </Card>
        </ModalBody>
        <ModalFooter>
          <Button
            id={"buttD" + this.state.producto.i}
            onClick={(e) => this.agregarCarrito(this.state.producto.i)}
          >
            Agregar a Carrito
          </Button>
          <Button color="secondary" onClick={this.cModal}>
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>
    */}
    </>
  );
};

export default Tienda;
