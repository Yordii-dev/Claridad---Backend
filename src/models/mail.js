const { pool } = require("../databases/database");
const crypto = require("crypto");

const getUserByMail = async (correo) => {
  let result = await pool.query(
    `select * from USUARIO where correo = '${correo}'`
  );

  return result.lenght == 0 ? null : result[0];
};

const setCode = async (correo, codigo_recuperacion) => {
  let response = await pool.query(
    `update USUARIO set codigo_recuperacion = '${codigo_recuperacion}' where correo = '${correo}'`
  );

  if (response.affectedRows == 0)
    return { fail: "No se pudieron insertar los datos personales" };
};

function generateRandomCode(length) {
  const digits = "0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, digits.length);
    code += digits[randomIndex];
  }
  return code;
}

const validateCode = async (correo, codigo_recuperacion) => {
  let result = await pool.query(
    `select * from USUARIO where codigo_recuperacion = '${codigo_recuperacion}' and correo = '${correo}'`
  );

  return result.lenght == 0 ? null : result[0];
};

const chance_password = async (correo, contrasena) => {
  let response = await pool.query(
    `update USUARIO set contrasena = '${contrasena}' where correo = '${correo}'`
  );

  if (response.affectedRows == 0)
    return { fail: "No se pudo actualizar la contraseña" };
};

module.exports = {
  getUserByMail,
  generateRandomCode,
  setCode,
  validateCode,
  chance_password,
};
