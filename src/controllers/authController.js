const { addContactService } = require("../services/addContactService");
const { createNewUserService } = require("../services/createNewUserService");
const {
  getUserIdByEmailService,
} = require("../services/getUserIdByEmailService");
const { getUserDataByEmail } = require("../services/getUserDataByEmail");
const { IsValidPass } = require("../services/validPassCheck");
const { createToken } = require("../services/createToken");
const { checkEmailService } = require("../services/checkEmail.service");
require("dotenv").config();

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getUserDataByEmail(email);

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    if ((await IsValidPass(password, user.password)) === false) {
      return res.status(400).json({ message: "wrong password" });
    }

    const token = createToken(user.id);

    console.log(token);

    res.cookie("chat_token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 43200,
      sameSite: "none",
    });

    return res.status(200).json({ message: "Login successful", id: user.id });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

exports.register = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    if (await checkEmailService(email)) {
      return res.status(409).json({ message: "Email already exists" });
    }

    await createNewUserService(userName, email, password);

    const id = await getUserIdByEmailService(email);

    const addingGpt = await addContactService({
      user1_id: id,
      email: "@chatgpt.com",
    });

    res.status(201).json({ message: "user created succesfully", email });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};
