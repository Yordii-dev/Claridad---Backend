const express = require("express");

const { getDataByRuc } = require("../controllers/sunat.controller");
const router = express.Router();

router.get("/sunat/:ruc", getDataByRuc);

module.exports = router;
