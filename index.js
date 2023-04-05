const dotenv = require("dotenv");
const { Client, Events, GatewayIntentBits } = require("discord.js");
const commandHandler = require("./events/message/");

dotenv.config();

const TOKEN = process.env.DISCORD_TOKEN;
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
client.on("messageCreate", commandHandler);
client.on("messageCreate", (message) => {
  if (message.content === "oi") {
    message.reply("Oi!!!");
  }
});

client.once(Events.ClientReady, (client) => {
  console.log(`Ready! Logged in as ${client.user.tag}`);
});

client.login(TOKEN);
