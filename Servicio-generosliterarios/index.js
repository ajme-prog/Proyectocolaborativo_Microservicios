var express = require('express');
const AWS = require('aws-sdk');
var cors = require('cors')
var bodyParser = require('body-parser')
const config = require('./Servicios/config.js');
const crypto = require('crypto');
var app = express();
const generarID = () => crypto.randomBytes(10).toString("hex");
port = 4000;
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(cors());


var docClient = new AWS.DynamoDB(config.aws_remote_config);


//------------CRUD ALBUM---
app.post('/generoliterario',function(req,res){

    //-------------primero verifico que no exista un album con ese nombre
    var nombre=req.body.nombre; 
    var id_genero = generarID();
    const params1 = {
      TableName: 'GeneroLiterario',
      FilterExpression: "#cg = :data",
      ExpressionAttributeNames: {
          "#cg": "nombre",
      },
    
      ExpressionAttributeValues: {
          ":data": { S: nombre},
      }
    };
    
    
    
    // Call DynamoDB to read the item from the table
    docClient.scan(params1, async function(err, data) {
      if (err) {
        console.log("Error", err);
      } else  {
    
        if(data.Items.length!=0){
          res.send({
            status:409,
            mensaje: "Genero ya existe"
            });
        }else {
    //---Si no existe paso a crear el album
    const params = {
    TableName:'GeneroLiterario',
    Item: {
      'nombre': {S: nombre},
      'id': {S: id_genero}
    }
    };
    
    docClient.putItem(params, function(err,data){
      if(err){
          res.send({
             status: 400,
             mensaje: 'Error: Server error'
          });
      }
      else {
        
     console.log("SI ENTRE A PUT "+ data);
     res.send({
     status:200,
     mensaje: {nombre:nombre,id:id_genero}
     });
      }
    } );
    
        }
    
      }
    });
    
    
    });


app.listen(port);