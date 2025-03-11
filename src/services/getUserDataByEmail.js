const pool = require("../config/db");
const { getUserByEmail } = require("../queries/authQueries");

const getUserDataByEmail = async (email) => {
  try {
    const result = await pool.query(getUserByEmail, [email]);

    if (result.rows.length === 0) {
      return false;
    }

    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = { getUserDataByEmail };
