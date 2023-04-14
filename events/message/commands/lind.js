module.exports = async (msg) => {
  msg.channel.send(msg.author.displayAvatarURL());
};
