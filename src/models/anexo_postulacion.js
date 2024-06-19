const { pool } = require("../databases/database");

const getAnexosPostulacion = async (id_postulacion) => {
  const response = await pool.query(
    `select * from ANEXO_POSTULACION
        where id_postulacion = ${id_postulacion}`
  );

  return response;
};

const createAnexoPostulacion = async (nombre, extension, id_postulacion) => {
  const response = await pool.query(
    `insert into ANEXO_POSTULACION(
            nombre,
            extension,
            id_postulacion
        ) 
        values(
      '${nombre}',    
      '${extension}',
      ${id_postulacion}
    )`
  );

  return response;
};

module.exports = { getAnexosPostulacion, createAnexoPostulacion };
