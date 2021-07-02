import React, { useRef, useState, useEffect, Component } from "react";
import Select, { components } from "react-select";
import Swal from "sweetalert2";
import {
  getGeneros,
  CrearlibroEsb,
  getLibrosEsb
  
} from "../../services/Libros_esb";

import {getESB} from "../../services/esb.js"
import makeAnimated from "react-select/animated";
import {
  SortableContainer,
  SortableElement,
  sortableHandle,
} from "react-sortable-hoc";

const { useEsb } = require("../../contexts/EsbContext");
export default function LibrosEsb() {
  const [selected, setSelected] = React.useState([]);
  const { esb } = useEsb();
 
  function arrayMove(array, from, to) {
    array = array.slice();
    array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
    return array;
  }

  const onChange = (selectedOptions) => setSelected(selectedOptions);

  var state = {
    active: false,
    imageSrc: "",
    imageName: "",
    image: [],
    generos: [],
    loaded: false,
  };
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const animatedComponents = makeAnimated();
  const [usuarioActual, setUsuarioActual] = useState();
  const nombreRef = useRef();
  const stockRef = useRef();
  const autorRef = useRef();
  const paginasRef = useRef();
  const fechapublicacionRef = useRef();
  const idiomaRef = useRef();
  const precioRef = useRef();
  const inputFile = useRef(null);
  const options = [];
  var urlimagen = "";
  var archivos;
  const [selectedFiles, setSelectedFiles] = useState([]);
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

  useEffect(() => {
    async function fetchData() {
      const usuario_aux = await JSON.parse(
        localStorage.getItem("usuarioActual")
      );
      //selected.push({value:"hola",label:"jaja"}) //---esta linea me va a servir para actualizar el libro
      async function recuperarUsuario() {
        let usuario = localStorage.getItem("usuario");
        usuario = await JSON.parse(usuario);
        console.log(usuario);
        setUsuarioActual(usuario);
      }

      recuperarUsuario();

      //-----------agrego el codigo
      document.getElementById("file").onchange = function (e) {
        // Creamos el objeto de la clase FileReader
        let reader = new FileReader();
        archivos = e.target.files;
        console.log("EN INIIO ARCHIVOS ES " + e.target.files[0]);
        // Leemos el archivo subido y se lo pasamos a nuestro fileReader
        reader.readAsDataURL(e.target.files[0]);

        // Le decimos que cuando este listo ejecute el código interno
        reader.onload = function () {
          let preview = document.getElementById("preview"),
            image = document.createElement("img");

          image.src = reader.result;
          urlimagen = reader.result;
          preview.innerHTML = "";
          preview.append(image);
        };
      };
      const rawResponse = await getGeneros();
      const respuesta = await rawResponse.json();
      return respuesta;
    }
    fetchData().then((respuesta) => {
      if (respuesta.status === 200) {
        console.log(respuesta.data);
        setAlbums(respuesta.data);
      } else {
        Toast.fire({
          icon: "warning",
          title: "No se pudo recuperar la información",
        });
      }
    });
  }, []);

  function onFileChange(e, file) {
    console.log("on-file-change");
    var file = file || e.target.files[0],
      pattern = /image-*/,
      reader = new FileReader();
    console.log(file.name);
    if (!file.type.match(pattern)) {
      alert("Formato inválido");
      return;
    }
    console.log(this);
    this.setState({ loaded: false });

    reader.onload = (e) => {
      this.setState({
        imageSrc: reader.result,
        loaded: true,
        imageName: file.name,
      });
      console.log(reader.result);
    };
    reader.readAsDataURL(file);
  }

  async function Nuevolibro(e) {
    //console.log("OPCIONES SON"+options.selectOption)

    // console.log("el valor seleccionado es "+selected[0].label);
//alert("el esb es" +esb)
//---aqui tengo que agregar lo del local storage para esb
  let esb= await getESB();
  console.log("EL ESB ES "+esb)
    let generos = [];

    for (let i = 0; i < selected.length; i++) {
      generos.push(selected[i].label);
    }
    let archivos = document.getElementById("file");
    console.log("El usuario actual es " + usuarioActual.nombre);
    console.log("EL OBJETO ARCHIVOS ES " + archivos.files);
    console.log("el img es " + urlimagen);
    if (archivos.files.length == 0) {
      Toast.fire({
        icon: "warning",
        title: "No se ha seleccionado ninguna imagen",
      });
      return;
    }

    //----llamo a crear album
    const subirarchivo = await CrearlibroEsb(
      nombreRef.current.value,
      generos,
      stockRef.current.value,
      autorRef.current.value,
      usuarioActual.id,
      precioRef.current.value,
      archivos.files,
      esb
    );

    const respuestaalbum = await subirarchivo;
     console.log("LA RESPUESTA ES "+respuestaalbum)
    if (respuestaalbum.status == 200) {
      Toast.fire({
        icon: "success",
        title: "Libro creado correctamente",
      });
      //   var inputalbum=document.getElementById("inputalbum");
      // inputalbum.value="";
      nombreRef.current.value = "";
      autorRef.current.value = "";
      stockRef.current.value = "";
      precioRef.current.value = "";
      setSelected([]);
      let preview = document.getElementById("preview"),
        image = document.createElement("img");

      image.src = "";
      preview.innerHTML = "";
      preview.append(image);
      document.getElementById("file").value = "";
    } else if (respuestaalbum.status == 401) {
      Toast.fire({
        icon: "warning",
        title: "Error al guardar el registro del libro",
      });
    } else {
      Toast.fire({
        icon: "error",
        title: "Error al guardar el registro del libro",
      });
    }

    setLoading(false);
  }

  const onButtonClick = () => {
    inputFile.current.click();
  };

  function handleFotos(fotos) {
    console.log(fotos);
    let nuevouser = {
      ...usuarioActual,
      fotografia: URL.createObjectURL(fotos[0]),
    };
    setSelectedFile(fotos[0]);
    setUsuarioActual(nuevouser);
  }

  return (
    <>
      {albums.map((album) => {
        options.push({ value: album.id, label: album.nombre });
      })}
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Crear Libro</h6>
            <button
              className="bg-amber-500 text-white active:bg-amber-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={Nuevolibro}
            >
              Guardar Libro
            </button>
          </div>
        </div>

        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Datos del libro
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    ref={nombreRef}
                    required
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Autor
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    ref={autorRef}
                  />
                </div>
              </div>
           
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Stock
                  </label>
                  <input
                    type="number"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    ref={stockRef}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Precio
                  </label>
                  <input
                    type="number"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    ref={precioRef}
                  />
                </div>
              </div>

              <div className="w-full lg:w-6/12 px-4 justify-center">
                <div className="relative w-full mb-3 justify-center">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Generos
                  </label>

                  <Select
                    id="opcionalbum"
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    options={options}
                    value={selected}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>

              <div className="w-full lg:w-6/12 px-4 justify-center">
                <div className="relative w-full mb-3 justify-center">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Imagen
                  </label>
                  <div className="flex justify-center py-4 lg:pt-4 pt-8  max-w-150-px">
                    <div
                      align="center"
                      className="flex justify-center "
                      id="preview"
                    >
                      {" "}
                    </div>
                  </div>
                  <hr></hr>

                  <input
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    id="file"
                    type="file"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
