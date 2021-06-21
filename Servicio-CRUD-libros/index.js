var express = require("express");
const AWS = require("./Servicios/AWS");
var cors = require("cors");
var bodyParser = require("body-parser");
const config = require("./Servicios/config.js");
const crypto = require("crypto");
var app = express();
const generarID = () => crypto.randomBytes(10).toString("hex");

const bucket_name = "imagenesproyectosa";
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });
var docClient = new AWS.DynamoDB(config.aws_remote_config);

port = 4040;
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(cors());

//------------CRUD LIBROS---
//----crear libro
app.post("/libros", function (req, res) {
  //-------------primero verifico que no exista un libro con ese nombre

  var id_libro = generarID();
  var nombre = req.body.nombre;
  var generos = req.body.generos;
  var stock = req.body.stock;
  var autor = req.body.autor;
  var editorial = req.body.editorial;
  var id_editorial = req.body.id_editorial;
  var numeropaginas = req.body.paginas;
  var fechapublicacion = req.body.fechapublicacion;
  var idioma = req.body.idioma;
  var foto = req.body.foto;
  var precio = req.body.precio;

  const params1 = {
    TableName: "Libros",
    FilterExpression: "#cg = :data",
    ExpressionAttributeNames: {
      "#cg": "nombre",
    },

    ExpressionAttributeValues: {
      ":data": { S: nombre },
    },
  };

  // Call DynamoDB to read the item from the table
  docClient.scan(params1, async function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      if (data.Items.length != 0) {
        res.send({
          status: 409,
          mensaje: "Nombre ya existe",
        });
      } else {
        //---Si no existe paso a crear el libro

        //-----------SUBIR IMAGEN A S3

        ubicacion = await upload_file(id_libro + ".png", foto);
        object_url =
          "https://imagenesproyectosa.s3.amazonaws.com/" + id_libro + ".png";
        //console.log("LA IMAGEN DE PERFIL SE GUARDO EN "+object_url);

        const params = {
          TableName: "Libros",
          Item: {
            id: { S: id_libro },
            nombre: { S: nombre },
            generos: { SS: generos },
            stock: { S: stock },
            autor: { S: autor },
            editorial: { S: editorial },
            id_editorial: { S: id_editorial },
            numeropaginas: { S: numeropaginas },
            fechapublicacion: { S: fechapublicacion },
            idioma: { S: idioma },
            imagen: { S: object_url },
            precio: { S: precio },
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
              mensaje: { nombre: nombre, id: id_libro },
            });
          }
        });
      }
    }
  });
});



//---Crear libro simple

app.post("/librossimple", function (req, res) {
  //-------------primero verifico que no exista un libro con ese nombre

  var id_libro = generarID();
  var nombre = req.body.nombre;
  var generos = ["Aventura"];
  var stock = "150";
  var autor = req.body.autor;
  var editorial = req.body.editorial;
  var id_editorial = req.body.id_editorial;
  var numeropaginas = "100";
  var fechapublicacion = req.body.fechapublicacion;
  var idioma = "Español";
  var foto = "https://upload.wikimedia.org/wikipedia/commons/e/e5/Book_PNG2116.png";
  var precio = "300";

  const params1 = {
    TableName: "Libros",
    FilterExpression: "#cg = :data",
    ExpressionAttributeNames: {
      "#cg": "nombre",
    },

    ExpressionAttributeValues: {
      ":data": { S: nombre },
    },
  };

  // Call DynamoDB to read the item from the table
  docClient.scan(params1, async function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      if (data.Items.length != 0) {
        res.send({
          status: 409,
          mensaje: "Nombre ya existe",
        });
      } else {
        //---Si no existe paso a crear el libro

        //-----------SUBIR IMAGEN A S3

        // ubicacion = await upload_file(id_libro + ".png", foto);
        object_url =foto;
        //console.log("LA IMAGEN DE PERFIL SE GUARDO EN "+object_url);

        const params = {
          TableName: "Libros",
          Item: {
            id: { S: id_libro },
            nombre: { S: nombre },
            generos: { SS: generos },
            stock: { S: stock },
            autor: { S: autor },
            editorial: { S: editorial },
            id_editorial: { S: id_editorial },
            numeropaginas: { S: numeropaginas },
            fechapublicacion: { S: fechapublicacion },
            idioma: { S: idioma },
            imagen: { S: object_url },
            precio: { S: precio },
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
              mensaje: { nombre: nombre, id: id_libro },
            });
          }
        });
      }
    }
  });
});


