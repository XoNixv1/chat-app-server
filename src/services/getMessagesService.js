const pool = require("../config/db");
const { getChatMessages } = require("../queries/chatQueries");

const getMesssagesService = async (chat_id, limit, offset) => {
  try {
    const messages = await pool.query(getChatMessages, [
      chat_id,
      +limit,
      offset,
    ]);

    return messages.rows;
  } catch (error) {
    throw error;
  }
};

module.exports = { getMesssagesService };
