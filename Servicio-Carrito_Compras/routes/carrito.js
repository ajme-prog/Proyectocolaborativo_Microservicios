var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

const crypto = require('crypto');
const cors = require('cors');
const aws_keys = require('./Keys/credenciales');
var corsOptions = { origin: true, optionsSuccessStatus: 200 };


var AWS = require('aws-sdk');


var dynamoClient = new AWS.DynamoDB(aws_keys.dynamodb);


router.use(cors(corsOptions));
router.use(bodyParser.json({ limit: '50mb', extended: true }));
router.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))




router.get('/obtener_libros', function (req, res, next) {

    const params = {
        TableName: 'Libros'
    };

    dynamoClient.scan(params, function (err, data) {
        if (err) {
            res.json({ "status": 404, "mensaje": "Error en la base de datos" })

        } else {
            console.log(data.Items);

            res.json({ "status": 200, "mensaje": "OK", "data": data.Items })
 
        }
    });

});



module.exports = router;
