const { joinVoiceChannel, getVoiceConnection } = require("@discordjs/voice");
module.exports = async (msg) => {
  if (!msg.guild) return;
  if (msg.member.voice.channel) {
    const connection = joinVoiceChannel({
      channelId: msg.member.voice.channel.id,
      guildId: msg.channel.guild.id,
      adapterCreator: msg.channel.guild.voiceAdapterCreator,
    });
  } else {
    msg.channel.send("Entre em algum canal de voz, por favor, meu anjo!");
  }
};
