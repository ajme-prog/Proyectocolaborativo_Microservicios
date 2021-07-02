const url_api_genero = "http://localhost:4000"
const url_api_libros = "http://localhost:4040"
const url_api_solicitudes = "http://localhost:4080"



export async function getGeneros() {
  return fetch(url_api_genero + "/generoliterario", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  });
}

export async function CrearlibroEsb(nombre, generos, stock, autor, id_editorial, precio, fotografias,esb) {
  let file = fotografias.item(0);
  let foto_base64 = await pFileReader(file);
 //esb=url_api_libros; //esto quitarlo despues, el esb va a ser el que seleccione el usuario
  return fetch(`${esb}/book/create`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre: nombre,
      generos: generos,
      stock: stock,
      autor: autor,
      id_editorial: id_editorial,
      precio: precio,
      foto: foto_base64

    }),
  });
}


function pFileReader(file) {
  return new Promise((resolve, reject) => {
    var fr = new FileReader();
    fr.onload = () => {
      resolve(fr.result);
    };
    fr.readAsDataURL(file);
  });
}


export async function getLibrosEsb(esb) {
//esb=url_api_libros//esto quitarlo después 
console.log("esb es "+esb)
  return fetch(`${esb}/book/read`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  });
}


