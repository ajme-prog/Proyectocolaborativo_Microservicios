
require("dotenv").config();

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const cors = require('cors');
const morgan = require('morgan');



var corsOptions ={origin: true, optionsSuccessStatus: 200 };
app.use(cors(corsOptions));
app.use(bodyParser.json({limit: '10mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
app.use(morgan('tiny'));
morgan(':method :url :status :res[content-length] - :response-time ms');


var carrito = require('./routes/carrito');
app.use('/carrito', carrito);

app.listen(9000, () => {
  console.debug('Servidor escuchando en puerto: 9000');
});



module.exports = app;
