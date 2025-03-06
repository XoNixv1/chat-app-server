const getChatMessages =
  "SELECT * FROM messages WHERE chat_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3";
const socketMessage =
  "INSERT INTO messages (chat_id, sender_id, message_text) VALUES ($1, $2, $3) RETURNING *";

module.exports = {
  getChatMessages,
  socketMessage,
};
