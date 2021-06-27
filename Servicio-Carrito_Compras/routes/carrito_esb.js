var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();
const notice_purchase = require("./email.js");

const crypto = require("crypto");
const cors = require("cors");
const aws_keys = require("./Keys/credenciales");
var corsOptions = { origin: true, optionsSuccessStatus: 200 };
const generarID = () => crypto.randomBytes(16).toString("hex");

var AWS = require("aws-sdk");
const { parse } = require("dotenv");

var dynamoClient = new AWS.DynamoDB(aws_keys.dynamodb);

router.use(cors(corsOptions));
router.use(bodyParser.json({ limit: "50mb", extended: true }));
router.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

router.get("/read", function (req, res, next) {
  const params = {
    TableName: "compras_esb",
  };

  dynamoClient.scan(params, function (err, data) {
    if (err) {
      res.status(500).json({ message: "Error en la base de datos" });
    } else {
      console.log(data.Items);
      let arreglo = data.Items;
      console.log(arreglo)
      let arreglo_esb = arreglo.map((compra) => {
        return {
          id_compra: compra.id_compra.S,
          id_cliente: compra.id_cliente.S,
          total: compra.total.S,
          books: JSON.parse(compra.detalle.S),
        };
      });
      console.log(arreglo_esb);
      res.status(200).json(arreglo_esb);
    }
  });
});

router.post("/buy", function (req, res, next) {
  const { id_cliente, books, total } = req.body;
  console.log("dasd", id_cliente);
  let id_compra=generarID();
  const params = {
    TableName: "compras_esb",
    Item: {
      id_compra: { S: id_compra },
      id_cliente: { S: id_cliente },
      total: { S: total.toString() },
      detalle: { S: JSON.stringify(books) },
    },
  };

  dynamoClient.putItem(params, function (err, data) {
    if (err) {
      console.log(err);
      res.status(400).json({
        mensaje: "La compra no se realizó, verifique nuevamente su orden",
      });
    } else {
      /*notice_purchase(
        id_cliente,
        `Número de confirmación: ${id_compra}; 
        Total: ${total};
        Detalle: ${JSON.stringify(books)}`,
        dynamoClient
      );*/

      res.status(200).json({
        message: "Compra registrada correctamente",
      });
    }
  });
});

router.get("/get_books", function (req, res, next) {
  const params = {
    TableName: "libros_esb",
  };

  dynamoClient.scan(params, function (err, data) {
    if (err) {
      res.json({ status: 404, mensaje: "Error en la base de datos" });
    } else {
      console.log(data.Items);

      res.json({ status: 200, mensaje: "OK", data: data.Items });
    }
  });
});

module.exports = router;
