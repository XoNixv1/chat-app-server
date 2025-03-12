const jwt = require("jsonwebtoken");
const pool = require("../config/db");
const {
  getUserData,
  getContacts,
  changeUserImage,
  changeUserImageInContacts,
} = require("../queries/userQueries");
const { addContactService } = require("../services/addContactService");
const { removeContactService } = require("../services/removeContactService");
//
require("dotenv").config();
const jwtKey = process.env.JWT_SECRET;

//adding new CONTACT
exports.addContact = async (req, res) => {
  const { user1_id, email } = req.body;
  try {
    const result = await addContactService({ user1_id, email });
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// giving user data to client side
exports.getUser = async (req, res) => {
  const token = req.cookies.chat_token;
  console.log(req);
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Not authenticated", token });
  }

  try {
    const decoded = jwt.verify(token, jwtKey);
    const id = decoded.id;

    const userData = await pool.query(getUserData, [id]);
    const userContacts = await pool.query(getContacts, [id]);

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

exports.changeImage = async (req, res) => {
  const { userId, imageURL } = req.body;

  try {
    const result1 = await pool.query(changeUserImage, [userId, imageURL]);
    const result2 = await pool.query(changeUserImageInContacts, [
      userId,
      imageURL,
    ]);

    if (result1.rowCount && result2.rowCount) {
      res.status(201).json({ message: "Image changed successfully" });
    } else {
      res.status(400).json({ message: "Failed to change image" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.deleteContact = async (req, res) => {
  const { id } = req.body;
  try {
    const result = await removeContactService({
      id,
    });
    if (result) return res.status(200);
    return res.status(404);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
