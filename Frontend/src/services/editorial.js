const url_api = "http://localhost:9010/impuestos"


async function recuperarImpuestos() {
  return fetch(`${url_api}/get_countries`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
    }
  });
}

export { recuperarImpuestos }