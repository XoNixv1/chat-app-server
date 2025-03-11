const pool = require("../config/db");

const getUserIdByEmailService = async (email) => {
  try {
    const newUserIdRows = await pool.query(queries.getUserId, [email]);
    const { id } = newUserIdRows.rows[0];

    return id;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  getUserIdByEmailService,
};
