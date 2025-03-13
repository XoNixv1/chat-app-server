const {
  addNewContact,
  getUserData,
  checkEmailandData,
  checkExistingContact,
} = require("../queries/userQueries");
const { getChatByUsers } = require("../queries/chatQueries");
const pool = require("../config/db");

exports.addContactService = async ({ user1_id, email }) => {
  const receiverRows = await pool.query(checkEmailandData, [email, user1_id]);
  const receiver = receiverRows.rows[0];

  if (receiverRows.rows.length === 0) {
    return "user not found";
  }

  const senderRows = await pool.query(getUserData, [user1_id]);
  const sender = senderRows.rows[0];

  const existingContactRows = await pool.query(checkExistingContact, [
    sender.id,
    receiver.id,
  ]);

  if (existingContactRows.rows.length > 0) {
    throw new Error("Contact already exists");
  }
  const result = await pool.query(addNewContact, [
    sender.id,
    receiver.id,
    sender.user_name,
    receiver.user_name,
    sender.email,
    receiver.email,
    sender.photo_url,
    receiver.photo_url,
  ]);

  if (result.rows.length > 0) {
    const newChatRows = await pool.query(getChatByUsers, [
      sender.id,
      receiver.id,
    ]);
    const newChat = newChatRows.rows[0];
    return { message: "User added to chat successfully", newChat };
  } else {
    throw new Error("Failed to add user to chat");
  }
};
