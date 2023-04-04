const dotenv = require("dotenv");
const { Client, Events, GatewayIntentBits } = require("discord.js");

dotenv.config();

console.log(process.env.DISCORD_TOKEN);
const TOKEN = process.env.DISCORD_TOKEN;
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, (client) => {
  console.log(`Ready! Logged in as ${client.user.tag}`);
});
client.login(TOKEN);

client.on("messageCreate", (message) => {
  console.log(message);
  if (message.content === "oi") {
    message.reply("Oi!!!");
  }
});
