require("dotenv").config();
const AWS = require('./Servicios/AWS')
const cors = require("cors");
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const validaciones = require("./validaciones");

app.use(express.json());

// Configuración de CORS
const corsOptions = { origin: true, optionsSuccessStatus: 200 };
app.use(cors(corsOptions));

const posts = [
  {
    username: "chechajosue",
    title: "Post 1",
  },
  {
    username: "John",
    title: "Post 2",
  },
];

app.get("/posts", autenticarToken, (req, res) => {
  console.log(req.usuarioReq);
  res.send("OK");
  //res.json(posts.filter((post) => post.username === req.usuario.user));
});

//registro = { nombres, apellidos, correo, pwd, telefono } = req.body;

app.put("/registro", async (req, res) => {
  let registro = req.body;

  if (registro.tipo === 1) {
    // Es una editorial
    if (!validaciones.validarDatosEditorial(registro))
      return res.status(400).json({ mensaje: 'Campos insuficientes para editorial'});
  } else if (registro.tipo === 2) {
    // Es un cliente
    if (!validaciones.validarDatosCliente(registro))
        return res.status(400).json({ mensaje: 'Campos insuficientes para cliente'});
  } else {
    // Error
    return res.status(400).json({ mensaje: 'Tipo de usuario incorrecto'});
  }

  const correoUnico = await validaciones.validarCorreoUsuario(registro.correo);

  if (!correoUnico) 
    return res.status(400).json({ mensaje: 'El usuario ya existe'});

  registro = { ...registro, usuario: crypto.randomBytes(48).toString("hex") };

  const user = { usuario: registro.usuario, tipo: registro.tipo };
  const accesToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.status(200).json({ accesToken: accesToken });
});

app.post("/login", (req, res) => {
  //Autenticar al usuario
  const usuario = req.body.usuario;
  const pwd = req.body.pwd;

  //Validar login

  const user = { user: usuario };
  const acces_token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({ accesToken: acces_token });
});

function autenticarToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.usuarioReq = user;
    next();
  });
}

app.listen(3000);
