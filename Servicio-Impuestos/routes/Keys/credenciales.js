let aws_keys = {
  dynamodb: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: "us-east-1",
  }
};
module.exports = aws_keys;
