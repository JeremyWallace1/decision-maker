// PG database client/connection setup
const { Pool } = require('pg');
const connectionString = process.env.POSTGRESQL__conn;

const db = new Pool({
  connectionString,
});

db.connect()
  .then(() => console.log('Successful database connection!'))
  .catch(err => console.log(err.message));

module.exports = db;
