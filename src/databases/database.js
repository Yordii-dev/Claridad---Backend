const mysql = require("mysql");
require("dotenv").config({ path: `.env.development` });

const util = require("util");

const config = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  insecureAuth: true,
  multipleStatements: true,
};

const pool = mysql.createPool(config);

pool.getConnection((err, connection) => {
  if (connection) {
    connection.release();
    console.log("DB is connected");
  } else {
    console.log(err.code);
  }
});

pool.query = util.promisify(pool.query);
const getConnection = () => {
  return util.promisify(pool.getConnection).call(pool);
};

const beginTransaction = (connection) => {
  return util.promisify(connection.beginTransaction).call(connection);
};

const rollback = (connection) => {
  console.log("\n\nEjecutando Rollback...\n\n");
  return util.promisify(connection.rollback).call(connection);
};

const commit = (connection) => {
  return util.promisify(connection.commit).call(connection);
};

module.exports = {
  pool,
  getConnection: getConnection,
  beginTransaction: beginTransaction,
  rollback: rollback,
  commit: commit,
};
