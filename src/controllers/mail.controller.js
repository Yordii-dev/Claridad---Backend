const Mail = require("../models/mail");
require("dotenv").config({ path: `.env.development` });

const {
  successResponse,
  failResponse,
  errorResponse,
} = require("../helpers/httpResponse");
const nodemailer = require("nodemailer");

const sendMail = async (req, res) => {
  try {
    const { to, text } = req.body;
    let user = await Mail.getUserByMail(to);

    if (!user) {
      return res.send(
        failResponse("El correo no esta registrado en el sistema")
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_SENT,
        pass: process.env.PASSWORD_SENT,
      },
    });

    let codigo = Mail.generateRandomCode(10);
    const mailOptions = {
      from: process.env.MAIL_SENT,
      to: to,
      subject: "Correo de recuperacion de contraseña",
      text: "Usa este codigo para recuperar tu contraseña: " + codigo,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send(failResponse(error.toString()));
      }

      Mail.setCode(to, codigo);
      res.status(200).send(successResponse("Email enviado: " + info.response));
    });
  } catch (error) {
    res
      .status(500)
      .json(errorResponse(`Al enviar mail de recuperacion, ${error}`));
  }
};

const validate_code = async (req, res) => {
  try {
    let respuesta = await Mail.validateCode(
      req.body.correo,
      req.body.codigo_recuperacion
    );

    if (respuesta) {
      res.status(200).send(successResponse());
    } else {
      res
        .status(500)
        .send(failResponse("El codigo de recuperacion es incorrecto"));
    }
  } catch (error) {
    res
      .status(500)
      .json(errorResponse(`Al validar codigo de recuperacion, ${error}`));
  }
};

const chance_password = async (req, res) => {
  try {
    let respuesta = await Mail.chance_password(
      req.body.correo,
      req.body.contrasena
    );

    if (respuesta?.fail) {
      res.status(500).send(failResponse(respuesta.fail));
    } else {
      res.status(200).send(successResponse());
    }
  } catch (error) {
    res
      .status(500)
      .json(errorResponse(`Al validar codigo de recuperacion, ${error}`));
  }
};

module.exports = { sendMail, validate_code, chance_password };
