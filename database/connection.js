// all code  related to database
// conection for everytime you send a query
//npm install pg which is the node-postgres library for connecting and querying a postgreSQL database.
const pg = require('pg');
require('dotenv').config();
let databaseUrl = process.env.DATABASE_URL;
let options = {};

if (process.env.NODE_ENV === 'test') {
  databaseUrl = process.env.TEST_DATABASE_URL;
  options = {
    connectionString: databaseUrl
  };
} else {
  options = {
    connectionString: databaseUrl,
    ssl: { rejectUnauthorized: false }
  };
}

const db = new pg.Pool(options);

module.exports = db;
// const options = {
//     connectionString: databaseUrl,
//
//   };
//   const db = new pg.Pool(options);
