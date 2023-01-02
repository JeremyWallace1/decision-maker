// PG database client/connection setup
const { Pool } = require('pg');
const connectionString = process.env.POSTGRESQL__conn;

// const dbParams = {
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME
// };

// const db = new Pool(dbParams);
const db = new Pool({
  connectionString,
});

db.connect()
  .then(() => console.log('successful database connection!'))
  .catch(err => console.log(err.message));

module.exports = db;
