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

export async function Crearlibro(nombre, generos, stock, autor, editorial, id_editorial, paginas, fechapublicacion, idioma, precio, fotografias) {
  let file = fotografias.item(0);
  let foto_base64 = await pFileReader(file);
  foto_base64 = foto_base64.split(",")[1];
  return fetch(url_api_libros + "/libros", {
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
      editorial: editorial,
      id_editorial: id_editorial,
      paginas: paginas,
      fechapublicacion: fechapublicacion,
      idioma: idioma,
      precio: precio,
      foto: foto_base64

    }),
  });
}

export const SolicitarLibro = async (nombre, autor, fecha, pdf_original) => {
  // const pdf = pFileReader(pdf_original);
  let pdf = await handlePdfToB64(pdf_original);
  pdf = pdf.split(",")[1];
  // console.log(pdf);
  return fetch(url_api_solicitudes + '/libros/nuevasolicitud',
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre,
        autor,
        fecha,
        pdf
      })
    },
  );
}


export async function DeleteLibro(id_libro) {
  return fetch(url_api_libros + "/libros", {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id_libro: id_libro
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

const handlePdfToB64 = (fileToLoad) => {
  // FileReader function for read the file.
  return new Promise((resolve, reject) => {
    let fileReader = new FileReader();
    let file = null;
    // Onload of file read the file content
    fileReader.onload = (fileLoadedEvent) => {
      file = fileLoadedEvent.target.result;
      // Print data in console
      resolve(file);
    };
    // Convert data to base64
    fileReader.readAsDataURL(fileToLoad);
  });
}


export async function getLibros(id_editorial) {
  return fetch(url_api_libros + "/libros/" + id_editorial, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  });
}

export async function getunLibro(id_libro) {
  return fetch(url_api_libros + "/libros/unlibro/" + id_libro, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  });
}

export async function ModificarLibro(id_libro, nombre, generos, stock, autor, editorial, id_editorial, paginas, fechapublicacion, idioma, precio, fotografia) {

  let foto_base64 = "";

  if (fotografia) {
    let file = fotografia.item(0);
    foto_base64 = await pFileReader(file);
    foto_base64 = foto_base64.split(",")[1];
    console.log(foto_base64);
  }

  return fetch(url_api_libros + "/libros/modificar", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id_libro: id_libro,
      nombre: nombre,
      generos: generos,
      stock: stock,
      autor: autor,
      editorial: editorial,
      id_editorial: id_editorial,
      paginas: paginas,
      fechapublicacion: fechapublicacion,
      idioma: idioma,
      precio: precio,
      foto: foto_base64

    }),
  });
}

