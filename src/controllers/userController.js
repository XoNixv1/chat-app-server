const jwt = require("jsonwebtoken");
const pool = require("../config/db");
const {
  addNewContact,
  getUserData,
  getContacts,
  checkEmailandData,
} = require("../queries/userQueries");

//adding new CONTACT
exports.addContact = async (req, res) => {
  const { email } = req.body;
  try {
    const check = await pool.query(checkEmailandData, [email]);

    if (check.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const result = await pool.query(addNewContact, [
      req.id,
      check.rows[0].id,
      check.rows[0].contact_email,
      check.rows[0].contact_name,
      check.rows[0].photo_url,
    ]);

    if (result.rowCount > 0) {
      return res
        .status(201)
        .json({ message: "User added to chat successfully" });
    } else {
      return res.status(400).json({ message: "Failed to add user to chat" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// giving user data to client side
exports.getUser = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Not authenticated", token });
  }

  try {
    const decoded = jwt.verify(token, "test-key");
    const id = decoded.id;

    const userData = await pool.query(getUserData, [id]);
    const userContacts = await pool.query(getContacts, [id]);

    console.log(userContacts.rows, userData.rows);

    if (userData.rows && userContacts.rows) {
      return res
        .status(201)
        .json({ userData: userData.rows[0], userContacts: userContacts.rows });
    } else {
      return res.status(404).json({ message: "User or contacts not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};
