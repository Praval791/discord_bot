const { Configuration, OpenAIApi } = require("openai");
const { MessageEmbed } = require("discord.js");
const { OPENAI_API_KEY } = require("./exportEnv");
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const getCompletion = async (prompt) => {
  const { data } = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    max_tokens: 2000,
    temperature: 0,
  });
  return data;
};

const generateImage = async (prompt, n) => {
  const { data } = await openai.createImage({
    prompt,
    n,
    size: "1024x1024",
  });
  return data;
};

module.exports = { getCompletion, generateImage };
