const url_api = "http://localhost:3001"

async function registrarUsuario(usuario) {
  return fetch(`${url_api}/registro`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(usuario),
  });
}

async function loginUsuario(correo, pwd){
  return fetch(`${url_api}/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      correo: correo,
      pwd: pwd
    }),
  });
}

export{ registrarUsuario, loginUsuario };
