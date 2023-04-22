const { channelIds, serversId } = require("../../config/discordIDs");
const playJokeAudio = require("./playJokeWhenOneEnters");
// must have config channel ids file
let joined = false;
module.exports = async (oldState, newState) => {
  const user = newState.member.user;
  const newInChannel = newState.channel;
  const oldInChannel = oldState.channel;
  const oldServer = oldState.guild;
  const newServer = newState.guild;
  
  if (user?.bot) {
    return;
  }
  if (serversId.includes(newServer.id)) {
    if (
      oldState.selfMute !== newState.selfMute ||
      oldState.selfDeaf !== newState.selfDeaf ||
      oldState.mute !== newState.mute ||
      oldState.deaf !== newState.deaf
    ) {
      if (joined) {
        return;
      }
    }
    if (
      oldInChannel === null &&
      newInChannel !== null &&
      channelIds.includes(newInChannel.id)
    ) {
      console.log("user joined the channel!");
      joined = true;
      return playJokeAudio(newState);
    }
    if (
      oldInChannel !== null &&
      newInChannel !== null &&
      channelIds.includes(newInChannel.id)
    ) {
      console.log("user moved to this channel!");
      joined = true;
      return playJokeAudio(newState);
    }
    if (
      oldInChannel !== null &&
      newInChannel === null &&
      channelIds.includes(oldInChannel.id)
    ) {
      joined = false;
      console.log("user left this channel!");
    }
    if (
      oldInChannel !== null &&
      newInChannel !== null &&
      channelIds.includes(oldInChannel.id)
    ) {
      joined = false;
      console.log("user moved to another channel!");
    }
  }
};
