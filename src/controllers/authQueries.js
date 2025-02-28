const checkEmailExists = "SELECT u.email FROM users u where u.email = $1";
const newUser =
  "INSERT INTO users (name, email, password, photo_url) VAlUES ($1, $2, $3, $4)";
const findUser = "SELECT * FROM users WHERE email = $1";

module.exports = {
  checkEmailExists,
  newUser,
  findUser,
};
