var express = require('express');
const AWS = require('./Servicios/AWS')
var cors = require('cors')
var bodyParser = require('body-parser')
const config = require('./Servicios/config.js');
const crypto = require('crypto');
var app = express();
const generarID = () => crypto.randomBytes(10).toString("hex");

const bucket_name = 'practica2-g28-imagenes'
const s3 = new AWS.S3({apiVersion: '2006-03-01'})
var docClient = new AWS.DynamoDB(config.aws_remote_config);

port = 4040;
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(cors());



//------------CRUD LIBROS---
app.post('/libros',function(req,res){

    //-------------primero verifico que no exista un libro con ese nombre

    var id_libro = generarID();
    var nombre=req.body.nombre; 
    var generos=req.body.generos;
    var stock=req.body.stock;
    var autor=req.body.autor;
    var editorial=req.body.editorial;
    var numeropaginas=req.body.paginas;
    var fechapublicacion=req.body.fechapublicacion;
    var idioma=req.body.idioma;


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
    
     
    // Call DynamoDB to read the item from the table
    docClient.scan(params1, async function(err, data) {
      if (err) {
        console.log("Error", err);
      } else  {
    
        if(data.Items.length!=0){
          res.send({
            status:409,
            mensaje: "Nombre ya existe"
            });
        }else {


    //---Si no existe paso a crear el libro
    const params = {
    TableName:'Libros',
    Item: {
 
      'id': {S: id_libro},
      'nombre': {S: nombre},
      'generos': {SS: generos},
      'stock': {N: stock},
      'autor': {S: autor},
      'editorial': {S: editorial},
      'numeropaginas': {N: numeropaginas},
      'fechapublicacion': {S: fechapublicacion},
      'idioma': {S: idioma}
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
     mensaje: {nombre:nombre,id:id_libro}
     });
      }
    } );
    
        }
    
      }
    });
    
    
    });

//------OBTENER TODOS LOS LIBROS

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
    var lista2=req.body.lista;
    console.log("La lista es "+lista2)
    
    const params = {
        TableName: "Libros",
        Key: {
            "id": { S: id_genero },
  
        },
        ExpressionAttributeValues: {
           
            ':generos': { SS: lista2 }
            
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



 //---------Subir imagen a S3
async function upload_file(path, payload){
  return new Promise((resolve, reject) => {
    buffer = new Buffer.from(payload,'base64')

    const params = {
      Bucket: bucket_name,
      Key: path, // File name you want to save as in S3
      Body: buffer,
      ACL:'public-read',
      ContentEncoding: 'base64', // required
      ContentType: `image/png`
    };
    
    // Uploading files to the bucket
    s3.upload(params, function(err, data) {
        if (err) {
          console.log(err)
          reject(err)
        }
        console.log(`File uploaded successfully. ${data.Location}`)
        resolve(`File uploaded successfully. ${data.Location}`)
    });
  })
}

   
app.listen(port);