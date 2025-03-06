const addNewContact =
  "INSERT INTO chats (user1_id, user2_id, contact_email, contact_name, photo_url) VALUES($1, $2, $3, $4, $5)";
const getUserData =
  "SELECT id, email, user_name, photo_url FROM users WHERE id = $1";
const getContacts = "SELECT * FROM chats WHERE user1_id = $1 OR user2_id = $1";
const checkEmailandData =
  "SELECT photo_url, user_name FROM users WHERE email = $1";

module.exports = {
  addNewContact,
  getUserData,
  getContacts,
  checkEmailandData,
};
