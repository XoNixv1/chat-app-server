const pool = require("../config/db");
const { newUser } = require("../queries/authQueries");

const standardImage =
  "https://cdn.iconscout.com/icon/free/png-256/free-account-icon-download-in-svg-png-gif-file-formats--profile-user-avatar-travel-pack-holidays-icons-1538680.png?f=webp";

const createNewUserService = async (userName, email, pass) => {
  try {
    const hashedPass = await bcrypt.hash(pass, 10);

    await pool.query(newUser, [userName, email, hashedPass, standardImage]);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createNewUserService,
};
