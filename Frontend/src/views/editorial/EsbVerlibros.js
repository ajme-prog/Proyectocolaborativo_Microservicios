import React, { useRef, useState, useEffect, Component } from "react";
import Select, { components } from "react-select";
import { useHistory } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Swal from "sweetalert2";
import {
getLibrosEsb
} from "../../services/Libros_esb";
import makeAnimated from "react-select/animated";

import {getESB} from "../../services/esb.js"
import {
  SortableContainer,
  SortableElement,
  sortableHandle,
} from "react-sortable-hoc";

export default function VerLibrosEsb() {
    const history = useHistory();
  const [selected, setSelected] = React.useState([]);
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
  var ideditorial=""
  useEffect(() => {
    async function fetchData() {
      //selected.push({value:"hola",label:"jaja"}) //---esta linea me va a servir para actualizar el libro

      let usuario = localStorage.getItem("usuario");
      usuario = await JSON.parse(usuario);
      console.log(usuario);
      setUsuarioActual(usuario);
      let esb=await getESB();
      console.log("EL USUARIO ES " + usuario.nombre);
      ideditorial=usuario.id;
      console.log("el ideditorial es "+ideditorial)
      const rawResponse = await getLibrosEsb(esb);
      
      const respuesta = await rawResponse.json();

      return respuesta;
    }

    fetchData().then((respuesta) => {
        console.log("la respuesta es " +respuesta)
      if (respuesta.length > 0) {
       let datos=[]
        for(let i=0;i<respuesta.length;i++){
           if(respuesta[i].id_editorial==ideditorial){
               datos.push(respuesta[i])
           }
        }

        setAlbums(datos);
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




 //----para ir a modificar
 async function dirigir(e){
    history.push(`/editorial/Modificarlibro/${e.target.id}`)
  }   
  
  
  return (
    <>
      
      {albums.map((album) => {

        options.push({ value: album.id, label: album.nombre });
    
      })}
      <div className="relative bg-white-600 md:pt-32 pb-32 pt-12">
      <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Libros</h6>
         
          </div>
        </div>
        <div className="px-4 md:px-10 mx-auto w-full">
        
          <div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <section className="block relative z-1  py-30 ">
              <div className="container mx-auto ">
                <div className="justify-center flex flex-wrap">
                  <div className="w-full lg:w-12/12 px-4  -mt-24">
                    <div className="flex flex-wrap">
                      {albums ? (
                        albums.map((foto) => {
                          return (
                            <div className="w-full xl:w-3/12 lg:w-4/12 px-4" key={foto.nombre}>
                           
                         
                              <a>
                                <div className="hover:-mt-4 relative align-middle flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                                <h5 className="block uppercase text-blueGray-900 text-center font-bold mb-2">
                                {foto.nombre}
                              </h5>
                                  <img
                                    alt={foto.nombre}
                                    className="align-middle border-none max-w-full h-auto rounded-lg"
                                    src={foto.foto}
                                  />
                               <br></br>
                            
                               <div className="text-left py-3 px-md-10">
                                
                               <div className="text-sm leading-normal mt-0 mb-2 text-black-500 font-bold">
                               &nbsp; &nbsp;
                                  <i className=" fas fa-book mr-4 text-lg text-black-500"></i>
                                  
                                  {foto.generos.join('-')}
                                </div>

                                <div className="text-sm leading-normal mt-0 mb-2 text-black-500 font-bold">
                                &nbsp; &nbsp; 
                                  <i className="fas fa-layer-group mr-4 text-lg text-black-500 px-md-10"></i>
                                  {foto.stock + " unidades disponibles"}
                                </div>

                               
                                <div className="text-sm leading-normal mt-0 mb-2 text-black-500 font-bold">
                                &nbsp; &nbsp;
                                  <i className=" mr-4 fas fa-user-edit text-lg text-black-500"></i>
                                  {foto.autor }
                                </div>

                                
                            
                              
                                <div className="text-sm leading-normal mt-0 mb-2 text-black-500 font-bold">
                                &nbsp; &nbsp;
                                  <i className=" mr-4 fas fa-money-bill-wave text-lg text-black-500"></i>
                                  {"Q"+foto.precio}
                                </div>

                              
                                </div>
                                </div>
                              </a>
                            </div>
                          );
                        
                        })
                      ) : (
                        <p>Cargando...</p>
                      )}
                      {albums && albums.length === 0 && (
                        <p>Aún no hay libros Registrados ...</p>
                      )}
                    
                    </div>
                  
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
