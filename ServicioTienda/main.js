const doc_client = require('./Utility').doc_client;

async function profile(req, res) {
  const u = req['usuarioReq'];
  if(u)console.log(u);
  const id = u?u.usuario:'222126ea2e363c0fcde6992e7f3e2e80c12bb052b042d361';
  const params = {
    TableName: "usuario",
    FilterExpression: "usuario = :id",
    ExpressionAttributeValues: {":id": id}
  }

  const profile = await doc_client.scan(params).promise();
  return res.send({
    profile: profile.Items[0]
  });
}

async function feed(req, res) {
  const params = {
    TableName: "Libros"
  }

  const libros = await doc_client.scan(params).promise();
  return res.send({
    libros: libros.Items
  });
}

module.exports = {feed, profile};
