import React, { useRef, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { getGeneros,Crearlibro,ModificarLibro,DeleteLibro } from "../../services/Libros";
export default function Libros() {
   var state = {
        active: false,
        imageSrc: "",
        imageName: "",
        image: [],
        generos:[],
        loaded: false
      };
    const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [usuarioActual, setUsuarioActual] = useState({});
  const nombreRef = useRef();
  const stockRef= useRef();
  const autorRef= useRef();
  const paginasRef= useRef();
  const fechapublicacionRef = useRef();
  const idiomaRef = useRef();
  const precioRef= useRef();
  const inputFile = useRef(null);
  
var urlimagen="";
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
       const usuario_aux  = await JSON.parse(
        localStorage.getItem("usuarioActual")
      );
      //-----------agrego el codigo 
      document.getElementById("file").onchange = function(e) {
        // Creamos el objeto de la clase FileReader
        let reader = new FileReader();
        archivos=e.target.files;
        console.log("EN INIIO ARCHIVOS ES "+e.target.files[0])
        // Leemos el archivo subido y se lo pasamos a nuestro fileReader
        reader.readAsDataURL(e.target.files[0]);
      
        // Le decimos que cuando este listo ejecute el código interno
        reader.onload = function(){
          let preview = document.getElementById('preview'),
                  image = document.createElement('img');
      
          image.src = reader.result;
        urlimagen=reader.result;
          preview.innerHTML = '';
          preview.append(image);
        };
      }
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

    reader.onload = e => {
      this.setState({
        imageSrc: reader.result,
        loaded: true,
        imageName: file.name
      });
      console.log(reader.result);
    };
    reader.readAsDataURL(file);
  }

  async function subirfoto(e){
let archivos=document.getElementById("file");

      console.log("EL OBJETO ARCHIVOS ES "+archivos.files)
      console.log("el img es "+urlimagen)
      if(archivos.files.length==0){
        Toast.fire({
            icon: "warning",
            title: "No se ha seleccionado ninguna imagen",
          });
          return;
      }
    var selectalbum=document.getElementById("opcionalbum");
    console.log("el valor seleccionado es "+selectalbum.value);
    e.preventDefault();
    setLoading(true);
    var selectalbum=document.getElementById("opcionalbum");
    console.log("el valor seleccionado es "+selectalbum.value);
    const usuario_aux  = await JSON.parse(
      localStorage.getItem("usuario")
    );
  
  //----llamo a crear album
  const subirarchivo= await Crearlibro (
      nombreRef.current.value,
      this.generos,
        stockRef.current.value,
        autorRef.current.value,
        "irianombreeditoria",
        "ideditorial",
        paginasRef.current.value,
        fechapublicacionRef.current.value,
        idiomaRef.current.value,
        archivos.files
        
  );
  
   const respuestaalbum=await subirarchivo.json();
  
    if (respuestaalbum.status == 200) {
    
      Toast.fire({
        icon: "success",
        title: "Foto cargada correctamente",
      });
        var inputalbum=document.getElementById("inputalbum");
        inputalbum.value="";
    } else if (respuestaalbum.status == 401) {
      Toast.fire({
        icon: "warning",
        title: "Ocurrio un error",
      });
    } else {
      Toast.fire({
        icon: "error",
        title: "Hubo un error",
      });
    }
  
    setLoading(false);
  
  
    }
   


  const onButtonClick = () => {
    inputFile.current.click();
  };

  function handleFotos(fotos) {
    console.log(fotos)
    let nuevouser = {...usuarioActual, fotografia: URL.createObjectURL(fotos[0])}
    setSelectedFile(fotos[0])
    setUsuarioActual(nuevouser)
  }

  return (
    <>
    {console.log("El usuario actual es " +usuarioActual.nombre)}
    <br></br>
    <br></br>
   
      <div className="relative h-full flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-gray-800 text-xl font-bold">Subir foto</h6>
            
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0 ">
          <form>
        
            <br />
            <br />
            <br />
            <div className="container mx-auto px-4 h-full ">
        <div className="flex content-center items-center justify-center h-full ">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
              <div className="bg-amber-600 rounded-t mb-0 px-6 py-6 ">
                <div className="text-center mb-3">
                  <h6 className="text-gray-600 text-white font-bold">Añadir foto a Album</h6>
                </div>

                <hr className="mt-6 border-b-1 border-gray-400" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
               
                <form >
                <div className="flex justify-center py-4 lg:pt-4 pt-8  max-w-150-px">
<div  align= "center" className="flex justify-center"
                    id="preview"> </div>
                    </div>
<hr></hr>
<input  className="bg-amber-600 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      id="file" type="file" />

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Nombre de fotografia
                    </label>
                    <input
                       id="inputalbum"
                      type="text"
                      ref={nombreRef}
                      className="px-3 py-3 placeholder-gray-400  text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                      placeholder="Album"
                      required
                    />

<div className="text-center mt-3">
                    
                  </div>
                  </div>
           {/*AQUI TERMINA EL DIV DE CREAR EL ALBUM */}
           <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Selecciona un Album
                    </label>

                    <select
                       id="opcionalbum"
                   
                       class="select " multiple data-mdb-placeholder="Example placeholder" multiple
                      
                    >
               

{albums.map((album) => {
                  return (
                    <option key={album.nombre}>
                      {(album.nombre).split("_")[0]}
                      </option>
                  );
                })} 
       </select>
<div className="text-center mt-3">
                    <button
                      className="bg-amber-600 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                      onClick={subirfoto} 
                    >
                      Subir Fotografia
                    </button>


  
                    
                  </div>
                  </div>




                </form>
              </div>
            </div>
          </div>
        </div>
      </div>


        </form>
        </div>
      </div>
    </>
  );
}
