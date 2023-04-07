const { getVoiceConnection } = require("@discordjs/voice");
module.exports = async (msg) => {
  if (!msg.guild) return;
  if (msg.member.voice.channel) {
    const connection = getVoiceConnection(msg.member.voice.channel.guild.id);
    if (!connection) {
      return msg.channel.send("Não estou conectado em nenhum canal!");
    }
    connection.destroy();
  } else {
    msg.channel.send("Entre em algum canal de voz, por favor, meu anjo!");
  }
};
