const Sunat = require("../models/sunat");
const {
  successResponse,
  failResponse,
  errorResponse,
} = require("../helpers/httpResponse");

const getDataByRuc = async (req, res) => {
  try {
    let sunatData = await Sunat.getDataByRuc(req.params.ruc);
    if (sunatData.razonSocial) {
      res.json(successResponse({ sunatData }));
    } else {
      res.json(
        failResponse(sunatData.message || "Error al obtener informacion de ruc")
      );
    }
  } catch (error) {
    res.status(500).json(errorResponse(`Al consultar Sunat Api, ${error}`));
  }
};

module.exports = { getDataByRuc };
