async function registrarUsuario(usuario, esb) {
  return fetch(`${esb}/auth/registro`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(usuario),
  });
}

async function loginUsuario(correo, pwd, esb){
  console.log("esb", esb)
  
  return fetch(`${esb}/auth/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      email: correo,
      passwd: pwd
    }),
  });
}

export{ registrarUsuario, loginUsuario };
