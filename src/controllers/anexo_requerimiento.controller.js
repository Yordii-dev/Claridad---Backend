const Anexo = require("../models/anexo_requerimiento");
const path = require("path");
const jwt = require("../helpers/jwt");
const { JsonWebTokenError } = require("jsonwebtoken");

const {
  errorResponse,
  successResponse,
  failResponse,
} = require("../helpers/httpResponse");

const getAnexosRequerimiento = async (req, res) => {
  try {
    jwt.verify(req.token);

    const anexos = await Anexo.getAnexosRequerimiento(
      req.params.id_requerimiento
    );

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

const uploadAnexoRequerimiento = async (req, res) => {
  try {
    console.log("ok");
    const promises = req.files.map((file) => {
      return Anexo.createAnexoRequerimiento(
        file.filename,
        path.extname(file.filename).substring(1),
        req.body.id_requerimiento
      );
    });

    const results = await Promise.all(promises);
    res.json(successResponse(results));
  } catch (error) {
    res.status(500).json(errorResponse("Al subir anexo" + error));
  }
};

module.exports = { uploadAnexoRequerimiento, getAnexosRequerimiento };
