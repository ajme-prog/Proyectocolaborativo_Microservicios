var express = require('express');
const AWS = require('aws-sdk');
var cors = require('cors')
var bodyParser = require('body-parser')
const config = require('./Servicios/config.js');
const crypto = require('crypto');
var app = express();
const generarID = () => crypto.randomBytes(10).toString("hex");
port = 4040;
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(cors());


var docClient = new AWS.DynamoDB(config.aws_remote_config);


//------------CRUD GENEROS---
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

//------OBTENER TODOS LOS GENEROS
//------obtener todos los albumes del usuario
app.get('/generoliterario',function(req,res){

    var id_usuario = req.params.id_usuario;
  
  
  
    const params2 = {
      TableName: 'GeneroLiterario'
    };
  
    docClient.scan(params2, function (err, data) {
      if (err) {
       // res.send({status:200,mensaje:"OK", data: arreglo });
        res.send("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
      } else {
        console.log(data.Items.length);
  
        var arreglo = [];
  
        for (let i = 0; i < data.Items.length; i++) {
           objeto={id:data.Items[i].id.S,nombre:data.Items[i].nombre.S}
          arreglo.push(objeto);
        }
  
        res.send({status:200,mensaje:"OK", data: arreglo });
  
  
      }
    });
  
  
  
  });
  
  app.post('/insertarlista',function(req,res){

    //-------------primero verifico que no exista un album con ese nombre
    var nombre=req.body.nombre; 
    var id_genero = generarID();
    var lista=["ficcion","drama","comedia"];
    const params1 = {
      TableName: 'Libros',
      FilterExpression: "#cg = :data",
      ExpressionAttributeNames: {
          "#cg": "nombre",
      },
    
      ExpressionAttributeValues: {
          ":data": { S: nombre},
      }
    };
    
    console.log("LLegue al primer punto")
    
    // Call DynamoDB to read the item from the table
    docClient.scan(params1, async function(err, data) {
      if (err) {
        console.log("Error", err);
      } else  {
    
        if(data.Items.length!=0){
          res.send({
            status:409,
            mensaje: "Libro ya existe"
            });
        }else {


            console.log("LLegue al segundo punto")
    //---Si no existe paso a crear el album
    const params = {
    TableName:'Libros',
    Item: {
      'nombre': {S: nombre},
      'id': {S: id_genero},
      'generos': {SS: lista}
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


    //----actualizar listaprueba
      
  app.post('/actualizarlista',function(req,res){

    //-------------primero verifico que no exista un album con ese nombre
    var nombre=req.body.nombre; 
    var id_genero = req.body.id;
    var lista=["BARCELONA","MADRID","FRANCIA"];
  
    
    const params = {
        TableName: "Libros",
        Key: {
            "id": { S: id_genero },
  
        },
        ExpressionAttributeValues: {
           
            ':generos': { SS: lista }
            
        },
        UpdateExpression: "set generos = :generos",
    };
  
  
  
   var a= docClient.updateItem(params, function (err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
          console.log(data)
         console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
         res.send({
           status:200,
           mensaje: "OK",
           data: {
           id:id_genero,
         
         }
           });
       
           // res.send(JSON.stringify(data));
  
        }
    });
    
    });

app.listen(port);