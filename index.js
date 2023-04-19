const dotenv = require("dotenv");
const { Client, Events, GatewayIntentBits } = require("discord.js");
const commandHandler = require("./events/message/");
const apiConnect = require("./services/apiConnectTest");
const voiceChannelStateUpdate = require("./events/audio/voiceChannelStateUpdate");

dotenv.config();

const TOKEN = process.env.DISCORD_TOKEN;
const TEXT_JOKE = process.env.TEXT_JOKE;
const USER_JOKE = process.env.USER_JOKE;
const IMAGE_JOKE = process.env.IMAGE_JOKE;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildVoiceStates,
  ],
});
client.on("voiceStateUpdate", voiceChannelStateUpdate);
client.on("messageCreate", commandHandler);
client.on("messageCreate", (message) => {
  if (message.content === "oi") {
    message.reply("Oi!!!");
  }
});
client.on("typingStart", (interaction) => {
  if (interaction.user.id === USER_JOKE) {
    const channel = interaction.channel;
    channel
      .send({ content: `${TEXT_JOKE}` })
      .then((message) => {
        setTimeout(() => message.delete(), 5000);
      })
      .catch();
  }
});
client.once(Events.ClientReady, async (client) => {
  const api = await apiConnect;
  console.log(api);
  console.log(`Ready! Logged in as ${client.user.tag}`);
});

client.login(TOKEN);
