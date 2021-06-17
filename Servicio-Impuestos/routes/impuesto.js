const jwt = require("jsonwebtoken");

var express = require("express");
var router = express.Router();

const aws_keys = require("./Keys/credenciales");
var AWS = require("aws-sdk");

var dynamoClient = new AWS.DynamoDB(aws_keys.dynamodb);

router.get("/get_countries", function (req, res, next) {
  /*const { usuarioReq } = req;

  if (!(usuarioReq && usuarioReq.tipo === 2))
    return res
      .status(403)
      .json({ message: "No posee los permisos necesarios" });*/

  const params = {
    TableName: "Paises",
  };

  dynamoClient.scan(params, function (err, data) {
    if (err) {
      res.status(404).json({ message: "Error en la base de datos" });
    } else {
      console.log(data.Items);
      let arreglo = [];
      data.Items.map((compra) => {
        arreglo.push({
          id_pais: compra.id_pais.S,
          pais: compra.nombre_pais.S,
          impuesto: compra.porcentaje_impuesto.N,
        });
      });
      res.status(200).json({ message: "OK", data: arreglo });
    }
  });
});

function autenticarToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  console.log("Autenticando Token: ", authHeader);
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res
        .status(403)
        .json({ mensaje: "No posee los permisos necesarios" });
    }
    req.usuarioReq = user;
    next();
  });
}

module.exports = router;
