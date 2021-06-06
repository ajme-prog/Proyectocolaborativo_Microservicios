const doc_client = require('./Utility').doc_client;

async function feed(req, res) {
  const params = {
    TableName: "usuario",
    FilterExpression: "correo = :corr",
    ExpressionAttributeValues: {":corr": "josue@gmail.com"}
  }

  const profile = await doc_client.scan(params).promise();
  return res.send({
    profile: profile.Items[0]
  });
}

async function profile(req, res) {
  return res.send({"status":"Not implemented yet"});
}

module.exports = {feed, profile};
