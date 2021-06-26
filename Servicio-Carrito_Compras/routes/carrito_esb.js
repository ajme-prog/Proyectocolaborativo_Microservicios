var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();

const crypto = require("crypto");
const cors = require("cors");
const aws_keys = require("./Keys/credenciales");
var corsOptions = { origin: true, optionsSuccessStatus: 200 };
const generarID = () => crypto.randomBytes(16).toString("hex");

var AWS = require("aws-sdk");

var dynamoClient = new AWS.DynamoDB(aws_keys.dynamodb);

router.use(cors(corsOptions));
router.use(bodyParser.json({ limit: "50mb", extended: true }));
router.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

router.get("read/:id_usuario", function (req, res, next) {
  const params = {
    TableName: "compras_esb",
  };

  dynamoClient.scan(params, function (err, data) {
    if (err) {
      res.json({ status: 500, mensaje: "Error en la base de datos" });
    } else {
      console.log(data.Items);
      let arreglo = data.Items.filter(
        (compra) => compra.id_usuario.S == req.params.id_usuario
      );

      let arreglo_esb = arreglo.map((compra) => {
        return {
          id_compra: compra.id_compra.S,
          id_usuario: compra.id_cliente.S,
          total: compra.total.N,
          books: JSON.parse(compra.detalle.S),
        };
      });
      console.log(arreglo_esb);
      res.json({ status: 200, mensaje: "OK", data: arreglo_esb });
    }
  });
});

router.post("/buy", function (req, res, next) {
  const { id_cliente, pedido, total } = req.body;

  const params = {
    TableName: "compras_esb",
    Item: {
      id: { S: generarID() },
      id_usuario: { S: id_cliente },
      total: { N: total },
      detalle: { S: JSON.stringify(pedido) },
    },
  };

  dynamoClient.putItem(params, function (err, data) {
    if (err) {
      console.log(err);
      res.json({
        status: 400,
        mensaje: "La compra no se realizó, verifique nuevamente su orden",
      });
    } else {
      res.json({
        status: 200,
        mensaje: "Compra registrada correctamente",
      });
    }
  });
});

module.exports = router;
