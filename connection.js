// all code  related to database 
// conection for everytime you send a query
//npm install pg which is the node-postgres library for connecting and querying a postgreSQL database.
const pg = require('pg');
const dotenv = require("dotenv");

dotenv.config();


const conectionString = process.env.DATABASE_URL;
