const express = require("express");

const {
  uploadAnexoPostulacion,
  getAnexosPostulacion,
} = require("../controllers/anexo_postulacion.controller");
const multer = require("../middlewares/multer");
const auth = require("../middlewares/auth");
const router = express.Router();

router.get("/anexos_postulacion/:id_postulacion", auth, getAnexosPostulacion);
router.post("/anexos_postulacion", multer, uploadAnexoPostulacion);

module.exports = router;
