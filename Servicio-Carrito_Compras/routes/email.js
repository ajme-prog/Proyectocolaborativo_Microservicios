const nodemailer = require("nodemailer");

function send_email(target, contenido) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.email,
      pass: process.env.email_pass,
    },
  });
  const mailOptions = {
    from: process.env.email,
    to: target,
    subject: "Compra realizada con éxito",
    text: contenido,
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent successfully to: " + target);
    }
  });
}

function notice_purchase(id,pedido,dynamoClient){
  //obtener el correo del usuario a partir de su ID.
   const params = {
    Key: {
     "usuario": { S: id } 
    }, 
    TableName: "usuario"
   };
  dynamoClient.getItem(params, function (err, data) {
    if (err) {
      console.log("Error al intentar envíar correo. Usuario no encontrado: "+id);
    } else {
      console.log(data.Item);
      send_email(data.Item.correo.S, pedido); //Mandar el correo
    }
  });
}

module.exports = notice_purchase;
