const {
  Client,
  GatewayIntentBits,
  Routes,
  REST,
  EmbedBuilder,
} = require("discord.js");
const { commands } = require("./commands.js");
const { TOKEN, CLIENT_ID } = require("./exportEnv.js");
const { generateImage, getCompletion } = require("./openAi.js");

const rest = new REST({ version: "10" }).setToken(TOKEN);
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  message.reply("Hello! bot is active!");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("Pong!");
    return;
  }

  if (interaction.commandName === "chat-or-ask") {
    const prompt = interaction.options.getString("prompt");
    let replyDeleted = false;
    try {
      await interaction.reply("wait a sec...");
      const { choices } = await getCompletion(prompt);
      await interaction.deleteReply();
      replyDeleted = true;
      await interaction.channel.send(choices[0].text);
    } catch (error) {
      if (!replyDeleted) await interaction.editReply("Error occured!");
      replyDeleted = true;
    }
    return;
  }

  if (interaction.commandName === "text-to-image") {
    await interaction.reply("wait a sec...");
    let replyDeleted = false;
    const [prompt, n] = [
      interaction.options.getString("prompt"),
      interaction.options.getInteger("n"),
    ];
    try {
      const files = (await generateImage(prompt, n)).data.map(({ url }, i) => {
        if (i == 0)
          return new EmbedBuilder()
            .setImage(url)
            .setURL("https://google.com")
            .setTitle(prompt);
        return new EmbedBuilder().setImage(url).setURL("https://google.com");
      });
      await interaction.deleteReply();
      replyDeleted = true;
      await interaction.channel.send({ embeds: files });
    } catch (error) {
      if (!replyDeleted) await interaction.editReply("Error occured!");
      replyDeleted = true;
    }
    return;
  }
});

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");
    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
    console.log("Successfully reloaded application (/) commands.");
    console.log("Client ready to login!");
    client.login(TOKEN);
    console.log("Client logged in!");
  } catch (error) {
    console.error(error);
  }
})();
