const pool = require("../config/db");
const { socketMessage } = require("../queries/chatQueries");

require("dotenv").config();
const apiKey = process.env.GPT_API_KEY;

const saveMessage = async (id, senderId, messageText) => {
  try {
    const result = await pool.query(socketMessage, [id, senderId, messageText]);
    return result.rows[0];
  } catch (error) {
    console.error("Error saving message:", error);
    throw new Error("Failed to save message");
  }
};

const gptSendingBack = async (message) => {
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: message }],
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Gemini API: ${response.status} - ${response.statusText}`
      );
    }

    const data = await response.json();
    const responseText = data.candidates[0].content.parts[0].text;

    return responseText;
  } catch (error) {
    console.error("Gemini API:", error.message);
    throw error;
  }
};

module.exports = { gptSendingBack, saveMessage };
