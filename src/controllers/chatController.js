const { getMesssagesService } = require("../services/getMessagesService");

exports.getMessages = async (req, res) => {
  const { chat_id, page = 1, limit = 20 } = req.query;
  const offset = (+page - 1) * +limit;
  try {
    const messages = await getMesssagesService(chat_id, limit, offset);

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error of receiving messages", error });
  }
};
