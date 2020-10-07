// all code  related to database
// conection for everytime you send a query
//npm install pg which is the node-postgres library for connecting and querying a postgreSQL database.
const pg = require('pg');
const dotenv = require('dotenv');
const databaseurl = process.env.DATABASE_URL;

dotenv.config();

const options = {
  connectionString: databaseurl
  // ssl: { rejectUnauthorized: false }
  // ssl: true
};

if (process.env.NODE_ENV === 'test') {
  databaseurl = process.env.TEST_DATABASE_URL;
}

const db = new pg.Pool(options);

module.exports = db;
// const options = {
//     connectionString: databaseUrl,
//     ssl: { rejectUnauthorized: false },
//   };
//   const db = new pg.Pool(options);
