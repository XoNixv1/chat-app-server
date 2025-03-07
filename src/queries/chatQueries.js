const getChatMessages =
  "SELECT * FROM messages WHERE chat_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3";
const socketMessage =
  "INSERT INTO messages (chat_id, sender_id, message_text) VALUES ($1, $2, $3) RETURNING *";
const getChatByUsers =
  "SELECT * FROM chats WHERE user1_id = $1 AND user2_id = $2";

module.exports = {
  getChatMessages,
  socketMessage,
  getChatByUsers,
};
