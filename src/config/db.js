const Pool = require("pg").Pool;
require("dotenv").config();
const pass = process.env.DB_PASS;
const host = process.env.HOST;

const pool = new Pool({
  host: host,
  password: pass,
  user: "xonix",
  database: "chat_app_db_7n7i",
  port: 5432,
});

pool
  .connect()
  .then(() => {
    console.log("Connected to the database successfully!");
    client.end();
  })
  .catch((err) => {
    console.error("Connection to the database failed:", err);
  });

module.exports = pool;
