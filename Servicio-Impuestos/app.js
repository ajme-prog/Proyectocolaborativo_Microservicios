
require("dotenv").config();

var express = require('express');
var app = express();
const cors = require('cors');
const morgan = require('morgan');



var corsOptions ={origin: true, optionsSuccessStatus: 200 };
app.use(cors(corsOptions));
app.use(morgan('tiny'));
morgan(':method :url :status :res[content-length] - :response-time ms');


var impuesto = require('./routes/impuesto');
app.use('/impuestos', impuesto);

app.listen(9010, () => {
  console.debug('Servidor escuchando en puerto: 9010');
});



module.exports = app;
