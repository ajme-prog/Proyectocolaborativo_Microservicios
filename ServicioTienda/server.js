const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = express.Router();
const utils = require('./Utility');
const main = require('./main.js');

const w = utils.wrap_function;
const v = utils.verify_token;

router.post("/feed", v, w(main.feed));
router.post("/search", v, w(main.search));

const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(router)

const port = process.env.PORT;
const server = app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }
  const host = server.address();
  console.log(`SA server listening on ${JSON.stringify(host)}`);
});
