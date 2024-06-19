const express = require("express");
const cors = require("cors");
const createEndpoint = require("./helpers/resource");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  "/server",
  createEndpoint(
    "requerimientos",
    "REQUERIMIENTO",
    {
      get: "GET_REQUERIMIENTOS",
    },
    ["id"],
    ["id_requerimiento"]
  )
);
app.use(
  "/server",
  createEndpoint("usuarios", "USUARIO", {
    getById: "GET_USUARIO_BY_ID",
  })
);
app.use("/server", createEndpoint("postulaciones", "POSTULACION"));
app.use(
  "/server",
  createEndpoint(
    "postulaciones_usuario",
    "POSTULACION",
    {
      getById: "POSTULACION_DE_USUARIO",
    },
    ["id_requerimiento", "id_usuario"]
  )
);

app.use(
  "/server",
  createEndpoint(
    "postulaciones_requerimiento",
    "POSTULACION",
    {
      getById: "POSTULACIONES_DE_REQUERIMIENTO",
    },
    ["id_requerimiento"]
  )
);

//Others
app.use("/server", require("./routes/"));

app.use("/preview_anexos", express.static(path.join(__dirname, "\\uploads")));

module.exports = app;
