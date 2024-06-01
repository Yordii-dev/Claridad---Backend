const { pool } = require("../databases/database");
const getUser = async ({ correo, contrasena }) => {
  let result = await pool.query(
    `select * from USUARIO where correo = '${correo}' and contrasena = '${contrasena}'`
  );

  return result.lenght == 0 ? null : result[0];
};

module.exports = { getUser };
