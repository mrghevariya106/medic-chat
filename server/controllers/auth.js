const { connect } = require("getstream");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const StreamChat = require("stream-chat");

const api_key = process.env.API_KEY;
const api_secret = process.env.API_SECRET;
const api_id = process.env.API_ID;

const signup = async (req, res) => {
  try {
    const { fullName, userName, password, phoneNumber } = req.body;

    const userId = crypto.randomBytes(16).toString("hex");

    const serverClient = connect(api_key, api_secret, api_id);

    const hashedPassword = await bcrypt.hash(password, 10);

    const token = serverClient.createUserToken(userId);

    res
      .status(200)
      .json({ fullName, userName, hashedPassword, phoneNumber, token, userId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

const login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const serverClient = connect(api_key, api_secret, api_id);
    const client = StreamChat.getInstance(api_key, api_secret);

    const { users } = await client.query({ name: userName });

    if (!user.length)
      return res.status(404).json({ message: "User not found" });

    const success = await bcrypt.compare(password, users[0].hashedPassword);

    const token = serverClient.createUserToken(users[0].id);

    if (success) {
      res
        .status(200)
        .json({
          token,
          fullName: users[0].fullName,
          userName,
          userId: users[0].id,
        });
    } else {
      res.status(500).json({ message: "Incorrect Password" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

module.exports = { login, signup };
