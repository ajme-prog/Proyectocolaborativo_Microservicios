const url_api = "http://localhost:3001"

async function registrarUsuario(usuario) {
  return fetch(`${url_api}/registro`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(usuario),
  });
}

module.exports = { registrarUsuario };
