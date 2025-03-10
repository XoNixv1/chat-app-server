const pool = require("../config/db");
const { getChatMessages } = require("../queries/chatQueries");
require("dotenv").config();
const apiKey = process.env.GPT_API_KEY;

exports.getMessages = async (req, res) => {
  const { chat_id, page = 1, limit = 20 } = req.query;
  const offset = (+page - 1) * +limit;
  try {
    const messages = await pool.query(getChatMessages, [
      chat_id,
      +limit,
      offset,
    ]);

    res.json(messages.rows);
  } catch (error) {
    res.status(500).json({ message: "Error of receiving messages", error });
  }
};

const gptSendingBack = async (message) => {
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    console.log("Generated URL:", url);
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
    console.log(responseText);
    return responseText;
  } catch (error) {
    console.error("Gemini API:", error.message);
    throw error;
  }
};

exports.gptSendingBack = gptSendingBack;
