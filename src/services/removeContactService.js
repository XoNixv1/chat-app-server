const pool = require("../config/db");
const { deleteFullMessagesByChatId } = require("../queries/chatQueries");
const { deleteContactById } = require("../queries/userQueries");

exports.removeContactService = async ({ id }) => {
  try {
    const response = await pool.query(deleteContactById, [id]);
    const response1 = await pool.query(deleteFullMessagesByChatId, [id]);
    if (response.rowCount > 0) return true;
    return false;
  } catch (error) {
    throw error;
  }
};
