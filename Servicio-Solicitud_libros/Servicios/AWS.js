// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');

// Set the region 
AWS.config.update({region: 'us-east-1'});

// Load creadetials
AWS.config.loadFromPath('./awscredentials.json')

module.exports = AWS