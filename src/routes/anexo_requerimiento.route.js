const express = require("express");

const {
  uploadAnexoRequerimiento,
  getAnexosRequerimiento,
} = require("../controllers/anexo_requerimiento.controller");
const multer = require("../middlewares/multer");
const auth = require("../middlewares/auth");
const router = express.Router();

router.get(
  "/anexos_requerimiento/:id_requerimiento",
  auth,
  getAnexosRequerimiento
);
router.post("/anexos_requerimiento", multer, uploadAnexoRequerimiento);

module.exports = router;
