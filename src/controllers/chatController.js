const pool = require("../config/db");
const { getChatMessages } = require("../queries/chatQueries");

exports.getMessages = async (req, res) => {
  const { chat_id, page = 1, limit = 20 } = req.query;
  const offset = (+page - 1) * +limit;
  console.log(req.query, offset);
  try {
    const messages = await pool.query(getChatMessages, [
      chat_id,
      +limit,
      offset,
    ]);

    res.json(messages.rows);
  } catch (error) {
    res.status(500).json({ message: "Error of receiving messages", error });
  }
};
