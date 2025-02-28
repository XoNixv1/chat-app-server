const Pool = require("pg").Pool;

const pool = new Pool({
  host: "localhost",
  password: "209196maxnet",
  user: "postgres",
  database: "chat_db",
  port: 5432,
});

module.exports = pool;
