const url_api = "http://localhost:3001/administrador"


async function editorialesPendientes(token) {
  console.log(token)
  return fetch(`${url_api}/editoriales-pendientes`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
      "Authorization": `Bearer ${token}`
    }
  });
}

async function recuperarUsuarios(token) {
  return fetch(`${url_api}/usuarios`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
      "Authorization": `Bearer ${token}`
    }
  });
}

async function aprobarEditorial(usuario, token){
  return fetch(`${url_api}/aprobar`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      editorial: usuario,
    }),
  });
}

async function eliminarUsuario(usuario, token){
  return fetch(`${url_api}/eliminar`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      usuario: usuario,
    }),
  });
}

export { eliminarUsuario, recuperarUsuarios, editorialesPendientes, aprobarEditorial }