//-----actualizar libro

app.post("/libros/modificar", async function (req, res) {
  var id_libro = req.body.id_libro;
  var nombre = req.body.nombre;
  var generos = req.body.generos;
  var stock = req.body.stock;
  var autor = req.body.autor;
  var editorial = req.body.editorial;
  var id_editorial = req.body.id_editorial;
  var numeropaginas = req.body.paginas;
  var fechapublicacion = req.body.fechapublicacion;
  var precio = req.body.precio;
  var idioma = req.body.idioma;
  var foto = req.body.foto;

  // Call DynamoDB to read the item from the table

  if (foto != "") {
    var nuevoid = generarID();
    //-----------SUBIR IMAGEN A S3
    try {
      let a = await upload_file(nuevoid + ".png", foto);
    } catch (e) {
      console.log("error");
    }

    object_url =
      "https://imagenesproyectosa.s3.amazonaws.com/" + nuevoid + ".png";
    //console.log("LA IMAGEN DE PERFIL SE GUARDO EN "+object_url);

    const params = {
      TableName: "Libros",
      Key: {
        id: { S: id_libro },
      },
      ExpressionAttributeValues: {
        ":nombre": { S: nombre },
        ":generos": { SS: generos },
        ":stock": { S: stock },
        ":autor": { S: autor },
        ":editorial": { S: editorial },
        ":id_editorial": { S: id_editorial },
        ":numeropaginas": { S: numeropaginas },
        ":fechapublicacion": { S: fechapublicacion },
        ":idioma": { S: idioma },
        ":imagen": { S: object_url },
        ":precio": { S: precio },
      },
      UpdateExpression:
        "set nombre=:nombre, generos=:generos, stock=:stock, autor=:autor, editorial=:editorial, id_editorial=:id_editorial, numeropaginas=:numeropaginas, fechapublicacion=:fechapublicacion, idioma=:idioma, precio=:precio, imagen=:imagen",
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
            id: id_libro,
            nombre: nombre,
            foto: object_url,
          },
        });

        // res.send(JSON.stringify(data));
      }
    });
  } else {
    //----si no viene foto
    console.log("MODIFICAR SIN FOTO");

    const params = {
      TableName: "Libros",
      Key: {
        id: { S: id_libro },
      },
      ExpressionAttributeValues: {
        ":nombre": { S: nombre },
        ":generos": { SS: generos },
        ":stock": { S: stock },
        ":autor": { S: autor },
        ":editorial": { S: editorial },
        ":id_editorial": { S: id_editorial },
        ":numeropaginas": { S: numeropaginas },
        ":fechapublicacion": { S: fechapublicacion },
        ":idioma": { S: idioma },
        ":precio": { S: precio },
      },
      UpdateExpression:
        "set nombre=:nombre, generos=:generos, stock=:stock, autor=:autor, editorial=:editorial, id_editorial=:id_editorial, numeropaginas=:numeropaginas, fechapublicacion=:fechapublicacion, idioma=:idioma, precio=:precio",
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
            id: id_libro,
            nombre: nombre
          },
        });

        // res.send(JSON.stringify(data));
      }
    });
  }
});


//----OBTENER LIBROS DE UNA EDITORIAL
app.get('/libros/:id_editorial',function(req,res){

  var id_editorial = req.params.id_editorial;



  const params2 = {
    TableName: 'Libros',
    FilterExpression: "#cg = :data",
    ExpressionAttributeNames: {
      "#cg": "id_editorial",
    },

    ExpressionAttributeValues: {
      ":data": { S: id_editorial },
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
          id_libro:data.Items[i].id.S,
          nombre:data.Items[i].nombre.S,
          generos:data.Items[i].generos.SS,
          stock:data.Items[i].stock.S,
          autor:data.Items[i].autor.S,
          editorial:data.Items[i].editorial.S,
          id_editorial:data.Items[i].id_editorial.S,
          numeropaginas:data.Items[i].numeropaginas.S,
          fechapublicacion:data.Items[i].fechapublicacion.S,
          idioma:data.Items[i].idioma.S,
          foto:data.Items[i].imagen.S,
          precio:data.Items[i].precio.S,
        }
        arreglo.push(objeto);
      }

      res.send({status:200,mensaje:"OK", data: arreglo });


    }
  });



});

