const express = require("express");
const cors = require("cors");
const createEndpoint = require("./helpers/resource");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/server", createEndpoint("requerimientos", "REQUERIMIENTO"));
/*
app.use(
  '/server',
  createEndpoint('products', 'PRODUCT', {
    get: 'GET_PRODUCTS()',
  })
)
app.use('/server', createEndpoint('providers', 'PROVIDER'))
*/

//Others
app.use("/server", require("./routes/"));

module.exports = app;
