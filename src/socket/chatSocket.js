const pool = require("../config/db");
const { socketMessage } = require("../queries/chatQueries");

exports.setupSocket = (io, socket) => {
  socket.on("joinRoom", (chat_id) => {
    socket.join(chat_id);
  });

  // on sending message
  socket.on("sendMessage", async (data) => {
    const { chat_id, messageText, senderId } = data;
    console.log(data);
    try {
      //saving in data base
      const newMessage = await saveMessage(chat_id, senderId, messageText);

      // message only to users which are in the room
      io.to(chat_id).emit("newMessage", newMessage);
    } catch (error) {
      console.error("Error handling message:", error);
    }
  });
};

const saveMessage = async (chat_id, senderId, messageText) => {
  try {
    const result = await pool.query(socketMessage, [
      chat_id,
      senderId,
      messageText,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error saving message:", error);
    throw new Error("Failed to save message");
  }
};
