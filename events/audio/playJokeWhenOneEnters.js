const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
} = require("@discordjs/voice");
const ytdl = require("ytdl-core");

module.exports = async (state) => {
  if (state.member.voice.channel) {
    const url = "https://www.youtube.com/watch?v=ICfDjL1s-e8";
    await new Promise(resolve => setTimeout(resolve, 2250));
    console.log("oioioi", state.member.voice.channel.id,)
    const connection = joinVoiceChannel({
      channelId: state.member.voice.channel.id,
      guildId: state.channel.guild.id,
      adapterCreator: state.channel.guild.voiceAdapterCreator,
    });
    try {
      const player = createAudioPlayer();
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
        return console.error(error);
      });
      player.on(AudioPlayerStatus.Playing, () => {
        console.log("Playing the joke!");
      });
      player.on(AudioPlayerStatus.Idle, () => {
        connection.destroy();
        console.log("Bot left the channel")
      });
    } catch (error) {
      console.error(error);
    }
  } else {
    return;
  }
};
