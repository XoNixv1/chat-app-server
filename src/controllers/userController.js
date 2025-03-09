const jwt = require("jsonwebtoken");
const pool = require("../config/db");
const { getUserData, getContacts } = require("../queries/userQueries");
const { addContactService } = require("../services/addContactService");

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

// exports.addContact = async (req, res) => {
//   const { user1_id, email } = req.body;
//   try {
//     // check if exist
//     const receiverRows = await pool.query(checkEmailandData, [email, user1_id]);
//     const receiver = receiverRows.rows[0];

//     if (receiverRows.rows.length === 0) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const senderRows = await pool.query(getUserData, [user1_id]);
//     const sender = senderRows.rows[0];

//     //check if already added
//     const existingContactRows = await pool.query(checkExistingContact, [
//       sender.id,
//       receiver.id,
//     ]);

//     if (existingContactRows.rows.length > 0) {
//       return res.status(400).json({ message: "Contact already exists" });
//     }

//     // adding
//     const result = await pool.query(addNewContact, [
//       sender.id,
//       receiver.id,
//       sender.user_name,
//       receiver.user_name,
//       sender.email,
//       receiver.email,
//       sender.photo_url,
//       receiver.photo_url,
//     ]);

//     if (result.rowCount > 0) {
//       const newChatRows = await pool.query(getChatByUsers, [
//         sender.id,
//         receiver.id,
//       ]);
//       const newChat = newChatRows.rows[0];
//       console.log(newChat);
//       return res
//         .status(201)
//         .json({ message: "User added to chat successfully", newChat });
//     } else {
//       return res.status(400).json({ message: "Failed to add user to chat" });
//     }
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: "Internal server error", error: error });
//   }
// };

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
