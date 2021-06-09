require("dotenv").config();
const AWS = require("./Servicios/AWS");
const md5 = require("md5");
const cors = require("cors");
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const validaciones = require("./validaciones");
const funciones = require("./funciones");

app.use(express.json());

// Configuración de CORS
const corsOptions = { origin: true, optionsSuccessStatus: 200 };
app.use(cors(corsOptions));

app.put("/registro", async (req, res) => {
  let registro = req.body;

  if (registro.tipo === 1) {
    // Es una editorial
    if (!validaciones.validarDatosEditorial(registro))
      return res
        .status(400)
        .json({ mensaje: "Campos insuficientes para editorial" });

    registro = { ...registro, estado: "Pendiente de aprobación" };
  } else if (registro.tipo === 2) {
    // Es un cliente
    if (!validaciones.validarDatosCliente(registro))
      return res
        .status(400)
        .json({ mensaje: "Campos insuficientes para cliente" });
  } else {
    // Error
    return res.status(400).json({ mensaje: "Tipo de usuario incorrecto" });
  }

  const correoUnico = await validaciones.validarCorreoUsuario(registro.correo);

  if (!correoUnico)
    return res.status(400).json({ mensaje: "El usuario ya existe" });

  registro = {
    ...registro,
    usuario: crypto.randomBytes(24).toString("hex"),
    pwd: md5(registro.pwd),
  };

  const resultado = await funciones.insertarUsuario(registro);

  if (resultado.error)
    return res
      .status(400)
      .json({ mensaje: "Ocurrió un error al insertar el usuario" });

  const user = { usuario: registro.usuario, tipo: registro.tipo };
  const accesToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

  console.log("\n[REGISTRO] ", registro.nombre, "\n");
  res.status(201).json({ mensaje: resultado.mensaje, accesToken: accesToken });
});

app.post("/login", async (req, res) => {
  //Autenticar al usuario
  const correo = req.body.correo;
  const pwd = req.body.pwd;

  //Validar login
  const resultado = await funciones.loginUsuario(correo, pwd);
  console.log(resultado);

  if (resultado.length === 0)
    return res.status(404).json({ mensaje: "Credenciales inválidas" });

  const usuarioLogin = resultado[0];
  delete usuarioLogin.pwd;

  const user = { usuario: usuarioLogin.usuario, tipo: usuarioLogin.tipo };
  const acces_token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({ accesToken: acces_token, usuario: usuarioLogin });
});

app.post("/administrador/aprobar", autenticarToken, async (req, res) => {
  
  const usuarioAdmin = req.usuarioReq;

  if (!(usuarioAdmin && usuarioAdmin.tipo === 0))
    return res
      .status(403)
      .json({ mensaje: "No posee los permisos necesarios" });

  const usuarioEditorial = req.body.editorial
  const resultado = await funciones.aprobarEditorial(usuarioEditorial)

  if(resultado.error)
    return res.status(400).json({ mensaje: resultado.mensaje}) 

  res.status(200).json({ mensaje: resultado.mensaje})
});

function autenticarToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ mensaje: "No posee los permisos necesarios" });
    req.usuarioReq = user;
    next();
  });
}

app.listen(3000);
