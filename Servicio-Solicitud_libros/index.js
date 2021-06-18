var express = require("express");
var fs = require('fs');
const AWS = require("./Servicios/AWS");
var cors = require("cors");
var bodyParser = require("body-parser");
const config = require("./Servicios/config.js");
const crypto = require("crypto");
var app = express();
const generarID = () => crypto.randomBytes(10).toString("hex");

const bucket_name = "pdfsa";
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });
var docClient = new AWS.DynamoDB(config.aws_remote_config);

port = 4080;
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(cors());


//----crear solicitud
app.post("/libros/nuevasolicitud", async function (req, res) {
    //-------------primero verifico que no exista un libro con ese nombre
  
    var id = generarID();
    var nombre = req.body.nombre;
    var autor = req.body.autor;
    var fecha = req.body.fecha;
    var pdf= req.body.pdf;
  
    const params1 = {
      TableName: "SolicitudLibro",
      FilterExpression: "#cg = :data",
      ExpressionAttributeNames: {
        "#cg": "nombre",
      },
  
      ExpressionAttributeValues: {
        ":data": { S: nombre },
      },
    };
  //--escribir un pdf
  await fs.writeFileSync(`./somepdf.pdf`, pdf, 'base64');
    // Call DynamoDB to read the item from the table
    docClient.scan(params1, async function (err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        if (data.Items.length != 0) {
          res.send({
            status: 409,
            mensaje: "Solicitud con ese nombre ya existe",
          });
        } else {
          //---Si no existe paso a crear el libro
  
          //-----------SUBIR IMAGEN A S3
  //console.log("voy agregar un pdf")
          ubicacion = await upload_file(id + ".pdf", pdf);
          object_url =
            "https://pdfsa.s3.amazonaws.com/" + id + ".pdf";
          //console.log("LA IMAGEN DE PERFIL SE GUARDO EN "+object_url);
  
          const params = {
            TableName: "SolicitudLibro",
            Item: {
              id: { S: id },
              nombre: { S: nombre },
              autor: { S: autor },
              fecha: { S: fecha },
              pdf: { S: object_url },
              estado: {S: "Pendiente"} //--a la hora de cambiarlo pasa a "Aprobado"
           
            },
          };
  
          docClient.putItem(params, function (err, data) {
            if (err) {
              res.send({
                status: 400,
                mensaje: "Error: Server error" + err,
              });
            } else {
              console.log("SI ENTRE A PUT " + data);
              res.send({
                status: 200,
                mensaje: { nombre: nombre, id: id },
              });
            }
          });
        }
      }
    });
  });
  


  //-----actualizar solicitud

app.post("/libros/nuevasolicitud/modificar", async function (req, res) {
   var id=req.body.id;
  
    // Call DynamoDB to read the item from the table
  
   var estado="Aprobado"
      //----si no viene foto
      console.log("MODIFICAR SIN FOTO");
  
      const params = {
        TableName: "SolicitudLibro",
        Key: {
          id: { S: id },
        },
        ExpressionAttributeValues: {
          ":estado": { S: estado }
        },
        UpdateExpression:
          "set estado=:estado",
      };
  
      var a = docClient.updateItem(params, function (err, data) {
        if (err) {
          console.error(
            "Unable to read item. Error JSON:",
            JSON.stringify(err, null, 2)
          );
        } else {
          console.log(data);
          console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
          res.send({
            status: 200,
            mensaje: "OK",
            data: {
              id: id
            },
          });
  
          // res.send(JSON.stringify(data));
        }
      });
    
  });
  

//----obtener todas las solicitudes pendientes
//----OBTENER solicitudes pendientes
app.get('/libros/solicitudes',function(req,res){

    var estado = "Pendiente";
  
  
  
    const params2 = {
      TableName: 'SolicitudLibro',
      FilterExpression: "#cg = :data",
      ExpressionAttributeNames: {
        "#cg": "estado",
      },
  
      ExpressionAttributeValues: {
        ":data": { S: estado },
      }
    };
   
    docClient.scan(params2, function (err, data) {
      if (err) {
       // res.send({status:200,mensaje:"OK", data: arreglo });
        res.send("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
      } else {
       // console.log(data.Items.);
  
        var arreglo = [];
     
        for (let i = 0; i < data.Items.length; i++) {
           objeto={
            id:data.Items[i].id.S,
            nombre:data.Items[i].nombre.S,
            autor:data.Items[i].autor.S,
            pdf:data.Items[i].pdf.S,
            estado:data.Items[i].estado.S,
            fecha:data.Items[i].fecha.S
            
          }
          arreglo.push(objeto);
        }
  
        res.send({status:200,mensaje:"OK", data: arreglo });
  
  
      }
    });
  
  
  
  });  
  async function upload_file(path, payload) {
    return new Promise((resolve, reject) => {
      buffer = new Buffer.from(payload, "base64");
  
      const params = {
        Bucket: bucket_name,
        Key: path, // File name you want to save as in S3
        Body: buffer,
        ContentEncoding: 'base64',
        ACL: "public-read",
        ContentType: "application/pdf",
      };
  
      // Uploading files to the bucket
      console.log("LLEGUE AQUI")
      s3.upload(params, function (err, data) {
        if (err) {
        //  console.log(err);
         // reject(err);
         console.log("ocurrio un error")
        }
        console.log(`File uploaded successfully. ${data.Location}`);
        resolve(`File uploaded successfully. ${data.Location}`);
      });
    });
  }


 //----OBTENER solicitudes aprobadas
app.get('/libros/solicitudes/aprobadas',function(req,res){

    var estado = "Aprobado";
  
  
  
    const params2 = {
      TableName: 'SolicitudLibro',
      FilterExpression: "#cg = :data",
      ExpressionAttributeNames: {
        "#cg": "estado",
      },
  
      ExpressionAttributeValues: {
        ":data": { S: estado },
      }
    };
   
    docClient.scan(params2, function (err, data) {
      if (err) {
       // res.send({status:200,mensaje:"OK", data: arreglo });
        res.send("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
      } else {
       // console.log(data.Items.);
  
        var arreglo = [];
     
        for (let i = 0; i < data.Items.length; i++) {
           objeto={
            id:data.Items[i].id.S,
            nombre:data.Items[i].nombre.S,
            autor:data.Items[i].autor.S,
            pdf:data.Items[i].pdf.S,
            estado:data.Items[i].estado.S,
            fecha:data.Items[i].fecha.S
            
          }
          arreglo.push(objeto);
        }
  
        res.send({status:200,mensaje:"OK", data: arreglo });
  
  
      }
    });
  
  
  
  });  

  
  async function upload_file(path, payload) {
    return new Promise((resolve, reject) => {
      buffer = new Buffer.from(payload, "base64");
  
      const params = {
        Bucket: bucket_name,
        Key: path, // File name you want to save as in S3
        Body: buffer,
        ContentEncoding: 'base64',
        ACL: "public-read",
        ContentType: "application/pdf",
      };
  
      // Uploading files to the bucket
      console.log("LLEGUE AQUI")
      s3.upload(params, function (err, data) {
        if (err) {
        //  console.log(err);
         // reject(err);
         console.log("ocurrio un error")
        }
        console.log(`File uploaded successfully. ${data.Location}`);
        resolve(`File uploaded successfully. ${data.Location}`);
      });
    });
  }

  app.listen(port);
