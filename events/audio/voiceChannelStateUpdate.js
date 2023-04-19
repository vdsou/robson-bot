const { channelIds } = require("../../config/channelsId");
const playJokeAudio = require("./playJokeWhenOneEnters");
// must have config channel ids file
module.exports = async (oldState, newState) => {
  const user = newState.member.user;
  const newInChannel = newState.channel;
  const oldInChannel = oldState.channel;

  if (user?.bot) {
    return;
  }
  if (oldState.mute !== newState.mute) {
    return;
  }
  console.log(channelIds);
  if (
    oldInChannel === null &&
    newInChannel !== null &&
    channelIds.includes(newInChannel.id)
  ) {
    console.log("user joined the channel!");
    playJokeAudio(newState);
  }
  if (
    oldInChannel !== null &&
    newInChannel !== null &&
    channelIds.includes(newInChannel.id)
  ) {
    console.log("user moved to this channel!");
    playJokeAudio(newState);
  }
  if (
    oldInChannel !== null &&
    newInChannel === null &&
    channelIds.includes(oldInChannel.id)
  ) {
    console.log("user left this channel!");
  }
  if (
    oldInChannel !== null &&
    newInChannel !== null &&
    channelIds.includes(oldInChannel.id)
  ) {
    console.log("user moved to another channel!");
  }
};
