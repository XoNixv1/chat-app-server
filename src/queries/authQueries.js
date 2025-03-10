const checkEmailExists = "SELECT u.email FROM users u where u.email = $1";
const newUser =
  "INSERT INTO users (user_name, email, password, photo_url) VAlUES ($1, $2, $3, $4)";
const findUser = "SELECT * FROM users WHERE email = $1";
const findUserById = "SELECT * FROM users WHERE id = $1";
const getUserId = "SELECT id FROM users WHERE email = $1";

module.exports = {
  findUserById,
  checkEmailExists,
  newUser,
  findUser,
  getUserId,
};
