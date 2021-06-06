const AWS = require("aws-sdk");
const jwt = require("jsonwebtoken");

AWS.config.update({
  region: "us-east-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});


const doc_client = new AWS.DynamoDB.DocumentClient();

function verify_token(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err)
      return res
        .status(403)
        .json({ mensaje: "Access denied." });
    req['usuarioReq'] = user;
    next();
  });
}

function wrap_function(anotherFunction,debugInfo=null) {
  return function (req, res) {
	  if(debugInfo)console.log(debugInfo);
    anotherFunction(req, res).catch((err) => {
      return res.status(500).json({
        message: err["message"] ? err["message"] : "Internal server error."
      });
    });
  };
}

module.exports = {doc_client, verify_token, wrap_function};
