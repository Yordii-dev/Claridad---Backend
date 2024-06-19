const express = require("express");

const {
  sendMail,
  validate_code,
  chance_password,
} = require("../controllers/mail.controller");
const router = express.Router();

router.post("/mail", sendMail);
router.post("/code_validate", validate_code);
router.post("/chance_password", chance_password);

module.exports = router;
