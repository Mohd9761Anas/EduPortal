// // db.js file
// const { Pool } = require("pg");

// const pool = new Pool({
//     user: "postgres",
//     host: "localhost",
//     database: "EduPortal",
//     password: "Anas@1234",
//     port: 5432,
// });

// module.exports = pool;
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.connect((err, client, done) => {
  if (err) throw err;
  console.log('Connected to the database');
});

module.exports = pool;

