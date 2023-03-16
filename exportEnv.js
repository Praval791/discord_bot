require("dotenv").config();

module.exports = {
  TOKEN: process.env.BUILD_A_BOT_TOKEN,
  CLIENT_ID: process.env.BUILD_A_BOT_CLIENT_ID,
  OPENAI_API_KEY: process.env.OPENAI_SECRET_KEY,
};
