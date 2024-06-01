const { pool } = require("../databases/database");
const createUser = async ({
  correo,
  contrasena,

  dni,
  nombre,
  apellido,
  direccion,
  telefono,
  ruc,
  razon_social,
  numero_cuenta,
}) => {
  const response_datos = await pool.query(
    `insert into DATOS_PERSONALES(
      dni,
      nombre,
      apellido,
      direccion,
      telefono,
      ruc,
      razon_social,
      numero_cuenta
    ) 
    values(
      '${dni}',
      '${nombre}',
      '${apellido}',
      '${direccion}',
      '${telefono}',
      '${ruc}',
      '${razon_social}',
      '${numero_cuenta}'
    )`
  );

  if (response_datos.affectedRows == 0)
    return { fail: "No se pudieron insertar los datos personales" };

  const id_datos_personales = response_datos.insertId;
  const id_rol = 2;

  const response = await pool.query(
    `insert into USUARIO(correo, contrasena, id_datos_personales, id_rol) 
        values('${correo}', '${contrasena}', ${id_datos_personales}, ${id_rol})`
  );

  return response;
};

module.exports = { createUser };
