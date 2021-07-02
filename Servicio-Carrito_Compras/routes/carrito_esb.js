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
      let arreglo_esb = arreglo.map((compra) => {
        let arr_detalle = JSON.parse(compra.detalle.S).map((detalle) => {
      console.log(detalle);

          return {
            nombre: detalle.nombre,
            autor: detalle.autor,
            generos: detalle.generos,
            id_editorial: detalle.id_editorial,
            stock: detalle.stock,
            foto: detalle.foto,
            id_libro: detalle.id_libro,
            precio: detalle.precio,
            cantidad: detalle.cantidad,
            subtotal: 1030.35,
          };
        });

        return {
          id_compra: compra.id_compra.S,
          id_cliente: compra.id_cliente.S,
          direccion:compra.direccion.S,
          total: compra.total.S,
          books: arr_detalle,
        };
      });
      console.log(arreglo_esb);
      res.status(200).json(arreglo_esb);
    }
  });
});

router.post("/buy", function (req, res, next) {
  const { id_cliente, books, total, direccion } = req.body;
  console.log("dasd", id_cliente);
  let id_compra = generarID();
  const params = {
    TableName: "compras_esb",
    Item: {
      id_compra: { S: id_compra },
      id_cliente: { S: id_cliente },
      total: { S: total.toString() },
      detalle: { S: JSON.stringify(books) },
      direccion: { S: direccion },
    },
  };

  dynamoClient.putItem(params, function (err, data) {
    if (err) {
      console.log(err);
      res.status(400).json({
        mensaje: "La compra no se realizó, verifique nuevamente su orden",
      });
    } else {
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
