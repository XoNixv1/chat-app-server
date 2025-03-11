const pool = require("../config/db");
const { checkEmailExists } = require("../queries/authQueries");

const checkEmailService = async (email) => {
  try {
    const user = await pool.query(checkEmailExists, [email]);

    if (user.rows.length > 0) {
      return true;
    }

    return false;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  checkEmailService,
};
