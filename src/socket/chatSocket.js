const pool = require("../config/db");
const { gptSendingBack } = require("../controllers/chatController");
const { socketMessage } = require("../queries/chatQueries");

const saveMessage = async (id, senderId, messageText) => {
  console.log(id);
  try {
    const result = await pool.query(socketMessage, [id, senderId, messageText]);
    return result.rows[0];
  } catch (error) {
    console.error("Error saving message:", error);
    throw new Error("Failed to save message");
  }
};

exports.setupSocket = (io, socket) => {
  socket.on("joinRoom", (chat_id) => {
    socket.join(chat_id);
  });

  //on send to GPT
  socket.on("sendGptMessage", async (data) => {
    const { id, messageText, senderId } = data; //id: roomId
    console.log(data);
    try {
      //saving user message in data base
      const newUserMsg = await saveMessage(id, senderId, messageText);
      //displaying message
      io.to(id).emit("newMessage", newUserMsg);

      const gptMessage = await gptSendingBack(messageText);

      const newGptMessage = await saveMessage(
        id,
        "9b387d20-a231-4168-836a-badb8d61782e",
        gptMessage
      );
      //displaying message
      io.to(id).emit("newGptMessage", newGptMessage);
    } catch (error) {
      console.error("Error handling message:", error);
    }
  });

  // on sending message
  socket.on("sendMessage", async (data) => {
    const { id, messageText, senderId } = data;
    try {
      //saving in data base
      const newMessage = await saveMessage(id, senderId, messageText);

      // message only to users which are in the room
      io.to(id).emit("newMessage", newMessage);
    } catch (error) {
      console.error("Error handling message:", error);
    }
  });
};
