const Anexo = require("../models/anexo_postulacion");
const path = require("path");
const jwt = require("../helpers/jwt");
const { JsonWebTokenError } = require("jsonwebtoken");

const {
  errorResponse,
  successResponse,
  failResponse,
} = require("../helpers/httpResponse");

const getAnexosPostulacion = async (req, res) => {
  try {
    jwt.verify(req.token);

    const anexos = await Anexo.getAnexosPostulacion(req.params.id_postulacion);

    res.json(successResponse({ anexos }));
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      res.json(failResponse(`Token invalido al obtener anexos`));
      return;
    }
    res.json(errorResponse(`Al obtener anexos`));
  }

  try {
  } catch (error) {
    res.status(500).json(errorResponse("Al obtener anexos" + error));
  }
};

const uploadAnexoPostulacion = async (req, res) => {
  try {
    console.log("ok");
    const promises = req.files.map((file) => {
      return Anexo.createAnexoPostulacion(
        file.filename,
        path.extname(file.filename).substring(1),
        req.body.id_postulacion
      );
    });

    const results = await Promise.all(promises);
    res.json(successResponse(results));
  } catch (error) {
    res.status(500).json(errorResponse("Al subir anexo" + error));
  }
};

module.exports = { getAnexosPostulacion, uploadAnexoPostulacion };
