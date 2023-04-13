const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
} = require("@discordjs/voice");
const ytdl = require("ytdl-core");
module.exports = async (msg, url) => {
  if (msg.member.voice.channel) {
    const connection = joinVoiceChannel({
      channelId: msg.member.voice.channel.id,
      guildId: msg.channel.guild.id,
      adapterCreator: msg.channel.guild.voiceAdapterCreator,
    });
    try {
      const devID = "319177023471747072";
      const player = await createAudioPlayer();
      const isValid = ytdl.validateURL(url);
      if (isValid) {
        const stream = ytdl(url, {
          filter: "audioonly",
          quality: "highestaudio",
          requestOptions: {
            headers: {
              cookie: process.env.COOKIE,
            },
          },
        });
        const resource = createAudioResource(stream, { inlineVolume: true });
        resource.volume.setVolume(60 / 100);
        player.play(resource);
        connection.subscribe(player);
      }
      player.on("error", (error) => {
        console.error(error);
        return msg.channel.send(`Audio quebrado!!!!!1 <@${devID}> 😭️`);
      });
    } catch (error) {
      console.error(error);
    }
  } else {
    msg.channel.send("Entre em algum canal de voz, por favor, meu anjo!");
  }
};
