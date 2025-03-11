const addNewContact =
  "INSERT INTO chats (user1_id, user2_id, user1_name, user2_name, user1_email, user2_email, user1_photo_url, user2_photo_url ) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *";
const getUserData =
  "SELECT id, email, user_name, photo_url FROM users WHERE id = $1";
const getContacts = "SELECT * FROM chats WHERE user1_id = $1 OR user2_id = $1";
const checkEmailandData =
  "SELECT id, email, user_name, photo_url FROM users WHERE email = $1 AND id <> $2";
const checkExistingContact =
  "SELECT * FROM chats WHERE (user1_id = $1 AND user2_id = $2) OR (user1_id = $2 AND user2_id = $1);";
const changeUserImage = "UPDATE users SET photo_url=$2 WHERE id=$1";
const changeUserImageInContacts = `UPDATE chats
  SET 
    user1_photo_url = CASE WHEN user1_id = $1 THEN $2 ELSE user1_photo_url END,
    user2_photo_url = CASE WHEN user2_id = $1 THEN $2 ELSE user2_photo_url END
  WHERE user1_id = $1 OR user2_id = $1`;
const deleteContactById = "DELETE FROM chats WHERE id = $1";

module.exports = {
  addNewContact,
  getUserData,
  getContacts,
  checkEmailandData,
  checkExistingContact,
  changeUserImage,
  changeUserImageInContacts,
  deleteContactById,
};