//----ELIMINAR LIBRO
app.delete('/libros',function(req,res){
var id_libro=req.body.id_libro;
 

//----paso a eliminar en DYNAMO

var params2 = {
  TableName:"Libros",
  Key:{
      "id":  {"S": id_libro}
  }
};

console.log("Attempting a conditional delete...");
docClient.deleteItem(params2, function(err, data) {
  if (err) {
      console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
  } else {
      console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
     res.send(id_libro=id_libro)
  }
});
});


//------OBTENER TODOS LOS LIBROS

app.get("/libros", function (req, res) {
  var id_usuario = req.params.id_usuario;

  const params2 = {
    TableName: "Libros",
  };

  docClient.scan(params2, function (err, data) {
    if (err) {
      // res.send({status:200,mensaje:"OK", data: arreglo });
      res.send(
        "Unable to read item. Error JSON:",
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log(data.Items.length);

      var arreglo = [];

      for (let i = 0; i < data.Items.length; i++) {
        objeto={
         id_libro:data.Items[i].id.S,
         nombre:data.Items[i].nombre.S,
         generos:data.Items[i].generos.SS,
         stock:data.Items[i].stock.S,
         autor:data.Items[i].autor.S,
         editorial:data.Items[i].editorial.S,
         id_editorial:data.Items[i].id_editorial.S,
         numeropaginas:data.Items[i].numeropaginas.S,
         fechapublicacion:data.Items[i].fechapublicacion.S,
         idioma:data.Items[i].idioma.S,
         foto:data.Items[i].imagen.S,
         precio:data.Items[i].precio.S,
       }
       arreglo.push(objeto);
     }

      res.send({ status: 200, mensaje: "OK", data: arreglo });
    }
  });
});

//-----OBTENER SOLO UN LIBRO 
app.get('/libros/unlibro/:id_libro',function(req,res){

  var id_editorial = req.params.id_libro;



  const params2 = {
    TableName: 'Libros',
    FilterExpression: "#cg = :data",
    ExpressionAttributeNames: {
      "#cg": "id",
    },

    ExpressionAttributeValues: {
      ":data": { S: id_editorial },
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
          id_libro:data.Items[i].id.S,
          nombre:data.Items[i].nombre.S,
          generos:data.Items[i].generos.SS,
          stock:data.Items[i].stock.S,
          autor:data.Items[i].autor.S,
          editorial:data.Items[i].editorial.S,
          id_editorial:data.Items[i].id_editorial.S,
          numeropaginas:data.Items[i].numeropaginas.S,
          fechapublicacion:data.Items[i].fechapublicacion.S,
          idioma:data.Items[i].idioma.S,
          foto:data.Items[i].imagen.S,
          precio:data.Items[i].precio.S,
        }
        arreglo.push(objeto);
      }

      res.send({status:200,mensaje:"OK", data: arreglo });


    }
  });



});

//---------Subir imagen a S3
async function upload_file(path, payload) {
  return new Promise((resolve, reject) => {
    buffer = new Buffer.from(payload, "base64");

    const params = {
      Bucket: bucket_name,
      Key: path, // File name you want to save as in S3
      Body: buffer,
      ACL: "public-read",
      ContentEncoding: "base64", // required
      ContentType: `image/png`,
    };

    // Uploading files to the bucket
    s3.upload(params, function (err, data) {
      if (err) {
        console.log(err);
        reject(err);
      }
      console.log(`File uploaded successfully. ${data.Location}`);
      resolve(`File uploaded successfully. ${data.Location}`);
    });
  });
}

app.listen(port);
